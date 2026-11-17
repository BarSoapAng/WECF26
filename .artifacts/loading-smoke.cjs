const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const assert = require('node:assert/strict');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const page = await browser.newPage({ viewport: { width: 402, height: 874 }, reducedMotion: 'reduce' });
  const errors = []; page.on('pageerror', e => errors.push(e.message));
  await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
  await page.getByRole('button', { name: 'Open navigation' }).click();
  assert(await page.locator('#mobile-navigation').isVisible());
  await page.getByRole('navigation', { name: 'Mobile navigation' }).getByRole('link', { name: 'FAQ', exact: true }).click();
  const question = page.getByRole('button', { name: 'Who can join WEC?' });
  assert.equal(await question.getAttribute('aria-expanded'), 'true');
  await question.click(); assert.equal(await question.getAttribute('aria-expanded'), 'false');
  for (const width of [320, 402, 834, 1280, 1512, 1920]) {
    await page.setViewportSize({ width, height: 874 });
    await page.evaluate(() => new Promise(resolve => requestAnimationFrame(() => requestAnimationFrame(resolve))));
    assert.equal(await page.evaluate(() => document.documentElement.scrollWidth > innerWidth), false, `overflow at ${width}`);
  }
  await page.evaluate(() => history.replaceState(null, '', '/'));
  for (const top of [0, 500]) {
    await page.evaluate(top => window.scrollTo({ top, behavior: 'instant' }), top);
    await page.reload({ waitUntil: 'networkidle' });
    console.log('reload', top, await page.evaluate(() => ({ y: scrollY, hash: location.hash, zoom: getComputedStyle(document.querySelector('main')).zoom })));
    assert(Math.abs(await page.evaluate(() => scrollY) - top) <= 1, 'reload scroll restoration');
  }
  const stalled = await browser.newPage();
  await stalled.route('**/hero-fire-*.webp', async route => {
    await new Promise(resolve => setTimeout(resolve, 4500));
    await route.abort();
  });
  await stalled.goto('http://127.0.0.1:4173/', { waitUntil: 'domcontentloaded' });
  await stalled.waitForSelector('#home');
  assert.equal(await stalled.locator('#home > div').first().evaluate(n => getComputedStyle(n).visibility), 'hidden');
  await stalled.waitForFunction(() => getComputedStyle(document.querySelector('#home > div')).visibility === 'visible', undefined, { timeout: 5000 });
  assert(await stalled.locator('#home a').first().isVisible());
  await stalled.waitForTimeout(1600);
  assert.deepEqual(errors, []);
  await browser.close();
  for (const width of [1512, 402]) {
    const images = await Promise.all(['before', 'after'].map(stage => sharp(`.artifacts/loading-${stage}-${width}.png`).resize({ width: 480 }).png().toBuffer()));
    const height = Math.max(...await Promise.all(images.map(async b => (await sharp(b).metadata()).height)));
    await sharp({ create: { width: 960, height, channels: 3, background: '#ffffff' } }).composite(images.map((input, i) => ({ input, left: i * 480, top: 0 }))).png().toFile(`.artifacts/loading-comparison-${width}.png`);
  }
  console.log('Passed: navigation, FAQ, six responsive widths, reload scroll restoration, stalled-image fail-open, no runtime errors.');
})();
