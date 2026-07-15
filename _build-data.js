'use strict';
/**
 * _build-data.js — Mulch Ado About Nothing Lawn Care
 * Scaffolded by scaffold-build-data.js, content filled by Norris Jr on 2026-06-29
 */

const CLIENT = {
  name:           'Mulch Ado About Nothing Lawn Care',
  nameShort:      'Mulch Ado',
  tagline:        'Same crew. All-in pricing. Done right.',
  phone:          '(816) 555-0147',
  phoneTel:       '8165550147',
  email:          'tylernorris@me.com',
  address:        'Kansas City, MO Metro Area',
  domain:         'muchadolawncare.com',
  hours:          'Mon&ndash;Sat 7am&ndash;6pm',
  founderName:    'Greg',
  founded:        '',
  license:        '',
  facebook:       'https://facebook.com/muchadolawncare',
  instagram:      'https://instagram.com/muchadolawncare',
  gbp:            'https://g.page/muchadolawncareKC',
  primaryColor:   '#2D6A2D',
  secondaryColor: '#F5C518',
  primaryCity:    'Kansas City MO',
  reviewsUrl:     'https://www.google.com/maps/place/Vandenberg+Construction/@47.282871,-116.5610293,804m/data=!3m2!1e3!4b1!4m6!3m5!1s0x87bbb3766ca375b9:0x7e7386876292cc62!8m2!3d47.282871!4d-116.558449!16s%2Fg%2F11d_7scccz?entry=ttu&g_ep=EgoyMDI2MDYyNC4wIKXMDSoASAFQAw%3D%3D',
  turnstileSiteKey: '0x4AAAAAADs34A6rVp7KOWir',
};

const DIFFERENTIATORS = [
  {
    title: 'We Show Up',
    body: 'No ghosting, no rescheduling without notice. When we say Monday at 8am, we mean Monday at 8am. Your lawn gets done when we say it will.'
  },
  {
    title: 'All-In Pricing',
    body: 'The price we quote is the price you pay. No surprise add-ons, no &ldquo;we saw this while we were there&rdquo; upsells. Every job is priced clearly before we start.'
  },
  {
    title: 'Local Crew Only',
    body: 'No subcontractors, ever. Every crew member works for Mulch Ado About Nothing Lawn Care directly. We hire locally, train in-house, and hold our people accountable.'
  },
  {
    title: 'Same Crew Every Time',
    body: 'You&rsquo;ll see the same faces visit after visit. They know your gate code, your dog&rsquo;s name, and which corner of the yard needs extra attention. That consistency shows in the results.'
  },
  {
    title: 'Photo Updates When We&rsquo;re Done',
    body: 'When the job is finished, you get a text with photos. No wondering if we came. No waiting around. Just confirmation that your yard looks exactly how it should.'
  }
];

let REVIEWS = [];
try {
  const _rv = require('./data/reviews.json');
  if (_rv.reviews && _rv.reviews.length > 0) REVIEWS = _rv.reviews;
} catch(e) {}

