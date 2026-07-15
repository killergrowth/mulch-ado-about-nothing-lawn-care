'use strict';
/**
 * build-pages.js â€” Homepage, Service Pillar Pages, Location Pillar Pages
 * Mulch Ado About Nothing Lawn Care
 */
const {
  CLIENT, REVIEWS, SERVICES, CITIES,
  page, localBusinessSchema, faqAccordion, faqSchema,
  breadcrumb, breadcrumbSchema, reviewsSection,
  svcLinkGrid, cityLinkGrid, sxcLinkGrid, citySvcLinkGrid,
  ctaSection, heroQuoteForm, founderQuote, trustCards,
} = require('./build-core.js');

// â”€â”€â”€ HOMEPAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildHomepage() {
  const title = `Kansas City Lawn Care | ${CLIENT.nameShort || CLIENT.name}`;
  const desc  = `Lawn care across the Kansas City metro — mowing, aeration, mulching & cleanup. Same crew every visit, all-in pricing, no contracts. Call (816) 555-0147.`;

  const serviceCards = SERVICES.map(s => `
  <a href="/${s.slug}/" class="kg-card-link gsap-fade">
    <div class="kg-card">
      <div class="kg-card-icon">${s.icon}</div>
      <h3>${s.name}</h3>
      <p>${s.shortDesc}</p>
      <span class="kg-card-cta" style="font-weight:600;color:var(--kg-primary);font-size:0.9rem;">Learn More &rarr;</span>
    </div>
  </a>`).join('');

  const diffCards = CLIENT ? [
    { icon:'â°', title:'We Show Up On Time', body:'No ghosting, no last-minute rescheduling. When we say we&rsquo;ll be there, we&rsquo;re there. It&rsquo;s the most basic thing &mdash; and the one most lawn care companies get wrong.' },
    { icon:'ðŸ’²', title:'All-In Pricing', body:'The quote you get is the price you pay. No surprise add-ons, no &ldquo;we noticed something while we were there&rdquo; upsells. Every job is priced clearly up front.' },
    { icon:'ðŸ§‘&zwj;ðŸŒ¾', title:'Local Crew Only', body:'No subcontractors. Every crew member works directly for Mulch Ado About Nothing Lawn Care &mdash; trained by us, accountable to us.' },
    { icon:'ðŸ”„', title:'Same Crew Every Visit', body:'The same faces show up each time. They know your yard, your gate code, and which corner needs extra attention. That consistency shows up in the results.' },
    { icon:'ðŸ“±', title:'Photo Updates When Done', body:'When the job is finished, you get a text with photos. No wondering if we came while you were at work. Just confirmation that your yard looks how it should.' },
  ] : [];

  const diffHtml = diffCards.map(d => `
  <div class="kg-card gsap-fade">
    <div class="kg-card-icon">${d.icon}</div>
    <h3>${d.title}</h3>
    <p>${d.body}</p>
  </div>`).join('');

  const cityCards = CITIES.map(c => `
  <a href="/${c.slug}/" class="kg-card-link gsap-fade">
    <div class="kg-card">
      <h3 style="font-size:1rem;">${c.name}</h3>
      <p style="font-size:0.88rem;color:var(--kg-text-light);">${c.neighborhoods.slice(0,3).join(' &bull; ')}</p>
      <span style="font-size:0.85rem;font-weight:600;color:var(--kg-primary);">View Services &rarr;</span>
    </div>
  </a>`).join('');

  const blogRecent = `<!-- RECENT_POSTS -->`;

  const homeFaqs = [
    { q: `What lawn care services does ${CLIENT.name} offer in Kansas City?`, a: `${CLIENT.name} offers lawn mowing, fertilization and lawn treatment, mulching and landscaping, aeration and overseeding, edging and trimming, leaf removal, hedge and shrub trimming, sod installation, gutter cleaning, and spring and fall cleanup across the Kansas City metro.` },
    { q: 'Do you require a contract for lawn care service?', a: 'No contracts required. We offer per-visit, weekly, bi-weekly, and seasonal service arrangements with no long-term commitment. You can adjust or cancel anytime.' },
    { q: 'What cities do you serve in the Kansas City metro?', a: 'We serve Kansas City MO, Overland Park KS, Olathe KS, Lee\'s Summit MO, Independence MO, Lenexa KS, Shawnee KS, Liberty MO, Blue Springs MO, and Raymore MO.' },
    { q: 'How is your pricing structured?', a: 'All-in pricing — the quote you receive is the price you pay. No add-ons, no surprise charges for edging or cleanup. Every job is priced clearly up front before we start.' },
    { q: 'What does same crew every visit mean?', a: 'You are assigned a specific crew that returns to your property every scheduled visit. They learn your yard, your gate access, and your preferences — so you never have to re-explain anything.' },
  ];
  const schema = [
    localBusinessSchema({
      description: desc,
      hasMap: CLIENT.gbp,
    }),
    faqSchema(homeFaqs),
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: [{ '@type': 'ListItem', position: 1, name: 'Home', item: `https://${CLIENT.domain}` }]
    }
  ];

  const body = `
<section class="kg-hero" aria-label="Hero">
  <div class="kg-hero-bg" style="background-image:url('/images/hero-bg.jpg');" role="img" aria-label="Freshly mowed suburban lawn in Kansas City"></div>
  <div class="kg-hero-overlay"></div>
  <div class="container">
    <div class="kg-hero-content gsap-fade-left">
      <div class="kg-hero-badge">&#10003; No Contracts &bull; Same Crew Every Visit</div>
      <h1>Kansas City Lawn Care by ${CLIENT.nameShort || 'Mulch Ado'}</h1>
      <p>Lawn mowing, fertilization, aeration, mulching, and seasonal cleanup across the Kansas City metro &mdash; Missouri and Kansas sides. All-in pricing. Text updates with photos. The same crew, visit after visit.</p>
      <div class="kg-hero-btns">
        <a href="/contact/" class="btn btn-accent">Get a Free Estimate</a>
        <a href="tel:${CLIENT.phoneTel}" class="btn btn-outline-white">&#9742; ${CLIENT.phone}</a>
      </div>
    </div>
    <div class="gsap-fade-right">
      ${heroQuoteForm()}
    </div>
  </div>
</section>

<div class="kg-trust-bar" aria-label="Trust signals">
  <div class="container">
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Same crew every visit</div>
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> All-in pricing &mdash; no surprises</div>
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Local crew only, no subs</div>
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Photo updates when done</div>
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> No contracts required</div>
    <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Fully insured &mdash; local crew</div>
  </div>
</div>

<section aria-labelledby="services-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">What We Do</span>
      <h2 id="services-h">Lawn Care Services Across the KC Metro</h2>
      <p>From weekly mowing to fall aeration and overseeding, we handle every service a Kansas City lawn needs &mdash; on schedule, all-in price, same crew.</p>
    </div>
    <div class="kg-grid kg-grid-3">
      ${serviceCards}
    </div>
    <div style="text-align:center;margin-top:36px;">
      <a href="/service-areas/" class="btn btn-outline">View All Service Areas</a>
    </div>
  </div>
</section>

<section class="section-dark" aria-labelledby="stats-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label" style="color:var(--kg-accent);">By the Numbers</span>
      <h2 id="stats-h" style="color:#fff;">Serving the Kansas City Metro</h2>
    </div>
    <div class="kg-stats">
      <div class="gsap-fade">
        <div class="kg-stat-value" data-count="10">10</div>
        <div class="kg-stat-label">Cities Served</div>
      </div>
      <div class="gsap-fade">
        <div class="kg-stat-value" data-count="10">10</div>
        <div class="kg-stat-label">Services Offered</div>
      </div>
      <div class="gsap-fade">
        <div class="kg-stat-value" data-count="0">0</div>
        <div class="kg-stat-label">Contracts Required</div>
      </div>
      <div class="gsap-fade">
        <div class="kg-stat-value" data-count="100">100</div>
        <div class="kg-stat-label">% Same-Crew Promise</div>
      </div>
    </div>
  </div>
</section>

<section class="section-alt" aria-labelledby="diff-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Why Mulch Ado</span>
      <h2 id="diff-h">What Makes Us Different</h2>
      <p>Most lawn care complaints come down to the same things: no-shows, surprise bills, and rotating crews who don&rsquo;t know your yard. We built Mulch Ado to fix all three.</p>
    </div>
    <div class="kg-grid kg-grid-3">
      ${diffHtml}
    </div>
  </div>
</section>

${reviewsSection()}

<section aria-labelledby="cities-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Service Area</span>
      <h2 id="cities-h">We Serve the Entire Kansas City Metro</h2>
      <p>From Overland Park and Olathe on the Kansas side to Lee&rsquo;s Summit, Independence, and Blue Springs on the Missouri side &mdash; Mulch Ado About Nothing Lawn Care covers the full metro.</p>
    </div>
    <div class="kg-grid kg-grid-4">
      ${cityCards}
    </div>
    <div style="text-align:center;margin-top:28px;">
      <a href="/service-areas/" class="btn btn-outline">Full Service Area Map &rarr;</a>
    </div>
  </div>
</section>

<section aria-labelledby="home-reviews-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Client Experiences</span>
      <h2 id="home-reviews-h">What Kansas City Homeowners Say</h2>
      <p>Our clients in Overland Park, Kansas City, Olathe, and Lee&rsquo;s Summit choose Mulch Ado for consistency, transparency, and results.</p>
    </div>
    ${trustCards()}
  </div>
</section>

<section class="section-alt" aria-labelledby="home-faq-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Common Questions</span>
      <h2 id="home-faq-h">Lawn Care FAQs &mdash; Kansas City Metro</h2>
    </div>
    <div class="faq-list" style="max-width:800px;margin:0 auto;">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What lawn care services does Mulch Ado offer in Kansas City?</button>
        <div class="faq-answer"><p>We offer lawn mowing, fertilization and lawn treatment, mulching and landscaping, aeration and overseeding, edging and trimming, leaf removal, hedge and shrub trimming, sod installation, gutter cleaning, and spring and fall cleanup throughout the Kansas City metro &mdash; Missouri and Kansas sides.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Do you require a contract for lawn care service?</button>
        <div class="faq-answer"><p>No contracts required. We offer per-visit, weekly, bi-weekly, and seasonal service arrangements. You can adjust or cancel at any time &mdash; no penalty, no forms to sign.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What does &ldquo;all-in pricing&rdquo; mean?</button>
        <div class="faq-answer"><p>The quote you receive is the complete price &mdash; edging, blowing, and cleanup all included. No add-on charges after the fact. No &ldquo;we noticed something extra while we were there&rdquo; bills. The price we quote is exactly what you pay.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What cities in the Kansas City metro do you serve?</button>
        <div class="faq-answer"><p>We serve Kansas City MO, Overland Park KS, Olathe KS, Lee&rsquo;s Summit MO, Independence MO, Lenexa KS, Shawnee KS, Liberty MO, Blue Springs MO, and Raymore MO. Both the Missouri and Kansas sides of the metro are covered.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">How does the same-crew promise work?</button>
        <div class="faq-answer"><p>When you become a regular client, we assign you a specific crew. That crew handles your property at every scheduled visit. They learn your gate access, your property layout, and any recurring concerns. You never have to re-explain your lawn to a new person.</p></div>
      </div>
    </div>
  </div>
</section>

<section class="section-alt" aria-labelledby="blog-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Lawn Care Tips</span>
      <h2 id="blog-h">From the Blog</h2>
      <p>Kansas City lawn care advice from the team that mows these yards every week.</p>
    </div>
    <div style="display:flex;flex-wrap:wrap;gap:24px;justify-content:center;">
      ${blogRecent}
    </div>
    <div style="text-align:center;margin-top:32px;">
      <a href="/blog/" class="btn btn-outline">Read All Articles</a>
    </div>
  </div>
</section>

${ctaSection()}`;

  return page(title, desc, '/', '/images/og-default.jpg', body, schema);
}

