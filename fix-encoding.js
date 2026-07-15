const fs = require('fs');
const files = ['dist/index.html', 'dist/blog/index.html', 'blog-posts/blog-index.json'];
const patterns = [
  ['\u00E2\u20AC\u2122', "'"],   // â€™ smart apostrophe mojibake
  ['\u00E2\u20AC\u201C', '"'],   // â€œ left double quote mojibake
  ['\u00C3\u00A9', 'e'],          // Ã© -> e (accented e)
];
files.forEach(f => {
  if (!fs.existsSync(f)) return;
  let c = fs.readFileSync(f, 'utf8');
  let changed = false;
  patterns.forEach(([from, to]) => {
    const count = (c.match(new RegExp(from.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g')) || []).length;
    if (count > 0) {
      c = c.split(from).join(to);
      changed = true;
      console.log(`${f}: replaced ${count} of "${from}"`);
    }
  });
  if (changed) fs.writeFileSync(f, c, 'utf8');
});
console.log('Encoding fix complete');
