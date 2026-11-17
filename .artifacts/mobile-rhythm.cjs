const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
const sharp=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 const page=await browser.newPage({viewport:{width:375,height:812},reducedMotion:'reduce'});
 await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
 await page.evaluate(()=>document.fonts.ready);
 for(const name of ['hero-hero-goose','hero-fire']){
   const file='src/assets/optimized/'+name+'.webp';
   const metadata=await sharp(file).metadata();
   const {info}=await sharp(file).trim({threshold:25}).toBuffer({resolveWithObject:true});
   console.log(name,{width:metadata.width,height:metadata.height,...info});
 }
 console.log(await page.evaluate(()=>{const p=[...document.querySelectorAll('#home p')].find(x=>x.textContent==='FALL 2026');return {dateWidth:p.parentElement.getBoundingClientRect().width,parts:[...p.parentElement.children].map(x=>({text:x.textContent.trim(),width:x.getBoundingClientRect().width,font:getComputedStyle(x).fontSize})),goose:document.querySelector('img[src*="hero-hero-goose"]').getBoundingClientRect().toJSON(),about:document.querySelector('#about-title').getBoundingClientRect().toJSON()};}));
 await browser.close();
})();
