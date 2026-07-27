export const NAV_LINKS = [
  { href: '/services', label: 'Services' },
  { href: '/work', label: 'Work' },
  { href: '/about', label: 'About' },
  { href: '/blog', label: 'Resources' },
]

export const TICKER_ITEMS = [
  '3 client slots open for Q3',
  'Free 48-hour funnel + pixel audit',
  '60-day zero-fluff growth guarantee',
  'Server-side tracking included in every engagement',
  'No retainers. No lock-in contracts.',
]

export const HEADLINE_STATS = [
  { value: '$84.6M', label: 'Tracked client revenue' },
  { value: '3.9x', label: 'Average blended ROAS' },
  { value: '1.2B', label: 'Paid impressions served' },
  { value: '60d', label: 'Growth guarantee window' },
]

export const CLIENT_LOGOS = [
  'NORTHBAY',
  'FORMWORK',
  'HELIOS DTC',
  'ATLAS CLINIC',
  'RUNWAY 9',
  'CARTER & CO',
  'STUDIO MERIDIAN',
]

export type Service = {
  slug: string
  index: string
  title: string
  short: string
  badge: string
  pitch: string
  problems: string[]
  deliverables: string[]
  metrics: { value: string; label: string }[]
}

export const SERVICES: Service[] = [
  {
    slug: 'social-design',
    index: '01',
    title: 'Social & Creative Design',
    short: 'Thumb-stopping creative built to be tested, not admired.',
    badge: 'Creative volume',
    pitch:
      'Human-crafted ad creative and social systems, produced in testable batches with a hook-first structure so the algorithm always has something new to spend on.',
    problems: [
      'One hero creative carrying the entire ad account',
      'Templated Canva output that looks like every competitor',
      'No hook variation, so frequency kills performance in week two',
      'Design handed off with zero performance feedback loop',
    ],
    deliverables: [
      '20–40 static ad concepts per month, grouped by angle',
      'Short-form video edits with 3 hook variants each',
      'Organic social system: templates, grids, story frames',
      'Creative testing matrix with named angles and hypotheses',
      'Monthly creative teardown tied to spend and CPA data',
      'Brand asset kit: type, colour, layout rules, export presets',
    ],
    metrics: [
      { value: '-38%', label: 'Average CPA after 60 days' },
      { value: '4.1x', label: 'Best-performing angle ROAS' },
      { value: '32', label: 'Concepts shipped per month' },
    ],
  },
  {
    slug: 'web-design',
    index: '02',
    title: 'Web Design & CRO',
    short: 'Landing pages and sites engineered around one conversion event.',
    badge: 'Conversion rate',
    pitch:
      'We rebuild the pages your traffic actually lands on: fast, offer-led, and instrumented so every section earns its place in the scroll.',
    problems: [
      'Beautiful homepage, no clear next action',
      'Paid traffic dumped onto a generic template page',
      'Mobile load times over four seconds',
      'No heatmaps, no session replays, no test log',
    ],
    deliverables: [
      'Offer and message hierarchy workshop',
      'High-intent landing pages built per traffic source',
      'Full site redesign with a component system',
      'Heatmaps, scroll depth and session replay setup',
      'Structured A/B test roadmap with a documented log',
      'Core Web Vitals pass on mobile and desktop',
    ],
    metrics: [
      { value: '+112%', label: 'Median lift in conversion rate' },
      { value: '0.9s', label: 'Median LCP after rebuild' },
      { value: '19', label: 'Tests run per quarter' },
    ],
  },
  {
    slug: 'paid-ads-tracking',
    index: '03',
    title: 'Paid Ads & Server-Side Tracking',
    short: 'Media buying on top of data you can actually trust.',
    badge: 'Signal quality',
    pitch:
      'Meta, Google and TikTok managed against profit, not platform vanity metrics — with server-side conversion tracking so the platforms optimise on real events.',
    problems: [
      'Platform reported revenue that never matches the bank',
      'Browser-only pixels losing 30%+ of conversions',
      'Budgets scaled on ROAS screenshots, not contribution margin',
      'Nobody can tell you your blended CAC this week',
    ],
    deliverables: [
      'Account restructure: campaign, budget and bid architecture',
      'Server-side tagging via GTM server container',
      'Conversions API for Meta, TikTok and enhanced conversions for Google',
      'Consent-mode compliant event schema and deduplication',
      'Blended CAC and contribution margin dashboard',
      'Weekly scaling decisions logged with reasoning',
    ],
    metrics: [
      { value: '+27%', label: 'Recovered conversion events' },
      { value: '3.9x', label: 'Average blended ROAS' },
      { value: '<48h', label: 'Tracking rebuild turnaround' },
    ],
  },
  {
    slug: 'seo-growth',
    index: '04',
    title: 'SEO Growth',
    short: 'Compounding demand capture that lowers blended acquisition cost.',
    badge: 'Organic pipeline',
    pitch:
      'Technical fixes plus commercially-scored content so organic carries the demand paid media created — and your blended CAC keeps falling.',
    problems: [
      'Traffic reports full of keywords that never buy',
      'Blog posts written for volume, mapped to nothing',
      'Crawl and indexation issues nobody has audited in a year',
      'No internal linking between money pages',
    ],
    deliverables: [
      'Technical audit: crawl, indexation, schema, speed',
      'Keyword map scored by commercial intent and difficulty',
      'Money-page and programmatic template builds',
      'Editorial calendar with briefs and internal link plan',
      'Digital PR and authority acquisition targets',
      'Monthly reporting on assisted revenue, not just rankings',
    ],
    metrics: [
      { value: '+214%', label: 'Organic revenue in 9 months' },
      { value: '-31%', label: 'Blended CAC reduction' },
      { value: '640', label: 'Commercial keywords ranked' },
    ],
  },
]

