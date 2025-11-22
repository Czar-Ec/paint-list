import fs from "fs";
import path from 'path';
import { kebabCase, ensureDir, fetchMarkdown, extractTableLines, parseHex } from "./utils.js";

const URL = "https://raw.githubusercontent.com/Arcturus5404/miniature-paints/refs/heads/main/paints/Army_Painter.md";
const OUTPUT = "src/assets/dist/paints/army-painter.json";

async function run() {
  const markdown = await fetchMarkdown(URL);
  const lines = extractTableLines(markdown);

  const paints = lines.map(line => {
    const cols = line.split("|").map(s => s.trim());
    console.log(cols);
      const [_, name, code, set, r, g, b, hexCell] = line.split('|').map((s) => s.trim());
    const hex = parseHex(hexCell);

    return {
      id: code != 'null' ? `${code}-${kebabCase(name)}` : `${kebabCase(set)}-${kebabCase(name)}`,
      name,
      code,
      set,
      hex
    };
  });

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(paints, null, 2));
  console.log(`✓ Saved Army Painter → ${OUTPUT}`);
}

run().catch(console.error);
