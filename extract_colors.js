const Jimp = require("jimp");

async function extractColors() {
    try {
        const image = await Jimp.read("public/logo.png");
        const colorCounts = {};

        image.scan(0, 0, image.bitmap.width, image.bitmap.height, function (x, y, idx) {
            const r = this.bitmap.data[idx + 0];
            const g = this.bitmap.data[idx + 1];
            const b = this.bitmap.data[idx + 2];
            const a = this.bitmap.data[idx + 3];

            // Ignore transparent
            if (a < 200) return;

            // Ignore white/near-white
            if (r > 240 && g > 240 && b > 240) return;
            
            // Basic quantization by rounding to nearest 10 to group similar colors
            const qR = Math.round(r / 10) * 10;
            const qG = Math.round(g / 10) * 10;
            const qB = Math.round(b / 10) * 10;
            
            const key = `${qR},${qG},${qB}`;
            if (!colorCounts[key]) {
                colorCounts[key] = { r: qR, g: qG, b: qB, count: 0, originalR: r, originalG: g, originalB: b };
            }
            colorCounts[key].count++;
        });

        const sortedColors = Object.values(colorCounts).sort((a, b) => b.count - a.count);

        console.log("Extracted Dominant Colors:");
        sortedColors.slice(0, 20).forEach((c, i) => {
            const hex = "#" + ((1 << 24) + (c.originalR << 16) + (c.originalG << 8) + c.originalB).toString(16).slice(1).toUpperCase();
            console.log(`Rank ${i + 1}: ${hex} (Count: ${c.count}) - RGB(${c.originalR}, ${c.originalG}, ${c.originalB})`);
        });

    } catch (err) {
        console.error("Error extracting colors:", err);
    }
}

extractColors();
