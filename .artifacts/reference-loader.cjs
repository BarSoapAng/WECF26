const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    const cdp = await page.context().newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 100, downloadThroughput: 625000, uploadThroughput: 312500 });
    const js = [];
    page.on('response', async r => {
      if (r.url().endsWith('.js') && new URL(r.url()).hostname === 'hackcanada.org') {
        try { const code = await r.text(); js.push({ url: r.url(), code }); } catch {}
      }
    });
    const response = await page.goto('https://hackcanada.org/', { waitUntil: 'domcontentloaded', timeout: 60000 });
    fs.writeFileSync('.artifacts/hackcanada-reference.html', await response.text());
    for (const n of [0, 1, 2, 3, 4]) {
      if (n) await page.waitForTimeout(800);
      await page.screenshot({ path: `.artifacts/hackcanada-loader-${n}.png` });
      console.log(JSON.stringify({ frame: n, text: (await page.locator('body').innerText()).slice(0, 260), overlays: await page.locator('body *').evaluateAll(nodes => nodes.filter(n => getComputedStyle(n).position === 'fixed').slice(0, 8).map(n => ({ tag: n.tagName, class: n.className, text: n.textContent.slice(0, 160) }))) }));
    }
    await page.waitForTimeout(3000);
    fs.writeFileSync('.artifacts/hackcanada-reference-scripts.json', JSON.stringify(js));
    console.log('scripts', js.map(s => ({ url: s.url, bytes: s.code.length })));
  } finally { await browser.close(); }
})();
