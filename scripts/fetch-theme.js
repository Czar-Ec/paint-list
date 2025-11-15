const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://raw.githubusercontent.com/Czar-Ec/Czar-Ec.github.io/develop/src/assets/themes/czarec.theme.scss';
const outFile = path.resolve(__dirname, '../src/assets/dist/themes/czarec.theme.scss');

console.log('Output file will be:', outFile);

// Ensure folder exists
fs.mkdirSync(path.dirname(outFile), { recursive: true });

console.log('Fetching remote theme...');
https.get(url, (res) => {
  if (res.statusCode !== 200) {
    console.error('❌ Failed to fetch file');
    process.exit(1);
  }

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    // Remove local @font-face (prevents sanitizer issues)
    const cleanedData = data.replace(/@font-face\s*{[^}]*}/gs, '');

    fs.writeFileSync(outFile, cleanedData, 'utf8');
    console.log('✅ Theme saved successfully!');
  });
}).on('error', (err) => {
  console.error('❌ HTTP request failed:', err);
  process.exit(1);
});
