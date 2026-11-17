const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:402,height:874},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [375,402,1512]){
   await page.setViewportSize({width,height:874});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   console.log(await page.evaluate(()=>{const title=document.querySelector('#home h1');const date=[...document.querySelectorAll('#home p')].find(el=>el.textContent==='FALL 2026');return {width:innerWidth,titleColor:getComputedStyle(title).color,dateColor:getComputedStyle(date).color,gap:date.getBoundingClientRect().top-title.getBoundingClientRect().bottom,overflow:document.documentElement.scrollWidth>innerWidth};}));
   if(width===402)await page.screenshot({path:'.artifacts/mobile-heading-fixed.png'});
 }
 await browser.close();
})();
