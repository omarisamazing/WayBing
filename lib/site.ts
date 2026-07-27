/**
 * Single source of truth for anything that appears in more than one place:
 * contact details, the canonical URL, legal copy dates.
 * Change it here and the nav, footer, emails, sitemap and schema all follow.
 */
export const SITE = {
  name: 'WayBing',
  legalName: 'WayBing Ltd',
  tagline: 'Performance Marketing & Growth Design Engine',
  /** Set NEXT_PUBLIC_SITE_URL in production so canonicals and the sitemap are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://waybing.com',
  email: 'growth@waybing.com',
  phone: '+1 (415) 555-0142',
  phoneHref: 'tel:+14155550142',
  locations: ['London', 'New York'],
  founded: '2019',
  socials: [
    { href: 'https://www.linkedin.com/company/waybing', label: 'LinkedIn' },
    { href: 'https://x.com/waybing', label: 'X / Twitter' },
    { href: 'https://www.instagram.com/waybing', label: 'Instagram' },
    { href: 'https://www.youtube.com/@waybing', label: 'YouTube' },
  ],
  legalUpdated: 'January 2026',
} as const
