'use strict';
/**
 * build-sxc.js — Service x City Pages, Service Areas Hub
 * Mulch Ado About Nothing Lawn Care
 */
const {
  CLIENT, REVIEWS, SERVICES, CITIES,
  page, localBusinessSchema, faqAccordion, faqSchema,
  breadcrumb, breadcrumbSchema,
  svcLinkGrid, cityLinkGrid, sxcLinkGrid, citySvcLinkGrid,
  ctaSection, founderQuote, trustCards,
} = require('./build-core.js');

// ─── SERVICE x CITY PAGE ─────────────────────────────────────────────────────
function buildServiceCityPage(svc, city) {
  const title = `${svc.name} in ${city.name} | ${CLIENT.nameShort}`;
  const rawRange = svc.costRange.replace(/&ndash;/g, '-').replace(/&mdash;/g, '-').replace(/&amp;/g, '&');
  const svcShortName = svc.name.replace(/&amp;/g, '&');
  const desc  = `${svcShortName} in ${city.name}. ${rawRange}. Same crew, flat pricing, no contracts. Call (816) 555-0147.`;

  // City-specific neighborhoods for geographic context
  const neighborhoods = city.neighborhoods || [];
  const cityShort = city.name.replace(/ (MO|KS)$/, '');
  const neighborhoodPhrase = neighborhoods.length >= 2
    ? `${neighborhoods.slice(0, 3).join(', ')} and surrounding ${cityShort} neighborhoods`
    : `${cityShort} residential neighborhoods`;

  // Build city-specific FAQs with neighborhood-aware replacement
  const cityFaqs = svc.faqs.map((f, i) => {
    // Replace KC-specific neighborhood references with city-specific ones on the first FAQ
    let q = f.q.replace(/Kansas City(?:\s*MO)?/g, city.name);
    let a = f.a
      .replace(/Kansas City(?:'s)?/g, cityShort + "'s")
      .replace(/Kansas City/g, cityShort)
      .replace(/the metro/g, `${city.name} and surrounding areas`);
    // Replace all KC-specific neighborhood bundles with city-specific ones
    if (neighborhoods.length > 0) {
      a = a.replace(/Brookside,?\s*Longview area,?\s*Shawnee Mission Park neighborhoods?/gi, neighborhoodPhrase);
      a = a.replace(/Brookside,?\s*Overland Park,?\s*and Lee.?s Summit/gi, neighborhoodPhrase);
      a = a.replace(/Brookside,?\s*Waldo,?\s*Northland/gi, neighborhoodPhrase);
      a = a.replace(/\(Brookside,?.*?per visit/gi, `(${neighborhoodPhrase}) run \$250&ndash;\$400 per visit`);
    }
    return { q, a };
  });

  // Prepend a city-specific local-context FAQ (using different wording from body content)
  const nbhString = neighborhoods.length >= 2 ? `neighborhoods like ${neighborhoods.slice(0, 3).join(', ')}` : `the ${cityShort} area`;
  cityFaqs.unshift({
    q: `Do you have experience with ${cityShort} lawn properties specifically?`,
    a: `Yes &mdash; our crew works in ${city.name} regularly and understands the specific conditions there. Properties in ${nbhString} have their own characteristics: soil compaction levels, shade coverage, HOA requirements (where applicable), and seasonal timing that differs from other parts of the Kansas City metro. When we quote your ${svc.name.toLowerCase()} job, we&rsquo;re quoting for what we&rsquo;ll actually find at your ${cityShort} property, not a generic suburban average.`
  });

  const schema = [
    localBusinessSchema({
      name: `${CLIENT.name} &mdash; ${svc.name} in ${city.name}`,
      description: `${svc.name} in ${city.name}. ${svc.shortDesc}`,
      geo: { '@type': 'GeoCoordinates', latitude: city.lat, longitude: city.lng },
      hasOfferCatalog: {
        '@type': 'OfferCatalog',
        itemListElement: [{
          '@type': 'Offer',
          itemOffered: {
            '@type': 'Service',
            name: svc.name,
            areaServed: { '@type': 'City', name: city.name.replace(/ (MO|KS)$/, '') }
          }
        }]
      }
    }),
    faqSchema(cityFaqs),
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: svc.name, href: `/${svc.slug}/` },
      { label: `${svc.name} in ${city.name}`, href: `/${svc.slug}/${city.slug}/` }
    ])
  ];

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: svc.name, href: `/${svc.slug}/` },
  { label: city.name, href: `/${svc.slug}/${city.slug}/` }
])}

