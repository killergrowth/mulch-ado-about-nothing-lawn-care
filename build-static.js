'use strict';
/**
 * build-static.js — About and Contact Pages
 * Mulch Ado About Nothing Lawn Care
 */
const {
  CLIENT, SERVICES, CITIES,
  page, localBusinessSchema,
  breadcrumb, breadcrumbSchema,
  ctaSection, founderQuote, trustCards,
} = require('./build-core.js');

// ─── ABOUT PAGE ───────────────────────────────────────────────────────────────
function buildAboutPage() {
  const title = `About Mulch Ado | Kansas City Lawn Care Company`;
  const desc  = `Meet Mulch Ado About Nothing Lawn Care — KC metro lawn care built on same-crew consistency, flat pricing & photo updates. No contracts. Call (816) 555-0147.`;

  const schema = [
    localBusinessSchema({ description: desc }),
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'About', href: '/about/' }
    ])
  ];

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about/' }
])}

<section class="kg-page-header">
  <div class="container">
    <h1>Kansas City Lawn Care You Can Actually Count On &mdash; About Mulch Ado</h1>
    <p>A Kansas City metro lawn care company built on showing up when we say we will, pricing what we quote, and sending the same crew every visit.</p>
    <div class="kg-trust-bar" style="margin-top:20px;">
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Fully insured</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Licensed &amp; locally operated</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Same crew every visit</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> No contracts</div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="kg-two-col">
      <div class="prose gsap-fade-left">

        <h2>Why Mulch Ado About Nothing Lawn Care Exists</h2>
        <p>Lawn care in the Kansas City metro has a reliability problem. Crews show up late or not at all. Bills include charges that weren&rsquo;t in the original quote. New workers arrive every visit who have no idea what your yard needs or how your gate works.</p>
        <p>Mulch Ado About Nothing Lawn Care was built to fix all three. The name is a bit of a joke about our business model &mdash; we do a lot, but we don&rsquo;t make it complicated. You tell us what you need, we quote it flat, we show up when we say we will, the same crew handles your property every time, and you get a text with photos when we&rsquo;re done.</p>
        <p>No contracts. No surprises on the bill. No rotating strangers who don&rsquo;t know your yard.</p>

        <h2>Our Service Commitment</h2>
        <div class="kg-process-list">
          <div class="kg-process-item">
            <div class="kg-process-num">1</div>
            <div>
              <h4>We Show Up On Time</h4>
              <p>No ghosting, no last-minute rescheduling without notice. When we say Monday at 8am, we mean Monday at 8am. Your schedule matters as much as ours.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">2</div>
            <div>
              <h4>All-In Pricing</h4>
              <p>The quote you get is the price you pay. Edging, blowdown, cleanup &mdash; included. No &ldquo;we noticed something while we were there&rdquo; upsells.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">3</div>
            <div>
              <h4>Local Crew Only, No Subcontractors</h4>
              <p>Every crew member works directly for Mulch Ado About Nothing Lawn Care. They&rsquo;re trained by us and accountable to our standards, not a contractor&rsquo;s.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">4</div>
            <div>
              <h4>Same Crew Every Visit</h4>
              <p>You&rsquo;ll see the same faces every time. They know your gate code, your dog&rsquo;s name, which corner of the backyard needs extra attention. That consistency shows up in the results.</p>
            </div>
          </div>
          <div class="kg-process-item">
            <div class="kg-process-num">5</div>
            <div>
              <h4>Photo Update When Done</h4>
              <p>When the job is finished, you get a text with photos. No wondering if we came while you were at work. Just a quick message that shows your yard looking exactly how it should.</p>
            </div>
          </div>
        </div>

        <h2>The Services We Offer</h2>
        <p>Mulch Ado About Nothing Lawn Care handles every lawn care service a Kansas City homeowner needs across the full growing season:</p>
        <ul>
          ${SERVICES.map(s=>`<li><a href="/${s.slug}/">${s.name}</a></li>`).join('')}
        </ul>

        <h2>Where We Serve</h2>
        <p>We cover both sides of the Kansas City metro &mdash; Missouri and Kansas. Our service area includes ${CITIES.map(c=>`<a href="/${c.slug}/">${c.name}</a>`).join(', ')}.</p>

        <h2>No Contracts Required</h2>
        <p>We operate without long-term contracts. Book weekly, bi-weekly, or seasonal service and adjust or cancel whenever your situation changes. Most customers stay because the service is consistent, not because they have to.</p>

      </div>

      <div class="gsap-fade-right">
        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:32px;margin-bottom:24px;">
          <h3 style="margin-bottom:20px;">What We Stand For</h3>
          <ul style="list-style:none;padding:0;">
            <li style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
              <span style="color:var(--kg-primary);font-size:1.2rem;margin-top:2px;">&#10003;</span>
              <div><strong>Show up on time, every time</strong><br><span style="font-size:0.88rem;color:var(--kg-text-light);">No ghosting, no last-minute cancellations</span></div>
            </li>
            <li style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
              <span style="color:var(--kg-primary);font-size:1.2rem;margin-top:2px;">&#10003;</span>
              <div><strong>All-in pricing, always</strong><br><span style="font-size:0.88rem;color:var(--kg-text-light);">Quote is the final price, no add-ons</span></div>
            </li>
            <li style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
              <span style="color:var(--kg-primary);font-size:1.2rem;margin-top:2px;">&#10003;</span>
              <div><strong>Local crew only</strong><br><span style="font-size:0.88rem;color:var(--kg-text-light);">No subcontractors, ever</span></div>
            </li>
            <li style="display:flex;gap:12px;align-items:flex-start;margin-bottom:16px;">
              <span style="color:var(--kg-primary);font-size:1.2rem;margin-top:2px;">&#10003;</span>
              <div><strong>Same crew every visit</strong><br><span style="font-size:0.88rem;color:var(--kg-text-light);">They know your property</span></div>
            </li>
            <li style="display:flex;gap:12px;align-items:flex-start;margin-bottom:0;">
              <span style="color:var(--kg-primary);font-size:1.2rem;margin-top:2px;">&#10003;</span>
              <div><strong>Text + photos when done</strong><br><span style="font-size:0.88rem;color:var(--kg-text-light);">Always know when the job is complete</span></div>
            </li>
          </ul>
        </div>
        <div style="background:var(--kg-secondary);border-radius:8px;padding:28px;color:#fff;text-align:center;">
          <h3 style="color:#fff;margin-bottom:8px;">Ready to Get Started?</h3>
          <p style="color:rgba(255,255,255,0.8);margin-bottom:20px;">Call or text us to schedule a free estimate.</p>
          <a href="tel:${CLIENT.phoneTel}" style="color:var(--kg-accent);font-size:1.6rem;font-weight:800;text-decoration:none;display:block;margin-bottom:14px;">${CLIENT.phone}</a>
          <a href="/contact/" class="btn btn-accent" style="width:100%;justify-content:center;">Get a Free Estimate</a>
          <p style="font-size:0.78rem;color:rgba(255,255,255,0.5);margin-top:14px;">No contracts &bull; All-in pricing &bull; Same-day response</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section class="section-alt" aria-labelledby="about-kc-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Why Kansas City</span>
      <h2 id="about-kc-h">Built for Kansas City Metro Lawns</h2>
    </div>
    <div class="kg-two-col">
      <div>
        <p>Kansas City sits in the transition zone between cool-season and warm-season grass climates &mdash; which means local lawns are almost universally tall fescue, a cool-season grass that performs best in spring and fall but struggles through July and August. Getting KC lawns right requires understanding that schedule: heavy care in March through May, protective management in summer, and the critical fall window for aeration, overseeding, and fertilization that determines how well your lawn comes back the following spring.</p>
        <p>Kansas City&rsquo;s clay-heavy soil compounds the challenge. Clay compacts under mowing equipment and foot traffic, blocking water and fertilizer from reaching roots. That&rsquo;s why aeration is one of the highest-value services we offer in this market &mdash; it directly addresses the structural issue that limits everything else. We schedule aeration in mid-September through October, in line with what KC soil temperatures and fescue recovery windows actually support.</p>
        <p>We cover both sides of the metro: Overland Park, Olathe, Lenexa, and Shawnee on the Kansas side &mdash; where HOA standards are strict and visual consistency matters &mdash; and Kansas City, Lee&rsquo;s Summit, Independence, Liberty, Blue Springs, and Raymore on the Missouri side, where neighborhood character ranges from historic urban lots with mature tree canopy to fast-growing suburban developments with new sod. The service is the same across all of them. The crew is local. The pricing is flat.</p>
      </div>
      <div>
        <div class="kg-highlight" style="margin-bottom:24px;">
          <h4 style="margin:0 0 14px 0;">Kansas City Lawn Care Calendar</h4>
          <div style="font-size:0.9rem;">
            <div style="display:flex;gap:12px;margin-bottom:10px;border-bottom:1px solid var(--kg-border);padding-bottom:10px;"><strong style="min-width:90px;">Mar &ndash; May:</strong> <span>Spring cleanup, fertilization, pre-emergent, edging, mowing startup</span></div>
            <div style="display:flex;gap:12px;margin-bottom:10px;border-bottom:1px solid var(--kg-border);padding-bottom:10px;"><strong style="min-width:90px;">Jun &ndash; Aug:</strong> <span>Weekly mowing, summer fertilization, drought monitoring, hedge trimming</span></div>
            <div style="display:flex;gap:12px;margin-bottom:10px;border-bottom:1px solid var(--kg-border);padding-bottom:10px;"><strong style="min-width:90px;">Sep &ndash; Oct:</strong> <span>Core aeration, overseeding, fall fertilization (critical window)</span></div>
            <div style="display:flex;gap:12px;"><strong style="min-width:90px;">Nov &ndash; Dec:</strong> <span>Leaf removal, gutter cleaning, fall cleanup, winterization</span></div>
          </div>
        </div>
        <div class="kg-highlight">
          <h4 style="margin:0 0 12px 0;">Our Commitment to KC Homeowners</h4>
          <p style="margin:0;font-size:0.92rem;">We operate exclusively in the Kansas City metro. Our crews know these neighborhoods, these soil types, these seasonal patterns. When we show up at your property, we&rsquo;re not working from a generic playbook &mdash; we&rsquo;re working from local knowledge built through mowing and maintaining KC lawns week after week.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="about-reviews-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Client Experiences</span>
      <h2 id="about-reviews-h">What Kansas City Homeowners Say About Us</h2>
      <p>Our clients across Overland Park, Kansas City, Olathe, Lee&rsquo;s Summit, and the rest of the metro choose Mulch Ado for the consistency, transparency, and results they can count on.</p>
    </div>
    ${trustCards()}
  </div>
