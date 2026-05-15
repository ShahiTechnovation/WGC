// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// WGC CONSTANTS — Asia-focused data
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export const WGC_BRAND = {
  name: 'World Gaming Council',
  shortName: 'WGC',
  tagline: "The governing body for Asian gaming.",
  description: "World Gaming Council unites builders, players, and ecosystems across Asia — setting standards for the next era of competitive gaming.",
  founded: 2025,
  headquarters: 'Asia-Wide',
} as const

export const NAV_LINKS = [
  { label: 'About', href: '/about' },
  { label: 'Events', href: '/events' },
  { label: 'Council', href: '/council' },
  { label: 'Partners', href: '/partners' },
  { label: 'News', href: '/news' },
] as const

export const SOCIAL_LINKS = [
  { name: 'X / Twitter', handle: '@wgc_global', url: 'https://twitter.com/wgc_global' },
  { name: 'Discord', handle: 'WGC Server', url: 'https://discord.gg/wgc' },
  { name: 'LinkedIn', handle: 'World Gaming Council', url: 'https://linkedin.com/company/wgc' },
  { name: 'Instagram', handle: '@wgc.official', url: 'https://instagram.com/wgc.official' },
] as const

export const HERO_STATS = [
  { number: '20+', label: 'Cities' },
  { number: '10K+', label: 'Builders' },
  { number: 'Asia', label: 'Wide' },
] as const

export const STATS_BAR = [
  { label: 'Cities', value: 20, suffix: '+', prefix: '' },
  { label: 'Builders', value: 10000, suffix: '+', prefix: '' },
  { label: 'Events Planned', value: 30, suffix: '+', prefix: '' },
  { label: 'Nations', value: 12, suffix: '+', prefix: '' },
  { label: 'Prize Pool', value: 1, suffix: 'CR+', prefix: '₹' },
] as const

export const PRINCIPLES = [
  {
    number: '01',
    title: 'ORGANIZE',
    description: 'Structured city-by-city rollout across Asia. Every event feeds the next.',
  },
  {
    number: '02',
    title: 'LEGITIMIZE',
    description: 'Standards, recognition, council backing. Making gaming matter.',
  },
  {
    number: '03',
    title: 'DOMINATE',
    description: 'Nov 19 2026. GTA 6 launch day. Asia ready. The biggest stage.',
  },
] as const

export const MAP_CITIES = [
  { id: 'delhi', name: 'Delhi NCR', x: 32, y: 42, status: 'confirmed' as const, quarter: 'Q3 2026', builders: '500+' },
  { id: 'mumbai', name: 'Mumbai', x: 28, y: 52, status: 'confirmed' as const, quarter: 'Q3 2026', builders: '400+' },
  { id: 'bangalore', name: 'Bangalore', x: 30, y: 60, status: 'confirmed' as const, quarter: 'Q4 2026', builders: '350+' },
  { id: 'seoul', name: 'Seoul', x: 72, y: 30, status: 'confirmed' as const, quarter: 'Q2 2026', builders: '600+' },
  { id: 'tokyo', name: 'Tokyo', x: 80, y: 32, status: 'confirmed' as const, quarter: 'Q2 2026', builders: '700+' },
  { id: 'singapore', name: 'Singapore', x: 55, y: 68, status: 'confirmed' as const, quarter: 'Q3 2026', builders: '450+' },
  { id: 'jakarta', name: 'Jakarta', x: 56, y: 72, status: 'upcoming' as const, quarter: 'Q4 2026', builders: '300+' },
  { id: 'bangkok', name: 'Bangkok', x: 52, y: 55, status: 'confirmed' as const, quarter: 'Q3 2026', builders: '350+' },
  { id: 'kualalumpur', name: 'Kuala Lumpur', x: 54, y: 64, status: 'upcoming' as const, quarter: 'Q4 2026', builders: '250+' },
  { id: 'dubai', name: 'Dubai', x: 15, y: 45, status: 'confirmed' as const, quarter: 'Q2 2026', builders: '400+' },
  { id: 'hongkong', name: 'Hong Kong', x: 64, y: 46, status: 'upcoming' as const, quarter: 'Q4 2026', builders: '500+' },
  { id: 'taipei', name: 'Taipei', x: 70, y: 42, status: 'upcoming' as const, quarter: 'Q4 2026', builders: '350+' },
] as const

export type EventStatus = 'CONFIRMED' | 'UPCOMING' | 'LIVE' | 'DONE'

export interface WGCEvent {
  id: string
  title: string
  city: string
  date: string
  month: string
  status: EventStatus
  flagship?: boolean
  description?: string
  prizePool?: string
  builders?: string
}

