// scripts/utils.js
import fs from "fs";

export function kebabCase(str) {
  return str
    .normalize("NFKD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
}

export function ensureDir(path) {
  if (!fs.existsSync(path)) {
    fs.mkdirSync(path, { recursive: true });
  }
}

export async function fetchMarkdown(url) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed fetching ${url}`);
  return res.text();
}

export function extractTableLines(markdown) {
  return markdown
    .split("\n")
    .filter(line => line.trim().startsWith("|") && !line.includes("---"))
    .slice(1); // skip header row
}

export function parseHex(cell) {
  const match = cell?.match(/`(#[A-F0-9]+)`/i);
  return match ? match[1] : null;
}