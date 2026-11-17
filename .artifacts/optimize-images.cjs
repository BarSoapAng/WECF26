const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs');
const out = 'src/assets/optimized';
fs.mkdirSync(out, {recursive:true});
(async()=>{
  const images = [
    ['hero/sky',2667], ['hero/background-trees',2186], ['hero/fire',1542],
    ['hero/floor',3112], ['hero/hero-goose',970],
    ['hero/orange-leaf-hero',400], ['hero/yellow-leaf-hero',400],
    ['about/orange-leaf',436], ['about/yellow-leaf',552],
    ['decorative/button',324], ['decorative/washi-tape',412], ['decorative/sparkle',420]
  ];
  for(const [name,width] of images) {
    const output=out+'/'+name.replaceAll('/','-')+'.webp';
    await sharp('src/assets/'+name+'.png').resize({width,withoutEnlargement:true}).webp({lossless:true,effort:4}).toFile(output);
  }
  // Retain the exact region visible in both desktop and mobile compositions.
  await sharp('src/assets/hero/leaf-and-stump.png').webp({lossless:true,effort:4}).toFile(out+'/hero-leaf-and-stump.webp');
  await sharp('src/assets/competition-streams/topview-tree.png').resize({width:8813}).extract({left:2487,top:0,width:3840,height:1866}).webp({lossless:true,effort:4}).toFile(out+'/about-tree.webp');
  let bytes=0,decoded=0;
  for(const file of fs.readdirSync(out).filter(file=>file.endsWith('.webp'))) {const path=out+'/'+file;const m=await sharp(path).metadata();const b=fs.statSync(path).size;bytes+=b;decoded+=m.width*m.height*4;console.log(file,b,m.width,m.height);}
  console.log(JSON.stringify({transferMB:bytes/1e6,decodedMB:decoded/1e6}));
})();
