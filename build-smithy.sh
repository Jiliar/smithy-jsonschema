#!/bin/bash

set -e

# Run Smithy build
echo "🔧 Running Smithy build..."
smithy build

echo "✅ Smithy build completed successfully."

OPENAPI_DIR="build/smithy/source/openapi"
OUTPUT_BASE="schemas"
AJV_DIR="ajv"

mkdir -p "$OUTPUT_BASE" "$AJV_DIR"

# Step 1: Extract schemas from each openapi.json
find "$OPENAPI_DIR" -type f -name '*openapi.json' | while read -r OPENAPI_FILE; do
  echo "📦 Processing: $OPENAPI_FILE"

  RELATIVE_NAME=$(basename "$OPENAPI_FILE" .openapi.json)
  OUTPUT_DIR="$OUTPUT_BASE/$RELATIVE_NAME"
  mkdir -p "$OUTPUT_DIR"

  schema_names=$(jq -r '.components.schemas | keys[]?' "$OPENAPI_FILE")
  for name in $schema_names; do
    jq --arg name "$name" '.components.schemas[$name]' "$OPENAPI_FILE" > "$OUTPUT_DIR/$name.schema.json"
    echo "✅ Extracted: $name → $OUTPUT_DIR/$name.schema.json"
  done

  jq '.components.schemas' "$OPENAPI_FILE" > "$OUTPUT_BASE/$RELATIVE_NAME.schemas.json"
  echo "✅ Grouped schemas saved → $OUTPUT_BASE/$RELATIVE_NAME.schemas.json"
done

echo "📂 Finished extracting schemas."

# Step 2A: Convert grouped *.schemas.json to AJV format with type normalization
echo "🔁 Converting grouped schemas to AJV-compatible format..."
find "$OUTPUT_BASE" -type f -name '*.schemas.json' | while read -r SCHEMA_FILE; do
  REL_PATH="${SCHEMA_FILE#$OUTPUT_BASE/}"
  DEST_PATH="$AJV_DIR/${REL_PATH%.schemas.json}.ajv.json"
  DEST_DIR=$(dirname "$DEST_PATH")

  mkdir -p "$DEST_DIR"

  jq 'walk(
    if type == "object" then
      if .type == "double" or .type == "float" then
        .type = "number" | del(.format)
      elif .type == "long" then
        .type = "integer" | del(.format)
      elif .format == "double" or .format == "float" or .format == "long" then
        del(.format)
      elif has("$ref") then
        .["$ref"] |= sub(".*/"; "") | .["$ref"] |= . + ".ajv.json"
      else . end
    else . end
  ) | {
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": .
  }' "$SCHEMA_FILE" > "$DEST_PATH"

  echo "✅ Grouped → $DEST_PATH"
done


# Step 2B: Convert individual *.schema.json to AJV format with type normalization
echo "🔁 Converting individual schemas to AJV-compatible format..."
find "$OUTPUT_BASE" -type f -name '*.schema.json' ! -name '*.schemas.json' | while read -r FILE; do
  REL_PATH="${FILE#$OUTPUT_BASE/}"
  DEST_PATH="$AJV_DIR/${REL_PATH%.schema.json}.ajv.json"
  DEST_DIR=$(dirname "$DEST_PATH")

  mkdir -p "$DEST_DIR"

  jq 'walk(
    if type == "object" then
      if .type == "double" or .type == "float" then
        .type = "number" | del(.format)
      elif .type == "long" then
        .type = "integer" | del(.format)
      elif .format == "double" or .format == "float" or .format == "long" then
        del(.format)
      elif has("$ref") then
        .["$ref"] |= sub(".*/"; "") | .["$ref"] |= . + ".ajv.json"
      else . end
    else . end
  ) | {
    "$schema": "http://json-schema.org/draft-07/schema#"
  } + .' "$FILE" > "$DEST_PATH"

  echo "✅ Single → $DEST_PATH"
done

# Step 2C: Inline all $ref references in AJV files
echo "🧩 Inlining all \$ref references in AJV schemas..."

INPUTS_TEMP=$(mktemp)
echo "[" > "$INPUTS_TEMP"
FIRST=true
find "$AJV_DIR" -type f -name '*.ajv.json' | while read -r f; do
  CONTENT=$(jq '.' "$f")
  FILENAME=$(basename "$f")
  if [ "$FIRST" = true ]; then
    FIRST=false
  else
    echo "," >> "$INPUTS_TEMP"
  fi
  echo "{\"filename\": \"$FILENAME\", \"content\": $CONTENT}" >> "$INPUTS_TEMP"
done
echo "]" >> "$INPUTS_TEMP"

find "$AJV_DIR" -type f -name '*.ajv.json' | while read -r AJV_FILE; do
  echo "🔍 Inlining $AJV_FILE"
  TEMP_FILE=$(mktemp)

  jq --slurpfile inputs "$INPUTS_TEMP" '
    walk(
      if type == "object" and has("$ref") then
        .["$ref"] as $refName |
        ($refName | split("/") | last) as $fileName |
        (( $slurped | map(select(.filename == $fileName)) | .[0].content ) | del(.["$schema"])) // .
      else .
      end
    )
  ' --argjson slurped "$(cat "$INPUTS_TEMP")" "$AJV_FILE" > "$TEMP_FILE" && mv "$TEMP_FILE" "$AJV_FILE"
done

rm "$INPUTS_TEMP"

echo "✅ Inlining complete."

# Step 3: Post-process all schemas and validate/generate AJV schemas using ajv-cli
echo "🔁 Validating and generating AJV schemas using ajv-cli..."
find "$OUTPUT_BASE" -type f -name '*.schema.json' -o -name '*.schemas.json' | while read -r FILE; do
  REL_PATH="${FILE#$OUTPUT_BASE/}"
  DEST_PATH="$AJV_DIR/${REL_PATH%.json}.ajv.json"
  DEST_DIR=$(dirname "$DEST_PATH")

  mkdir -p "$DEST_DIR"

  # Normalize types before using ajv-cli
  TEMP_NORMALIZED=$(mktemp)
  jq 'walk(
    if type == "object" and has("type") then
      if .type == "double" or .type == "float" then .type = "number"
      elif .type == "long" then .type = "integer"
      else . end
    else . end
  ) | {
    "$schema": "http://json-schema.org/draft-07/schema#"
  } + .' "$FILE" > "$TEMP_NORMALIZED"

  rm "$TEMP_NORMALIZED"
done
echo "🎯 AJV validation and conversion complete."

# Step 4: Compile generated AJV schemas using ajv-cli
echo "🧪 Compiling generated AJV schemas with ajv-cli..."
find "$AJV_DIR" -type f -name '*.ajv.json' | while read -r AJV_FILE; do
  echo "🔍 Compiling $AJV_FILE"
  if ajv compile -s "$AJV_FILE" > /dev/null 2>&1; then
    echo "✅ Valid: $AJV_FILE"
  else
    echo "❌ Invalid: $AJV_FILE"
    ajv compile -s "$AJV_FILE" || true
  fi
done
echo "✅ AJV schema compilation completed."