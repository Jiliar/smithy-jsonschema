# 🔁 Smithy to AJV Schema Converter

This project automates the transformation of [Smithy](https://smithy.io) model files into [AJV](https://ajv.js.org/) compatible JSON Schemas. It includes validation of the schemas using `ajv-cli` and organizes both the individual and grouped outputs.

---

## ✅ Features

- Converts `.smithy` models to OpenAPI schemas using `smithy-cli`
- Extracts and flattens JSON Schema definitions from OpenAPI files
- Converts schemas to AJV-compatible JSON format
- Validates the schemas using ajv-cli
- Organizes outputs into:
  - `schemas/` → extracted raw schemas
  - `ajv/` → final AJV-compatible files

---

## 📦 Prerequisites

### 🖥️ macOS

Install the required tools using Homebrew:

```bash
brew install smithy-cli jq node
npm install -g ajv-cli
```

### 🐧 Debian/Ubuntu Linux

Install the same tools using APT and `npm`:

```bash
sudo apt update
sudo apt install curl jq default-jre
curl -L -o smithy-cli.jar https://repo1.maven.org/maven2/software/amazon/smithy/smithy-cli/1.40.0/smithy-cli-1.40.0.jar
sudo mv smithy-cli.jar /usr/local/bin/smithy-cli.jar
echo -e '#!/bin/bash\njava -jar /usr/local/bin/smithy-cli.jar "$@"' | sudo tee /usr/local/bin/smithy > /dev/null
sudo chmod +x /usr/local/bin/smithy

sudo apt install npm
npm install -g ajv-cli
```

> ✅ After installation, you should be able to run `smithy`, `jq`, and `ajv` from your terminal.

---

## 📁 Project Structure

```
.
├── input/
│   └── smithy/         # Place your Smithy model files here
├── schemas/            # Flattened extracted schemas per OpenAPI file
├── ajv/                # AJV-compatible JSON schemas (validated)
├── build-smithy.sh     # Script to run the full process
└── smithy-build.json   # Smithy build configuration
```

---

## 🚀 Usage Instructions

### 1. Place your `.smithy` file(s)

Copy your schema definition files into:

```
input/smithy/
```

Make sure there are no syntax or validation errors:

```bash
smithy build
```

If validation is successful, continue.

---

### 2. Run the conversion process

```bash
bash build-smithy.sh
```

This will:
- Run `smithy build` to generate OpenAPI output
- Extract JSON schemas from the OpenAPI documents
- Convert all schemas to AJV-compatible format
- Validate each resulting AJV schema using `ajv-cli`

---

## 📤 Output

- **Schemas extracted from OpenAPI files** will be placed in:

  ```
  schemas/
  ```

- **Final AJV-compatible JSON schemas** will be stored in:

  ```
  ajv/
  ```

---

## ⚙️ How it Works Internally

1. **Smithy compilation**:  
   The `smithy-cli` compiles your `.smithy` files and uses the `smithy-openapi` plugin (`software.amazon.smithy:smithy-openapi`) to generate OpenAPI definitions.

2. **Schema extraction**:  
   The script searches `*.openapi.json` files, navigates to `.components.schemas`, and extracts each individual schema definition using `jq`.

3. **Schema conversion**:  
   - Grouped schemas are wrapped inside a `definitions` object (AJV expects this structure).
   - Individual schemas are wrapped with `$schema: "http://json-schema.org/draft-07/schema#"`.

4. **Validation**:  
   All resulting `.ajv.json` schemas are validated with `ajv validate` using the `ajv-cli` tool to ensure compliance with JSON Schema Draft-07.

---

## 🧪 Sample Command

```bash
bash build-smithy.sh
```

Sample output:

```
🔧 Running Smithy build...
✅ Smithy build completed successfully.
📦 Processing: build/smithy/source/openapi/MyService.openapi.json
✅ Extracted: Client → schemas/MyService/Client.schema.json
✅ Grouped → ajv/MyService.ajv.json
✅ Valid: ajv/MyService/Client.ajv.json
```

---

## 👨‍💻 Created by

**Jiliar Silgado** – feel free to use, extend or improve!