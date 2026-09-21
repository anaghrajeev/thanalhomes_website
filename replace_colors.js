const fs = require('fs');
const path = require('path');

const directoryPath = path.join(__dirname, 'src');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(path.join(dir, f));
    });
}

const replacements = [
    // Colors
    { regex: /text-forest/g, replace: "text-ink" },
    { regex: /bg-forest/g, replace: "bg-dark" }, // Will adjust specific sections manually later
    { regex: /border-forest/g, replace: "border-dark" },
    { regex: /from-forest/g, replace: "from-dark" },
    { regex: /to-forest/g, replace: "to-dark" },
    { regex: /via-forest/g, replace: "via-dark" },
    
    { regex: /text-gold-500/g, replace: "text-brand-orange" },
    { regex: /bg-gold-500/g, replace: "bg-brand-orange" },
    { regex: /border-gold-500/g, replace: "border-brand-orange" },
    { regex: /from-gold-500/g, replace: "from-brand-orange" },
    { regex: /to-gold-500/g, replace: "to-brand-amber" },
    
    { regex: /text-gold-400/g, replace: "text-brand-amber" },
    { regex: /bg-gold-400/g, replace: "bg-brand-amber" },
    { regex: /border-gold-400/g, replace: "border-brand-amber" },
    
    { regex: /text-ivory/g, replace: "text-bg" },
    { regex: /bg-ivory/g, replace: "bg-bg" },
    { regex: /border-ivory/g, replace: "border-bg" },
    { regex: /from-ivory/g, replace: "from-bg" },
    
    { regex: /text-sand/g, replace: "text-bg-alt" },
    { regex: /bg-sand/g, replace: "bg-bg-alt" },
    { regex: /border-sand/g, replace: "border-bg-alt" },
    
    { regex: /bg-brand-green/g, replace: "bg-brand-green" }, // Already mapped
    
    // Hex codes
    { regex: /#E8A317/gi, replace: "var(--brand-orange)" },
    { regex: /#F2B84B/gi, replace: "var(--brand-amber)" },
    { regex: /#0F3D2E/gi, replace: "var(--dark)" },
    
    // Specific shadow rgba
    { regex: /rgba\(14,40,25,0\.08\)/gi, replace: "rgba(35,38,42,0.08)" },
    { regex: /rgba\(14,40,25,0\.14\)/gi, replace: "rgba(35,38,42,0.14)" }
];

let filesChanged = 0;

walkDir(directoryPath, function(filePath) {
    if (filePath.endsWith('.tsx') || filePath.endsWith('.ts') || filePath.endsWith('.css')) {
        let content = fs.readFileSync(filePath, 'utf8');
        let newContent = content;
        
        replacements.forEach(r => {
            newContent = newContent.replace(r.regex, r.replace);
        });
        
        if (content !== newContent) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated ${filePath}`);
            filesChanged++;
        }
    }
});

console.log(`Total files updated: ${filesChanged}`);