export const ENGINE_STEPS = [
  {
    step: '01',
    title: 'Diagnose',
    body: 'We audit the funnel, the pixel and the P&L before touching a single ad. You get the leak list in 48 hours.',
    points: ['Funnel + pixel audit', 'Contribution margin model', 'Leak list, ranked by impact'],
  },
  {
    step: '02',
    title: 'Instrument',
    body: 'Server-side tracking, clean event schema and one dashboard everyone reads. Decisions stop being opinions.',
    points: ['GTM server container', 'Conversions API', 'Blended CAC dashboard'],
  },
  {
    step: '03',
    title: 'Convert',
    body: 'Landing pages and creative rebuilt around a single conversion event, then tested in structured batches.',
    points: ['Offer hierarchy', 'Page rebuilds', 'Structured test roadmap'],
  },
  {
    step: '04',
    title: 'Scale',
    body: 'Spend increases only where margin holds. Organic is layered in so blended acquisition cost keeps dropping.',
    points: ['Margin-gated scaling', 'Creative volume system', 'SEO demand capture'],
  },
]

export const PRINCIPLES = [
  {
    index: '01',
    title: 'ROI over vanity metrics',
    body: 'Impressions, reach and follower counts are context, not outcomes. Every report we send starts with revenue, contribution margin and blended CAC — the three numbers a founder can act on.',
  },
  {
    index: '02',
    title: 'Human-crafted, never push-button',
    body: 'No template farms, no one-click generators dressed up as strategy. Every asset is designed by a person against a named hypothesis, then judged by what it did to the account.',
  },
  {
    index: '03',
    title: 'Total dashboard transparency',
    body: 'You get the same dashboard we work from, plus the decision log. Every scaling call, test and kill decision is written down with the reasoning behind it.',
  },
]

