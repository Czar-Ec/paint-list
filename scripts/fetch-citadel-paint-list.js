// scripts/fetch-citadel.js
import fs from 'fs';
import path from 'path';
import { kebabCase, ensureDir, fetchMarkdown, extractTableLines, parseHex } from './utils.js';

const CITADEL_URL =
  'https://raw.githubusercontent.com/Arcturus5404/miniature-paints/refs/heads/main/paints/Citadel_Colour.md';

const OUTPUT = 'src/assets/dist/paints/citadel.json';

async function run() {
  console.log('Fetching Citadel…');

  const markdown = await fetchMarkdown(CITADEL_URL);
  const lines = extractTableLines(markdown);

  const paints = lines
    .map((line) => {
      const [_, name, set, r, g, b, hexCell] = line.split('|').map((s) => s.trim());
      if (!name || !set) return null;

      // Skip discontinued sets
      if (set.toLowerCase().includes('discontinued')) return null;

      const hex = parseHex(hexCell) ?? null;

      return {
        id: `${kebabCase(set)}-${kebabCase(name)}`,
        name,
        set,
        hex,
      };
    })
    .filter(Boolean);

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(paints, null, 2));

  console.log(`✓ Saved Citadel → ${OUTPUT}`);
}

run().catch(console.error);