</section>

<section class="section-alt" aria-labelledby="about-faq-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Frequently Asked</span>
      <h2 id="about-faq-h">Questions About Mulch Ado&rsquo;s Lawn Care Service</h2>
    </div>
    <div class="faq-list" style="max-width:800px;margin:0 auto;">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What makes Mulch Ado different from other Kansas City lawn care companies?</button>
        <div class="faq-answer"><p>Three things set us apart: same-crew consistency (your assigned crew returns every visit), all-in flat pricing (the quote you receive is the final price, no add-ons), and photo confirmation when each job is finished. Most Kansas City lawn care companies rotate crews, add fees after the fact, and don&rsquo;t communicate proactively. We built the business to fix all three of those problems.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Are you licensed and insured for Kansas City metro lawn care?</button>
        <div class="faq-answer"><p>Yes &mdash; Mulch Ado About Nothing Lawn Care is fully insured and locally operated. We carry liability insurance and are licensed to operate across both the Missouri and Kansas sides of the Kansas City metro. We cover 10 cities: Kansas City MO, Overland Park KS, Olathe KS, Lee&rsquo;s Summit MO, Independence MO, Lenexa KS, Shawnee KS, Liberty MO, Blue Springs MO, and Raymore MO.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Do you handle lawn care for both residential and HOA properties?</button>
        <div class="faq-answer"><p>We focus exclusively on residential properties across the Kansas City metro. Many of our clients are in HOA-governed communities in Overland Park, Olathe, Lenexa, and Shawnee, where appearance standards are enforced. We know these requirements and consistently meet them &mdash; edging lines, height standards, cleanup expectations and all.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What types of grass do Kansas City lawns typically have?</button>
        <div class="faq-answer"><p>The Kansas City metro is in the cool-season/warm-season transition zone, but the vast majority of residential lawns run tall fescue &mdash; a cool-season grass that thrives in spring and fall but struggles through the heat and drought of July and August. Understanding fescue&rsquo;s growth cycle is central to how we time aeration, overseeding, and fertilization. We don&rsquo;t apply a warm-season grass schedule to a cool-season lawn.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What is the best time of year to start lawn care service in Kansas City?</button>
        <div class="faq-answer"><p>For most Kansas City homeowners, the ideal start point is early spring (March or April) for the first mowing, pre-emergent application, and spring cleanup. Fall (September through October) is the most critical window for aeration, overseeding, and fall fertilization &mdash; what you do in fall determines how well your fescue comes back the following spring. We can start service at any point in the season and build from there.</p></div>
      </div>
    </div>
  </div>
