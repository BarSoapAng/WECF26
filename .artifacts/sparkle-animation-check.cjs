const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1512,height:982},reducedMotion:'no-preference'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 for(const width of [1512,402]){
   await page.setViewportSize({width,height:982});
   const sample=()=>page.evaluate(()=>[...document.querySelectorAll('img[src*="decorative-sparkle"]')].filter(el=>el.getBoundingClientRect().width>0).map(el=>({opacity:getComputedStyle(el).opacity,transform:getComputedStyle(el).transform,filter:getComputedStyle(el).filter,animation:getComputedStyle(el).animationName})));
   const before=await sample();
   await page.waitForTimeout(350);
   const after=await sample();
   const changed=JSON.stringify(before)!==JSON.stringify(after);
   console.log(JSON.stringify({width,visible:after.length,animated:after.every(x=>x.animation!=='none'),changed}));
   if(!after.length||!changed||after.some(x=>x.animation==='none'))throw Error('Sparkles are not animating');
 }
 await page.emulateMedia({reducedMotion:'reduce'});
 const count=await page.evaluate(()=>document.getAnimations().length);
 console.log('reduced motion animations',count);
 if(count!==0)throw Error('Reduced motion ignored');
 await browser.close();
})();
