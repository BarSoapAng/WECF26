const fs = require('node:fs');
const html = fs.readFileSync('.artifacts/hackcanada-reference.html', 'utf8');
const scripts = [...html.matchAll(/<script[^>]*>([\s\S]*?)<\/script>/g)].map(m => m[1]).filter(v => /loader|Loader/.test(v));
fs.writeFileSync('.artifacts/hackcanada-loader-source.txt', scripts.join('\n'));
console.log(scripts.join('\n').slice(0, 16000));
for (const needle of ['Getting the coast ready', '.page-loader{']) {
  const p = html.indexOf(needle);
  console.log(html.slice(Math.max(0, p - 1500), p + 2200));
}