</section>

${founderQuote()}

${ctaSection()}`;

  return page(title, desc, '/about/', '/images/og-default.jpg', body, schema);
}

// ─── CONTACT PAGE ─────────────────────────────────────────────────────────────
function buildContactPage() {
  const title = `Kansas City Lawn Care Quote | Free Estimate | Mulch Ado`;
  const desc  = `Request a free lawn care estimate in Kansas City metro — same-day response, flat all-in pricing, no contracts. Call (816) 555-0147.`;

  const schema = [
    localBusinessSchema({ description: desc }),
    breadcrumbSchema([
      { label: 'Home', href: '/' },
      { label: 'Contact', href: '/contact/' }
    ])
  ];

  const svcOpts = SERVICES.map(s=>`<option value="${s.name}">${s.name}</option>`).join('');

  const body = `
${breadcrumb([
  { label: 'Home', href: '/' },
  { label: 'Contact', href: '/contact/' }
])}

<section class="kg-page-header">
  <div class="container">
    <img src="/images/hero-bg.jpg" alt="Professional lawn care team servicing a Kansas City metro residential property" style="width:100%;max-width:800px;border-radius:8px;margin-bottom:24px;display:block;">
    <h1>Kansas City Lawn Care Estimates: Free Quotes, Same-Day Response</h1>
    <p>Get a flat, all-in lawn care quote for your Kansas City metro home &mdash; same-day response, no contracts, same crew every visit. Call (816) 555-0147 or fill out the form below.</p>
    <div class="kg-trust-bar" style="margin-top:20px;">
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Fully insured &amp; licensed</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Same-day estimate response</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> No contracts required</div>
      <div class="kg-trust-item"><span class="trust-icon">&#10003;</span> Kansas City metro &mdash; MO &amp; KS sides</div>
    </div>
  </div>
