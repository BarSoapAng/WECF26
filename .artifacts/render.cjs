const { chromium } = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async () => {
  const browser = await chromium.launch({headless:true, channel:'msedge'});
  const page = await browser.newPage({viewport:{width:1512,height:982},deviceScaleFactor:1,reducedMotion:'reduce'});
  const errors=[];
  page.on('pageerror',e=>errors.push(e.message));
  await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
  await page.evaluate(()=>document.fonts.ready);
  console.log('text geometry', await page.locator('h1,h2,header').evaluateAll(nodes=>nodes.map(n=>({text:n.textContent,rect:JSON.stringify(n.getBoundingClientRect()),font:getComputedStyle(n).font,lineHeight:getComputedStyle(n).lineHeight}))));
  await page.screenshot({path:'.artifacts/browser-desktop.png',fullPage:true});
  console.log(JSON.stringify({errors,fonts:await page.evaluate(()=>[document.fonts.check('20px "Host Grotesk"'),document.fonts.check('48px Morfe')]),images:await page.locator('img').evaluateAll(imgs=>imgs.map(i=>({src:i.getAttribute('src'),loaded:i.complete&&i.naturalWidth>0,x:i.getBoundingClientRect().x,y:i.getBoundingClientRect().y,w:i.getBoundingClientRect().width,h:i.getBoundingClientRect().height})))}));
  await page.setViewportSize({width:402,height:874});
  await page.getByRole('button',{name:'Open navigation'}).click();
  console.log('mobile menu',await page.locator('#mobile-navigation').isVisible());
  await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'About',exact:true}).click();
  console.log('about anchor',await page.evaluate(()=>location.hash));
  await page.evaluate(()=>{location.hash='';window.scrollTo(0,0)});
  await page.screenshot({path:'.artifacts/browser-mobile.png',fullPage:true});
  console.log('mobile overflow',await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth));
  const responsive=[];
  for(const width of [375,620,834,1024,1280,1512]) {
    await page.setViewportSize({width,height:982});
    await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
    responsive.push(await page.evaluate(()=>({width:innerWidth,overflow:document.documentElement.scrollWidth>innerWidth,about:document.querySelector('#about').getBoundingClientRect().height,bodyText:document.querySelector('#about p').getBoundingClientRect().width})));
  }
  console.log('responsive',JSON.stringify(responsive));
  await browser.close();
  await sharp('.artifacts/browser-desktop.png').resize({width:900}).toFile('.artifacts/browser-preview.png');
})();
