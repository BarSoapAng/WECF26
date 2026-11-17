const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs/promises');
(async () => {
  // Keep the source artwork; only compress the existing delivery copies.
  const jobs = [
    ['hero/sky.png', 'optimized/hero-sky.webp'],
    ['hero/fire.png', 'optimized/hero-fire.webp'],
    ['hero/floor.png', 'optimized/hero-floor.webp'],
    ['hero/leaf-and-stump.png', 'optimized/hero-leaf-and-stump.webp'],
    ['FAQ/faq-leaf-orange.webp', 'FAQ/faq-leaf-orange.webp', 600],
    ['FAQ/faq-yellow-leaf.webp', 'FAQ/faq-yellow-leaf.webp', 600],
  ];
  for (const [source, target, width] of jobs) {
    const path = 'src/assets/' + target;
    const before = await sharp(await fs.readFile(path)).metadata();
    const original = await fs.readFile('src/assets/' + source);
    const output = await sharp(original).resize({ width: width || before.width, withoutEnlargement: true }).webp({ quality: 86, alphaQuality: 100, effort: 6 }).toBuffer();
    await fs.writeFile(path, output);
    console.log(target, original.length, '->', output.length);
  }
})();
