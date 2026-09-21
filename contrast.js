const hexToRgb = (hex) => {
  const bigint = parseInt(hex.replace('#', ''), 16);
  return [(bigint >> 16) & 255, (bigint >> 8) & 255, bigint & 255];
};

const luminance = (r, g, b) => {
  const a = [r, g, b].map((v) => {
    v /= 255;
    return v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
  });
  return a[0] * 0.2126 + a[1] * 0.7152 + a[2] * 0.0722;
};

const contrast = (hex1, hex2) => {
  const rgb1 = hexToRgb(hex1);
  const rgb2 = hexToRgb(hex2);
  const lum1 = luminance(rgb1[0], rgb1[1], rgb1[2]);
  const lum2 = luminance(rgb2[0], rgb2[1], rgb2[2]);
  const brightest = Math.max(lum1, lum2);
  const darkest = Math.min(lum1, lum2);
  return (brightest + 0.05) / (darkest + 0.05);
};

const pairs = [
  { name: 'Ink on Bg', c1: '#2B2B2B', c2: '#FBF8F3' },
  { name: 'Ink-soft on Bg', c1: '#545468', c2: '#FBF8F3' },
  { name: 'Ink-soft on Bg-alt', c1: '#545468', c2: '#F3ECE0' },
  { name: 'Orange-text on Bg', c1: '#D87906', c2: '#FBF8F3' },
  { name: 'Orange-text on Bg-alt', c1: '#D87906', c2: '#F3ECE0' },
  { name: 'Ink on Orange gradient start', c1: '#2B2B2B', c2: '#E6910F' },
  { name: 'Ink on Amber gradient end', c1: '#2B2B2B', c2: '#F7B01A' },
  { name: 'Ivory on Dark', c1: '#FBF8F3', c2: '#23262A' }
];

console.log('Contrast Report:');
pairs.forEach(p => {
  const ratio = contrast(p.c1, p.c2).toFixed(2);
  console.log(`${p.name} (${p.c1} on ${p.c2}): ${ratio}:1`);
});
