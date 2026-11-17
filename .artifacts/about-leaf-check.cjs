const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:1512,height:982},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,375,402,620,834,1024,1280,1512,1920]){
   await page.setViewportSize({width,height:982});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const result=await page.evaluate(()=>{
     const section=document.querySelector('#about');
     const copy=section.querySelector('p').parentElement.getBoundingClientRect();
     const orange=section.querySelector('img[src*="about-orange-leaf"]').getBoundingClientRect();
     const yellow=section.querySelector('img[src*="about-yellow-leaf"]').getBoundingClientRect();
     const overlap=r=>Math.min(copy.right,r.right)>Math.max(copy.left,r.left)&&Math.min(copy.bottom,r.bottom)>Math.max(copy.top,r.top);
     const collage=section.querySelector('[aria-label="Three photo placeholders from the design"]');
     const artwork=[...collage.children].filter(node=>node.getBoundingClientRect().width>0).map(node=>node.getBoundingClientRect());
     const fullMobileCollage=innerWidth>834||artwork.every(rect=>rect.left>=0&&rect.right<=innerWidth);
     return {width:innerWidth,orangeOverlap:overlap(orange),yellowOverlap:overlap(yellow),fullMobileCollage,clearance:innerWidth<=834?yellow.top-copy.bottom:orange.left-copy.right};
   });
   console.log(JSON.stringify(result));
   if(result.orangeOverlap||result.yellowOverlap||result.clearance<5||!result.fullMobileCollage)throw Error('Artwork is clipped or overlaps text');
   if([402,1512].includes(width)){
     await page.locator('#about').screenshot({path:'.artifacts/about-leaf-'+width+'.png'});
   }
 }
 await browser.close();
})();
