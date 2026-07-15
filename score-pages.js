'use strict';
/**
 * score-pages.js — KillerSEO + KillerGEO Score for Mulch Ado About Nothing Lawn Care
 * Usage: node score-pages.js
 * Saves individual score JSON files to scores/ directory per audit-build.js requirements.
 */

const dotenv = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\hyperlocal-pipeline\\node_modules\\dotenv');
dotenv.config({ path: 'C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\hyperlocal-pipeline\\.env' });

const fs = require('fs');
const path = require('path');
const Anthropic = require('C:\\Users\\KillerGrowth\\.openclaw\\workspace\\tools\\hyperlocal-pipeline\\node_modules\\@anthropic-ai\\sdk');

const client = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY });
const DIST      = path.join(__dirname, 'dist');
const SCORES    = path.join(__dirname, 'scores');
fs.mkdirSync(SCORES, { recursive: true });

const SAMPLE_PAGES = [
  { key: 'homepage',                path: 'index.html',                                                   url: '/' },
  { key: 'svc-lawn-mowing',         path: 'lawn-mowing/index.html',                                       url: '/lawn-mowing/' },
  { key: 'svc-fertilization',       path: 'fertilization-and-lawn-treatment/index.html',                  url: '/fertilization-and-lawn-treatment/' },
  { key: 'svc-aeration',            path: 'aeration-and-overseeding/index.html',                          url: '/aeration-and-overseeding/' },
  { key: 'svc-mulching',            path: 'mulching-and-landscaping/index.html',                          url: '/mulching-and-landscaping/' },
  { key: 'city-kansas-city',        path: 'kansas-city-mo/index.html',                                    url: '/kansas-city-mo/' },
  { key: 'city-overland-park',      path: 'overland-park-ks/index.html',                                  url: '/overland-park-ks/' },
  { key: 'city-olathe',             path: 'olathe-ks/index.html',                                         url: '/olathe-ks/' },
  { key: 'city-lees-summit',        path: 'lees-summit-mo/index.html',                                    url: '/lees-summit-mo/' },
  { key: 'sxc-mowing-kc',          path: 'lawn-mowing/kansas-city-mo/index.html',                        url: '/lawn-mowing/kansas-city-mo/' },
  { key: 'sxc-aeration-op',         path: 'aeration-and-overseeding/overland-park-ks/index.html',         url: '/aeration-and-overseeding/overland-park-ks/' },
  { key: 'sxc-fertilization-olathe',path: 'fertilization-and-lawn-treatment/olathe-ks/index.html',        url: '/fertilization-and-lawn-treatment/olathe-ks/' },
  { key: 'sxc-mulching-ls',         path: 'mulching-and-landscaping/lees-summit-mo/index.html',           url: '/mulching-and-landscaping/lees-summit-mo/' },
  { key: 'sxc-leaf-removal-indep',  path: 'leaf-removal/independence-mo/index.html',                      url: '/leaf-removal/independence-mo/' },
  { key: 'sxc-mowing-lenexa',       path: 'lawn-mowing/lenexa-ks/index.html',                             url: '/lawn-mowing/lenexa-ks/' },
  { key: 'about',                   path: 'about/index.html',                                             url: '/about/' },
  { key: 'contact',                 path: 'contact/index.html',                                           url: '/contact/' },
];

const RUBRIC = `You are a local SEO content quality auditor for a lawn care website. Score this page using two rubrics.
Return ONLY valid JSON with no extra text.

RUBRIC A — KillerSEO (0–100):
  CAT 1 LOCAL UNIQUENESS (30): real local city context, local geography/climate, neighborhoods, local insight
  CAT 2 CONTENT DEPTH (25): 700+ words, answers full intent, 3+ FAQs with local slant, original angle
  CAT 3 ON-PAGE SEO (20): H1 with keyword+city, H2s with secondary keywords, keyword in first 100 words, title <65 chars keyword-first, meta <155 chars with CTA
  CAT 4 TRUST/E-E-A-T (15): testimonial or review signal, credentials, real photo alt text, NAP visible
  CAT 5 TECHNICAL (10): schema markup present, 3+ internal links, CTA/form present
  PASS = 85+

RUBRIC B — KillerGEO (0–100):
  Local relevance: Does the page read as deeply local to this specific metro/city? (40)
  Geographic specificity: neighborhoods, landmarks, nearby streets/lakes/suburbs mentioned? (25)
  Service-area clarity: does it clearly state what areas are served and why this matters? (20)
  GBP alignment: is the business clearly positioned for map pack for this location? (15)
  PASS = 75+

Return EXACTLY this JSON:
{
  "killerSEO": <0-100>,
  "killerGEO": <0-100>,
  "seoStatus": "<PASS|FAIL>",
  "geoStatus": "<PASS|FAIL>",
  "wordCount": <number>,
  "hasSchema": <true|false>,
  "flags": ["<issue>"],
  "strengths": ["<strength>"]
}`;

