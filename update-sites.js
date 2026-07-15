const fs = require('fs');
const p = 'C:/Users/KillerGrowth/.openclaw/workspace/References/sites.json';
let root = JSON.parse(fs.readFileSync(p, 'utf8'));
const sites = root.sites;
const idx = sites.findIndex(s => s.id === 'mulch-ado-about-nothing-lawn-care');
if (idx >= 0) {
  sites[idx].status = 'staging';
  sites[idx].stagingUrl = 'https://staging.mulch-ado-about-nothing-lawn-care.pages.dev';
  sites[idx].stagingDeployedAt = new Date().toISOString();
  console.log('Updated:', sites[idx].id, '→ status:', sites[idx].status);
} else {
  console.log('Not found by id');
}
fs.writeFileSync(p, JSON.stringify(root, null, 2), 'utf8');
console.log('Saved.');
