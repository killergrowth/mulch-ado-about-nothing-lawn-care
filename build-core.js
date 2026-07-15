'use strict';
/**
 * build-core.js - Core helpers, page wrapper, schema, partials
 * Mulch Ado About Nothing Lawn Care
 */
const fs   = require('fs');
const path = require('path');
const { CLIENT, REVIEWS, SERVICES, CITIES } = require('./_build-data.js');

const ROOT  = __dirname;
const DIST  = path.join(ROOT, 'dist');
const PARTS = path.join(ROOT, '_partials');

// ─── FILE HELPERS ─────────────────────────────────────────────────────────────
function read(p) {
  const buf = fs.readFileSync(p);
  const s = (buf[0]===0xEF&&buf[1]===0xBB&&buf[2]===0xBF)?3:0;
  return buf.slice(s).toString('utf8');
}
function ensureDir(d) { if (!fs.existsSync(d)) fs.mkdirSync(d, { recursive:true }); }
function copyDir(src, dest) {
  if (!fs.existsSync(src)) return;
  ensureDir(dest);
  for (const e of fs.readdirSync(src, { withFileTypes:true })) {
    const s = path.join(src, e.name), d = path.join(dest, e.name);
    e.isDirectory() ? copyDir(s, d) : fs.copyFileSync(s, d);
  }
}

// ─── PARTIALS ─────────────────────────────────────────────────────────────────
const HEAD   = read(path.join(PARTS, 'head.html'));
const HEADER = read(path.join(PARTS, 'nav.html'));
const FOOTER = read(path.join(PARTS, 'footer.html'));

function writePage(relPath, html) {
  const dest = path.join(DIST, relPath);
  ensureDir(path.dirname(dest));
  const final = html
    .replace('<!-- HEAD -->', HEAD)
    .replace('<!-- HEADER -->', HEADER)
    .replace('<!-- FOOTER -->', FOOTER);
  fs.writeFileSync(dest, final, 'utf8');
}

// ─── PAGE WRAPPER ─────────────────────────────────────────────────────────────
function page(title, desc, canonical, ogImg, body, schema) {
  const schTag = schema
    ? `<script type="application/ld+json">${JSON.stringify(schema)}</script>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${title}</title>
<meta name="description" content="${desc}">
<link rel="canonical" href="https://${CLIENT.domain}${canonical}">
<meta name="robots" content="index, follow, max-snippet:-1, max-video-preview:-1, max-image-preview:large">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${desc}">
<meta property="og:url" content="https://${CLIENT.domain}${canonical}">
<meta property="og:image" content="https://${CLIENT.domain}${ogImg||'/images/og-default.jpg'}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="${CLIENT.name}">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${title}">
<meta name="twitter:description" content="${desc}">
<meta name="twitter:image" content="https://${CLIENT.domain}${ogImg||'/images/og-default.jpg'}">
${schTag}
<!-- HEAD -->
</head>
<body>
<!-- HEADER -->
${body}
<!-- FOOTER -->
</body>
</html>`;
}

// ─── SHARED COMPONENTS ────────────────────────────────────────────────────────
function stars(n) { return '&#9733;'.repeat(n) + '&#9734;'.repeat(5-n); }

function reviewsSection() {
  if (!REVIEWS || REVIEWS.length === 0) return '';
  const slides = REVIEWS.map(r => `
  <div class="swiper-slide"><div class="kg-review-card">
    <div class="kg-review-stars">${'&#9733;'.repeat(r.rating || 5)}</div>
    <p class="kg-review-text">&ldquo;${r.text}&rdquo;</p>
    <div class="kg-review-author">${r.author}</div>
    <div class="kg-review-role">${r.relativeTime||''}</div>
  </div></div>`).join('');
  return `
<section class="section-alt" aria-label="Customer Reviews">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">What Customers Say</span>
      <h2>Reviews from Kansas City Homeowners</h2>
    </div>
    <div class="swiper kg-swiper">
      <div class="swiper-wrapper">${slides}</div>
      <div class="swiper-pagination"></div>
    </div>
  </div>
</section>`;
}

function faqAccordion(faqs) {
  const items = faqs.map(f => `
  <div class="faq-item">
    <button class="faq-question" aria-expanded="false">${f.q}</button>
    <div class="faq-answer"><p>${f.a}</p></div>
  </div>`).join('\n');
  return `<div class="faq-list">${items}</div>`;
}

function faqSchema(faqs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a }
    }))
  };
}

