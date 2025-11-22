// scripts/fetch-turbodork.js
import fs from "fs";
import path from "path";
import { kebabCase, ensureDir, fetchMarkdown, extractTableLines, parseHex } from "./utils.js";

const TURBO_URL =
  "https://raw.githubusercontent.com/Arcturus5404/miniature-paints/refs/heads/main/paints/TurboDork.md";

const OUTPUT = "src/assets/dist/paints/turbodork.json";

async function run() {
  console.log("Fetching Turbo Dork…");

  const markdown = await fetchMarkdown(TURBO_URL);
  const lines = extractTableLines(markdown);

  const paints = lines.map(line => {
    const [_, name, set, r, g, b, hexCell] = line.split("|").map(s => s.trim());
    const hex = parseHex(hexCell) ?? null;

    return {
      id: `${kebabCase(set)}-${kebabCase(name)}`,
      name,
      set,
      hex
    };
  });

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(paints, null, 2));

  console.log(`✓ Saved Turbo Dork → ${OUTPUT}`);
}

run().catch(console.error);
