const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs = require('node:fs');
(async () => {
  const browser = await chromium.launch({ headless: true, channel: 'msedge' });
  const results = [];
  for (const width of [1512, 402]) {
    const context = await browser.newContext({ viewport: { width, height: 874 } });
    const page = await context.newPage();
    const errors = [];
    page.on('pageerror', e => errors.push(e.message));
    const cdp = await context.newCDPSession(page);
    await cdp.send('Network.enable');
    await cdp.send('Network.setCacheDisabled', { cacheDisabled: true });
    await cdp.send('Network.emulateNetworkConditions', { offline: false, latency: 80, downloadThroughput: 1250000, uploadThroughput: 625000 });
    await page.addInitScript(() => {
      window.audit = { frames: [], cls: 0, lcp: 0 };
      new PerformanceObserver(list => { for (const e of list.getEntries()) if (!e.hadRecentInput) window.audit.cls += e.value; }).observe({ type: 'layout-shift', buffered: true });
      new PerformanceObserver(list => { window.audit.lcp = list.getEntries().at(-1).startTime; }).observe({ type: 'largest-contentful-paint', buffered: true });
      const sample = () => {
        const hero = document.querySelector('#home');
        if (hero) {
          const imgs = [...hero.querySelectorAll('img')].filter(i => getComputedStyle(i).display !== 'none');
          window.audit.frames.push({ t: performance.now(), visible: getComputedStyle(hero.firstElementChild).visibility, fonts: document.fonts.check('48px Morfe') && document.fonts.check('20px "Host Grotesk"'), missing: imgs.filter(i => !i.complete || !i.naturalWidth).length });
        }
        if (performance.now() < 15000) requestAnimationFrame(sample);
      };
      requestAnimationFrame(sample);
    });
    await page.goto('http://127.0.0.1:4173/', { waitUntil: 'networkidle' });
    await page.evaluate(() => document.fonts.ready);
    const initial = await page.evaluate(() => ({ ...window.audit, resources: performance.getEntriesByType('resource').map(r => ({ name: r.name.split('/').pop(), bytes: r.decodedBodySize, start: r.startTime, end: r.responseEnd })), lazy: [...document.images].filter(i => i.loading === 'lazy' && !i.complete).map(i => i.src.split('/').pop()) }));
    const scroll = await page.evaluate(async () => {
      const missing = new Set(); const times = []; let last = performance.now();
      for (let y = 0; y < document.documentElement.scrollHeight; y += 550) {
        window.scrollTo({ top: y, behavior: 'instant' });
        await new Promise(requestAnimationFrame);
        const now = performance.now(); times.push(now - last); last = now;
        for (const i of document.images) { const r = i.getBoundingClientRect(); if (r.bottom > 0 && r.top < innerHeight && r.width && (!i.complete || !i.naturalWidth)) missing.add(i.src.split('/').pop()); }
      }
      return { missing: [...missing], maxFrame: Math.max(...times), medianFrame: times.sort((a,b) => a-b)[Math.floor(times.length / 2)] };
    });
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: 'instant' }));
    await page.screenshot({ path: `.artifacts/loading-${process.argv[2]}-${width}.png`, fullPage: true });
    results.push({ width, firstFrame: initial.frames[0], firstReady: initial.frames.find(f => f.fonts && !f.missing), incompleteVisibleFrames: initial.frames.filter(f => f.visible !== 'hidden' && (!f.fonts || f.missing)).length, cls: initial.cls, lcp: initial.lcp, bytes: initial.resources.reduce((n,r) => n+r.bytes,0), resources: initial.resources, lazy: initial.lazy, scroll, errors });
    await context.close();
  }
  fs.writeFileSync(`.artifacts/loading-${process.argv[2]}.json`, JSON.stringify(results, null, 2));
  console.log(JSON.stringify(results.map(({ resources, ...rest }) => rest), null, 2));
  await browser.close();
})();