export const EVENTS_ROADMAP: WGCEvent[] = [
  { id: 'e1', title: 'City Builder Night', city: 'Dubai', date: '15 Jun 2026', month: 'JUN', status: 'CONFIRMED' },
  { id: 'e2', title: 'WGC Qualifier #1', city: 'Seoul', date: '22 Jun 2026', month: 'JUN', status: 'CONFIRMED' },
  { id: 'e3', title: 'Hack Arena Delhi', city: 'Delhi NCR', date: '28 Jun 2026', month: 'JUN', status: 'UPCOMING' },
  { id: 'e4', title: 'Asia Open Hackathon', city: 'Tokyo', date: '06 Jul 2026', month: 'JUL', status: 'CONFIRMED' },
  { id: 'e5', title: 'Builder Summit', city: 'Singapore', date: '15 Jul 2026', month: 'JUL', status: 'UPCOMING' },
  { id: 'e6', title: 'Code Arena Bangkok', city: 'Bangkok', date: '25 Jul 2026', month: 'JUL', status: 'UPCOMING' },
  { id: 'e7', title: 'Game Dev Sprint', city: 'Mumbai', date: '10 Aug 2026', month: 'AUG', status: 'UPCOMING' },
  { id: 'e8', title: 'WGC Qualifier #2', city: 'Bangalore', date: '22 Aug 2026', month: 'AUG', status: 'UPCOMING' },
  { id: 'e9', title: 'Esports Combine', city: 'Taipei', date: '05 Sep 2026', month: 'SEP', status: 'UPCOMING' },
  { id: 'e10', title: 'Builder Bootcamp', city: 'Hong Kong', date: '18 Sep 2026', month: 'SEP', status: 'UPCOMING' },
  { id: 'e11', title: 'Pre-Flagship Qualifier', city: 'Kuala Lumpur', date: '10 Oct 2026', month: 'OCT', status: 'UPCOMING' },
  {
    id: 'flagship',
    title: 'WGC HACKATHON 2026',
    city: 'Pan-Asia',
    date: '19 Nov 2026',
    month: 'NOV',
    status: 'CONFIRMED',
    flagship: true,
    description: "Asia's Biggest Gaming Hackathon",
    prizePool: '₹1CR+',
    builders: '10,000+',
  },
]

export interface CouncilMember {
  id: string
  name: string
  role: string
  org: string
  founding?: boolean
  avatar: string
}

export const COUNCIL_MEMBERS: CouncilMember[] = [
  { id: 'm1', name: 'Arjun Kapoor', role: 'Chairman & Founder', org: 'WGC', founding: true, avatar: '/avatar-m1.png' },
  { id: 'm2', name: 'Yuki Tanaka', role: 'Head of Esports', org: 'WGC Japan', founding: true, avatar: '/avatar-m2.png' },
  { id: 'm3', name: 'Min-Jun Park', role: 'Regional Director', org: 'WGC Korea', founding: true, avatar: '/avatar-m3.png' },
  { id: 'm4', name: 'Priya Sharma', role: 'Events Director', org: 'WGC India', avatar: '/avatar-m4.png' },
  { id: 'm5', name: 'Li Wei Chen', role: 'Strategy Lead', org: 'WGC China', avatar: '/avatar-m5.png' },
  { id: 'm6', name: 'Sarah Al-Rashid', role: 'Partnerships VP', org: 'WGC Gulf', avatar: '/avatar-m6.png' },
]




export interface Partner {
  id: string
  name: string
  handle: string
  tier: 'title' | 'org' | 'media' | 'community' | 'blockchain'
  logoUrl?: string
}

export const PARTNERS: Partner[] = [
  { id: 'p1', name: 'Riot Games SEA', handle: '@rikimsea', tier: 'title' },
  { id: 'p2', name: 'HyperConnect', handle: '@hyperconnect', tier: 'title' },
  { id: 'p3', name: 'PlayVentures', handle: '@playventures', tier: 'title' },
  { id: 'p4', name: 'GameStack Asia', handle: '@gamestackasia', tier: 'title' },
  { id: 'p5', name: 'NeonForge Labs', handle: '@neonforgelabs', tier: 'org' },
  { id: 'p6', name: 'ByteArena', handle: '@bytearena', tier: 'org' },
  { id: 'p7', name: 'PixelVault', handle: '@pixelvault', tier: 'org' },
  { id: 'p8', name: 'CodeCraft', handle: '@codecraft', tier: 'org' },
  { id: 'p9', name: 'BuilderDAO', handle: '@builderdao', tier: 'org' },
  { id: 'p10', name: 'ChainPlay', handle: '@chainplay', tier: 'org' },
  { id: 'p11', name: 'MetaForge', handle: '@metaforge', tier: 'org' },
  { id: 'p12', name: 'SynthLabs', handle: '@synthlabs', tier: 'org' },
  { id: 'p13', name: 'NovaStack', handle: '@novastack', tier: 'org' },
  { id: 'p14', name: 'VortexGG', handle: '@vortexgg', tier: 'org' },
  { id: 'p15', name: 'GlitchNet', handle: '@glitchnet', tier: 'org' },
  { id: 'p16', name: 'PulseGaming', handle: '@pulsegaming', tier: 'org' },
  { id: 'p17', name: 'Esports Insider Asia', handle: '@esikiasia', tier: 'media' },
  { id: 'p18', name: 'GameBeat SEA', handle: '@gamebeatse', tier: 'media' },
  { id: 'p19', name: 'The Gaming Wire', handle: '@thegamingwire', tier: 'media' },
  { id: 'p20', name: 'Asia Gamer Daily', handle: '@asiagamerdaily', tier: 'media' },
  { id: 'p21', name: 'Delhi Gaming Community', handle: '@delhigaming', tier: 'community' },
  { id: 'p22', name: 'Seoul Builders', handle: '@seoulbuilders', tier: 'community' },
  { id: 'p23', name: 'Tokyo Hack Club', handle: '@tokyohackclub', tier: 'community' },
  { id: 'p24', name: 'SG Dev Network', handle: '@sgdevnet', tier: 'community' },
]