const SERVICES = [
  {
    slug: 'lawn-mowing',
    name: 'Lawn Mowing',
    shortDesc: 'Reliable weekly or bi-weekly mowing with clean edging and blowdown &mdash; same crew, every visit.',
    icon: '🌿',
    costRange: '$40&ndash;$75 per visit',
    intro: 'Kansas City lawns sit in the transition zone between cool-season and warm-season grasses, which means mowing height and frequency change across the season &mdash; what works in May is not what your fescue needs in July. Mulch Ado About Nothing Lawn Care runs consistent crews through the entire Kansas City metro, so the same team that knows your yard in April is still the one mowing it in October. No contracts, no surprises on the bill &mdash; just a reliably cut lawn with before and after text updates.',
    commonCosts: [
      { item: 'Small lot (under 5,000 sq ft)', low: '$40', high: '$55' },
      { item: 'Average residential lot (5,000&ndash;10,000 sq ft)', low: '$50', high: '$70' },
      { item: 'Large residential lot (10,000&ndash;15,000 sq ft)', low: '$65', high: '$85' },
    ],
    faqs: [
      {
        q: 'How often should I have my Kansas City lawn mowed?',
        a: 'Most Kansas City lawns need mowing every 7 days from April through June when fescue is actively growing. During the hottest part of July and August, you may drop to every 10&ndash;14 days as cool-season grasses slow down. Warm-season grasses like Zoysia keep a more consistent weekly schedule through summer. We adjust frequency based on actual growth, not a rigid calendar.'
      },
      {
        q: 'What does lawn mowing cost in Kansas City?',
        a: 'A typical Kansas City residential lawn runs $40&ndash;$75 per visit, depending on lot size and any extras like edging and blowdown. We quote a flat all-in rate before we start &mdash; there are no separate charges for edging or cleanup at the end. Your quote is your price.'
      },
      {
        q: 'Do I need to be home when you mow?',
        a: 'No. Most of our customers are at work when we come. We just need gate access if your backyard is fenced &mdash; we&rsquo;ll confirm your gate code or lock situation when we set up service. When we&rsquo;re done, you&rsquo;ll get a text with photos of the finished yard.'
      },
      {
        q: 'What mowing height is best for fescue lawns in Kansas City?',
        a: 'Tall fescue should be mowed at 3.5&ndash;4 inches during the spring and fall growing seasons, and raised to 4&ndash;4.5 inches during July and August heat stress. Cutting fescue too short in summer scalps the lawn and causes brown patches that take weeks to recover. We set our decks correctly for your grass type and the time of year.'
      },
      {
        q: 'Does Mulch Ado About Nothing Lawn Care require a mowing contract?',
        a: 'No contracts required. We operate on a per-visit or seasonal schedule &mdash; whatever fits how you want to manage your yard. You can pause, stop, or adjust frequency at any time. If you need a one-time cut before a home sale or family event, we can usually fit that in with advance notice.'
      }
    ]
  },

  {
    slug: 'fertilization-and-lawn-treatment',
    name: 'Fertilization &amp; Lawn Treatment',
    shortDesc: 'A 5&ndash;6 application program built for KC&rsquo;s clay soil and transition-zone grass types.',
    icon: '🌱',
    costRange: '$350&ndash;$600 per season (full program)',
    intro: 'The Kansas City metro sits in the transition zone between cool-season and warm-season grass, and the clay-heavy soil across most of the metro adds another layer of complexity &mdash; applications timed for Wichita or St. Louis will not produce the same results here. Mulch Ado About Nothing Lawn Care runs a 5&ndash;6 application program timed to Kansas City&rsquo;s actual growing seasons: pre-emergent in early spring before crabgrass germinates, slow-release nitrogen applications through the active growth season, grub prevention in early summer, and a fall feeding that strengthens fescue roots before winter. All-in pricing means the quote you get is the total for the season &mdash; no per-application add-ons.',
    commonCosts: [
      { item: 'Full 5-application season program (avg lot)', low: '$350', high: '$500' },
      { item: 'Full 6-application season program (avg lot)', low: '$425', high: '$600' },
      { item: 'Individual application (spot treatment)', low: '$75', high: '$120' },
    ],
    faqs: [
      {
        q: 'When should I apply pre-emergent weed control in Kansas City?',
        a: 'Pre-emergent for crabgrass in Kansas City should go down when soil temperatures consistently hit 50&ndash;55&deg;F &mdash; typically late February to mid-March. That usually corresponds with forsythia blooming in the KC area. Missing this window means crabgrass seeds germinate and the pre-emergent won&rsquo;t stop them. We track soil temperatures and apply at the right time, not on a fixed calendar date.'
      },
      {
        q: 'How much does a lawn fertilization program cost in Kansas City?',
        a: 'A full 5&ndash;6 application lawn treatment program for an average Kansas City residential lot runs $350&ndash;$600 for the season. That includes pre-emergent weed control, fertilization rounds, and a fall feeding. Our pricing is all-in &mdash; no separate charges per application, no surprises at the end of the year.'
      },
      {
        q: 'Does Kansas City clay soil need different fertilizer than other areas?',
        a: 'Yes. Clay soil holds nutrients longer than sandy or loam soils, so heavy nitrogen applications that work elsewhere can burn KC lawns. The right approach is moderate, slow-release nitrogen at correctly spaced intervals. Clay also compacts, which limits fertilizer uptake &mdash; pairing fertilization with annual aeration dramatically improves results on Kansas City lawns.'
      },
      {
        q: 'What is included in a 5-application lawn treatment program in Kansas City?',
        a: 'A standard 5-application program covers: (1) Early spring pre-emergent + light feeding, (2) Late spring fertilization + broadleaf weed control, (3) Early summer grub prevention + spot weed treatment, (4) Late summer/early fall lawn recovery feeding, (5) Late fall winterizer to strengthen roots. We confirm the program details and timing before the season starts.'
      },
      {
        q: 'Can Mulch Ado About Nothing Lawn Care treat my lawn without a long-term contract?',
        a: 'Yes. We offer seasonal programs with no year-to-year contracts. You choose the season program, we apply at the right times, and you pay as we go. No early termination fees, no locked-in multi-year commitments. Most customers re-enroll each spring because the results speak for themselves, not because they have to.'
      }
    ]
  },

  {
    slug: 'mulching-and-landscaping',
    name: 'Mulching &amp; Landscaping',
    shortDesc: 'Fresh mulch installation for beds and borders &mdash; quoted all-in, installed by the same local crew.',
    icon: '🪴',
    costRange: '$75&ndash;$120 per cubic yard installed',
    intro: 'Fresh mulch does more than make landscape beds look sharp &mdash; in Kansas City&rsquo;s clay-heavy soil, a 2&ndash;3-inch layer of hardwood mulch regulates moisture, prevents the surface crusting that chokes out plant roots, and suppresses the weeds that thrive in KC&rsquo;s warm, wet springs. Mulch Ado About Nothing Lawn Care installs mulch across the Kansas City metro with the same all-in pricing approach: the cubic yard quote covers material, delivery, and installation. No separate delivery fees, no labor add-ons.',
    commonCosts: [
      { item: 'Hardwood mulch installed (per cubic yard)', low: '$75', high: '$100' },
      { item: 'Premium dyed mulch installed (per cubic yard)', low: '$90', high: '$120' },
      { item: 'Average 3-bedroom home bed refresh (5&ndash;8 yards)', low: '$400', high: '$800' },
    ],
    faqs: [
      {
        q: 'How much mulch do I need for my Kansas City landscape beds?',
        a: 'A 2&ndash;3 inch layer is the standard for Kansas City beds. To calculate cubic yards: measure bed length &times; width in feet, multiply by 0.25 (for 3 inches), then divide by 27. Most average suburban lots in the KC metro need 4&ndash;8 cubic yards for a full bed refresh. We measure your beds and give you an exact quote before we start.'
      },
      {
        q: 'What type of mulch is best for Kansas City gardens and landscape beds?',
        a: 'Hardwood shredded mulch is the most common and practical choice for Kansas City &mdash; it breaks down slowly, holds moisture well in clay soil, and resists blowing in KC&rsquo;s frequent spring winds. Cedar mulch is a good option for beds near the foundation where insect deterrence matters. Dyed mulch holds color longer but costs slightly more. We can walk you through options when we quote the job.'
      },
      {
        q: 'How often should I replace mulch in Kansas City?',
        a: 'Most Kansas City landscape beds need a fresh layer every 1&ndash;2 years. Mulch breaks down into the soil over time, which is actually good for the soil structure, but once the layer drops below 1 inch, weeds push through and moisture retention suffers. Spring is peak season &mdash; we book fast in March and April.'
      },
      {
        q: 'Does mulching help with Kansas City clay soil problems?',
        a: 'Significantly. Kansas City clay soil forms a hard crust when it dries, which blocks oxygen and water from reaching plant roots. A consistent mulch layer prevents that surface crust from forming, holds moisture through the hot dry spells in July and August, and moderates the soil temperature swings that stress plants during KC&rsquo;s extreme summer heat.'
      },
      {
        q: 'Can Mulch Ado About Nothing Lawn Care do both mulch and bed edging in one visit?',
        a: 'Yes, and most customers pair them. We crisp up the bed edges before laying fresh mulch &mdash; a clean edge line makes the mulch look dramatically better and takes just a few extra minutes when we&rsquo;re already set up. We quote both together as a single job.'
      }
    ]
  },

  {
    slug: 'aeration-and-overseeding',
    name: 'Aeration &amp; Overseeding',
    shortDesc: 'Core aeration and fescue overseeding for Kansas City&rsquo;s clay-compacted lawns &mdash; the most impactful service of the year.',
    icon: '🌾',
    costRange: '$175&ndash;$350 for average residential lot',
    intro: 'Kansas City&rsquo;s clay-heavy soil compacts under foot traffic and mowing equipment, cutting off the oxygen and water movement that grass roots need. Annual core aeration punches 2&ndash;3 inch holes across the lawn surface and breaks up that compaction &mdash; and fall is the only correct window to pair it with fescue overseeding before winter establishes the new seed. Mulch Ado About Nothing Lawn Care handles both in one visit: core aeration pulls plugs across the entire lawn, and overseeding follows immediately into the loosened soil. The result is a measurably denser, healthier lawn by the following spring.',
    commonCosts: [
      { item: 'Core aeration only (avg 8,000 sq ft lot)', low: '$100', high: '$175' },
      { item: 'Aeration + overseeding (avg 8,000 sq ft lot)', low: '$175', high: '$275' },
      { item: 'Aeration + overseeding (large lot 12,000&ndash;15,000 sq ft)', low: '$250', high: '$350' },
    ],
    faqs: [
      {
        q: 'When is the best time to aerate and overseed in Kansas City?',
        a: 'For fescue lawns &mdash; the most common grass type in Kansas City &mdash; the window is September 1 through October 15. Soil temperatures are cooling but still warm enough for germination (65&ndash;70&deg;F), and the new seed has 6&ndash;8 weeks to establish before the first hard frost. Aerating in spring is possible but risks disturbing seed that hasn&rsquo;t established and competes with spring weed pressure.'
      },
      {
        q: 'How much does aeration and overseeding cost in Kansas City?',
        a: 'Core aeration alone on an average Kansas City residential lot (around 8,000 sq ft) runs $100&ndash;$175. Adding overseeding brings the total to $175&ndash;$275. We quote the job based on your actual lawn size &mdash; same all-in pricing approach we use for every service.'
      },
      {
        q: 'Why does Kansas City clay soil need annual aeration?',
        a: 'Clay particles are fine and pack tightly under any consistent pressure &mdash; mowing equipment, kids, dogs, even foot traffic. That compaction closes the pore spaces in the soil that grass roots need for oxygen and water. A core aerator pulls 2&ndash;3 inch plugs from the surface and lets those channels refill with air and water. In Kansas City&rsquo;s heavy clay, skipping aeration for 2&ndash;3 years results in visibly thinner turf and increased weed pressure.'
      },
      {
        q: 'What type of grass seed is best for overseeding a Kansas City lawn?',
        a: 'Tall fescue is the right answer for almost all Kansas City residential lawns. It handles both the summer heat and the winter cold in KC&rsquo;s transition zone, tolerates the clay soil well, and holds up to moderate traffic. We use improved turf-type tall fescue blends &mdash; not the wide-blade pasture fescue you&rsquo;d find at a big box store. Zoysia lawns are overseeded differently (or not at all); we discuss the right approach when we evaluate your specific lawn.'
      },
      {
        q: 'Do I need to water after aeration and overseeding in Kansas City?',
        a: 'Yes, and it&rsquo;s the most critical part of getting the seed to germinate. For the first 2 weeks after overseeding, the seed needs to stay moist &mdash; light watering twice a day (15 minutes each) is the standard approach. After germination, you transition to deeper, less frequent watering to push roots down. We walk through the watering schedule when we finish the job.'
      }
    ]
  },

  {
    slug: 'edging-and-trimming',
    name: 'Edging &amp; Trimming',
    shortDesc: 'Clean bed edges and sharp string-trimming on every mowing visit &mdash; no extra charge, no asking twice.',
    icon: '✂️',
    costRange: 'Included with mowing; standalone visits from $75',
    intro: 'In the Kansas City metro, the line between a lawn that gets noticed and one that just gets cut is almost always edging. Bed edges that creep 2&ndash;3 inches into the lawn, grass growing over sidewalks, and unkempt borders around mailbox posts and trees &mdash; these details define curb appeal in neighborhoods from Brookside to Blue Valley. Mulch Ado About Nothing Lawn Care includes full edging and string-trimming with every mowing visit. The bed edges get cut, the sidewalk border gets trimmed, and the crew blows off the hardscaping before they leave. That&rsquo;s not an add-on; it&rsquo;s how the job is supposed to be done.',
    commonCosts: [
      { item: 'Edging and trimming included with mowing visit', low: '$0', high: '$0 extra' },
      { item: 'Standalone edging / trimming only visit', low: '$75', high: '$150' },
      { item: 'Bed re-edging (beds have grown over significantly)', low: '$100', high: '$200' },
    ],
    faqs: [
      {
        q: 'Is edging included with lawn mowing service in Kansas City?',
        a: 'With Mulch Ado About Nothing Lawn Care, yes. Sidewalk edging, bed border trimming, string-trimming around trees and obstacles, and blowdown of the driveway and walkways are all included in the mowing visit price. We don&rsquo;t price these as separate line items. You get a clean, finished yard, not just a shorter lawn.'
      },
      {
        q: 'How often should bed edges be re-cut in Kansas City?',
        a: 'The initial bed edge cut (trench edging with a blade edger) should be done once in spring and possibly once again in summer &mdash; that establishes a clean line. After that, a rotary edger or string trimmer maintains it on each mowing visit. Kansas City&rsquo;s aggressive fescue growth in April and May means beds can encroach quickly if the line isn&rsquo;t maintained consistently.'
      },
      {
        q: 'What is the difference between bed edging and string-trimming?',
        a: 'Bed edging uses a blade to cut a vertical trench between the lawn and the landscape bed &mdash; it removes the grass that has crept into the bed. String-trimming cuts grass in spots where the mower can&rsquo;t reach: around trees, fence posts, mailboxes, along walls, and near downspouts. Both are necessary for a finished look; both are included in our mowing service.'
      },
      {
        q: 'Can you just do edging without a full mowing service?',
        a: 'Yes. If your lawn just needs the beds re-edged or the borders cleaned up between regular cuts, we can schedule a standalone edging visit. This is common in spring when beds have grown over significantly after winter or when a new customer wants a fresh starting line before enrolling in regular service.'
      },
      {
        q: 'What happens to the clippings and trimmings after edging?',
        a: 'Our crew blows all clippings and trimmings off the driveway, patio, and walkways before leaving. Grass clippings that sit on concrete can stain, and loose trimmings in mulch beds look sloppy. A finished blowdown is the last step on every visit.'
      }
    ]
  },

  {
    slug: 'leaf-removal',
    name: 'Leaf Removal',
    shortDesc: 'One-time and full-season leaf cleanup across the Kansas City metro &mdash; oak, maple, and sycamore loads handled.',
    icon: '🍂',
    costRange: '$150&ndash;$400 per cleanup',
    intro: 'Kansas City&rsquo;s mature tree canopy &mdash; particularly the oak, maple, sycamore, and elm trees dominant in neighborhoods like Brookside, Overland Park, and Lee&rsquo;s Summit &mdash; drops enormous volumes of leaves starting in October and continuing through November. A heavy leaf mat left on a fescue lawn blocks sunlight and traps moisture, creating the ideal conditions for fungal disease and smothering the turf beneath. Mulch Ado About Nothing Lawn Care handles full-season leaf removal across the Kansas City metro, including scheduled weekly or bi-weekly pickups through peak fall and a final hard cleanup before Thanksgiving.',
    commonCosts: [
      { item: 'Single cleanup (average suburban lot)', low: '$150', high: '$250' },
      { item: 'Single cleanup (large lot with heavy tree cover)', low: '$250', high: '$400' },
      { item: 'Full season (weekly/bi-weekly Oct&ndash;Nov)', low: '$400', high: '$750' },
    ],
    faqs: [
      {
        q: 'When should I schedule leaf removal in Kansas City?',
        a: 'Most Kansas City homeowners need their first leaf pickup in mid-to-late October, with a second visit in early November and a final hard cleanup by Thanksgiving. The peak drop for oaks &mdash; which are the heaviest leaf producers in the area &mdash; is typically late October through mid-November. Waiting until all leaves are down and doing one massive cleanup works too, but the lawn underneath suffers from weeks of smothering.'
      },
      {
        q: 'How much does leaf removal cost in Kansas City?',
        a: 'A single leaf cleanup on an average Kansas City residential lot runs $150&ndash;$250. Heavy-tree lots (Brookside, Longview area, Shawnee Mission Park neighborhoods) run $250&ndash;$400 per visit due to the volume. Full-season packages covering weekly or bi-weekly October&ndash;November service typically run $400&ndash;$750 total, which works out to less per visit than booking individually.'
      },
      {
        q: 'What happens to the leaves you remove?',
        a: 'We haul leaves off the property entirely &mdash; we don&rsquo;t mulch them into the lawn (unless requested). Leaf mulching works on light loads but Kansas City&rsquo;s heavy fall drops typically overwhelm mulching mowers. The removed leaves go to composting facilities, not landfill.'
      },
      {
        q: 'Can leaf buildup damage a Kansas City fescue lawn?',
        a: 'Yes, significantly. A thick layer of leaves blocks sunlight from fescue that&rsquo;s actively trying to recover after summer heat stress. It also traps moisture against the crown of the grass &mdash; the combination of darkness and damp creates ideal conditions for gray snow mold and brown patch fungal disease. Lawns that go into winter under a leaf mat come out thin and patchy in spring.'
      },
      {
        q: 'Do you offer gutter cleaning alongside leaf removal?',
        a: 'Yes, and most customers book both together in October or November. When we&rsquo;re already set up for leaf removal, adding gutter cleaning takes 20&ndash;30 minutes for most homes. We quote both together and price them as a combined visit.'
      }
    ]
  },

  {
    slug: 'hedge-and-shrub-trimming',
    name: 'Hedge &amp; Shrub Trimming',
    shortDesc: 'Clean, shaped shrubs and hedges that look like they belong on a professionally maintained property.',
    icon: '✂️',
    costRange: '$100&ndash;$300 per visit',
    intro: 'Overgrown hedges and out-of-shape shrubs undercut even a well-cut lawn &mdash; the curb appeal damage from six-inch-over boxwoods or arborvitae that have merged into a wall is immediate and obvious. Mulch Ado About Nothing Lawn Care handles hedge and shrub trimming across the Kansas City metro with crew members trained on the correct trimming timing for Kansas City&rsquo;s common landscape plants: spring-blooming shrubs like forsythia and lilac get trimmed after bloom, summer-blooming shrubs and boxwoods get their main trim in June and a cleanup trim in August, and ornamental grasses get cut back in late winter before new growth emerges.',
    commonCosts: [
      { item: 'Up to 10 shrubs (average maintenance trim)', low: '$100', high: '$175' },
      { item: '10&ndash;20 shrubs (typical full-perimeter)', low: '$150', high: '$250' },
      { item: 'Larger properties / overgrown hedges requiring restoration', low: '$200', high: '$350' },
    ],
    faqs: [
      {
        q: 'When is the best time to trim shrubs and hedges in Kansas City?',
        a: 'It depends on the shrub. Spring-blooming shrubs (forsythia, lilac, weigela, flowering quince) bloom on last year&rsquo;s growth and should be trimmed right after they finish blooming &mdash; usually late April to mid-May in Kansas City. Summer-blooming shrubs and evergreens like boxwoods, junipers, and arborvitae can be trimmed any time from May through August. Ornamental grasses are cut back in late February or early March before new growth emerges.'
      },
      {
        q: 'How much does hedge and shrub trimming cost in Kansas City?',
        a: 'A typical visit covering 10&ndash;15 shrubs on an average Kansas City residential property runs $150&ndash;$250. Larger properties or significantly overgrown hedges that need hard restoration trimming run $200&ndash;$350+. We quote by the visit based on the actual volume of work, not per-shrub.'
      },
      {
        q: 'How often should shrubs be trimmed in Kansas City?',
        a: 'Most Kansas City landscape shrubs need two trims per year: a primary shaping trim in May or June, and a cleanup trim in August or September. Fast-growing shrubs like privet or forsythia may need three visits. Ornamental grasses need one hard cutback per year in late winter. Over-trimming &mdash; especially in summer heat &mdash; stresses plants; we time visits to match actual growth rates.'
      },
      {
        q: 'Can you shape shrubs that have grown out significantly?',
        a: 'In most cases, yes. Restoration trimming removes the overgrown material in stages &mdash; cutting too much in one pass can kill certain species. We evaluate the shrubs on-site and let you know if a full restoration is possible in one visit or needs to be spread over two growing seasons.'
      },
      {
        q: 'Does Mulch Ado trim ornamental grasses as well as shrubs?',
        a: 'Yes. We cut back ornamental grasses to 4&ndash;6 inches in late February or early March, before new growth emerges. Kansas City&rsquo;s most common ornamentals &mdash; maiden grass, feather reed grass, and muhly grass &mdash; all need this annual hard cutback to come back full and healthy. We include ornamental grasses in our hedge and shrub trimming service.'
      }
    ]
  },

  {
    slug: 'sod-installation',
    name: 'Sod Installation',
    shortDesc: 'Instant lawn from fresh sod &mdash; graded, installed, and set up for establishment in the Kansas City metro.',
    icon: '🏡',
    costRange: '$1.50&ndash;$3.50 per sq ft installed',
    intro: 'Sod is the fastest path to a full lawn &mdash; a bare-dirt yard or damaged lawn goes from nothing to uniform, walkable turf in a single day. In Kansas City, sod installation is most often needed after new construction (where builders strip the topsoil), after major landscaping projects that disturb the lawn, or where sections have died from disease, fungus, or irrigation failure. Mulch Ado About Nothing Lawn Care handles the full process: soil grading to ensure proper drainage, sod selection matched to the sun exposure and grass type goals, installation, and a first-week establishment plan so the sod roots correctly in KC&rsquo;s clay soil.',
    commonCosts: [
      { item: 'Tall fescue sod installed (per sq ft)', low: '$1.75', high: '$2.75' },
      { item: 'Zoysia sod installed (per sq ft)', low: '$2.25', high: '$3.50' },
      { item: 'Average new-construction backyard (2,000 sq ft)', low: '$3,500', high: '$6,500' },
    ],
    faqs: [
      {
        q: 'What type of sod is best for Kansas City lawns?',
        a: 'For most Kansas City residential lawns, tall fescue sod is the practical choice &mdash; it handles both winter cold and summer heat in KC&rsquo;s transition zone, establishes quickly, and tolerates clay soil. Zoysia sod is a strong option for homeowners who want a denser, lower-maintenance warm-season lawn and are willing to accept winter dormancy (brown color from November through March). We discuss your sun exposure, traffic load, and maintenance preferences before recommending a grass type.'
      },
      {
        q: 'How much does sod installation cost in Kansas City?',
        a: 'Installed sod in the Kansas City metro runs $1.50&ndash;$3.50 per square foot, depending on the grass type and the amount of site prep required. Tall fescue sod typically runs $1.75&ndash;$2.75 installed; Zoysia runs $2.25&ndash;$3.50. A 2,000 sq ft project typically runs $3,500&ndash;$6,500 total. We provide a flat quote based on your actual measurements &mdash; same all-in pricing we use for every service.'
      },
      {
        q: 'When is the best time to install sod in Kansas City?',
        a: 'Tall fescue sod installs best in September and October, when temperatures are cooling and the grass can root before winter. Spring installation (April&ndash;May) works but gives less establishment time before summer heat arrives. Zoysia sod should be installed in late spring or early summer (May&ndash;June) when warm-season grass is actively growing. We avoid midsummer sod installation when Kansas City heat stress is highest &mdash; new sod needs consistent moisture and moderate temperatures to root.'
      },
      {
        q: 'Does Kansas City clay soil need preparation before sod installation?',
        a: 'Yes. Clay soil compacts and sheds water instead of absorbing it if sod is laid directly on unprepared ground. We till the top 2&ndash;3 inches, amend with compost if the clay is particularly heavy, grade for proper drainage away from the foundation, and then install the sod. Skipping this prep results in sod that roots poorly and develops drainage problems within the first year.'
      },
      {
        q: 'How do I care for new sod after it is installed in Kansas City?',
        a: 'The first two weeks are critical: water twice daily (morning and late afternoon, 20&ndash;30 minutes each zone) to keep the sod moist without waterlogging. After 2 weeks, reduce to once daily, then every other day as roots establish. Avoid foot traffic for the first 3&ndash;4 weeks. Your first mow should happen at 3&ndash;4 weeks when the grass reaches 4 inches. We walk you through the full establishment plan when we finish the installation.'
      }
    ]
  },

  {
    slug: 'gutter-cleaning',
    name: 'Gutter Cleaning',
    shortDesc: 'Thorough gutter and downspout cleaning across the Kansas City metro &mdash; fall leaf loads handled.',
    icon: '🏠',
    costRange: '$100&ndash;$300 depending on home size',
    intro: 'Kansas City&rsquo;s fall leaf season is not subtle &mdash; the oak, maple, and sycamore trees that line streets in Brookside, Shawnee, Lee&rsquo;s Summit, and Liberty drop dense, slow-composting leaves that fill gutters fast. A clogged gutter doesn&rsquo;t just overflow during rain; it holds standing water against the fascia board, adds weight that can pull the gutter away from the roofline, and creates the ice dam conditions that cause interior water damage during Kansas City&rsquo;s freeze-thaw winter cycles. Mulch Ado About Nothing Lawn Care clears gutters and flushes downspouts across the KC metro, typically in October and November when the majority of the seasonal load has fallen.',
    commonCosts: [
      { item: 'Single-story home (average 3-bed)', low: '$100', high: '$175' },
      { item: 'Two-story home (average 4-bed)', low: '$150', high: '$250' },
      { item: 'Large two-story / complex roofline', low: '$200', high: '$300' },
    ],
    faqs: [
      {
        q: 'How often should gutters be cleaned in Kansas City?',
        a: 'Most Kansas City homes need gutter cleaning twice a year: once in late spring (May) to clear the maple seeds and spring debris, and once in November after the fall leaves have fully dropped. Homes under large oak trees may need a third cleaning in December, when oaks shed their leaves later than other species. If your gutters have no guards, twice a year is the minimum for KC&rsquo;s tree density.'
      },
      {
        q: 'How much does gutter cleaning cost in Kansas City?',
        a: 'A single-story Kansas City home typically runs $100&ndash;$175 for a full gutter and downspout cleaning. Two-story homes run $150&ndash;$250 due to the additional height and gutter linear footage. Complex rooflines with multiple valleys or gutters on multiple levels run $200&ndash;$300. We quote by the home size and complexity &mdash; flat all-in rate, no per-foot charges.'
      },
      {
        q: 'What does gutter cleaning include?',
        a: 'We clear all debris from the gutters by hand or with a high-velocity blower, flush downspouts with water to confirm they&rsquo;re draining freely, and bag and remove all debris. If a downspout is blocked and flushing doesn&rsquo;t clear it, we snake it. We also flag any obvious gutter damage &mdash; loose spikes, sagging sections, or failing seams &mdash; as part of the inspection, though gutter repair is a separate service.'
      },
      {
        q: 'What signs indicate my Kansas City gutters need cleaning?',
        a: 'Water overflowing over the front edge during rain (not through the downspout) is the most obvious sign. Gutters that sag or pull away from the fascia are likely holding a heavy debris load. Staining on the siding directly below gutter seams indicates standing water inside. In fall, if you can see leaves sticking up above the gutter line from the ground, they need to be cleaned.'
      },
      {
        q: 'Can I combine gutter cleaning with leaf removal to save a trip?',
        a: 'Yes, and we actively encourage it. When we&rsquo;re already at your property handling fall leaf removal, adding gutter cleaning takes 20&ndash;30 minutes for most homes. We quote both together as a combined visit and the combined price is typically less than booking them separately. November is the most popular window for the combined service.'
      }
    ]
  },

  {
    slug: 'spring-and-fall-cleanup',
    name: 'Spring &amp; Fall Cleanup',
    shortDesc: 'Full-property seasonal cleanup &mdash; debris removal, bed cleanup, and prep for the season ahead.',
    icon: '🌤️',
    costRange: '$150&ndash;$400 per cleanup',
    intro: 'Spring and fall cleanup visits set the tone for the entire season. In the Kansas City metro, spring cleanup means clearing winter debris, cutting back ornamental grasses before new growth emerges, edging beds that have crept over winter, and removing the dead plant material that accumulated through the dormant months. Fall cleanup goes the other direction: clearing spent annuals and perennials, a final leaf removal pass, and preparing beds with mulch so they&rsquo;re protected through the KC freeze-thaw cycle. Mulch Ado About Nothing Lawn Care handles both as comprehensive visits &mdash; not just a quick leaf blowing, but a full-property reset before the next season begins.',
    commonCosts: [
      { item: 'Spring cleanup (average suburban lot)', low: '$150', high: '$300' },
      { item: 'Fall cleanup (average suburban lot)', low: '$150', high: '$300' },
      { item: 'Full-property cleanup with heavy debris or overgrowth', low: '$250', high: '$400' },
    ],
    faqs: [
      {
        q: 'What is included in a spring lawn cleanup in Kansas City?',
        a: 'A typical spring cleanup includes: removing dead leaves and debris that accumulated over winter, cutting back ornamental grasses and any dead perennial stalks, re-edging landscape beds, clearing debris from plant beds, and a first mowing at the correct spring height. If you&rsquo;re adding mulch (most customers do), we can include that in the same visit or schedule it as a follow-on. We customize based on your property&rsquo;s specific needs.'
      },
      {
        q: 'When should spring cleanup happen in Kansas City?',
        a: 'Late March through mid-April is the ideal window for most Kansas City properties. You want to wait until overnight frost risk has dropped below 32&deg;F consistently &mdash; typically after April 15 in KC &mdash; before cutting back tender perennials. But ornamental grasses and hard debris cleanup can start earlier. We schedule around actual weather conditions, not a fixed calendar date.'
      },
      {
        q: 'How much does a seasonal cleanup cost in Kansas City?',
        a: 'Spring and fall cleanup on an average Kansas City suburban lot runs $150&ndash;$300 per visit, depending on the scope. Properties with heavy leaf loads, extensive perennial beds, or significant winter debris run $250&ndash;$400. We walk the property and give you a flat quote before we start &mdash; no surprises at the end of the visit.'
      },
      {
        q: 'Should I schedule fall cleanup before or after the leaves are down?',
        a: 'After. Doing fall cleanup before the leaves finish dropping means you&rsquo;ll need a second cleanup visit in November anyway. Most Kansas City properties schedule their main fall cleanup between November 1 and Thanksgiving &mdash; after the oaks have finished dropping, which is typically the last major wave. If you want cleanup earlier to enjoy a clean yard through fall, we can schedule a partial cleanup in October and a final pass in November.'
      },
      {
        q: 'Can you coordinate spring cleanup with mulching and fertilization in one visit?',
        a: 'Yes. Many customers book a combined spring kickoff: cleanup, bed edging, mulch installation, and pre-emergent fertilization application all in one scheduled day or two-day project. It&rsquo;s the most efficient way to start the season, and we quote the full package as a single flat price. Spring is our busiest booking season &mdash; March and April fill fast.'
      }
    ]
  }
];

