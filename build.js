'use strict';
/**
 * build.js — Mulch Ado About Nothing Lawn Care Site Builder
 * Generates all pages to dist/
 * Run: node build.js
 */

const path = require('path');
const fs   = require('fs');
const { ensureDir, copyDir, writePage, DIST, ROOT, CLIENT, SERVICES, CITIES } = require('./build-core.js');
const { buildHomepage, buildServicePage, buildLocationPage } = require('./build-pages.js');
const { buildServiceCityPage, buildServiceAreasPage } = require('./build-sxc.js');
const { buildAboutPage, buildContactPage } = require('./build-static.js');
const { buildBlog } = require('../../tools/kg-site-builder/lib/blog-build');

// ─── SETUP ───────────────────────────────────────────────────────────────────
ensureDir(DIST);
copyDir(path.join(ROOT, 'assets'), path.join(DIST, 'assets'));

// Copy images
const imgSrc  = path.join(ROOT, 'images');
const imgDest = path.join(DIST, 'images');
ensureDir(imgDest);
if (fs.existsSync(imgSrc)) {
  for (const f of fs.readdirSync(imgSrc)) {
    const src = path.join(imgSrc, f);
    if (fs.statSync(src).isFile()) fs.copyFileSync(src, path.join(imgDest, f));
  }
}

// Copy static files
for (const f of ['robots.txt', '_headers', '_redirects', '_routes.json']) {
  const src = path.join(ROOT, f);
  if (fs.existsSync(src)) fs.copyFileSync(src, path.join(DIST, f));
}

// Copy functions dir (Pages Functions — never output _worker.js)
copyDir(path.join(ROOT, 'functions'), path.join(DIST, 'functions'));

// Clean dist/blog before rebuild (prevents stale scheduled posts)
const distBlogDir = path.join(DIST, 'blog');
if (fs.existsSync(distBlogDir)) fs.rmSync(distBlogDir, { recursive: true, force: true });

let count = 0;

// ─── PAGES ───────────────────────────────────────────────────────────────────

// Homepage
writePage('index.html', buildHomepage()); count++;
console.log('  ✓ Home');

// Service pillars (10)
for (const svc of SERVICES) {
  writePage(path.join(svc.slug, 'index.html'), buildServicePage(svc)); count++;
  console.log(`  ✓ Service: ${svc.name}`);
}

// Location pillars (10)
for (const city of CITIES) {
  writePage(path.join(city.slug, 'index.html'), buildLocationPage(city)); count++;
  console.log(`  ✓ City: ${city.name}`);
}

// Service x City (100 pages: 10 services × 10 cities)
for (const svc of SERVICES) {
  for (const city of CITIES) {
    writePage(path.join(svc.slug, city.slug, 'index.html'), buildServiceCityPage(svc, city)); count++;
  }
}
console.log(`  ✓ Service x City: ${SERVICES.length * CITIES.length} pages`);

// Static pages
writePage(path.join('service-areas', 'index.html'), buildServiceAreasPage()); count++;
writePage(path.join('about', 'index.html'), buildAboutPage()); count++;
writePage(path.join('contact', 'index.html'), buildContactPage()); count++;
console.log('  ✓ Service Areas, About, Contact');

// ─── BLOG ────────────────────────────────────────────────────────────────────
buildBlog({
  srcDir: ROOT,
  distDir: DIST,
  siteId: 'mulch-ado-about-nothing-lawn-care',
  domain: CLIENT.domain,
  siteName: CLIENT.name,
  postsPerPage: 10,
});
console.log('  ✓ Blog built');

// ─── ROBOTS ──────────────────────────────────────────────────────────────────
fs.writeFileSync(path.join(DIST, 'robots.txt'),
  `User-agent: *\nAllow: /\n\nUser-agent: GPTBot\nAllow: /\n\nUser-agent: ClaudeBot\nAllow: /\n\nUser-agent: PerplexityBot\nAllow: /\n\nSitemap: https://${CLIENT.domain}/sitemap.xml\n`,
  'utf8'
);

// ─── SITEMAP ─────────────────────────────────────────────────────────────────
const now = new Date().toISOString().split('T')[0];
const staticUrls = ['/', '/about/', '/contact/', '/service-areas/'];
const svcUrls    = SERVICES.map(s => `/${s.slug}/`);
const cityUrls   = CITIES.map(c => `/${c.slug}/`);
const sxcUrls    = [];
for (const svc of SERVICES) {
  for (const city of CITIES) {
    sxcUrls.push(`/${svc.slug}/${city.slug}/`);
  }
}

// Blog URLs injected by buildBlog() — sitemap below covers static pages
const allUrls = [...staticUrls, ...svcUrls, ...cityUrls, ...sxcUrls];

const sitemapXml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allUrls.map(url => `  <url>
    <loc>https://${CLIENT.domain}${url}</loc>
    <lastmod>${now}</lastmod>
    <changefreq>${url === '/' ? 'weekly' : 'monthly'}</changefreq>
    <priority>${url === '/' ? '1.0' : url.split('/').filter(Boolean).length === 1 ? '0.8' : '0.6'}</priority>
  </url>`).join('\n')}
</urlset>`;

fs.writeFileSync(path.join(DIST, 'sitemap.xml'), sitemapXml, 'utf8');

// ─── SUMMARY ─────────────────────────────────────────────────────────────────
let htmlCount = 0;
function countHtml(dir) {
  if (!fs.existsSync(dir)) return;
  for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
    if (e.isDirectory()) countHtml(path.join(dir, e.name));
    else if (e.name.endsWith('.html')) htmlCount++;
  }
}
countHtml(DIST);

console.log('\n' + '='.repeat(55));
console.log('Mulch Ado About Nothing Lawn Care — Build Complete');
console.log('='.repeat(55));
console.log('  Pages generated:   ' + count);
console.log('  HTML files in dist: ' + htmlCount);
console.log('  Sitemap URLs:       ' + allUrls.length);
console.log('  Output: dist/');
console.log('='.repeat(55) + '\n');
