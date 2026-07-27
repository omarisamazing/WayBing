/**
 * Single source of truth for anything that appears in more than one place:
 * contact details, the canonical URL, legal copy dates, search metadata.
 * Change it here and the nav, footer, emails, sitemap and schema all follow.
 */
export const SITE = {
  name: 'WayBing',
  legalName: 'WayBing Ltd',
  /** Short brand line used in titles. Carries the category word search engines match on. */
  tagline: 'Digital Marketing & Performance Growth Agency',
  /** Longer positioning line for hero copy and social cards. */
  proposition: 'Performance marketing and growth design that is measured against revenue, not impressions.',
  /** Set NEXT_PUBLIC_SITE_URL in production so canonicals and the sitemap are absolute. */
  url: process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, '') || 'https://waybing.com',
  email: 'growth@waybing.com',
  phone: '+1 (415) 555-0142',
  phoneHref: 'tel:+14155550142',
  locations: ['London', 'New York'],
  founded: '2019',
  /**
   * Brand spellings people actually type. Feeding these to `alternateName` and
   * the keyword list is what makes a misspelled or spaced-out brand search land here.
   */
  aliases: ['WayBing', 'Way Bing', 'Waybing', 'WayBing Agency', 'WayBing Digital Marketing', 'WayBing Ltd'],
  /**
   * The searchable description. Leads with the brand, then the category, so both
   * "waybing" and "digital marketing agency" queries have something to match.
   */
  description:
    'WayBing is a digital marketing agency building revenue engines for founders and e-commerce brands: conversion-first web design, CRO, paid ads with server-side tracking, and SEO growth — backed by a 60-day guarantee.',
  /** Short version for social cards and meta descriptions with tight limits. */
  shortDescription:
    'WayBing is a digital marketing agency for creative, CRO, paid ads and SEO — measured against blended CAC and contribution margin.',
  keywords: [
    'WayBing',
    'Way Bing',
    'WayBing agency',
    'WayBing digital marketing',
    'digital marketing agency',
    'digital marketing services',
    'digital marketing agency for ecommerce',
    'performance marketing agency',
    'growth marketing agency',
    'conversion rate optimization agency',
    'CRO agency',
    'paid ads agency',
    'PPC management',
    'Meta ads agency',
    'Google Ads agency',
    'server-side tracking',
    'SEO agency',
    'SEO growth',
    'web design and CRO',
    'social media creative agency',
  ],
  socials: [
    { href: 'https://www.linkedin.com/company/waybing', label: 'LinkedIn' },
    { href: 'https://x.com/waybing', label: 'X / Twitter' },
    { href: 'https://www.instagram.com/waybing', label: 'Instagram' },
    { href: 'https://www.youtube.com/@waybing', label: 'YouTube' },
  ],
  /** Handle without the @, used for the Twitter card attribution. */
  twitterHandle: '@waybing',
  legalUpdated: 'January 2026',
} as const
