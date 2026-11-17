const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs');
(async () => {
  for (const n of fs.readdirSync('src/assets/hero')) {
    const m = await sharp('src/assets/hero/' + n).metadata();
    console.log(n, m.width, m.height);
    await sharp('src/assets/hero/' + n).resize({width:700,height:300,fit:'inside'}).toFile('.artifacts/' + n);
  }
  const p = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
  console.log(p.chromium.executablePath());
})();
