'use strict';
/**
 * build-blog-only.js
 * Runs ONLY buildBlog() without touching the rest of the dist/ tree.
 */
const path = require('path');
const fs   = require('fs');
const { CLIENT } = require('./_build-data.js');
const { buildBlog } = require('../../tools/kg-site-builder/lib/blog-build');

const ROOT = __dirname;
const DIST = path.join(ROOT, 'dist');

// Clear only dist/blog/ (leave everything else untouched)
const distBlogDir = path.join(DIST, 'blog');
if (fs.existsSync(distBlogDir)) {
  fs.rmSync(distBlogDir, { recursive: true, force: true });
  console.log('Cleared dist/blog/');
}

buildBlog({
  srcDir: ROOT,
  distDir: DIST,
  siteId: 'mulch-ado-about-nothing-lawn-care',
  domain: CLIENT.domain,
  siteName: CLIENT.name,
  postsPerPage: 10,
});

// Count the output
const blogPages = fs.readdirSync(distBlogDir, { withFileTypes: true }).length;
console.log('Blog built. dist/blog/ items:', blogPages);