function stripHtml(html) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, ' ')
    .replace(/<style[\s\S]*?<\/style>/gi, ' ')
    .replace(/<[^>]+>/g, ' ')
    .replace(/&[a-z]+;/gi, ' ')
    .replace(/\s+/g, ' ').trim();
}

function meta(html) {
  const t  = (html.match(/<title[^>]*>([\s\S]*?)<\/title>/i) || [])[1] || '';
  const d  = (html.match(/<meta[^>]+name=["']description["'][^>]+content="([^"]+)"/i) ||
              html.match(/<meta[^>]+content="([^"]+)"[^>]+name=["']description["']/i) || [])[1] || '';
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '';
  const h2s = [...html.matchAll(/<h2[^>]*>([\s\S]*?)<\/h2>/gi)].map(m => m[1].replace(/<[^>]+>/g, '').trim()).slice(0, 6);
  const links = (html.match(/href=["']\//gi) || []).length;
  const hasSchema = /application\/ld\+json/i.test(html);
  return {
    t: t.replace(/<[^>]+>/g, '').trim(),
    d: d.trim(),
    h1: h1.replace(/<[^>]+>/g, '').trim(),
    h2s, links, hasSchema
  };
}

async function scorePage(page) {
  const htmlPath = path.join(DIST, page.path);
  if (!fs.existsSync(htmlPath)) {
    console.log(`  ⚠ File not found: ${page.path}`);
    return { key: page.key, killerSEO: 0, killerGEO: 0, error: 'FILE NOT FOUND' };
  }

  const html = fs.readFileSync(htmlPath, 'utf-8');
  const m    = meta(html);
  const text = stripHtml(html);
  const wc   = text.split(/\s+/).filter(Boolean).length;

  const context = [
    `URL: https://muchadolawncare.com${page.url}`,
    `Title: ${m.t || 'MISSING'}`,
    `Meta: ${m.d || 'MISSING'}`,
    `H1: ${m.h1 || 'MISSING'}`,
    `H2s: ${m.h2s.join(' | ') || 'NONE'}`,
    `Schema: ${m.hasSchema}`,
    `Internal links: ${m.links}`,
    `Word count: ${wc}`,
    '',
    'PAGE TEXT (first 12000 chars):',
    text.substring(0, 12000),
  ].join('\n');

  try {
    const msg = await client.messages.create({
      model: 'claude-sonnet-4-5',
      max_tokens: 1024,
      messages: [{ role: 'user', content: RUBRIC + '\n\n' + context }],
    });
    let raw = msg.content[0].text.trim().replace(/^```json\n?/, '').replace(/\n?```$/, '').trim();
    const match = raw.match(/\{[\s\S]*\}/);
    if (match) raw = match[0];
    const result = JSON.parse(raw);
    result.key = page.key;
    result.url = page.url;
    result.scoredAt = new Date().toISOString();
    return result;
  } catch (e) {
    return { key: page.key, url: page.url, error: e.message, killerSEO: 0, killerGEO: 0 };
  }
}

async function main() {
  console.log('\n=== Mulch Ado About Nothing Lawn Care — Score Run ===');
  console.log(`Scoring ${SAMPLE_PAGES.length} pages...\n`);

  const results = [];
  let passed = 0, failed = 0, errors = 0;

  for (const page of SAMPLE_PAGES) {
    process.stdout.write(`  ${page.key}... `);
    const result = await scorePage(page);
    results.push(result);

    if (result.error && !result.killerSEO) {
      console.log(`ERROR: ${result.error}`);
      errors++;
    } else {
      const seoOk = result.killerSEO >= 85;
      const geoOk = result.killerGEO >= 75;
      const icon  = (seoOk && geoOk) ? '✅' : '❌';
      console.log(`${icon} SEO:${result.killerSEO} GEO:${result.killerGEO} [${result.seoStatus}/${result.geoStatus}] Words:${result.wordCount||'?'}`);

      // Save individual score file to scores/
      const scoreFile = path.join(SCORES, `${page.key}.json`);
      fs.writeFileSync(scoreFile, JSON.stringify(result, null, 2), 'utf-8');

      if (seoOk && geoOk) passed++;
      else failed++;
    }

    await new Promise(r => setTimeout(r, 600));
  }

  console.log('\n' + '='.repeat(55));
  console.log(`✅ PASS (SEO85+, GEO75+): ${passed}`);
  console.log(`❌ FAIL:                  ${failed}`);
  console.log(`Errors:                   ${errors}`);
  console.log(`Scores saved to:          scores/`);
  console.log('='.repeat(55));

  if (failed > 0) {
    console.log('\nFailing pages:');
    results.filter(r => r.killerSEO < 85 || r.killerGEO < 75).forEach(r => {
      console.log(`  [SEO:${r.killerSEO} GEO:${r.killerGEO}] ${r.key}`);
      (r.flags || []).slice(0, 3).forEach(f => console.log(`    - ${f}`));
    });
  }

  if (failed > 0) process.exit(1);
}

main().catch(e => { console.error('Fatal:', e.message); process.exit(1); });
