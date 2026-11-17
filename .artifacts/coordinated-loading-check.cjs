const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const url = 'http://127.0.0.1:4173/';
const ready = page => page.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  try {
    for (const width of [1512, 402]) {
      const context = await browser.newContext({ viewport: { width, height: 874 } });
      const page = await context.newPage();
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      const cdp = await context.newCDPSession(page);
      await cdp.send('Network.enable');
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
      await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 80, downloadThroughput: 1250000, uploadThroughput: 625000 });
      await page.addInitScript(() => {
        window.loadFrames = [];
        const sample = () => {
          const root = document.getElementById('root');
          if (root) window.loadFrames.push({ time: performance.now(), visible: getComputedStyle(root).visibility, ready: document.documentElement.dataset.pageReady === 'true', missing: [...document.images].filter(i => !i.complete || !i.naturalWidth).length, fonts: document.fonts.status, y: scrollY });
          if (!document.documentElement.dataset.pageReady) requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await ready(page);
      await page.waitForFunction(() => getComputedStyle(document.documentElement, '::after').opacity === '0');
      const state = await page.evaluate(() => ({ frames: window.loadFrames, fonts: document.fonts.status, missing: [...document.images].filter(i => !i.complete || !i.naturalWidth).map(i => i.src), y: scrollY, overflow: document.documentElement.scrollWidth > innerWidth, cover: getComputedStyle(document.documentElement, '::after').opacity, inert: document.getElementById('root').inert }));
      assert.deepEqual(state.missing, []);
      assert.equal(state.fonts, 'loaded');
      assert.equal(state.inert, false);
      assert.equal(state.cover, '0');
      assert.equal(state.y, 0);
      assert.equal(state.overflow, false);
      assert(state.frames.every(f => f.visible === 'hidden' || (f.ready && !f.missing && f.fonts === 'loaded')));
      await page.screenshot({ path: `.artifacts/coordinated-ready-${width}.png`, fullPage: true });
      const missingOnScroll = await page.evaluate(async () => {
        const missing = new Set();
        for (let y = 0; y < document.documentElement.scrollHeight; y += 600) {
          scrollTo({ top: y, behavior: 'instant' }); await new Promise(requestAnimationFrame);
          for (const i of document.images) { const r = i.getBoundingClientRect(); if (r.top < innerHeight && r.bottom > 0 && r.width && (!i.complete || !i.naturalWidth)) missing.add(i.src); }
        }
        return [...missing];
      });
      assert.deepEqual(missingOnScroll, []);
      await cdp.send('Network.setCacheDisabled', { cacheDisabled: false });
      for (const hash of ['', '#faq']) {
        await page.evaluate(hash => { history.replaceState(null, '', '/' + hash); scrollTo({ top: 3000, behavior: 'instant' }); }, hash);
        await page.reload({ waitUntil: 'domcontentloaded' }); await ready(page);
        assert.equal(await page.evaluate(() => scrollY), 0);
        assert.equal(await page.evaluate(() => location.hash), '');
      }
      const reloadFrames = await page.evaluate(() => window.loadFrames);
      assert(reloadFrames.every(f => f.visible === 'hidden' || f.y === 0));
      if (width === 402) {
        await page.getByRole('button', { name: 'Open navigation' }).click();
        await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ', exact: true }).click();
        assert.equal(await page.evaluate(() => location.hash), '#faq');
      }
      assert.deepEqual(errors, []);
      results.push({ width, revealMs: state.frames.find(f => f.ready)?.time, visibleIncompleteFrames: state.frames.filter(f => f.visible !== 'hidden' && f.missing).length, missingOnScroll, reloadAtTop: true, errors });
      await context.close();
    }
    for (const pattern of ['**/hero-fire-*.webp', '**/faq-footer-floor-*.webp']) {
      const page = await browser.newPage({ viewport: { width: 402, height: 874 } });
      let release;
      const hold = new Promise(resolve => { release = resolve; });
      await page.route(pattern, async route => { await hold; await route.continue(); });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForSelector('#home', { state: 'attached' });
      await page.waitForTimeout(3300);
      assert.equal(await page.locator('#root').evaluate(n => getComputedStyle(n).visibility), 'hidden');
      assert.equal(await page.evaluate(() => getComputedStyle(document.documentElement, '::after').backgroundColor), 'rgb(23, 18, 21)');
      assert.equal(await page.evaluate(() => getComputedStyle(document.querySelector('#home img:nth-child(5)')).animationPlayState), 'paused');
      await page.screenshot({ path: `.artifacts/coordinated-held-${pattern.includes('fire') ? 'hero' : 'background'}.png` });
      release(); await ready(page);
      results.push({ heldAsset: pattern, stayedCoveredPastOldTimeout: true });
      await page.close();
    }
    const failed = await browser.newPage({ reducedMotion: 'reduce' });
    await failed.route('**/hero-fire-*.webp', route => route.abort());
    await failed.goto(url, { waitUntil: 'domcontentloaded' }); await ready(failed);
    assert.equal(await failed.locator('#home img[src*="hero-fire-"]').evaluate(n => getComputedStyle(n).visibility), 'hidden');
    assert.equal(await failed.evaluate(() => getComputedStyle(document.documentElement, '::after').transitionDuration), '0s');
    results.push({ failedImageDoesNotBlock: true, reducedMotion: true });
    await failed.close();
    fs.writeFileSync('.artifacts/coordinated-loading-results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})();