</section>

<section>
  <div class="container">
    <div class="kg-two-col">

      <div class="gsap-fade-left">
        <h2>Request a Free Estimate</h2>
        <p>Fill out the form and we&rsquo;ll get back to you with a flat, all-in quote for your property. Same-day response during business hours.</p>
        <div class="kg-form-wrapper">
        <form class="kg-form" action="/submit" method="POST" id="contact-form">
          <div class="kg-form-row">
            <div class="kg-form-group">
              <label for="cf-name">Full Name</label>
              <input type="text" id="cf-name" name="name" placeholder="Your full name" required autocomplete="name">
            </div>
            <div class="kg-form-group">
              <label for="cf-phone">Phone Number</label>
              <input type="tel" id="cf-phone" name="phone" placeholder="(816) 555-0000" autocomplete="tel">
            </div>
          </div>
          <div class="kg-form-row">
            <div class="kg-form-group">
              <label for="cf-email">Email Address</label>
              <input type="email" id="cf-email" name="email" placeholder="you@email.com" autocomplete="email">
            </div>
            <div class="kg-form-group">
              <label for="cf-city">City</label>
              <input type="text" id="cf-city" name="city" placeholder="Your city" autocomplete="address-level2">
            </div>
          </div>
          <div class="kg-form-group">
            <label for="cf-service">Service Needed</label>
            <select id="cf-service" name="service">
              <option value="">Select a service (optional)</option>
              ${svcOpts}
            </select>
          </div>
          <div class="kg-form-group">
            <label for="cf-message">Tell Us About Your Lawn</label>
            <textarea id="cf-message" name="message" rows="5" placeholder="Describe your lawn, what you need, any specific concerns, yard size, etc."></textarea>
          </div>
          <div class="cf-turnstile" data-sitekey="${CLIENT.turnstileSiteKey}"></div>
          <button type="submit" class="btn btn-primary" id="contact-btn" style="width:100%;justify-content:center;font-size:1.05rem;padding:16px 28px;">Send Request</button>
          <p class="kg-form-note" style="font-size:0.82rem;color:var(--kg-text-light);text-align:center;margin-top:10px;">We respond the same business day. No spam, ever.</p>
        </form>
        </div>
        <div id="contact-success" style="display:none;min-height:200px;flex-direction:column;align-items:center;justify-content:center;text-align:center;border:1px solid var(--kg-border);border-radius:8px;padding:32px;">
          <div style="font-size:3rem;margin-bottom:16px;color:var(--kg-primary);">&#10003;</div>
          <h3 style="margin-bottom:8px;">Got It &mdash; You&rsquo;re All Set</h3>
          <p>We received your request and will follow up before end of business today. Check your phone or email.</p>
        </div>
      </div>

      <div class="gsap-fade-right">
        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:28px;margin-bottom:24px;">
          <h3 style="margin-bottom:20px;">Contact Information</h3>
          <ul style="list-style:none;padding:0;">
            <li style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;">
              <span style="font-size:1.3rem;color:var(--kg-primary);margin-top:2px;">&#128222;</span>
              <div>
                <div style="font-weight:700;margin-bottom:2px;">Phone / Text</div>
                <a href="tel:${CLIENT.phoneTel}" style="color:var(--kg-primary);font-size:1.2rem;font-weight:700;">${CLIENT.phone}</a>
                <div style="font-size:0.82rem;color:var(--kg-text-light);margin-top:2px;">Call or text anytime during business hours</div>
              </div>
            </li>
            <li style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;">
              <span style="font-size:1.3rem;color:var(--kg-primary);margin-top:2px;">&#9993;</span>
              <div>
                <div style="font-weight:700;margin-bottom:2px;">Email</div>
                <a href="mailto:greg@muchadolawncare.com" style="color:var(--kg-primary);">greg@muchadolawncare.com</a>
              </div>
            </li>
            <li style="display:flex;gap:14px;align-items:flex-start;margin-bottom:18px;">
              <span style="font-size:1.3rem;color:var(--kg-primary);margin-top:2px;">&#128336;</span>
              <div>
                <div style="font-weight:700;margin-bottom:2px;">Business Hours</div>
                <div>${CLIENT.hours}</div>
              </div>
            </li>
            <li style="display:flex;gap:14px;align-items:flex-start;">
              <span style="font-size:1.3rem;color:var(--kg-primary);margin-top:2px;">&#128205;</span>
              <div>
                <div style="font-weight:700;margin-bottom:2px;">Service Area</div>
                <div>Kansas City metro &mdash; Missouri &amp; Kansas</div>
                <div style="font-size:0.82rem;color:var(--kg-text-light);margin-top:4px;">KC &bull; Overland Park &bull; Olathe &bull; Lee&rsquo;s Summit &bull; Independence &bull; Lenexa &bull; Shawnee &bull; Liberty &bull; Blue Springs &bull; Raymore</div>
              </div>
            </li>
          </ul>
        </div>

        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:24px;margin-bottom:24px;">
          <h4 style="margin-bottom:12px;">&#128205; Kansas City Metro Area</h4>
          <a href="https://maps.google.com/?q=Kansas+City,+MO" target="_blank" rel="noopener" class="btn btn-outline" style="width:100%;justify-content:center;">Get Directions</a>
        </div>

        <div style="background:var(--kg-bg-alt);border-radius:8px;padding:24px;">
          <h4 style="margin-bottom:12px;">Why Customers Choose Us</h4>
          <ul style="list-style:none;padding:0;">
            <li style="display:flex;gap:10px;margin-bottom:10px;"><span style="color:var(--kg-primary);">&#10003;</span> Same crew every visit</li>
            <li style="display:flex;gap:10px;margin-bottom:10px;"><span style="color:var(--kg-primary);">&#10003;</span> All-in pricing, no surprises</li>
            <li style="display:flex;gap:10px;margin-bottom:10px;"><span style="color:var(--kg-primary);">&#10003;</span> No contracts required</li>
            <li style="display:flex;gap:10px;margin-bottom:10px;"><span style="color:var(--kg-primary);">&#10003;</span> Text + photos when done</li>
            <li style="display:flex;gap:10px;"><span style="color:var(--kg-primary);">&#10003;</span> Local crew only &mdash; no subs</li>
          </ul>
        </div>
      </div>

    </div>
  </div>
