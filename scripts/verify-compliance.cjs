const fs = require('fs');
const path = require('path');

const emojiRegex = /[\u{1F300}-\u{1F9FF}\u{2600}-\u{26FF}\u{2700}-\u{27BF}\u{1F1E6}-\u{1F1FF}\u{1F600}-\u{1F64F}\u{1F680}-\u{1F6FF}\u{1F900}-\u{1F9FF}]/u;
const bannedCliches = [
  'empower',
  'revolutionize',
  'seamlessly',
  'harness the power',
  'dive into',
  'tapestry',
  'testament',
  'delve',
  'elevate',
  'comprehensive',
  'as an ai assistant'
];

let errors = 0;

function scanDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const full = path.join(dir, f);
    const stat = fs.statSync(full);
    if (stat.isDirectory()) {
      scanDir(full);
    } else if (/\.(jsx?|tsx?|html|css)$/.test(f)) {
      const content = fs.readFileSync(full, 'utf-8');
      const emojiMatch = content.match(emojiRegex);
      if (emojiMatch) {
        console.error(`COMPLIANCE ERROR: EMOJI found in ${full}: ${emojiMatch[0]}`);
        errors++;
      }
      for (const cliche of bannedCliches) {
        if (new RegExp(`\\b${cliche}\\b`, 'i').test(content)) {
          console.error(`COMPLIANCE ERROR: BANNED CLICHE "${cliche}" found in ${full}`);
          errors++;
        }
      }
    }
  }
}

scanDir(path.resolve(__dirname, '../src'));

if (errors > 0) {
  console.error(`\nFAILED: Found ${errors} compliance violations.`);
  process.exit(1);
} else {
  console.log('PASSED: 0 emojis and 0 banned cliches found.');
  process.exit(0);
}
