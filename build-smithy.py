# generate_ajv_schemas.py
from pathlib import Path
import json
import subprocess
import shutil

SCHEMA_DRAFT = "http://json-schema.org/draft-07/schema#"
OPENAPI_DIR = Path("build/smithy/source/openapi")
OUTPUT_BASE = Path("schemas")
AJV_DIR = Path("ajv")

def run_command(command):
    print(f"🔧 Running command: {' '.join(command)}")
    subprocess.run(command, check=True)

def extract_schemas():
    for openapi_file in OPENAPI_DIR.rglob("*openapi.json"):
        print(f"📦 Processing: {openapi_file}")
        relative_name = openapi_file.stem.replace(".openapi", "")
        output_dir = OUTPUT_BASE / relative_name
        output_dir.mkdir(parents=True, exist_ok=True)

        with open(openapi_file) as f:
            data = json.load(f)

        schemas = data.get("components", {}).get("schemas", {})
        for name, schema in schemas.items():
            with open(output_dir / f"{name}.schema.json", "w") as out:
                json.dump(schema, out, indent=2)
            print(f"✅ Extracted: {name} → {output_dir / f'{name}.schema.json'}")

        with open(OUTPUT_BASE / f"{relative_name}.schemas.json", "w") as out:
            json.dump(schemas, out, indent=2)
        print(f"✅ Grouped schemas saved → {OUTPUT_BASE / f'{relative_name}.schemas.json'}")

def normalize_and_convert_to_ajv(input_file, dest_file, grouped=False):
    with open(input_file) as f:
        data = json.load(f)

    def walk(obj):
        if isinstance(obj, dict):
            if "$ref" in obj:
                obj["$ref"] = obj["$ref"].split("/")[-1] + ".ajv.json"
            if obj.get("type") in ("double", "float"):
                obj["type"] = "number"
                obj.pop("format", None)
            elif obj.get("type") == "long":
                obj["type"] = "integer"
                obj.pop("format", None)
            elif obj.get("format") in ("double", "float", "long"):
                obj.pop("format", None)
            return {k: walk(v) for k, v in obj.items()}
        elif isinstance(obj, list):
            return [walk(i) for i in obj]
        return obj

    normalized = walk(data)
    out_data = {"$schema": SCHEMA_DRAFT}
    if grouped:
        out_data["definitions"] = normalized
    else:
        out_data.update(normalized)

    dest_file.parent.mkdir(parents=True, exist_ok=True)
    with open(dest_file, "w") as f:
        json.dump(out_data, f, indent=2)
    print(f"✅ Converted → {dest_file}")

def inline_refs():
    print("🧩 Inlining all $ref references in AJV schemas...")
    ajv_files = list(AJV_DIR.rglob("*.ajv.json"))
    refs = {}
    for f in ajv_files:
        with open(f) as jf:
            refs[f.name] = json.load(jf)

    for f in ajv_files:
        print(f"🔍 Inlining {f}")
        with open(f) as jf:
            data = json.load(jf)

        def inline(obj):
            if isinstance(obj, dict):
                if "$ref" in obj and obj["$ref"] in refs:
                    ref = refs[obj["$ref"]]
                    ref.pop("$schema", None)
                    return inline(ref)
                return {k: inline(v) for k, v in obj.items()}
            elif isinstance(obj, list):
                return [inline(i) for i in obj]
            return obj

        with open(f, "w") as out:
            json.dump(inline(data), out, indent=2)
    print("✅ Inlining complete.")

def compile_with_ajv():
    print("🧪 Compiling generated AJV schemas with ajv-cli...")
    for ajv_file in AJV_DIR.rglob("*.ajv.json"):
        print(f"🔍 Compiling {ajv_file}")
        result = subprocess.run(["ajv", "compile", "-s", str(ajv_file)], capture_output=True)
        if result.returncode == 0:
            print(f"✅ Valid: {ajv_file}")
        else:
            print(f"❌ Invalid: {ajv_file}")
            print(result.stderr.decode())

def main():
    smithy_path = shutil.which("smithy")
    if not smithy_path:
        print("❌ Error: 'smithy' CLI not found in PATH.")
        return

    run_command([smithy_path, "build"])
    print("✅ Smithy build completed successfully.")

    OUTPUT_BASE.mkdir(parents=True, exist_ok=True)
    AJV_DIR.mkdir(parents=True, exist_ok=True)

    extract_schemas()

    print("🔁 Converting grouped schemas to AJV-compatible format...")
    for schema_file in OUTPUT_BASE.glob("*.schemas.json"):
        rel_name = schema_file.stem.replace(".schemas", "")
        dest_path = AJV_DIR / f"{rel_name}.ajv.json"
        normalize_and_convert_to_ajv(schema_file, dest_path, grouped=True)

    print("🔁 Converting individual schemas to AJV-compatible format...")
    for schema_file in OUTPUT_BASE.rglob("*.schema.json"):
        if schema_file.name.endswith(".schemas.json"):
            continue
        rel_path = schema_file.relative_to(OUTPUT_BASE)
        dest_name = rel_path.name.replace(".schema.json", ".ajv.json")
        dest_path = AJV_DIR / rel_path.parent / dest_name
        normalize_and_convert_to_ajv(schema_file, dest_path)

    inline_refs()
    compile_with_ajv()
    print("✅ AJV schema compilation completed.")

if __name__ == "__main__":
    main()