</section>

<script src="https://challenges.cloudflare.com/turnstile/v0/api.js" async defer></script>
<script>
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('contact-form');
  const btn  = document.getElementById('contact-btn');
  const success = document.getElementById('contact-success');
  if (!form) return;
  form.addEventListener('submit', async e => {
    e.preventDefault();
    btn.disabled = true; btn.textContent = 'Sending...';
    try {
      const res = await fetch('/submit', { method:'POST', body: new FormData(form) });
      const data = await res.json();
      if (data.ok) {
        form.style.display = 'none';
        if (success) { success.style.display = 'flex'; }
      } else { btn.disabled = false; btn.textContent = 'Send Request'; alert(data.error || 'Error. Please try again.'); }
    } catch { btn.disabled = false; btn.textContent = 'Send Request'; alert('Network error. Please try again.'); }
  });
});
</script>

<section class="section-alt" aria-labelledby="contact-faq-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <h2 id="contact-faq-h">Common Questions About Getting Started</h2>
    </div>
    <div class="faq-list" style="max-width:800px;margin:0 auto;">
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">How fast can I get a lawn care estimate in the Kansas City metro?</button>
        <div class="faq-answer"><p>Same-business-day response for most requests submitted before 3pm. Call or text (816) 555-0147 for the fastest response. Online form requests receive a reply by end of business. We provide flat, all-in quotes for properties across Kansas City MO, Overland Park KS, Olathe, Lee&rsquo;s Summit, Independence, Lenexa, Shawnee, Liberty, Blue Springs, and Raymore &mdash; the price you see is the price you pay.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What makes lawn care in Kansas City harder than other markets?</button>
        <div class="faq-answer"><p>Kansas City sits in the cool-season/warm-season transition zone, which means most residential lawns run tall fescue &mdash; a cool-season grass that performs well in spring and fall but gets heat-stressed in July and August. The region also has heavy clay soil that compacts easily under mowing equipment, blocking water and fertilizer from reaching roots. This is why we prioritize fall aeration and overseeding so strongly here &mdash; the September through October window is the highest-leverage lawn care investment a Kansas City homeowner can make.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What cities in the Kansas City metro do you serve?</button>
        <div class="faq-answer"><p>We serve Kansas City MO, Overland Park KS, Olathe KS, Lee&rsquo;s Summit MO, Independence MO, Lenexa KS, Shawnee KS, Liberty MO, Blue Springs MO, and Raymore MO. If you&rsquo;re in the KC metro and not sure if we cover your area, just call or text and we&rsquo;ll let you know right away.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Do I need to sign a contract to use your lawn care service?</button>
        <div class="faq-answer"><p>No contracts. Period. We operate on a service-by-service basis &mdash; or you can set up a regular schedule (weekly, bi-weekly, or seasonal) and adjust or cancel at any time. No penalty, no hassle. The commitment is ours to deliver excellent work, not yours to stay locked in.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">How does the &ldquo;same crew every visit&rdquo; promise work?</button>
        <div class="faq-answer"><p>When you become a regular client, you&rsquo;re assigned a specific crew. That crew handles your property each scheduled visit. They learn your gate code, know which corner gets muddy, notice when something looks off. This consistency is one of the most common things our clients mention when they refer us to their neighbors.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">What is &ldquo;all-in pricing&rdquo; and how does it work?</button>
        <div class="faq-answer"><p>When we quote a price, that&rsquo;s the full price &mdash; edging, blowing, cleanup, everything included. No separate charge for bagging clippings. No &ldquo;fuel surcharge&rdquo; added after the fact. No surprise add-ons for things we noticed while we were there. You know exactly what the job costs before we start, and that&rsquo;s the amount you pay.</p></div>
      </div>
      <div class="faq-item">
        <button class="faq-question" aria-expanded="false">Will I know when my lawn has been serviced?</button>
        <div class="faq-answer"><p>Yes. Every visit ends with a text message and photos of the completed work sent to the contact number on file. You don&rsquo;t need to be home. You don&rsquo;t need to check in. You&rsquo;ll know the moment the crew finishes &mdash; with proof that it was done right.</p></div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="contact-trust-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Kansas City Lawn Care</span>
      <h2 id="contact-trust-h">What You Can Expect From Mulch Ado</h2>
    </div>
    <div class="kg-two-col">
      <div>
        <p>Kansas City lawns deal with a specific set of challenges: heavy clay soil that compacts easily, hot summers that stress cool-season fescue, and a fall window that&rsquo;s critical for aeration and overseeding. On the Kansas side, Johnson County HOAs hold properties to strict visual standards. On the Missouri side, neighborhoods like Brookside, Waldo, and the historic districts of Independence have mature trees that generate significant fall leaf volume.</p>
        <p>We built Mulch Ado About Nothing Lawn Care to handle all of it &mdash; consistently, on schedule, with the same crew showing up every time. Whether you&rsquo;re in Overland Park managing an HOA lawn or in Blue Springs dealing with post-storm leaf cleanup, the process is the same: flat quote, scheduled crew, photo confirmation when done.</p>
        <p>The estimate process is simple. You call or fill out the form above. We look at your property and your service request. We give you a flat price that covers everything. If you want to schedule, we lock in your crew and your service day. There are no commitments beyond each visit &mdash; you can adjust frequency or pause anytime.</p>
      </div>
      <div>
        <div class="kg-highlight" style="margin-bottom:24px;">
          <h4 style="margin:0 0 10px 0;">Kansas City Lawn Care &mdash; At a Glance</h4>
          <ul style="list-style:none;padding:0;margin:0;">
            <li style="padding:8px 0;border-bottom:1px solid var(--kg-border);"><strong>Service Area:</strong> 10 KC metro cities (MO + KS side)</li>
            <li style="padding:8px 0;border-bottom:1px solid var(--kg-border);"><strong>Services:</strong> Mowing, fertilization, aeration, mulching, edging, leaf removal, shrub trimming, sod, gutter cleaning, spring/fall cleanup</li>
            <li style="padding:8px 0;border-bottom:1px solid var(--kg-border);"><strong>Pricing:</strong> Flat, all-in quotes &mdash; no add-ons</li>
            <li style="padding:8px 0;border-bottom:1px solid var(--kg-border);"><strong>Crew:</strong> Same crew each visit, local employees only</li>
            <li style="padding:8px 0;border-bottom:1px solid var(--kg-border);"><strong>Contract:</strong> None required</li>
            <li style="padding:8px 0;"><strong>Confirmation:</strong> Text + photos after every visit</li>
          </ul>
        </div>
        <div style="text-align:center;">
          <a href="tel:${CLIENT.phoneTel}" class="btn btn-primary" style="width:100%;justify-content:center;font-size:1.1rem;">&#9742; Call ${CLIENT.phone}</a>
          <p style="font-size:0.85rem;color:var(--kg-text-light);margin-top:10px;">${CLIENT.hours}</p>
        </div>
        <div style="margin-top:24px;padding-top:20px;border-top:1px solid var(--kg-border);">
          <address itemscope itemtype="https://schema.org/LocalBusiness" style="font-style:normal;font-size:0.9rem;">
            <div itemprop="name" style="font-weight:700;margin-bottom:6px;">${CLIENT.name}</div>
            <div itemprop="address" style="color:var(--kg-text-light);">Serving Kansas City Metro, MO &amp; KS</div>
            <div style="margin-top:4px;"><a itemprop="telephone" href="tel:${CLIENT.phoneTel}">${CLIENT.phone}</a></div>
            <div style="margin-top:4px;"><a href="mailto:${CLIENT.email}">${CLIENT.email}</a></div>
            <div itemprop="openingHours" style="margin-top:4px;color:var(--kg-text-light);font-size:0.82rem;">${CLIENT.hours}</div>
            <div style="margin-top:6px;font-size:0.8rem;color:var(--kg-text-light);">Fully Insured &bull; Licensed &amp; Locally Operated</div>
          </address>
        </div>
      </div>
    </div>
  </div>
