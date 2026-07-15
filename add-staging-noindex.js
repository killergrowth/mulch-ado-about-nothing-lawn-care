// Add staging noindex meta to all dist pages + block robots.txt
const fs = require('fs');
const path = require('path');

const DIST = path.join(__dirname, 'dist');

function walk(dir) {
  let out = [];
  for (const f of fs.readdirSync(dir)) {
    const p = path.join(dir, f);
    if (fs.statSync(p).isDirectory()) out = out.concat(walk(p));
    else if (f.endsWith('.html')) out.push(p);
  }
  return out;
}

let patched = 0;
for (const file of walk(DIST)) {
  let html = fs.readFileSync(file, 'utf8');
  // Replace any existing robots meta with noindex, or insert if missing
  if (/<meta name="robots"[^>]*>/.test(html)) {
    html = html.replace(/<meta name="robots"[^>]*>/, '<meta name="robots" content="noindex">');
  } else {
    html = html.replace(/<meta charset="?UTF-8"?\s*\/?>/i, m => m + '\n<meta name="robots" content="noindex">');
  }
  fs.writeFileSync(file, html);
  patched++;
}
console.log(`noindex set on ${patched} pages`);

fs.writeFileSync(path.join(DIST, 'robots.txt'), 'User-agent: *\nDisallow: /\n');
console.log('robots.txt set to Disallow: /');