export const FAQS = [
  {
    q: 'Do I have to sign a long contract?',
    a: 'No. We work in 60-day cycles with a 30-day rolling continuation after that. If the engine is not producing, you leave — and you keep every asset, dashboard and tracking container we built.',
  },
  {
    q: 'What does this cost?',
    a: 'Engagements start at $4.5k per month for a single channel and scale with scope. Media spend is separate and always paid directly by you, on your own accounts. We never mark up ad spend.',
  },
  {
    q: 'How does the 60-day guarantee actually work?',
    a: 'At kickoff we agree on trackable targets — conversion rate, blended CAC or contribution margin. If those targets are not hit inside 60 days, we keep working at no cost until they are. Written into the agreement, not a landing page promise.',
  },
  {
    q: 'How soon will we see movement?',
    a: 'Tracking and audit output land in the first week. Landing page and creative changes typically show statistically usable data between day 14 and day 30, depending on traffic volume.',
  },
  {
    q: 'Do you work with small ad budgets?',
    a: 'We are a fit from roughly $10k per month in media spend. Below that, the fastest win is usually CRO and tracking alone — we will tell you that on the call instead of selling you media management.',
  },
  {
    q: 'Who actually does the work?',
    a: 'The people on your kickoff call. WayBing runs deliberately small: a strategist, a media buyer, a designer and an engineer per account. No account manager relaying messages to a junior team.',
  },
  {
    q: 'Do you own the accounts and assets?',
    a: 'Never. Ad accounts, analytics properties, GTM containers, design files and page builds all live in your ownership from day one.',
  },
]

export const BOOKING_OPTIONS = [
  {
    id: 'audit',
    duration: '15 min',
    title: 'Quick Audit Call',
    focus: 'Funnel and pixel leaks, plus the two or three fastest wins in your account.',
    host: 'Growth strategist',
    bullets: ['Live pixel + event check', 'Funnel leak shortlist', 'No pitch, no deck'],
  },
  {
    id: 'strategy',
    duration: '30 min',
    title: 'Strategy Session',
    focus: 'Full growth plan across creative, CRO, paid and organic — with pricing and scope.',
    host: 'Founder',
    bullets: ['Channel-by-channel plan', 'Guarantee targets defined', 'Transparent pricing'],
  },
  {
    id: 'creative',
    duration: '45 min',
    title: '1-on-1 Creative Review',
    focus: 'Line-by-line teardown of your current ad creative and visual positioning.',
    host: 'Design lead',
    bullets: ['Hook + angle teardown', 'Positioning critique', 'Concept directions'],
  },
]

