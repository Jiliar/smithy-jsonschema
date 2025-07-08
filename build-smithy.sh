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

# Step 2A: Convert all *.schemas.json to AJV format (grouped)
echo "🔁 Converting grouped schemas to AJV-compatible format..."
find "$OUTPUT_BASE" -type f -name '*.schemas.json' | while read -r SCHEMA_FILE; do
  REL_PATH="${SCHEMA_FILE#$OUTPUT_BASE/}"
  DEST_PATH="$AJV_DIR/${REL_PATH%.schemas.json}.ajv.json"
  DEST_DIR=$(dirname "$DEST_PATH")

  mkdir -p "$DEST_DIR"

  jq '{
    "$schema": "http://json-schema.org/draft-07/schema#",
    "definitions": .
  }' "$SCHEMA_FILE" > "$DEST_PATH"

  echo "✅ Grouped → $DEST_PATH"
done

# Step 2B: Convert all individual *.schema.json to AJV-compatible format
echo "🔁 Converting individual schemas to AJV-compatible format..."
find "$OUTPUT_BASE" -type f -name '*.schema.json' ! -name '*.schemas.json' | while read -r FILE; do
  REL_PATH="${FILE#$OUTPUT_BASE/}"
  DEST_PATH="$AJV_DIR/${REL_PATH%.schema.json}.ajv.json"
  DEST_DIR=$(dirname "$DEST_PATH")

  mkdir -p "$DEST_DIR"

  jq '{
    "$schema": "http://json-schema.org/draft-07/schema#"
  } + .' "$FILE" > "$DEST_PATH"

  echo "✅ Single → $DEST_PATH"
done