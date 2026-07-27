import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { BookingProvider } from '@/components/site/booking-provider'
import { Cursor } from '@/components/site/cursor'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Ticker } from '@/components/site/ticker'
import { SITE } from '@/lib/site'
import './globals.css'

const instrumentSans = Instrument_Sans({
  subsets: ['latin'],
  variable: '--font-instrument-sans',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  alternates: { canonical: '/' },
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s / ${SITE.name}`,
  },
  description:
    'WayBing builds revenue engines for founders and e-commerce brands: conversion-first design, CRO, paid ads with server-side tracking, and SEO growth. 60-day zero-fluff growth guarantee.',
  generator: 'v0.app',
  keywords: [
    'performance marketing agency',
    'conversion rate optimization',
    'server-side tracking',
    'paid ads management',
    'SEO growth agency',
    'growth design',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description:
      'A revenue engine, not a retainer. Creative, CRO, paid media and SEO measured against blended CAC and contribution margin.',
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.tagline}`,
    description: 'A revenue engine, not a retainer. Measured against blended CAC and contribution margin.',
  },
  robots: { index: true, follow: true },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
}

/** Search-engine entity data. Cheap, static, and helps the brand panel resolve. */
const organizationSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: SITE.legalName,
  alternateName: SITE.name,
  url: SITE.url,
  email: SITE.email,
  telephone: SITE.phone,
  foundingDate: SITE.founded,
  description:
    'Performance marketing and growth design: conversion-first design, CRO, paid media and SEO wired to server-side tracking.',
  areaServed: SITE.locations,
  sameAs: SITE.socials.map((social) => social.href),
}

export const viewport: Viewport = {
  colorScheme: 'light',
  themeColor: '#f4f1eb',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`bg-background ${instrumentSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-foreground focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-xs focus:uppercase focus:tracking-[0.14em]"
        >
          Skip to content
        </a>
        <ScrollProgress />
        <Cursor />
        <BookingProvider>
          <Ticker />
          <SiteNav />
          <main id="main">{children}</main>
          <SiteFooter />
        </BookingProvider>
        <script
          type="application/ld+json"
          // Static, hand-written JSON-LD — no user input is interpolated.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