export type CaseStudy = {
  slug: string
  client: string
  category: 'Ad Creatives' | 'Websites' | 'Tracking Setups' | 'SEO'
  industry: string
  headline: string
  before: { label: string; value: string }[]
  after: { label: string; value: string }[]
  summary: string
  window: string
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: 'northbay-supply',
    client: 'Northbay Supply',
    category: 'Ad Creatives',
    industry: 'DTC outdoor gear',
    headline: 'Rebuilt the creative pipeline and cut CPA by 41% while tripling spend',
    before: [
      { label: 'Monthly spend', value: '$62k' },
      { label: 'CPA', value: '$71.40' },
      { label: 'Creative shipped / mo', value: '4' },
    ],
    after: [
      { label: 'Monthly spend', value: '$189k' },
      { label: 'CPA', value: '$42.10' },
      { label: 'Creative shipped / mo', value: '34' },
    ],
    summary:
      'Angle-first creative system with three hooks per concept, tested in weekly batches. Winning angles were rolled into landing page copy, compounding the lift.',
    window: '7 months',
  },
  {
    slug: 'atlas-clinic',
    client: 'Atlas Clinic Group',
    category: 'Websites',
    industry: 'High-ticket healthcare',
    headline: 'Landing page rebuild took consult bookings from 1.9% to 5.4%',
    before: [
      { label: 'Conversion rate', value: '1.9%' },
      { label: 'Mobile LCP', value: '4.6s' },
      { label: 'Cost per consult', value: '$310' },
    ],
    after: [
      { label: 'Conversion rate', value: '5.4%' },
      { label: 'Mobile LCP', value: '0.8s' },
      { label: 'Cost per consult', value: '$109' },
    ],
    summary:
      'One page per treatment intent, objection-handling blocks placed at measured drop-off points, and a two-step form that qualified before asking for a phone number.',
    window: '4 months',
  },
  {
    slug: 'helios-dtc',
    client: 'Helios DTC',
    category: 'Tracking Setups',
    industry: 'Subscription skincare',
    headline: 'Server-side tracking recovered 29% of lost conversion events',
    before: [
      { label: 'Events matched', value: '68%' },
      { label: 'Platform vs bank gap', value: '34%' },
      { label: 'Reported ROAS', value: '1.7x' },
    ],
    after: [
      { label: 'Events matched', value: '97%' },
      { label: 'Platform vs bank gap', value: '4%' },
      { label: 'Reported ROAS', value: '3.4x' },
    ],
    summary:
      'GTM server container, Conversions API with deduplication, and consent mode done properly. Nothing changed in media buying for the first 30 days — the lift was pure signal quality.',
    window: '6 weeks',
  },
  {
    slug: 'formwork-studio',
    client: 'Formwork',
    category: 'SEO',
    industry: 'B2B furniture manufacturing',
    headline: 'Organic revenue up 214% by killing 60% of the blog',
    before: [
      { label: 'Organic revenue / mo', value: '$41k' },
      { label: 'Commercial keywords', value: '87' },
      { label: 'Blended CAC', value: '$412' },
    ],
    after: [
      { label: 'Organic revenue / mo', value: '$129k' },
      { label: 'Commercial keywords', value: '640' },
      { label: 'Blended CAC', value: '$284' },
    ],
    summary:
      'Pruned non-commercial content, rebuilt money pages around buying-intent clusters, and fixed an indexation issue hiding 400 product pages from Google.',
    window: '9 months',
  },
  {
    slug: 'runway-nine',
    client: 'Runway 9',
    category: 'Ad Creatives',
    industry: 'Fashion marketplace',
    headline: 'UGC-led hook testing dropped cost per first purchase by 33%',
    before: [
      { label: 'Cost per purchase', value: '$58' },
      { label: 'Hook variants / mo', value: '6' },
      { label: 'Thumbstop rate', value: '18%' },
    ],
    after: [
      { label: 'Cost per purchase', value: '$39' },
      { label: 'Hook variants / mo', value: '48' },
      { label: 'Thumbstop rate', value: '41%' },
    ],
    summary:
      'Creator briefs written from winning static angles, then edited into three-hook variants. Losing hooks were retired weekly instead of left to bleed budget.',
    window: '5 months',
  },
  {
    slug: 'carter-co',
    client: 'Carter & Co',
    category: 'Websites',
    industry: 'High-ticket home services',
    headline: 'Quote requests doubled after a two-step qualification flow',
    before: [
      { label: 'Quote requests / mo', value: '94' },
      { label: 'Lead-to-sale rate', value: '11%' },
      { label: 'Form completion', value: '22%' },
    ],
    after: [
      { label: 'Quote requests / mo', value: '208' },
      { label: 'Lead-to-sale rate', value: '24%' },
      { label: 'Form completion', value: '61%' },
    ],
    summary:
      'Asked for project scope before contact details, then routed high-value leads to a same-day call slot. Sales stopped wasting time on unqualified enquiries.',
    window: '3 months',
  },
]

export const CASE_FILTERS = ['All', 'Ad Creatives', 'Websites', 'Tracking Setups', 'SEO'] as const

export type Post = {
  slug: string
  title: string
  category: 'CRO' | 'Paid Ads' | 'Tracking' | 'SEO' | 'Creative'
  excerpt: string
  date: string
  readTime: string
  featured?: boolean
  body: { heading?: string; paragraphs: string[]; list?: string[] }[]
}

