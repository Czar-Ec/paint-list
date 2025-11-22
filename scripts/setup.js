// scripts/run-all.js
import { exec } from 'child_process';
import path from 'path';

const scripts = [
  'fetch-theme.js',
  'fetch-vallejo-paint-list.js',
  'fetch-turbo-dork-paint-list.js',
  'fetch-citadel-paint-list.js',
  'fetch-two-thin-coats-paint-list.js',
  'fetch-army-painter-paint-list.js'
];

// Helper to run a script and wait for completion
function runScript(scriptPath) {
  return new Promise((resolve, reject) => {
    console.log(`\n➡ Running ${scriptPath}...`);
    const child = exec(`node ${scriptPath}`, (error, stdout, stderr) => {
      if (error) {
        console.error(`❌ Error in ${scriptPath}:\n`, stderr);
        reject(error);
      } else {
        console.log(stdout);
        resolve();
      }
    });
  });
}

async function main() {
  try {
    for (const script of scripts) {
      const fullPath = path.resolve('scripts', script);
      await runScript(fullPath);
    }
    console.log('\n✅ All scripts completed successfully!');
  } catch (err) {
    console.error('❌ Stopped due to error:', err);
    process.exit(1);
  }
}

main();