const CITIES = [
  {
    name: 'Kansas City',
    state: 'MO',
    displayName: 'Kansas City, MO',
    slug: 'kansas-city-mo',
    stateSlug: 'kansas-city-mo',
    localContext: 'Kansas City homeowners in neighborhoods like Brookside, Waldo, and Ward Parkway deal with mature oak and maple trees that drive heavy fall leaf loads and established lawns on pre-1950s clay soil that compacts annually &mdash; making aeration the most impactful service of the year. The Northland (north of the Missouri River) is a more suburban market with 1980s&ndash;2000s housing where new program enrollment is active. Mulch Ado About Nothing Lawn Care sends the same crew each visit across the entire KC market, so Brookside yards and Northland subdivision lawns both get a team that knows the property.',
    neighborhoods: ['Brookside', 'Waldo', 'Ward Parkway', 'Hyde Park', 'Northland'],
    lat: 39.0997,
    lng: -94.5786,
  },
  {
    name: 'Overland Park',
    state: 'KS',
    displayName: 'Overland Park, KS',
    slug: 'overland-park-ks',
    stateSlug: 'overland-park-ks',
    localContext: 'Overland Park is Johnson County&rsquo;s flagship suburb &mdash; the largest city in Kansas &mdash; with HOA communities across Blue Valley, Santa Fe Trail, and the College Boulevard corridor where mowing standards and edging quality are enforced, not optional. Clay soil is prevalent throughout, and 40-to-50-year-old lawns in mid-OP neighborhoods like the Metcalf corridor are prime candidates for annual aeration and overseeding. Household incomes in Overland Park run $80,000&ndash;$90,000 on average, and the customer base expects reliability and quality, not the cheapest mow.',
    neighborhoods: ['Blue Valley', 'Santa Fe Trail', 'College Boulevard', 'Leawood adjacent', 'Prairiefire area'],
    lat: 38.9822,
    lng: -94.6708,
  },
  {
    name: 'Olathe',
    state: 'KS',
    displayName: 'Olathe, KS',
    slug: 'olathe-ks',
    stateSlug: 'olathe-ks',
    localContext: 'Olathe is one of the fastest-growing cities in the KC metro, and its lawn care market reflects that split: established 1970s&ndash;1990s neighborhoods near downtown Olathe have heavy clay compaction and aging turf that needs aeration and treatment programs, while new subdivisions south of 135th Street have fresh sod that needs careful first-year establishment management. The Cedar Creek and Quail Creek planned communities have active HOA standards. Olathe routes pair naturally with Lenexa and southern Overland Park service days.',
    neighborhoods: ['Cedar Creek', 'Old Town Olathe', 'Quail Creek', 'Meadow Lane area', '119th&ndash;151st corridor'],
    lat: 38.8814,
    lng: -94.8191,
  },
  {
    name: "Lee's Summit",
    state: 'MO',
    displayName: "Lee's Summit, MO",
    slug: 'lees-summit-mo',
    stateSlug: 'lees-summit-mo',
    localContext: "Lee's Summit is a premium southeast KC suburb with more lakes per capita than most cities in the metro &mdash; Longview Lake, Lake Lotawana nearby, and the Lakewood Lake community all anchor neighborhoods where property values and curb appeal expectations are elevated above metro average. The historic downtown district has 1920s&ndash;1950s homes with mature tree canopy and significant fall leaf removal demand. New development in Falls of Winterset and Chapel Ridge brings young families seeking reliable first lawn care program enrollment.",
    neighborhoods: ['Longview area', 'Downtown historic district', 'Lakewood', 'Summit Crossing', 'Falls of Winterset'],
    lat: 38.9108,
    lng: -94.3822,
  },
  {
    name: 'Independence',
    state: 'MO',
    displayName: 'Independence, MO',
    slug: 'independence-mo',
    stateSlug: 'independence-mo',
    localContext: 'Independence is the largest city in Jackson County east of Kansas City, and one of the older suburban markets in the metro. The historic downtown Square area has Victorian and Craftsman-era homes from the 1880s&ndash;1920s with mature trees and significant shrub trimming and leaf removal demand. The Little Blue River corridor on the eastern side has 1990s&ndash;2010s suburban development with active mowing and fertilization markets. All-in pricing and showing up on time are the two most resonant differentiators in Independence, where price sensitivity is real but reliability is often the primary complaint about existing lawn care providers.',
    neighborhoods: ['Historic Square area', 'Englewood', 'Little Blue River corridor', 'Sugar Creek area', 'Grain Valley border'],
    lat: 39.0911,
    lng: -94.4155,
  },
  {
    name: 'Lenexa',
    state: 'KS',
    displayName: 'Lenexa, KS',
    slug: 'lenexa-ks',
    stateSlug: 'lenexa-ks',
    localContext: 'Lenexa is a rapidly growing Johnson County suburb along the K-10 corridor where HOA-governed planned communities like Millennia, Falcon Valley, and Prairie Star have enforced landscaping and mowing standards. Northern Lenexa near I-435 has established 1970s&ndash;1990s neighborhoods with compacted clay lawns that benefit significantly from annual aeration. The Lenexa City Center area is drawing new residential development alongside commercial growth. Lenexa routes pair efficiently with Overland Park and Olathe service days for the same crew.',
    neighborhoods: ['Millennia', 'Falcon Valley', 'West Lenexa', 'Prairie Star', 'K-10 corridor'],
    lat: 38.9536,
    lng: -94.7334,
  },
  {
    name: 'Shawnee',
    state: 'KS',
    displayName: 'Shawnee, KS',
    slug: 'shawnee-ks',
    stateSlug: 'shawnee-ks',
    localContext: 'Shawnee is one of the oldest established suburbs in Johnson County, with 1950s&ndash;1970s homes along the Shawnee Mission Parkway and Johnson Drive corridors whose lawns are 40&ndash;60 years old &mdash; prime candidates for aeration and renovation programs. Shawnee Mission Park (1,250+ acres) creates a forested buffer in several neighborhoods, elevating fall leaf removal demand above the metro average. The Clear Creek corridor on the western edge has newer 2000s&ndash;2010s development with younger turf systems enrolling in initial programs.',
    neighborhoods: ['Shawnee Mission Parkway area', 'Heritage Park area', 'Johnson Drive corridor', 'Shawnee Mission Park adjacent', 'Clear Creek area'],
    lat: 39.0228,
    lng: -94.7150,
  },
  {
    name: 'Liberty',
    state: 'MO',
    displayName: 'Liberty, MO',
    slug: 'liberty-mo',
    stateSlug: 'liberty-mo',
    localContext: 'Liberty is a growing Clay County suburb north of the Missouri River with a strong family demographic and high homeownership rate &mdash; the Liberty school district consistently ranks among the best in the state, which drives family demand for well-maintained homes. The historic downtown Square area has 1920s&ndash;1950s homes with established lawns and mature trees. Newer subdivisions like Foxberry Farms and Copper Oaks on the eastern growth corridor have young families enrolling in their first lawn care programs. Clay County soil in Liberty is slightly less uniformly clay-heavy than Johnson County KS, but aeration is still the standard annual recommendation.',
    neighborhoods: ['Historic Liberty Square', 'Claymont', 'Foxberry Farms', 'Copper Oaks', 'Hawksbury'],
    lat: 39.2467,
    lng: -94.4191,
  },
  {
    name: 'Blue Springs',
    state: 'MO',
    displayName: 'Blue Springs, MO',
    slug: 'blue-springs-mo',
    stateSlug: 'blue-springs-mo',
    localContext: 'Blue Springs sits adjacent to Fleming Park and Lake Jacomo &mdash; a 7,800-acre park that gives many neighborhoods a wooded, semi-rural feel with large lots and abundant tree canopy. That tree cover means fall leaf removal is one of the highest-demand services in Blue Springs, particularly in neighborhoods near Burr Oak Woods Nature Center. The Adams Dairy Parkway corridor is one of the fastest-growing areas in the metro, with 2000s&ndash;2020s planned communities where new homeowners seek reliable lawn care program enrollment. Established neighborhoods near I-470 have 1970s&ndash;1990s clay lawns ready for aeration and overseeding.',
    neighborhoods: ['Lake Jacomo adjacent', 'Burr Oak Woods area', 'Adams Dairy corridor', 'Woods Chapel Road area', 'Downtown Blue Springs'],
    lat: 39.0169,
    lng: -94.2816,
  },
  {
    name: 'Raymore',
    state: 'MO',
    displayName: 'Raymore, MO',
    slug: 'raymore-mo',
    stateSlug: 'raymore-mo',
    localContext: 'Raymore is one of the fastest-growing cities in Missouri &mdash; a Cass County suburb where the majority of homes were built after 2000, and significant new construction continues. The Creekmoor planned community is a premium lake-and-golf-course development with active HOA standards and above-average curb appeal expectations. Newer subdivisions like Valley Ridge and Garden Meadows have fresh sod systems in their establishment phase &mdash; a natural entry point for first-program enrollment. Raymore&rsquo;s older neighborhoods (Foxwood Hills, Aberdeen) are entering the 15&ndash;25-year mark where aeration and overseeding programs deliver the most visible improvement.',
    neighborhoods: ['Creekmoor', 'Foxwood Hills', 'Aberdeen', 'Valley Ridge', 'Garden Meadows'],
    lat: 38.8000,
    lng: -94.4491,
  }
];

function getServiceCityPages() {
  const pages = [];
  for (const svc of SERVICES) {
    for (const city of CITIES) {
      pages.push({ service: svc, city });
    }
  }
  return pages;
}

module.exports = { CLIENT, DIFFERENTIATORS, REVIEWS, SERVICES, CITIES, getServiceCityPages };
