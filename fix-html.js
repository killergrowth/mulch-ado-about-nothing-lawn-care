const fs = require('fs');
const files = ['dist/index.html', 'dist/blog/index.html'];
files.forEach(f => {
  let c = fs.readFileSync(f, 'utf8');
  const before = (c.match(/\u00E2\u20AC/g) || []).length;
  c = c.replace(/\u00E2\u20AC\u201D/g, ' &mdash; ');
  c = c.replace(/\u00E2\u20AC\u201C/g, '&ndash;');
  c = c.replace(/\u00E2\u20AC\u2122/g, '&rsquo;');
  c = c.replace(/\u00E2\u20AC\u0153/g, '&ldquo;');
  const after = (c.match(/\u00E2\u20AC/g) || []).length;
  fs.writeFileSync(f, c, 'utf8');
  console.log(f + ': ' + before + ' -> ' + after + ' remaining mojibake patterns');
});