<section class="kg-page-header" aria-labelledby="sxc-h1">
  <div class="container">
    <div class="kg-hero-badge" style="background:rgba(245,197,24,0.2);border-color:rgba(245,197,24,0.5);display:inline-flex;margin-bottom:14px;">${svc.icon} ${city.name}</div>
    <h1 id="sxc-h1">${svc.name} in ${city.name}</h1>
    <p>${svc.shortDesc} Serving ${city.name} and surrounding areas.</p>
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

        <h2>${svc.name} in ${city.name}: What You Need to Know</h2>
        <p>${city.localContext}</p>
        <p>${(() => {
          let intro = svc.intro;
          if (city.slug !== 'kansas-city-mo' && neighborhoods.length > 0) {
            intro = intro
              .replace(/neighborhoods like Brookside, Overland Park, and Lee&rsquo;s Summit/g, `neighborhoods throughout ${cityShort} including ${neighborhoodPhrase}`)
              .replace(/neighborhoods like Brookside,[^.]+/g, `neighborhoods including ${neighborhoodPhrase}`);
          }
          intro = intro
            .replace(/Kansas City metro/g, `${city.name} area`)
            .replace(/Kansas City/g, cityShort);
          return intro;
        })()}</p>

        <h2>Local Expertise: What We Know About ${cityShort} Properties</h2>
        <p>Every Kansas City suburb has its own soil profile, seasonal timing, and HOA landscape requirements. Properties in ${neighborhoodPhrase} have characteristics our crew has learned through regular service: typical compaction patterns, drainage issues specific to the area, and seasonal timing that differs from cookie-cutter metro averages. When we quote your ${svc.name.toLowerCase()} job, we&rsquo;re quoting for what we&rsquo;ll actually find at your ${cityShort} property.</p>
        <p>Mulch Ado About Nothing Lawn Care is fully insured, licensed, and locally operated across the Kansas City metro. Our crew works in ${city.name} consistently &mdash; this isn&rsquo;t a one-off job managed remotely. We know the area, we know the timing, and we show up on the schedule we promise.</p>

        <h2>How Our ${svc.name} Service Works in ${city.name}</h2>
        <div class="kg-process-list">
          <div class="kg-process-item">
            <div class="kg-process-num">1</div>
            <div>
              <h4>Free All-In Estimate</h4>
              <p>Call or submit the form and we&rsquo;ll give you a flat quote for your ${city.name} property. No add-ons, no scope creep. What we quote is what you pay.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">2</div>
            <div>
              <h4>Crew Assignment</h4>
              <p>You&rsquo;re matched with a specific crew that serves your area. They show up consistently and learn your property &mdash; your gate, your preferences, the specific areas that need attention.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">3</div>
            <div>
              <h4>Service Completed</h4>
              <p>Your crew handles your ${svc.name.toLowerCase()} start to finish, on schedule. The same attention to detail every single visit &mdash; no cutting corners because it&rsquo;s a &ldquo;regular&rdquo; stop.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">4</div>
            <div>
              <h4>Text + Photos When Done</h4>
              <p>You get a text update with photos confirming the job is finished. Know the moment it&rsquo;s done, whether you&rsquo;re home, at work, or traveling.</p>
            </div>
          </div>
        </div>

        <h2>What Does ${svc.name} Cost in ${city.name}?</h2>
        <p>In ${city.name}, ${svc.name.toLowerCase()} typically runs ${svc.costRange} for an average residential property. We quote a flat all-in price before we start &mdash; no add-ons, no surprise charges. Your quote is your final price.</p>

        <h2>Other ${svc.name} Locations We Serve</h2>
        ${sxcLinkGrid(svc.slug, city.slug)}

        <h2>Other Services in ${city.name}</h2>
        ${citySvcLinkGrid(city.slug, svc.slug)}

        <h2>Also Serving Nearby Cities</h2>
        ${cityLinkGrid(city.slug)}

      </div>

      <div>
        <div style="position:sticky;top:90px;">
          <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;margin-bottom:24px;">
            <h3 style="margin-bottom:4px;">Get a Free Estimate</h3>
            <p style="font-size:0.85rem;color:var(--kg-text-light);margin-bottom:16px;">${svc.name} in ${city.name}</p>
            <div class="kg-form-wrapper">
            <form class="kg-form" action="/submit" method="POST" id="sxc-form-${svc.slug}-${city.slug}">
              <input type="hidden" name="service" value="${svc.name}">
              <input type="hidden" name="city" value="${city.name}">
              <div class="kg-form-group"><label>Name</label>
                <input type="text" name="name" placeholder="Your name" required autocomplete="name"></div>
              <div class="kg-form-group"><label>Phone</label>
                <input type="tel" name="phone" placeholder="(816) 555-0000" autocomplete="tel"></div>
              <div class="kg-form-group"><label>Message (optional)</label>
                <textarea name="message" rows="3" placeholder="Tell us about your lawn..."></textarea></div>
              <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
              <button type="submit" class="btn btn-primary" style="width:100%;justify-content:center;">Request Estimate</button>
            </form>
            </div>
            <div id="sxc-success-${svc.slug}-${city.slug}" style="display:none;text-align:center;min-height:160px;flex-direction:column;align-items:center;justify-content:center;">
              <p style="font-weight:600;">&#10003; Got it! We&rsquo;ll follow up today.</p>
            </div>
          </div>
          <div style="background:var(--kg-secondary);border-radius:8px;padding:24px;color:#fff;">
            <h4 style="color:#fff;margin-bottom:8px;">Call or Text Direct</h4>
            <a href="tel:${CLIENT.phoneTel}" style="color:var(--kg-accent);font-size:1.4rem;font-weight:700;text-decoration:none;">${CLIENT.phone}</a>
            <p style="font-size:0.82rem;color:rgba(255,255,255,0.6);margin-top:8px;">${CLIENT.hours}</p>
          </div>
          <div style="background:var(--kg-bg-card);border-radius:8px;padding:18px;margin-top:16px;font-size:0.85rem;">
            <div style="font-weight:600;margin-bottom:6px;">${CLIENT.name}</div>
            <div>Serving ${city.name} &amp; Surrounding Areas</div>
            <div>Kansas City Metro, MO &amp; KS</div>
            <div style="margin-top:4px;"><a href="tel:${CLIENT.phoneTel}">${CLIENT.phone}</a></div>
            <div style="margin-top:2px;">${CLIENT.email}</div>
            <div style="margin-top:4px;color:var(--kg-text-light);font-size:0.8rem;">Fully Insured &bull; Licensed &amp; Locally Operated</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="reviews-h-sxc-${svc.slug}-${city.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Client Experiences</span>
      <h2 id="reviews-h-sxc-${svc.slug}-${city.slug}">What ${city.name} Homeowners Say About Our ${svc.name} Service</h2>
    </div>
    ${trustCards()}
  </div>
