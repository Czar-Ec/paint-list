const fs = require('fs');
const path = require('path');
const https = require('https');

const url = 'https://raw.githubusercontent.com/Czar-Ec/Czar-Ec.github.io/develop/src/assets/themes/czarec.theme.scss';
const outFile = path.resolve(__dirname, '../src/assets/dist/themes/czarec.theme.scss');

console.log('Output file will be:', outFile);

// Ensure folder exists
try {
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  console.log('✅ Directory ensured:', path.dirname(outFile));
} catch (err) {
  console.error('❌ Failed to create directory:', err);
  process.exit(1);
}

console.log('Fetching remote theme...');
https.get(url, (res) => {
  console.log('HTTP status code:', res.statusCode);
  if (res.statusCode !== 200) {
    console.error('❌ Failed to fetch file');
    process.exit(1);
  }

  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    console.log('Fetched theme, length:', data.length);

    // Replace local font path with Google Fonts URL
    const fixedData = data.replace(
      /src:\s*url\([^)]+\)\s*format\([^)]+\);/,
      "src: url('https://fonts.googleapis.com/css2?family=Michroma&display=swap') format('truetype');"
    );

    fs.writeFile(outFile, fixedData, 'utf8', (err) => {
      if (err) {
        console.error('❌ Failed to write file:', err);
        process.exit(1);
      }
      console.log('✅ Theme saved successfully!');
    });
  });
}).on('error', (err) => {
  console.error('❌ HTTP request failed:', err);
  process.exit(1);
});