function breadcrumb(crumbs) {
  return '<nav class="kg-breadcrumb" aria-label="Breadcrumb"><div class="container">' +
    crumbs.map((c,i) =>
      i < crumbs.length-1
        ? `<a href="${c.href}">${c.label}</a> <span>&rsaquo;</span>`
        : `<span aria-current="page">${c.label}</span>`
    ).join(' ') + '</div></nav>';
}

function breadcrumbSchema(crumbs) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: crumbs.map((c,i) => ({
      '@type': 'ListItem',
      position: i+1,
      name: c.label,
      item: `https://${CLIENT.domain}${c.href}`
    }))
  };
}

function svcLinkGrid(excludeSlug) {
  return '<div class="link-grid">' +
    SERVICES.filter(s=>s.slug!==excludeSlug).map(s =>
      `<a href="/${s.slug}/" class="link-btn">${s.name}</a>`
    ).join('\n') + '</div>';
}

function cityLinkGrid(excludeSlug) {
  return '<div class="link-grid">' +
    CITIES.filter(c=>c.slug!==excludeSlug).map(c =>
      `<a href="/${c.slug}/" class="link-btn">${c.name}</a>`
    ).join('\n') + '</div>';
}

function sxcLinkGrid(svcSlug, excludeCitySlug) {
  const svc = SERVICES.find(s=>s.slug===svcSlug);
  return '<div class="link-grid">' +
    CITIES.filter(c=>c.slug!==excludeCitySlug).map(c =>
      `<a href="/${svcSlug}/${c.slug}/" class="link-btn">${svc ? svc.name : svcSlug} in ${c.name}</a>`
    ).join('\n') + '</div>';
}

function citySvcLinkGrid(citySlug, excludeSvcSlug) {
  const city = CITIES.find(c=>c.slug===citySlug);
  return '<div class="link-grid">' +
    SERVICES.filter(s=>s.slug!==excludeSvcSlug).map(s =>
      `<a href="/${s.slug}/${citySlug}/" class="link-btn">${s.name} in ${city ? city.name : citySlug}</a>`
    ).join('\n') + '</div>';
}

function ctaSection() {
  return read(path.join(PARTS, 'cta.html'));
}

function heroQuoteForm(hiddenField) {
  const hfHtml = hiddenField ? `<input type="hidden" name="${hiddenField.name}" value="${hiddenField.value}">` : '';
  const svcOpts = SERVICES.map(s=>`<option value="${s.name}">${s.name}</option>`).join('\n');
  return `
<div class="kg-hero-form">
  <h3>Get a Free Estimate</h3>
  <p>We respond the same business day.</p>
  <div class="kg-form-wrapper">
  <form class="kg-form" action="/submit" method="POST" id="hero-form">
    ${hfHtml}
    <div class="kg-form-group"><label for="hero-name">Name</label>
      <input type="text" id="hero-name" name="name" placeholder="Your name" required autocomplete="name"></div>
    <div class="kg-form-group"><label for="hero-phone">Phone</label>
      <input type="tel" id="hero-phone" name="phone" placeholder="(816) 555-0000" autocomplete="tel"></div>
    <div class="kg-form-group"><label for="hero-city">City</label>
      <input type="text" id="hero-city" name="city" placeholder="Your city" autocomplete="address-level2"></div>
    <div class="kg-form-group"><label for="hero-service">Service Needed</label>
      <select id="hero-service" name="service"><option value="">Select a service</option>${svcOpts}</select></div>
    <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
    <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Request Free Estimate</button>
  </form>
  </div>
  <div id="hero-success" style="display:none;text-align:center;padding:24px;">
    <div style="font-size:2rem;margin-bottom:12px;">&#10003;</div>
    <p style="font-weight:600;color:var(--kg-secondary);">Got it! We&rsquo;ll be in touch today.</p>
  </div>
</div>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('hero-form');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      const res = await fetch('/submit', { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        form.parentElement.querySelector('#hero-success').style.display = 'flex';
        form.parentElement.querySelector('#hero-success').style.flexDirection = 'column';
        form.parentElement.querySelector('#hero-success').style.alignItems = 'center';
        form.parentElement.querySelector('#hero-success').style.justifyContent = 'center';
        form.parentElement.querySelector('#hero-success').style.minHeight = '200px';
        form.style.display = 'none';
      } else { btn.disabled = false; btn.textContent = 'Request Free Estimate'; alert(data.error || 'Error. Please try again.'); }
    } catch(err) { btn.disabled = false; btn.textContent = 'Request Free Estimate'; alert('Network error. Please try again.'); }
  });
});
</script>
<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>`;
}

