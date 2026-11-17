const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:375,height:812},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 for(const width of [320,360,375,390,393,402,414,430,620,834]){
   await page.setViewportSize({width,height:812});
   await page.evaluate(()=>new Promise(resolve=>requestAnimationFrame(()=>requestAnimationFrame(resolve))));
   const result=await page.evaluate(()=>{
     const hero=document.querySelector('#home').getBoundingClientRect();
     const goose=document.querySelector('img[src*="hero-hero-goose"]').getBoundingClientRect();
     const date=[...document.querySelectorAll('#home p')].find(el=>el.textContent==='FALL 2026').parentElement;
     const parts=[...date.children].map(el=>el.getBoundingClientRect());
     const row=date.getBoundingClientRect();
     const about=document.querySelector('#about-title').getBoundingClientRect();
     const gooseVisibleBottom=goose.top+goose.height*(184+963)/1364;
     return {width:innerWidth,heroHeight:hero.height,dateSingleLine:parts.every(p=>Math.abs(p.top-parts[0].top)<1),dateFits:parts[0].left>=0&&parts.at(-1).right<=innerWidth&&date.scrollWidth<=row.width+1,aboutGap:about.top-gooseVisibleBottom,gooseVisibleBottom,heroBottom:hero.bottom,backdrop:getComputedStyle(document.querySelector('main')).backgroundColor,overflow:document.documentElement.scrollWidth>innerWidth};
   });
   console.log(JSON.stringify(result));
   if(!result.dateSingleLine||!result.dateFits||result.aboutGap<24||result.aboutGap>56||result.gooseVisibleBottom>result.heroBottom||result.overflow)throw Error('Mobile spacing check failed');
   if([320,375,402,430].includes(width)){
     await page.evaluate(()=>window.scrollTo({top:0,behavior:'instant'}));
     await page.screenshot({path:'.artifacts/mobile-spacing-'+width+'.png',fullPage:true});
     const {data,info}=await sharp('.artifacts/mobile-spacing-'+width+'.png').raw().toBuffer({resolveWithObject:true});
     const seam=[];
     for(let y=Math.floor(result.heroHeight)-1;y<=Math.ceil(result.heroHeight)+1;y++){
       const offset=(y*info.width+Math.floor(width/2))*info.channels;
       seam.push([...data.slice(offset,offset+3)]);
     }
     console.log('section seam pixels',width,JSON.stringify(seam));
     if(seam.some(pixel=>pixel.some((value,i)=>Math.abs(value-[123,56,48][i])>3)))throw Error('Section seam is visible');
   }
 }
 for(const deviceScaleFactor of [1.25,2,3]){
   const retina=await browser.newPage({viewport:{width:393,height:812},deviceScaleFactor,reducedMotion:'reduce'});
   await retina.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
   const boundary=await retina.locator('#home').evaluate(el=>el.getBoundingClientRect().bottom);
   const {data,info}=await sharp(await retina.screenshot()).raw().toBuffer({resolveWithObject:true});
   for(let y=Math.floor(boundary*deviceScaleFactor)-1;y<=Math.ceil(boundary*deviceScaleFactor)+1;y++){
     const offset=(y*info.width+Math.floor(info.width/2))*info.channels;
     const pixel=[...data.slice(offset,offset+3)];
     if(pixel.some((value,i)=>Math.abs(value-[123,56,48][i])>3))throw Error('Retina seam at '+deviceScaleFactor);
   }
   console.log('seam check passed at device scale',deviceScaleFactor);
   await retina.close();
 }
 await browser.close();
})();
