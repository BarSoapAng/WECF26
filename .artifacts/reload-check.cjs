const {chromium}=require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/playwright');
(async()=>{
 const browser=await chromium.launch({headless:true,channel:'msedge'});
 for(const width of [402,1280,1512]){
   const page=await browser.newPage({viewport:{width,height:800}});
   await page.goto('http://127.0.0.1:5173/',{waitUntil:'networkidle'});
   for(const top of [0,500]){
     await page.evaluate(top=>window.scrollTo({top,behavior:'instant'}),top);
     const values=[await page.evaluate(()=>scrollY)];
     for(let i=0;i<4;i++){await page.reload({waitUntil:'networkidle'});values.push(await page.evaluate(()=>scrollY));}
     console.log('reload positions',width,top,JSON.stringify(values));
     if(values.some(y=>Math.abs(y-top)>1))throw Error('Scroll position drifted');
   }
   if(await page.getByRole('link',{name:'Home',exact:true}).count())throw Error('Typo placeholder remains');
   if(width===1280)await page.screenshot({path:'.artifacts/reload-fixed.png'});
   await page.close();
 }
 await browser.close();
})();