</section>

<section aria-labelledby="contact-neighborhoods-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Where We Work</span>
      <h2 id="contact-neighborhoods-h">Kansas City Metro Neighborhoods We Serve</h2>
      <p>We work in neighborhoods across both sides of the state line. Whether you&rsquo;re in a HOA-governed Overland Park subdivision, a Brookside/Waldo bungalow, a Northland acreage, or a new development in Raymore or Blue Springs &mdash; we know those neighborhoods and what their lawns typically need.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:12px;font-size:0.9rem;">
      <div class="kg-card" style="padding:14px;"><strong>Kansas City, MO</strong><br><span style="color:var(--kg-text-light);">Brookside, Waldo, Northland, Midtown</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Overland Park, KS</strong><br><span style="color:var(--kg-text-light);">Blue Valley, Metcalf corridor, OP subdivisions</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Olathe, KS</strong><br><span style="color:var(--kg-text-light);">Ridgepointe, Cedar Creek, Sunstone</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Lee&rsquo;s Summit, MO</strong><br><span style="color:var(--kg-text-light);">Longview Lake, Falls of Winterset, Chapel Ridge</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Independence, MO</strong><br><span style="color:var(--kg-text-light);">Historic Square area, Little Blue River corridor</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Lenexa, KS</strong><br><span style="color:var(--kg-text-light);">Millennia, Falcon Valley, Prairie Star, K-10</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Shawnee, KS</strong><br><span style="color:var(--kg-text-light);">Shawnee Mission Park area, Woodland Spring</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Liberty, MO</strong><br><span style="color:var(--kg-text-light);">Historic Square, I-35 corridor, Liberty Landing</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Blue Springs, MO</strong><br><span style="color:var(--kg-text-light);">Lake Village, Shiloh Springs, Stoney Creek</span></div>
      <div class="kg-card" style="padding:14px;"><strong>Raymore, MO</strong><br><span style="color:var(--kg-text-light);">Creekmoor, new Raymore residential developments</span></div>
    </div>
  </div>
