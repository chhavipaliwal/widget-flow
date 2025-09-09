"use server";
import fs from "fs/promises";
import path from "path";

const DATA_DIR = "data";

export async function readData(fileName: string) {
  if (!fileName) {
    throw new Error("File name is required");
  }

  const dataFilePath = path.join(process.cwd(), DATA_DIR, fileName);

  const file = await fs.readFile(dataFilePath, "utf-8");
  return JSON.parse(file);
}

export async function writeData(fileName: string, data: any) {
  if (!fileName) {
    throw new Error("File name is required");
  }

  const dataFilePath = path.join(process.cwd(), DATA_DIR, fileName);

  await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), "utf-8");
}