// â”€â”€â”€ SERVICE PILLAR PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildServicePage(svc) {
  const title = `${svc.name} in Kansas City Metro | ${CLIENT.nameShort}`;
  const desc  = `${svc.name} in Kansas City metro — ${svc.costRange}. Same crew every visit, all-in pricing, no contracts. Call (816) 555-0147 for a free estimate.`;

  const cityLinks = CITIES.map(c =>
    `<a href="/${svc.slug}/${c.slug}/" class="link-btn">${svc.name} in ${c.name}</a>`
  ).join('\n');

  const costHtml = svc.commonCosts && svc.commonCosts.length ? `
  <div class="kg-highlight" style="margin:32px 0;">
    <h3 style="margin-bottom:12px;margin-top:0;">Typical Cost: ${svc.costRange}</h3>
    <table style="width:100%;border-collapse:collapse;font-size:0.9rem;">
      <thead>
        <tr>
          <th style="text-align:left;padding:8px 12px;background:rgba(45,106,45,0.1);border-radius:4px 0 0 4px;">Job Type</th>
          <th style="text-align:center;padding:8px 12px;background:rgba(45,106,45,0.1);">Low</th>
          <th style="text-align:center;padding:8px 12px;background:rgba(45,106,45,0.1);border-radius:0 4px 4px 0;">High</th>
        </tr>
      </thead>
      <tbody>
        ${svc.commonCosts.map((c,i) => `
        <tr style="background:${i%2===0?'rgba(45,106,45,0.04)':'transparent'}">
          <td style="padding:10px 12px;">${c.item}</td>
          <td style="padding:10px 12px;text-align:center;color:var(--kg-primary);font-weight:600;">${c.low}</td>
          <td style="padding:10px 12px;text-align:center;color:var(--kg-primary);font-weight:600;">${c.high}</td>
        </tr>`).join('')}
      </tbody>
    </table>
    <p style="font-size:0.82rem;color:var(--kg-text-light);margin-top:10px;margin-bottom:0;">Prices based on average Kansas City metro residential properties. Your quote is flat and all-in &mdash; no add-ons.</p>
  </div>` : '';

  const schema = [
    localBusinessSchema({
      '@type': ['LawnCareService'],
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        name: svc.name,
        itemListElement: [{
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            description: svc.shortDesc,
            provider: { '@type': 'LawnCareService', name: CLIENT.name },
            areaServed: CITIES.map(c => ({ '@type': 'City', name: c.name })),
          }
        }]
      }
    }),
    faqSchema(svc.faqs),
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: svc.name, href: `/${svc.slug}/` }
    ])
  ];

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: svc.name, href: `/${svc.slug}/` }
])}

