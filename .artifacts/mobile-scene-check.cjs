const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:375,height:812},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,360,375,390,402,430,620,834,1512]){
   await page.setViewportSize({width,height:812});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const result=await page.evaluate(()=>{
     const hero=document.querySelector('#home').getBoundingClientRect();
     const goose=document.querySelector('img[src*="hero-hero-goose"]').getBoundingClientRect();
     const title=document.querySelector('#home h1').getBoundingClientRect();
     const visibleLeft=goose.left+goose.width*22/970;
     const visibleRight=goose.left+goose.width*853/970;
     const visibleBottom=goose.top+goose.height*1147/1364;
     return {width:innerWidth,heroHeight:hero.height,gooseLeft:visibleLeft,gooseRight:visibleRight,gooseBottom:visibleBottom,titleLeft:title.left,titleRight:title.right,overflow:document.documentElement.scrollWidth>innerWidth,fullGoose:visibleLeft>=hero.left&&visibleRight<=hero.right&&visibleBottom<=hero.bottom};
   });
   console.log(JSON.stringify(result));
   if(width<=834&&!result.fullGoose)throw Error('Goose is clipped');
   if(result.overflow)throw Error('Horizontal overflow');
   if([320,375,430,834].includes(width))await page.locator('#home').screenshot({path:'.artifacts/mobile-scene-'+width+'.png'});
 }
 await page.setViewportSize({width:375,height:812});
 await page.getByRole('button',{name:'Open navigation'}).click();
 if(!await page.getByRole('navigation',{name:'Mobile navigation'}).isVisible())throw Error('Menu failed');
 await page.getByRole('navigation',{name:'Mobile navigation'}).getByRole('link',{name:'About',exact:true}).click();
 console.log('mobile menu and About anchor passed');
 await browser.close();
})();
