const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
(async()=>{
  const meta=await sharp('.artifacts/figma-desktop.png').metadata();console.log(meta.width,meta.height);
  await sharp('.artifacts/figma-desktop.png').extract({left:0,top:0,width:meta.width,height:Math.round(1921.49*meta.width/1512)}).resize({width:756}).toFile('.artifacts/figma-target.png');
  await sharp('.artifacts/browser-desktop.png').extract({left:0,top:0,width:1512,height:1921}).resize({width:756}).toFile('.artifacts/browser-target.png');
  const target=await sharp('.artifacts/figma-target.png').metadata();
  await sharp({create:{width:1512,height:Math.max(target.height,961),channels:3,background:'#fff'}}).composite([{input:'.artifacts/figma-target.png',left:0,top:0},{input:'.artifacts/browser-target.png',left:756,top:0}]).png().toFile('.artifacts/comparison.png');
  await sharp('src/assets/competition-streams/topview-tree.png').resize({width:900}).toFile('.artifacts/tree.png');
  const data=await sharp('.artifacts/figma-desktop.png').raw().toBuffer({resolveWithObject:true});
  for(const [x,y] of [[10,1100],[20,1300],[100,1500],[1450,1100],[200,1000]]) {const p=(Math.round(y*meta.width/1512)*meta.width+Math.round(x*meta.width/1512))*data.info.channels;console.log(x,y,[...data.data.slice(p,p+3)]);}
  for(const file of ['.artifacts/figma-desktop.png','.artifacts/browser-desktop.png']) {
    const {data,info}=await sharp(file).raw().toBuffer({resolveWithObject:true});
    for(const x of [0,10,1500]) {let y=1100; for(;y<3800;y++) {const p=(Math.round(y*info.width/1512)*info.width+Math.round(x*info.width/1512))*info.channels;if(data[p]>220&&data[p+1]>155&&data[p+2]<170)break;} console.log(file,x,'tree top',y);}
  }
})();