</section>

<section class="section-alt" aria-labelledby="faq-h-sxc-${svc.slug}-${city.slug}">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2 id="faq-h-sxc-${svc.slug}-${city.slug}">${svc.name} FAQs for ${city.name} Homeowners</h2>
    </div>
    ${faqAccordion(cityFaqs)}
  </div>
</section>

<section aria-label="Business information" style="padding:32px 0;">
  <div class="container">
    <div class="kg-card" style="padding:24px;max-width:640px;" itemscope itemtype="https://schema.org/LocalBusiness">
      <h3 style="margin:0 0 12px 0;">Contact Information</h3>
      <p itemprop="name" style="font-weight:700;margin-bottom:6px;">${CLIENT.name}</p>
      <p itemprop="address" itemscope itemtype="https://schema.org/PostalAddress" style="margin:0 0 4px 0;">
        Serving <span itemprop="addressLocality">${city.name}</span> &amp; Surrounding Areas &mdash; <span itemprop="addressRegion">Kansas City Metro, MO &amp; KS</span>
      </p>
      <p style="margin:0 0 4px 0;">Phone: <a itemprop="telephone" href="tel:${CLIENT.phoneTel}">${CLIENT.phone}</a></p>
      <p style="margin:0 0 8px 0;">Email: ${CLIENT.email}</p>
      <p style="margin:0;font-size:0.85rem;color:var(--kg-text-light);">Fully Insured &bull; Licensed &amp; Locally Operated &bull; Same-Crew Consistency</p>
    </div>
  </div>
