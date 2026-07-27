import type { Metadata } from 'next'
import { SITE } from '@/lib/site'

/**
 * Every schema block on the site is built here so the entity is described
 * identically on every URL. Google merges these by `@id`, so the ids below are
 * stable, absolute, and reused rather than regenerated per page.
 */

const abs = (path: string) => `${SITE.url}${path.startsWith('/') ? path : `/${path}`}`

export const ORG_ID = `${SITE.url}/#organization`
export const SITE_ID = `${SITE.url}/#website`

/** The agency itself. This is the node that resolves a "waybing" brand search. */
export const organizationSchema = {
  '@type': ['Organization', 'ProfessionalService'],
  '@id': ORG_ID,
  name: SITE.legalName,
  alternateName: [...SITE.aliases],
  legalName: SITE.legalName,
  url: SITE.url,
  logo: {
    '@type': 'ImageObject',
    url: abs('/icon.svg'),
    caption: `${SITE.name} logo`,
  },
  image: abs('/opengraph-image'),
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.founded,
  slogan: SITE.tagline,
  description: SITE.description,
  knowsAbout: [
    'Digital marketing',
    'Performance marketing',
    'Conversion rate optimisation',
    'Paid social advertising',
    'Paid search advertising',
    'Server-side conversion tracking',
    'Search engine optimisation',
    'Landing page design',
  ],
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'Place', name: 'Worldwide (remote)' },
  ],
  address: SITE.locations.map((city) => ({
    '@type': 'PostalAddress',
    addressLocality: city,
  })),
  contactPoint: {
    '@type': 'ContactPoint',
    contactType: 'sales',
    email: SITE.email,
    telephone: SITE.phone,
    availableLanguage: ['en'],
  },
  sameAs: SITE.socials.map((social) => social.href),
}

/** The website node, so sitelinks and brand-name searches attach to the right entity. */
export const websiteSchema = {
  '@type': 'WebSite',
  '@id': SITE_ID,
  url: SITE.url,
  name: SITE.name,
  alternateName: [...SITE.aliases],
  description: SITE.description,
  inLanguage: 'en',
  publisher: { '@id': ORG_ID },
}

/** Wraps any set of nodes in a single @graph so one script tag covers the page. */
export function graph(...nodes: Record<string, unknown>[]) {
  return { '@context': 'https://schema.org', '@graph': nodes }
}

export function breadcrumbSchema(trail: { name: string; path: string }[]) {
  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((crumb, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: crumb.name,
      item: abs(crumb.path),
    })),
  }
}

export function serviceSchema(service: {
  title: string
  slug: string
  short: string
  pitch: string
  deliverables: readonly string[]
}) {
  return {
    '@type': 'Service',
    '@id': abs(`/services/${service.slug}#service`),
    name: `${service.title} — ${SITE.name}`,
    serviceType: service.title,
    category: 'Digital marketing',
    description: service.pitch,
    url: abs(`/services/${service.slug}`),
    provider: { '@id': ORG_ID },
    areaServed: [
      { '@type': 'Country', name: 'United Kingdom' },
      { '@type': 'Country', name: 'United States' },
    ],
    hasOfferCatalog: {
      '@type': 'OfferCatalog',
      name: `${service.title} deliverables`,
      itemListElement: service.deliverables.map((item) => ({
        '@type': 'Offer',
        itemOffered: { '@type': 'Service', name: item },
      })),
    },
  }
}

export function articleSchema(post: {
  title: string
  slug: string
  excerpt: string
  date: string
  category: string
}) {
  return {
    '@type': 'BlogPosting',
    '@id': abs(`/blog/${post.slug}#article`),
    headline: post.title,
    description: post.excerpt,
    url: abs(`/blog/${post.slug}`),
    datePublished: post.date,
    dateModified: post.date,
    articleSection: post.category,
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
}

export function caseStudySchema(study: { client: string; slug: string; headline: string; summary: string }) {
  return {
    '@type': 'Article',
    '@id': abs(`/work/${study.slug}#case-study`),
    headline: `${study.client} case study — ${study.headline}`,
    description: study.summary,
    url: abs(`/work/${study.slug}`),
    inLanguage: 'en',
    isPartOf: { '@id': SITE_ID },
    author: { '@id': ORG_ID },
    publisher: { '@id': ORG_ID },
  }
}

export function faqSchema(faqs: readonly { q: string; a: string }[]) {
  return {
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.q,
      acceptedAnswer: { '@type': 'Answer', text: faq.a },
    })),
  }
}

/**
 * Page metadata builder. Keeps canonical, Open Graph and Twitter in sync so no
 * page can quietly ship without them — duplicate/missing canonicals are the
 * single most common reason a page never ranks for its own brand term.
 */
export function pageMeta({
  title,
  description,
  path,
  keywords,
  type = 'website',
  publishedTime,
}: {
  title: string
  description: string
  path: string
  keywords?: string[]
  type?: 'website' | 'article'
  publishedTime?: string
}): Metadata {
  return {
    title,
    description,
    keywords,
    alternates: { canonical: path },
    openGraph: {
      title: `${title} | ${SITE.name}`,
      description,
      url: path,
      siteName: SITE.name,
      type,
      locale: 'en_GB',
      ...(publishedTime ? { publishedTime } : {}),
    },
    twitter: {
      card: 'summary_large_image',
      title: `${title} | ${SITE.name}`,
      description,
    },
  }
}
