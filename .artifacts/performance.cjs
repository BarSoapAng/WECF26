const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const fs=require('node:fs');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1280,height:800},deviceScaleFactor:1});
 const errors=[];page.on('pageerror',e=>errors.push(e.message));
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 const result=await page.evaluate(()=>({
   zoom:getComputedStyle(document.querySelector('main')).zoom,
   heroHeight:document.querySelector('#home').getBoundingClientRect().height,
   canvasWidth:document.querySelector('main').getBoundingClientRect().width,
   images:performance.getEntriesByType('resource').filter(r=>r.initiatorType==='img').map(r=>({url:r.name.split('/').pop(),bytes:r.decodedBodySize})),
   animations:document.getAnimations().length,
   load:performance.getEntriesByType('navigation')[0].loadEventEnd,
   resources:performance.getEntriesByType('resource').filter(r=>r.name.includes('fonts.')).map(r=>r.name)
 }));
 await page.screenshot({path:'.artifacts/browser-1280.png',fullPage:true});
 const frameTimes=await page.evaluate(async()=>{
   const times=[];let last=performance.now();
   for(let i=0;i<60;i++){await new Promise(requestAnimationFrame);const now=performance.now();times.push(now-last);last=now;scrollTo(0,i*18);}
   return {median:times.sort((a,b)=>a-b)[30],max:Math.max(...times)};
 });
 const widths=[];
 for(const width of [375,834,1024,1280,1512,1920]){
   await page.setViewportSize({width,height:982});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   widths.push(await page.evaluate(()=>({width:innerWidth,zoom:getComputedStyle(document.querySelector('main')).zoom,heroHeight:document.querySelector('#home').getBoundingClientRect().height,overflow:document.documentElement.scrollWidth>innerWidth})));
   if(width===1920)await page.screenshot({path:'.artifacts/browser-1920.png',fullPage:true});
 }
 console.log(JSON.stringify({result,frameTimes,widths,errors},null,2));
 fs.writeFileSync('.artifacts/performance.json',JSON.stringify({result,frameTimes,widths,errors},null,2));
 await browser.close();
})();