</section>

${founderQuote()}

${ctaSection()}

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('sxc-form-${svc.slug}-${city.slug}');
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
        const s = document.getElementById('sxc-success-${svc.slug}-${city.slug}');
        if (s) { s.style.display = 'flex'; }
      } else { btn.disabled = false; btn.textContent = 'Request Estimate'; alert(data.error || 'Error. Please try again.'); }
    } catch { btn.disabled = false; btn.textContent = 'Request Estimate'; alert('Network error. Please try again.'); }
  });
});
</script>`;

  return page(title, desc, `/${svc.slug}/${city.slug}/`, '/images/og-default.jpg', body, schema);
}

// ─── SERVICE AREAS HUB ────────────────────────────────────────────────────────
function buildServiceAreasPage() {
  const title = `Service Areas | ${CLIENT.name}`;
  const desc  = `Mulch Ado About Nothing Lawn Care serves Kansas City, Overland Park, Olathe, Lee's Summit, Independence, Lenexa, Shawnee, Liberty, Blue Springs, and Raymore.`;

  const cityCards = CITIES.map(c => `
  <div class="kg-area-item gsap-fade">
    <h4><a href="/${c.slug}/" style="color:var(--kg-secondary);">${c.name}</a></h4>
    <p>${c.neighborhoods.slice(0,2).join(', ')}</p>
    <a href="/${c.slug}/" style="font-size:0.85rem;font-weight:600;color:var(--kg-primary);margin-top:8px;display:inline-block;">View Services &rarr;</a>
  </div>`).join('');

  const schema = [
    localBusinessSchema({}),
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Service Areas', href: '/service-areas/' }
    ])
  ];

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: 'Service Areas', href: '/service-areas/' }
])}

<section class="kg-page-header">
  <div class="container">
    <h1>Lawn Care Service Areas</h1>
    <p>Mulch Ado About Nothing Lawn Care serves the full Kansas City metro &mdash; Missouri and Kansas. Same crew, all-in pricing, and photo updates across all 10 cities we serve.</p>
  </div>
</section>

<section>
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Where We Work</span>
      <h2>10 Kansas City Metro Cities</h2>
      <p>From Overland Park and Olathe in Johnson County to Lee&rsquo;s Summit and Blue Springs in Jackson County &mdash; we cover both sides of the state line.</p>
    </div>
    <div class="kg-areas-grid">
      ${cityCards}
    </div>
  </div>
</section>

<section class="section-alt">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">All Services</span>
      <h2>What We Offer Across the KC Metro</h2>
    </div>
    <div class="link-grid">
      ${SERVICES.map(s=>`<a href="/${s.slug}/" class="link-btn">${s.name}</a>`).join('')}
    </div>
  </div>
</section>

${ctaSection()}`;

  return page(title, desc, '/service-areas/', '/images/og-default.jpg', body, schema);
}

module.exports = { buildServiceCityPage, buildServiceAreasPage };