<section class="kg-page-header" aria-labelledby="svc-h1">
  <div class="container">
    <div class="kg-hero-badge" style="background:rgba(245,197,24,0.2);border-color:rgba(245,197,24,0.5);display:inline-flex;margin-bottom:14px;">${svc.icon} ${CLIENT.nameShort}</div>
    <h1 id="svc-h1">${svc.name} in the Kansas City Metro</h1>
    <p>${svc.shortDesc}</p>
    <div style="margin-top:20px;display:flex;gap:14px;flex-wrap:wrap;">
      <a href="/contact/" class="btn btn-accent">Get a Free Estimate</a>
      <a href="tel:${CLIENT.phoneTel}" class="btn btn-outline-white">&#9742; ${CLIENT.phone}</a>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="kg-two-col">
      <div class="prose gsap-fade-left">
        <h2>${svc.name} for Kansas City Homeowners</h2>
        <p>${svc.intro}</p>

        <h2>What Does ${svc.name} Cost in Kansas City?</h2>
        ${costHtml}

        <h2>How Our ${svc.name} Service Works</h2>
        <div class="kg-process-list">
          <div class="kg-process-item">
            <div class="kg-process-num">1</div>
            <div>
              <h4>Free Estimate</h4>
              <p>Contact us and we&rsquo;ll give you a flat all-in quote. No hidden charges, no scope creep. What we quote is what you pay.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">2</div>
            <div>
              <h4>Same Crew Assignment</h4>
              <p>You&rsquo;re assigned a specific crew that handles your property every visit. They learn your yard, your preferences, and your access setup.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">3</div>
            <div>
              <h4>Service Day</h4>
              <p>Your crew arrives on the scheduled day and handles your ${svc.name} start to finish. Full attention to detail, same standard every time.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">4</div>
            <div>
              <h4>Photo Update</h4>
              <p>When the job is done, you get a text with photos of the finished work. No wondering if we came while you were at work or away from home.</p>
            </div>
          </div>
        </div>

        <h2>Why Choose Mulch Ado About Nothing Lawn Care for ${svc.name}?</h2>
        <ul>
          <li><strong>Same crew every visit</strong> &mdash; they know your property and you don&rsquo;t have to re-explain anything.</li>
          <li><strong>All-in pricing</strong> &mdash; your quote is your final price, no add-ons or surprises.</li>
          <li><strong>Local crew only</strong> &mdash; no subcontractors. Our people are trained and accountable to us directly.</li>
          <li><strong>No contracts required</strong> &mdash; book what you need, when you need it.</li>
          <li><strong>Text updates with photos</strong> &mdash; proof the job was done, every single visit.</li>
        </ul>

        <h2>${svc.name} in Cities We Serve</h2>
        <div class="link-grid">
          ${cityLinks}
        </div>

        <h2>Other Services We Offer</h2>
        ${svcLinkGrid(svc.slug)}
      </div>

      <div>
        <div style="position:sticky;top:90px;">
          <div class="kg-highlight" style="margin-bottom:24px;">
            <p><strong>Serving Kansas City, Overland Park, Olathe, Lee&rsquo;s Summit, Independence, Lenexa, Shawnee, Liberty, Blue Springs, and Raymore.</strong></p>
          </div>
          <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;margin-bottom:24px;">
            <h3 style="margin-bottom:16px;">Quick Estimate</h3>
            <div class="kg-form-wrapper">
            <form class="kg-form" action="/submit" method="POST" id="svc-form-${svc.slug}">
              <input type="hidden" name="service" value="${svc.name}">
              <div class="kg-form-group"><label>Name</label>
                <input type="text" name="name" placeholder="Your name" required autocomplete="name"></div>
              <div class="kg-form-group"><label>Phone</label>
                <input type="tel" name="phone" placeholder="(816) 555-0000" autocomplete="tel"></div>
              <div class="kg-form-group"><label>City</label>
                <input type="text" name="city" placeholder="Your city" autocomplete="address-level2"></div>
              <div class="kg-form-group"><label>Message (optional)</label>
                <textarea name="message" rows="3" placeholder="Tell us about your lawn..."></textarea></div>
              <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Request Estimate</button>
            </form>
            </div>
            <div id="success-${svc.slug}" style="display:none;text-align:center;min-height:200px;display:none;flex-direction:column;align-items:center;justify-content:center;">
              <p style="font-weight:600;">&#10003; Got it! We&rsquo;ll be in touch today.</p>
            </div>
          </div>
          <div style="background:var(--kg-secondary);border-radius:8px;padding:24px;color:#fff;">
            <h4 style="color:#fff;margin-bottom:8px;">Call or Text</h4>
            <a href="tel:${CLIENT.phoneTel}" style="color:var(--kg-accent);font-size:1.4rem;font-weight:700;text-decoration:none;">${CLIENT.phone}</a>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:8px;">${CLIENT.hours}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="reviews-h-${svc.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Client Experiences</span>
      <h2 id="reviews-h-${svc.slug}">What Kansas City Homeowners Say</h2>
    </div>
    ${trustCards()}
  </div>
</section>

<section class="section-alt" aria-labelledby="faq-h-${svc.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2 id="faq-h-${svc.slug}">${svc.name} FAQs</h2>
      <p>Common questions Kansas City homeowners ask about ${svc.name.toLowerCase()}.</p>
    </div>
    ${faqAccordion([...svc.faqs, { q: `How quickly can you start ${svc.name} service in the Kansas City metro?`, a: `We can typically schedule within 3–7 business days for most Kansas City metro areas. For urgent requests, call (816) 555-0147 directly — we&rsquo;ll do our best to accommodate. Once you&rsquo;re on our schedule, your crew returns consistently each visit.` }])}
  </div>
</section>

${founderQuote()}

${ctaSection()}

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('svc-form-${svc.slug}');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      const res = await fetch('/submit', { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        form.style.display = 'none';
        const s = document.getElementById('success-${svc.slug}');
        s.style.display = 'flex';
      } else { btn.disabled = false; btn.textContent = 'Request Estimate'; alert(data.error || 'Error. Please try again.'); }
    } catch { btn.disabled = false; btn.textContent = 'Request Estimate'; alert('Network error. Please try again.'); }
  });
});
</script>`;

  return page(title, desc, `/${svc.slug}/`, '/images/og-default.jpg', body, schema);
}

// â”€â”€â”€ LOCATION PILLAR PAGE â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
function buildLocationPage(city) {
  const title = `Lawn Care in ${city.displayName || city.name} | ${CLIENT.nameShort}`;
  const desc  = `Lawn care in ${city.displayName || city.name + (city.state ? ', ' + city.state : '')} — mowing, aeration, fertilization & seasonal cleanup. Same crew, all-in pricing. Call (816) 555-0147.`;

  const svcLinks = SERVICES.map(s =>
    `<a href="/${s.slug}/${city.slug}/" class="link-btn">${s.name} in ${city.name}</a>`
  ).join('\n');

  const nearbyCities = CITIES.filter(c => c.slug !== city.slug).slice(0, 5);

  const localBusinessS = localBusinessSchema({
    name: `${CLIENT.name} &mdash; ${city.name}`,
    description: `Lawn care services in ${city.name}. Mowing, fertilization, aeration, overseeding, mulching, leaf removal, and cleanup.`,
    geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `Lawn Care Services in ${city.name}`,
      itemListElement: SERVICES.map(s => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: s.name, areaServed: { '@type': 'City', name: city.name } }
      }))
    }
  });

  const schema = [
    localBusinessS,
    {
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: `What lawn care services does Mulch Ado About Nothing Lawn Care offer in ${city.name}?`,
          acceptedAnswer: { '@type': 'Answer', text: `Mulch Ado About Nothing Lawn Care offers lawn mowing, fertilization and lawn treatment, mulching and landscaping, aeration and overseeding, edging and trimming, leaf removal, hedge and shrub trimming, sod installation, gutter cleaning, and spring and fall cleanup in ${city.name}.` }
        },
        {
          '@type': 'Question',
          name: `How do I get a lawn care estimate in ${city.name}?`,
          acceptedAnswer: { '@type': 'Answer', text: `Call or text (816) 555-0147 or submit the online form at muchadolawncare.com. We respond the same business day with a flat all-in quote.` }
        }
      ]
    },
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Service Areas', href: '/service-areas/' },
      { label: city.name, href: `/${city.slug}/` }
    ])
  ];

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: 'Service Areas', href: '/service-areas/' },
  { label: city.name, href: `/${city.slug}/` }
])}

<section class="kg-page-header" aria-labelledby="city-h1">
  <div class="container">
    <h1 id="city-h1">Lawn Care in ${city.displayName || city.name}</h1>
    <p>Mulch Ado About Nothing Lawn Care serves ${city.displayName || city.name} with mowing, fertilization, aeration, mulching, leaf removal, and seasonal cleanup. Same crew every visit &mdash; no contracts, all-in pricing.</p>
    <div style="margin-top:20px;display:flex;gap:14px;flex-wrap:wrap;">
      <a href="/contact/" class="btn btn-accent">Get a Free Estimate</a>
      <a href="tel:${CLIENT.phoneTel}" class="btn btn-outline-white">&#9742; ${CLIENT.phone}</a>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="kg-two-col">
      <div class="prose gsap-fade-left">
        <h2>Lawn Care Service in ${city.name}</h2>
        <p>${city.localContext}</p>

        <h2>Services We Offer in ${city.name}</h2>
        <p>Mulch Ado About Nothing Lawn Care handles every lawn care need for ${city.name} homeowners. Whether you need weekly mowing, a fall aeration and overseeding program, or a spring cleanup to kick off the season, we send the same crew to your property every time &mdash; people who know your yard and show up when they say they will.</p>
        <div class="link-grid" style="margin:24px 0;">
          ${svcLinks}
        </div>

        <h2>Why ${city.name} Homeowners Choose Mulch Ado</h2>
        <ul>
          <li><strong>Same crew every visit</strong> &mdash; your team knows your property, your preferences, and your access. No re-explaining every season.</li>
          <li><strong>All-in pricing</strong> &mdash; the quote you get is the price you pay. No surprise charges for edging or blowdown &mdash; it&rsquo;s all included.</li>
          <li><strong>Local crew only</strong> &mdash; no subcontractors. Our people are employed directly by Mulch Ado and trained to our standards.</li>
          <li><strong>Text updates with photos</strong> &mdash; you&rsquo;ll know the moment the job is done, with photos as proof, whether you&rsquo;re home or not.</li>
          <li><strong>No contracts</strong> &mdash; book what you need, cancel or adjust at any time.</li>
        </ul>

        <h2>Key Neighborhoods We Serve in ${city.name}</h2>
        <p>Our crews work throughout ${city.name}, including ${city.neighborhoods.join(', ')}, and surrounding areas. If you&rsquo;re in ${city.name}, you&rsquo;re in our service area.</p>

        <h2>Other Cities We Serve</h2>
        <div class="link-grid">
          ${cityLinkGrid(city.slug)}
        </div>
      </div>

      <div>
        <div style="position:sticky;top:90px;">
          <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;margin-bottom:24px;">
            <h3 style="margin-bottom:16px;">Get a Free Estimate in ${city.displayName || city.name}</h3>
            <div class="kg-form-wrapper">
            <form class="kg-form" action="/submit" method="POST" id="city-form-${city.slug}">
              <input type="hidden" name="city" value="${city.name}">
              <div class="kg-form-group"><label>Name</label>
                <input type="text" name="name" placeholder="Your name" required autocomplete="name"></div>
              <div class="kg-form-group"><label>Phone</label>
                <input type="tel" name="phone" placeholder="(816) 555-0000" autocomplete="tel"></div>
              <div class="kg-form-group"><label>Service Needed</label>
                <select name="service">
                  <option value="">Select a service</option>
                  ${SERVICES.map(s=>`<option value="${s.name}">${s.name}</option>`).join('')}
                </select></div>
              <div class="kg-form-group"><label>Message (optional)</label>
                <textarea name="message" rows="3" placeholder="Tell us about your lawn..."></textarea></div>
              <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Request Estimate</button>
            </form>
            </div>
            <div id="city-success-${city.slug}" style="display:none;text-align:center;min-height:160px;flex-direction:column;align-items:center;justify-content:center;">
              <p style="font-weight:600;">&#10003; Got it! We&rsquo;ll be in touch today.</p>
            </div>
          </div>
          <div style="background:var(--kg-secondary);border-radius:8px;padding:24px;color:#fff;">
            <h4 style="color:#fff;margin-bottom:8px;">Call or Text Anytime</h4>
            <a href="tel:${CLIENT.phoneTel}" style="color:var(--kg-accent);font-size:1.4rem;font-weight:700;text-decoration:none;">${CLIENT.phone}</a>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:8px;">${CLIENT.hours}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="reviews-h-${city.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Client Experiences</span>
      <h2 id="reviews-h-${city.slug}">What ${city.name} Homeowners Say</h2>
    </div>
    ${trustCards()}
  </div>
</section>

<section class="section-alt" aria-labelledby="city-faq-h-${city.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2 id="city-faq-h-${city.slug}">Lawn Care FAQs for ${city.name}</h2>
    </div>
    <div class="faq-list" style="max-width:800px;margin:0 auto;">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What lawn care services are available in ${city.name}?</button>
        <div class="faq-answer"><p>Mulch Ado About Nothing Lawn Care offers lawn mowing, fertilization and lawn treatment, mulching and landscaping, aeration and overseeding, edging and trimming, leaf removal, hedge and shrub trimming, sod installation, gutter cleaning, and spring and fall cleanup throughout ${city.name}.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Do you require a contract for Lawn Care in ${city.displayName || city.name}?</button>
        <div class="faq-answer"><p>No contracts required. We offer per-visit, weekly, bi-weekly, and seasonal service arrangements. You can adjust frequency or pause service at any time &mdash; just let us know before the next scheduled visit.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">How do I get a lawn care estimate in ${city.name}?</button>
        <div class="faq-answer"><p>Call or text (816) 555-0147, or submit the online estimate form above. We respond the same business day with a flat, all-in quote &mdash; no add-ons, no surprises. The price we quote is the price you pay.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Does Mulch Ado use subcontractors in ${city.name}?</button>
        <div class="faq-answer"><p>No. Every crew member who shows up at your property works directly for Mulch Ado About Nothing Lawn Care. We do not use subcontractors. Your crew is consistent &mdash; the same team every visit &mdash; and they are trained to our standards.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Will I know when my lawn has been serviced in ${city.name}?</button>
        <div class="faq-answer"><p>Yes. When the job is finished, your crew sends a text update with photos of the completed work. You will always know the moment we are done, whether you were home or away.</p></div>
      </div>
    </div>
  </div>
</section>

${founderQuote()}

${ctaSection()}

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('city-form-${city.slug}');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    const btn = form.querySelector('button[type=submit]');
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      const res = await fetch('/submit', { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        form.style.display = 'none';
        const s = document.getElementById('city-success-${city.slug}');
        if (s) { s.style.display = 'flex'; }
      } else { btn.disabled = false; btn.textContent = 'Request Estimate'; alert(data.error || 'Error. Please try again.'); }
    } catch { btn.disabled = false; btn.textContent = 'Request Estimate'; alert('Network error. Please try again.'); }
  });
});
</script>`;

  return page(title, desc, `/${city.slug}/`, '/images/og-default.jpg', body, schema);
}

module.exports = { buildHomepage, buildServicePage, buildLocationPage };

