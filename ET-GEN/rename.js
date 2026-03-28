const fs = require('fs');
const path = require('path');

function replaceAll(file) {
  const p = path.resolve('c:/Users/banup/OneDrive/Desktop/ET GEN/ET-GEN/ET-GEN', file);
  if (fs.existsSync(p)) {
    let content = fs.readFileSync(p, 'utf8');
    content = content.replace(/AetherCost/g, 'CostPilot');
    fs.writeFileSync(p, content);
    console.log('Updated', file);
  }
}

replaceAll('src/pages/Landing.tsx');
replaceAll('src/components/Layout.tsx');
