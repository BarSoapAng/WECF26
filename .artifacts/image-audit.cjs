const sharp = require('C:/Users/yiche/.cache/codex-runtimes/codex-primary-runtime/dependencies/node/node_modules/sharp');
const fs = require('node:fs');
(async()=>{for(const dir of ['hero','about','decorative','competition-streams'])for(const file of fs.readdirSync('src/assets/'+dir)){if(dir==='competition-streams'&&file!=='topview-tree.png')continue;const path='src/assets/'+dir+'/'+file;const m=await sharp(path).metadata();console.log(path,JSON.stringify({width:m.width,height:m.height,MB:fs.statSync(path).size/1e6,decodedMB:m.width*m.height*4/1e6}));}})();