export const WGC_DIVISIONS = [
  {
    number: '01',
    name: 'Regional Operations',
    desc: 'City Events & Coordination',
    status: 'ACTIVE' as const,
    details: 'Manages the city-by-city rollout of WGC events across 12+ nations in Asia.',
    stats: { cities: '20+', members: '50+', events: '30+', status: 'Active' },
  },
  {
    number: '02',
    name: 'Hackathon Division',
    desc: 'Builder Programs & Prizes',
    status: 'ACTIVE' as const,
    details: 'Designs and executes all hackathon programming, prize structures, and builder support.',
    stats: { cities: '12+', members: '30+', events: '15+', status: 'Active' },
  },
  {
    number: '03',
    name: 'Standards & Recognition',
    desc: 'Governance & Protocol',
    status: 'UPCOMING' as const,
    details: 'Establishing formal standards for competitive gaming events across the region.',
    stats: { cities: '—', members: '10+', events: '—', status: 'Q3 2026' },
  },
  {
    number: '04',
    name: 'Media & Broadcasting',
    desc: 'Content & Coverage',
    status: 'UPCOMING' as const,
    details: 'Building the media infrastructure for live coverage and content distribution.',
    stats: { cities: '—', members: '8+', events: '—', status: 'Q4 2026' },
  },
]

export const PARTNER_BENEFITS = [
  'Direct access to 10,000+ builders across Asia',
  'Brand presence at 30+ events in 2026',
  'Co-host city-level events in your market',
  'Priority placement in WGC media coverage',
] as const

export const TICKER_TEXT = "WORLD GAMING COUNCIL  ◆  ASIA  ◆  20+ CITIES  ◆  NOVEMBER 2026  ◆  THE GAME CHANGES HERE  ◆  HACKATHONS  ◆  BUILDERS  ◆  WGC"

export const PRESS_CONTACT = {
  email: 'council@wgc.global',
  phone: '+91-800-WGC-2026',
} as const

// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// NEWS POSTS — hardcoded until CMS is wired
// ━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

export interface NewsPost {
  _id: string
  title: string
  slug: string
  category: string
  publishedAt: string
  author: string
  excerpt: string
}

export const NEWS_POSTS: NewsPost[] = [
  { _id: '1', title: 'WGC Announces 2026 Pan-Asia Hackathon Schedule', slug: 'pan-asia-hackathon-schedule', category: 'Announcement', publishedAt: '2026-05-01', author: 'WGC Team', excerpt: 'The complete roadmap for 2026 is here — 30+ events across 20+ cities, culminating in the November flagship.' },
  { _id: '2', title: 'Seoul Qualifier Draws Record Applications', slug: 'seoul-qualifier-record', category: 'News', publishedAt: '2026-04-28', author: 'Min-Jun Park', excerpt: 'Over 1,200 builders applied for the Seoul qualifier, making it the most competitive WGC event to date.' },
  { _id: '3', title: 'HyperConnect Joins as Title Partner', slug: 'hyperconnect-title-partner', category: 'Partnership', publishedAt: '2026-04-20', author: 'Sarah Al-Rashid', excerpt: 'HyperConnect becomes WGC\'s newest title partner, bringing connectivity infrastructure across Southeast Asia.' },
  { _id: '4', title: 'WGC Standards Framework v1.0 Released', slug: 'standards-framework-v1', category: 'Announcement', publishedAt: '2026-04-15', author: 'Arjun Kapoor', excerpt: 'The first version of WGC\'s competitive standards framework is now live, covering event organization, judging, and prize distribution.' },
  { _id: '5', title: 'Dubai Builder Night Recap', slug: 'dubai-builder-night-recap', category: 'News', publishedAt: '2026-04-10', author: 'WGC Gulf', excerpt: '400+ builders gathered in Dubai for WGC\'s first Gulf region event. Here\'s what happened.' },
]