</section>

<section aria-labelledby="contact-services-h" class="section-alt">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Our Lawn Care Services</span>
      <h2 id="contact-services-h">Kansas City Lawn Care Services We Offer</h2>
      <p>When you contact us, let us know which service you need. We cover all major lawn care services across the Kansas City metro &mdash; both Missouri and Kansas sides.</p>
    </div>
    <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:16px;">
      <div class="kg-card" style="padding:16px;"><strong>Lawn Mowing</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Weekly or bi-weekly, edging included</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Fertilization &amp; Lawn Treatment</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Seasonal program, NPK-balanced</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Mulching &amp; Landscaping</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">All-in quote per cubic yard installed</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Aeration &amp; Overseeding</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Fall window: September through October</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Edging &amp; Trimming</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Curb &amp; bed lines, HOA-ready finish</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Leaf Removal</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">One-time or full-season scheduled cleanup</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Hedge &amp; Shrub Trimming</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Shaping, deadheading, cleanup included</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Sod Installation</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Tall fescue and zoysia for KC lawns</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Gutter Cleaning</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Spring and fall service available</span></div>
      <div class="kg-card" style="padding:16px;"><strong>Spring &amp; Fall Cleanup</strong><br><span style="font-size:0.85rem;color:var(--kg-text-light);">Comprehensive seasonal property refresh</span></div>
    </div>
    <p style="margin-top:20px;text-align:center;font-size:0.9rem;color:var(--kg-text-light);">All services available across Kansas City MO, Overland Park KS, Olathe KS, Lee&rsquo;s Summit MO, Independence MO, Lenexa KS, Shawnee KS, Liberty MO, Blue Springs MO, and Raymore MO. Fully insured &mdash; licensed &amp; locally operated.</p>
  </div>
</section>

<section aria-labelledby="contact-reviews-h">
  <div class="container">
    <div class="section-title gsap-fade">
      <span class="section-label">Why Homeowners Choose Us</span>
      <h2 id="contact-reviews-h">What to Expect When You Reach Out</h2>
      <p>Hundreds of Kansas City metro homeowners have trusted Mulch Ado About Nothing Lawn Care for consistent, transparent lawn service. Here&rsquo;s what they say:</p>
    </div>
    ${trustCards()}
  </div>
</section>

${founderQuote()}`;

  return page(title, desc, '/contact/', '/images/og-default.jpg', body, schema);
}

module.exports = { buildAboutPage, buildContactPage };