export const POSTS: Post[] = [
  {
    slug: 'server-side-tracking-playbook',
    title: 'The server-side tracking playbook we run in the first 48 hours',
    category: 'Tracking',
    excerpt:
      'Browser pixels lose a third of your conversions. Here is the exact event schema, container setup and deduplication logic we deploy before touching media budgets.',
    date: '2026-07-14',
    readTime: '9 min',
    featured: true,
    body: [
      {
        paragraphs: [
          'Every account we inherit has the same wound: the platforms report revenue that does not match the bank. The gap is almost never a media buying problem. It is a measurement problem, and it compounds because the algorithm optimises against whatever signal it receives.',
          'This is the sequence we run in the first 48 hours of an engagement, before a single campaign is restructured.',
        ],
      },
      {
        heading: 'Step 1 — Measure the gap before you fix anything',
        paragraphs: [
          'Pull platform-reported purchases against the actual order count from your commerce backend for the last 28 days. Anything above a 10% discrepancy means the signal driving your bidding is fiction.',
          'Document the number. It becomes the baseline you report the recovery against, and it stops the fix from being invisible later.',
        ],
      },
      {
        heading: 'Step 2 — One event schema, written down',
        paragraphs: [
          'Before touching a container, define the events and the parameters each one carries. Most accounts fail here: three teams have fired three versions of the same purchase event over two years.',
        ],
        list: [
          'A canonical event list with no synonyms — one purchase event, not four',
          'Required parameters per event, including value, currency and a stable event ID',
          'A deduplication key shared between browser and server',
          'Consent state passed explicitly, never assumed',
        ],
      },
      {
        heading: 'Step 3 — Server container, then Conversions API',
        paragraphs: [
          'Stand up a server-side GTM container on your own subdomain, route the web container through it, and only then wire Conversions API for Meta and TikTok plus enhanced conversions for Google.',
          'Ordering matters. Teams that wire the APIs first end up with duplicate events and spend a week untangling attribution they broke themselves.',
        ],
      },
      {
        heading: 'Step 4 — Report the recovery, not the setup',
        paragraphs: [
          'Nobody outside marketing cares that a container exists. Report the recovered event percentage and the closed gap between platform and bank. On the last four accounts we ran this on, the median recovery was 27% of previously lost events — with zero change to media strategy.',
        ],
      },
    ],
  },
  {
    slug: 'landing-page-teardown-framework',
    title: 'A landing page teardown framework that survives paid traffic',
    category: 'CRO',
    excerpt:
      'Organic visitors forgive a slow, vague page. Paid visitors do not. The five-block structure we use to rebuild pages around a single conversion event.',
    date: '2026-06-28',
    readTime: '7 min',
    body: [
      {
        paragraphs: [
          'A page that converts organic traffic at 4% will often convert paid traffic at under 1%. The visitor arrived mid-scroll with no context and no patience, and your homepage was never built for that.',
        ],
      },
      {
        heading: 'The five blocks, in order',
        paragraphs: ['Every high-intent page we ship carries these five blocks and nothing decorative between them.'],
        list: [
          'Match block — restates the promise from the ad, word for word',
          'Proof block — the single strongest quantitative proof point, above the fold',
          'Mechanism block — how it works, in three steps a skimmer can absorb',
          'Objection block — placed at the measured scroll drop-off, not at the bottom',
          'Action block — one conversion event, repeated, with no competing links',
        ],
      },
      {
        heading: 'Instrument before you argue',
        paragraphs: [
          'Heatmaps, scroll depth and session replay go up before the redesign, not after. Opinions about hero copy end the moment you can see 60% of visitors never reach the pricing section.',
        ],
      },
    ],
  },
  {
    slug: 'creative-testing-matrix',
    title: 'How to run a creative testing matrix without burning budget',
    category: 'Creative',
    excerpt:
      'Volume alone is not a strategy. Name your angles, structure your hooks, and kill losers on a schedule instead of on a feeling.',
    date: '2026-06-09',
    readTime: '6 min',
    body: [
      {
        paragraphs: [
          'Most accounts confuse creative volume with creative strategy. Forty variations of the same angle teaches you nothing except which font your audience tolerates.',
        ],
      },
      {
        heading: 'Angles first, executions second',
        paragraphs: [
          'Write five to seven named angles — the actual arguments for buying. Each angle then gets three hook variants and two formats. That grid is your month, and every result maps back to an argument you can reuse in landing page copy and email.',
        ],
      },
      {
        heading: 'Kill on a schedule',
        paragraphs: [
          'Set the kill threshold before launch and review on a fixed weekly cadence. Creative that misses the threshold gets retired the same day, regardless of how much anyone in the room likes it.',
        ],
      },
    ],
  },
  {
    slug: 'blended-cac-dashboard',
    title: 'The only four numbers your growth dashboard needs',
    category: 'Paid Ads',
    excerpt:
      'Platform ROAS is a story each channel tells about itself. Blended CAC, contribution margin, payback period and MER are the numbers that decide whether you scale.',
    date: '2026-05-22',
    readTime: '8 min',
    body: [
      {
        paragraphs: [
          'If three channels each claim credit for the same purchase, your reported ROAS can exceed reality by a wide margin. The fix is not better attribution modelling. It is reporting at the business level.',
        ],
      },
      {
        heading: 'The four numbers',
        paragraphs: ['These are the only metrics on the top row of every dashboard we build.'],
        list: [
          'Blended CAC — total acquisition spend divided by new customers',
          'Contribution margin — revenue after COGS, shipping, fees and media',
          'Payback period — weeks until a cohort repays its acquisition cost',
          'MER — total revenue divided by total ad spend',
        ],
      },
      {
        heading: 'Scale gates, not scale hopes',
        paragraphs: [
          'Budget increases should be gated on contribution margin holding at a defined threshold for a defined window. Written down in advance, scaling stops being an argument and becomes arithmetic.',
        ],
      },
    ],
  },
  {
    slug: 'seo-pruning-commercial-intent',
    title: 'Why we delete most of the blog before writing anything new',
    category: 'SEO',
    excerpt:
      'Content that ranks for non-buyers dilutes your site and your team. Score every page by commercial intent, then prune without sentiment.',
    date: '2026-05-05',
    readTime: '6 min',
    body: [
      {
        paragraphs: [
          'A 400-post blog pulling 90,000 monthly visitors and $0 in assisted revenue is not an asset. It is a maintenance liability that competes with your own money pages for crawl budget and internal link equity.',
        ],
      },
      {
        heading: 'Score, then prune',
        paragraphs: [
          'Every URL gets a commercial intent score and an assisted revenue figure. Anything scoring zero on both is consolidated or removed, with redirects mapped to the closest money page.',
        ],
      },
      {
        heading: 'Then build the money pages properly',
        paragraphs: [
          'Only after pruning do we build clusters around buying-intent terms, with internal links pointing deliberately at pages that convert. On our last four SEO engagements this sequence produced a median 31% reduction in blended CAC within three quarters.',
        ],
      },
    ],
  },
]

export const POST_CATEGORIES = ['All', 'CRO', 'Paid Ads', 'Tracking', 'SEO', 'Creative'] as const

export const COMPARISON_ROWS = [
  { feature: 'Reporting focus', traditional: 'Impressions, reach, follower growth', waybing: 'Blended CAC, contribution margin, MER' },
  { feature: 'Creative production', traditional: 'Recycled templates, 2–4 assets a month', waybing: 'Human-crafted, 30+ assets, angle-mapped' },
  { feature: 'Conversion tracking', traditional: 'Browser pixel, installed once in 2021', waybing: 'Server-side container + Conversions API' },
  { feature: 'Landing pages', traditional: 'Traffic sent to the homepage', waybing: 'One page per traffic source and intent' },
  { feature: 'Commitment', traditional: '12-month retainer, 60-day exit clause', waybing: '60-day cycle, 30-day rolling after' },
  { feature: 'Who does the work', traditional: 'Junior pod behind an account manager', waybing: 'The four people on your kickoff call' },
  { feature: 'Asset ownership', traditional: 'Agency-held accounts and files', waybing: 'Yours from day one, no exceptions' },
  { feature: 'Risk model', traditional: 'You pay regardless of outcome', waybing: '60-day guarantee or we work free' },
]
