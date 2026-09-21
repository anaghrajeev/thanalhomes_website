const Jimp = require('jimp');

async function generateIcons() {
    try {
        const image = await Jimp.read('public/logo.png');
        
        // Assume the T mark is on the left and roughly square
        const size = Math.min(image.bitmap.width, image.bitmap.height);
        
        const mark = image.clone().crop(0, 0, size, size);

        // icon 512
        await mark.clone().resize(512, 512).writeAsync('public/icon-512.png');
        
        // apple touch icon
        await mark.clone().resize(180, 180).background(0xFFFFFFFF).writeAsync('public/apple-touch-icon.png');
        
        // favicon.ico (just save as png rename to ico for simplicity, or 32x32 png)
        await mark.clone().resize(32, 32).writeAsync('public/favicon.ico');

        console.log('Icons generated successfully.');
    } catch (err) {
        console.error('Error generating icons:', err);
    }
}

generateIcons();
