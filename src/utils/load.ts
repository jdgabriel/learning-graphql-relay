import { readFileSync } from "fs";
import { resolve } from "path";

export async function readDatabase(context?: string) {
  const source = resolve(__dirname, "..", "..");
  const fileData = readFileSync(`${source}/data.json`, "utf-8");

  const data = JSON.parse(fileData);
  if (data && context && data[context]) {
    return data[context];
  }

  return data;
}
