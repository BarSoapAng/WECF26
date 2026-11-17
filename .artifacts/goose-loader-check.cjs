const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const url = 'http://127.0.0.1:4173/';
(async () => {
  // Verify that the small delivery image is exactly the existing artwork resized.
  const expected = await sharp('src/assets/optimized/hero-orange-leaf-hero.webp').resize({ width: 128 }).webp({ lossless: true, effort: 6 }).toBuffer();
  const actual = fs.readFileSync('src/assets/optimized/loader-leaf.webp');
  assert(expected.equals(actual));
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  try {
    for (const width of [1512, 402]) {
      const page = await browser.newPage({ viewport: { width, height: 874 } });
      const errors = []; page.on('pageerror', e => errors.push(e.message));
      let release; const hold = new Promise(resolve => { release = resolve; });
      await page.route('**/hero-fire-*.webp', async route => { await hold; await route.continue(); });
      await page.goto(url, { waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.querySelector('progress')?.value > 0 && document.fonts.status === 'loaded');
      const loader = page.locator('#page-loader');
      assert(await loader.isVisible());
      assert.equal(await page.locator('#root').evaluate(n => getComputedStyle(n).visibility), 'hidden');
      const progress = await page.locator('progress').evaluate(n => n.value);
      assert(progress > 0 && progress < 100);
      assert.equal(await loader.evaluate(n => getComputedStyle(n).backgroundColor), 'rgb(77, 19, 13)');
      assert.equal(await loader.evaluate(n => getComputedStyle(n).transitionDuration), '0.36s, 0s');
      const before = await page.locator('.page-loader-leaf').evaluate(n => getComputedStyle(n).transform);
      await page.waitForTimeout(200);
      const after = await page.locator('.page-loader-leaf').evaluate(n => getComputedStyle(n).transform);
      assert.notEqual(before, after);
      assert.equal(await page.locator('.page-loader-leaf').evaluate(n => n.complete && n.naturalWidth === 128), true);
      assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false);
      await page.screenshot({ path: `.artifacts/leaf-loader-${width}.png` });
      release();
      await page.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
      await page.waitForFunction(() => getComputedStyle(document.querySelector('#page-loader')).visibility === 'hidden');
      assert.equal(await page.locator('progress').evaluate(n => n.value), 100);
      await page.waitForSelector('#venue');
      await page.waitForLoadState('networkidle');
      await page.evaluate(() => { history.replaceState(null, '', '/#faq'); scrollTo({ top: 3000, behavior: 'instant' }); });
      await page.reload({ waitUntil: 'domcontentloaded' });
      await page.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
      assert.equal(await page.evaluate(() => scrollY), 0);
      assert.equal(await page.evaluate(() => location.hash), '');
      assert.deepEqual(errors, []);
      results.push({ width, animated: true, progressWhileHeld: progress, completesAt100: true, reloadAtTop: true, errors });
      await page.close();
    }
    const early = await browser.newPage({ viewport: { width: 402, height: 874 }, reducedMotion: 'reduce' });
    let releaseJs; const jsHold = new Promise(resolve => { releaseJs = resolve; });
    await early.route('**/index-*.js', async route => { await jsHold; await route.continue(); });
    await early.goto(url, { waitUntil: 'commit' });
    await early.waitForFunction(() => document.querySelector('.page-loader-leaf')?.naturalWidth === 128);
    assert.equal(await early.locator('#home').count(), 0);
    assert(await early.locator('#page-loader').isVisible());
    const leafTop = await early.locator('.page-loader-leaf').evaluate(n => n.getBoundingClientRect().top);
    assert.equal(await early.locator('.page-loader-leaf').evaluate(n => getComputedStyle(n).animationName), 'none');
    await early.screenshot({ path: '.artifacts/leaf-loader-before-react.png' });
    releaseJs();
    await early.waitForSelector('#loader-copy p');
    const withTextTop = await early.locator('.page-loader-leaf').evaluate(n => n.getBoundingClientRect().top);
    assert(Math.abs(leafTop - withTextTop) < 1, 'loader image does not shift when copy mounts');
    await early.waitForFunction(() => document.documentElement.dataset.pageReady === 'true');
    results.push({ existingArtworkExactResize: true, visibleBeforeReact: true, noCopyLayoutShift: true, reducedMotion: true });
    fs.writeFileSync('.artifacts/leaf-loader-results.json', JSON.stringify(results, null, 2));
    console.log(JSON.stringify(results, null, 2));
  } finally { await browser.close(); }
})();
