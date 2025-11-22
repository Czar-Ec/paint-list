import fs from 'fs';
import path from 'path';
import { kebabCase, ensureDir, fetchMarkdown, extractTableLines, parseHex } from './utils.js';

const URL =
  'https://raw.githubusercontent.com/Arcturus5404/miniature-paints/refs/heads/main/paints/Vallejo.md';
const OUTPUT = 'src/assets/dist/paints/vallejo.json';

async function run() {
  const markdown = await fetchMarkdown(URL);
  const lines = extractTableLines(markdown);

  const paints = lines.map((line) => {
    const cols = line.split('|').map((s) => s.trim());
    const name = cols[1];
    const code = cols[2];
    const set = cols[3];
    const hex = parseHex(cols[7]);

    return {
      id: `${code}-${kebabCase(name)}`,
      name,
      code,
      set,
      hex,
      brandId: 'vallejo',
    };
  });

  ensureDir(path.dirname(OUTPUT));
  fs.writeFileSync(OUTPUT, JSON.stringify(paints, null, 2));
  console.log(`✓ Saved Vallejo → ${OUTPUT}`);
}

run().catch(console.error);