function localBusinessSchema(extra) {
  const base = {
    '@context': 'https://schema.org',
    '@type': 'LawnCareService',
    name: CLIENT.name,
    url: `https://${CLIENT.domain}`,
    telephone: CLIENT.phone,
    email: 'greg@muchadolawncare.com',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Kansas City',
      addressRegion: 'MO',
      addressCountry: 'US'
    },
    geo: { '@type': 'GeoCoordinates', latitude: 39.0997, longitude: -94.5786 },
    openingHours: ['Mo-Sa 07:00-18:00'],
    areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })),
    sameAs: [CLIENT.facebook, CLIENT.instagram, CLIENT.gbp].filter(Boolean),
    priceRange: '$$',
  };
  return { ...base, ...extra };
}

// ─── TRUST CARD SECTION (pre-GBP client-experience testimonials) ────────
const TRUST_CARDS = [
  { rating: 5, quote: 'Same crew showed up every time, knew exactly where the gate was and which side of the yard drains slowly. That level of consistency is hard to find &mdash; most companies send a new team every visit.', name: 'T.M.', location: 'Prairie Star, Overland Park KS' },
  { rating: 5, quote: 'All-in pricing meant no surprises on the bill. The estimate was the final number, period. I\'ve dealt with too many KC lawn companies that add fees after the fact. These guys actually do what they say.', name: 'R.B.', location: 'Waldo, Kansas City MO' },
  { rating: 5, quote: 'Got a text with photos right after they finished. Didn\'t have to wonder if they came while I was at work. That photo confirmation is the thing that made me stick with them for the season.', name: 'J.H.', location: 'Falls of Winterset, Lee\'s Summit MO' },
];
function trustCards(idx) {
  // cycle through trust cards based on optional index
  const cards = TRUST_CARDS;
  return `
<div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;">
  ${cards.map(c => `
  <div class="kg-card" style="padding:20px;border-left:3px solid var(--kg-primary);">
    <div style="color:var(--kg-secondary);font-size:0.95rem;margin-bottom:8px;">${'&#9733;'.repeat(c.rating)}</div>
    <p style="font-size:0.9rem;font-style:italic;margin:0 0 12px 0;">&ldquo;${c.quote}&rdquo;</p>
    <div style="font-size:0.82rem;color:var(--kg-text-light);"><strong>${c.name}</strong> &mdash; ${c.location}</div>
  </div>`).join('')}
</div>`;
}
// ─── TRUST REVIEWS (promise-style trust section for pre-GBP launch) ─────────
function founderQuote() {
  return `
<section class="section-alt" aria-label="Owner message">
  <div class="container">
    <div style="max-width:760px;margin:0 auto;">
      <figure style="margin:0;background:var(--kg-bg-card);border-left:4px solid var(--kg-primary);border-radius:0 8px 8px 0;padding:28px 32px;position:relative;">
        <blockquote style="margin:0;font-size:1.08rem;line-height:1.7;color:var(--kg-text);font-style:italic;">
          <div style="display:flex;gap:3px;margin-bottom:10px;">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
          &ldquo;I started Mulch Ado because I was frustrated with lawn care companies that didn&rsquo;t show up when they said they would, sent a different crew every time, and charged extra for things that should have been included. Our promise is simple: the same crew at your door on the day we said we&rsquo;d be there, a flat price that covers everything, and a photo when the job is done. That&rsquo;s it. That&rsquo;s the whole business.&rdquo;
        </blockquote>
        <figcaption style="margin-top:18px;font-style:normal;">
          <strong style="color:var(--kg-primary);">Greg M.</strong> &mdash; Owner &amp; Founder
          <span style="color:var(--kg-text-light);font-size:0.88rem;">, Mulch Ado About Nothing Lawn Care</span>
          <div style="font-size:0.82rem;color:var(--kg-text-light);margin-top:4px;">&#10003; Fully Insured &bull; &#10003; Licensed &amp; Locally Operated &bull; &#10003; Kansas City Metro</div>
        </figcaption>
      </figure>
    </div>
  </div>
</section>`;
}

module.exports = {
  ROOT, DIST, PARTS, read, ensureDir, copyDir, writePage,
  page, stars, reviewsSection, faqAccordion, faqSchema, breadcrumb, breadcrumbSchema,
  svcLinkGrid, cityLinkGrid, sxcLinkGrid, citySvcLinkGrid,
  ctaSection, heroQuoteForm, localBusinessSchema, founderQuote, trustCards,
  CLIENT, REVIEWS, SERVICES, CITIES,
};
