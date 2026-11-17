const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const url = 'http://127.0.0.1:4173/';
const ready = p => p.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  try {
    for (const viewport of [{ width: 1512, height: 874 }, { width: 402, height: 874 }, { width: 1280, height: 982 }, { width: 1512, height: 1300 }]) {
      const context = await browser.newContext({ viewport });
      const page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 80, downloadThroughput: 1250000, uploadThroughput: 625000 });
      await page.addInitScript(() => {
        new MutationObserver(() => {
          if (document.documentElement.dataset.pageReady && !window.revealAudit) {
            window.revealAudit = { at: performance.now(), fonts: document.fonts.status, missing: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src), about: !!document.querySelector('#about'), mainBottom: document.querySelector('main').getBoundingClientRect().bottom, y: scrollY };
          }
        }).observe(document, { subtree: true, attributes: true, attributeFilter: ['data-page-ready'] });
      });
      await page.goto(url, { waitUntil: 'domcontentloaded' }); await ready(page);
      await page.waitForSelector('#venue');
      const reveal = await page.evaluate(() => window.revealAudit);
      assert.equal(reveal.fonts, 'loaded'); assert.deepEqual(reveal.missing, []);
      assert(reveal.mainBottom >= viewport.height, 'first screen is filled');
      assert.equal(reveal.y, 0);
      assert.equal(reveal.about, viewport.height > 982 || viewport.width === 1280);
      await page.screenshot({ path: `.artifacts/first-screen-${viewport.width}-${viewport.height}.png` });
      await page.waitForLoadState('networkidle');
      const background = await page.evaluate(() => performance.getEntriesByType('resource').find(r => r.name.includes('faq-footer-floor-'))?.startTime);
      assert(background >= reveal.at, 'below-fold background starts after reveal');
      const missing = await page.evaluate(async () => {
        const missing = new Set();
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          scrollTo({ top: y, behavior: 'instant' }); await new Promise(requestAnimationFrame);
          for (const i of document.images) { const r = i.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0 && r.width && (!i.complete || !i.naturalWidth)) missing.add(i.src); }
        }
        return [...missing];
      });
      assert.deepEqual(missing, []);
      await page.evaluate(() => history.replaceState(null, '', '/#faq'));
      await page.reload({ waitUntil: 'domcontentloaded' }); await ready(page);
      assert.equal(await page.evaluate(() => scrollY), 0);
      assert.equal(await page.evaluate(() => location.hash), '');
      assert.deepEqual(errors, []);
      results.push({ ...viewport, revealMs: Math.round(reveal.at), belowFoldBackgroundStartsMs: Math.round(background), firstScreenComplete: true, includesAbout: reveal.about, missingOnScroll: missing.length, reloadAtTop: true, errors });
      await context.close();
    }
    const page = await browser.newPage({ viewport: { width: 402, height: 874 } });
    let release; const hold = new Promise(resolve => { release = resolve; });
    await page.route('**/faq-footer-floor-*.webp', async route => { await hold; await route.continue(); });
    await page.goto(url, { waitUntil: 'domcontentloaded' }); await ready(page);
    await page.waitForSelector('#venue');
    assert.equal(await page.locator('#root').evaluate(n => getComputedStyle(n).visibility), 'visible');
    await page.getByRole('button', { name: 'Open navigation' }).click();
    await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ', exact: true }).click();
    assert.equal(await page.evaluate(() => location.hash), '#faq');
    release(); await page.waitForLoadState('networkidle');
    results.push({ stalledLowerBackgroundDoesNotBlockFirstScreen: true, mobileNavigationWorks: true });
    await page.close();
    fs.writeFileSync('.artifacts/first-screen-results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})();
