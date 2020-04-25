#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

function validateFile(filename, paths = "public/assets/") {
  if (!fs.existsSync(path.join(paths, filename))) {
    console.log(`Sound ${filename} doesn't exist!`);
    process.exit(1);
  }
}

console.log("Validating sounds.json...");
const jsonText = fs.readFileSync("public/sounds.json");
const jsonObj = JSON.parse(jsonText);
for (const i of jsonObj) {
  if (typeof i.file === "string") {
    // Single file
    validateFile(i.file);
  } else {
    // Array of file
    for (const j of i.file) {
      validateFile(j);
    }
  }
}

console.log("Successfully validated.")