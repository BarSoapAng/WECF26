const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  try {
    for (const port of [4173, 5175]) for (const width of [1512, 402]) {
      const page = await browser.newPage({ viewport: { width, height: 874 } });
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      const cdp = await page.context().newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 100, downloadThroughput: 625000, uploadThroughput: 312500 });
      let release; const hold = new Promise(resolve => { release = resolve; });
      await page.route(port === 4173 ? '**/index-*.js' : '**/src/main.tsx', async route => { await hold; await route.continue(); });
      await page.goto(`http://127.0.0.1:${port}/`, { waitUntil: 'commit' });
      await page.waitForFunction(() => document.querySelector('.page-loader-leaf')?.naturalWidth === 128);
      assert.equal(await page.locator('#home').count(), 0, 'React is still blocked');
      const caption = page.getByText('Getting the forest ready…', { exact: true });
      assert(await caption.isVisible());
      const captionStyle = await caption.evaluate(n => ({ font: getComputedStyle(n).fontFamily, color: getComputedStyle(n).color, size: getComputedStyle(n).fontSize }));
      assert.equal(captionStyle.color, 'rgb(243, 233, 255)');
      assert(captionStyle.font.includes('Host Grotesk'));
      assert.equal(captionStyle.size, width === 402 ? '18px' : '22px');
      assert(await page.locator('progress').isVisible());
      assert.equal(await page.locator('progress').evaluate(n => n.value), 0);
      assert.equal(await page.locator('progress').evaluate(n => n.getBoundingClientRect().height), 9);
      await page.screenshot({ path: `.artifacts/static-loader-${port}-${width}.png` });
      release();
      await page.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
      await page.waitForSelector('#faq');
      assert.equal(await page.locator('#loader-copy p').count(), 1, 'no duplicated caption');
      assert.equal(await page.locator('progress').evaluate(n => n.value), 100);
      const question = page.getByRole('button', { name: 'Who can join WEC?' });
      assert.equal(await question.getAttribute('aria-expanded'), 'false');
      const panelId = await question.getAttribute('aria-controls');
      assert.equal(await page.locator(`[id="${panelId}"]`).getAttribute('aria-hidden'), 'true');
      await question.click();
      assert.equal(await question.getAttribute('aria-expanded'), 'true');
      assert.deepEqual(errors, []);
      console.log(JSON.stringify({ port, width, captionAndBarVisibleBeforeReact: true, progressCompletes: true, faqInitiallyClosed: true, faqOpensOnClick: true, errors }));
      await page.close();
    }
  } finally { await browser.close(); }
})();
