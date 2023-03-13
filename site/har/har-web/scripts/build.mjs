import fs from "node:fs";
import { URL, fileURLToPath } from "node:url"
function resolve(filename) {
  return fileURLToPath(new URL(filename, import.meta.url))
}
function start() {
  const settingsFilePath = resolve("../platformSettings/demo.json");
  fs.readFileSync(settingsFilePath, {

  })
}
