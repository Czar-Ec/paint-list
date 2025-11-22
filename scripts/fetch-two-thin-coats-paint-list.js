import fs from 'fs';
import path from 'path';
import { kebabCase, ensureDir, fetchMarkdown, extractTableLines, parseHex } from './utils.js';

const URL =
  'https://raw.githubusercontent.com/Arcturus5404/miniature-paints/refs/heads/main/paints/Duncan.md';
const OUTPUT = 'src/assets/dist/paints/two-thin-coats.json';

async function run() {
  const markdown = await fetchMarkdown(URL);
  const lines = extractTableLines(markdown);

  const paints = lines.map((line) => {
    const [_, name, set, r, g, b, hexCell] = line.split('|').map((s) => s.trim());
    const hex = parseHex(hexCell);

    return {
      id: `${kebabCase(set)}-${kebabCase(name)}`,
      name,
      set,
      hex,
    };
  });

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(paints, null, 2));
  console.log(`✓ Saved Two Thin Coats → ${OUTPUT}`);
}

run().catch(console.error);
