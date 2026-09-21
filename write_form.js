const fs = require('fs');
const data = JSON.parse(fs.readFileSync('form.json', 'utf8'));
const content = data.files[0].content.split('@/registry/new-york/ui/label').join('@/components/ui/label');
fs.writeFileSync('src/components/ui/form.tsx', content);
console.log('form.tsx written');
