import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { BookingProvider } from '@/components/site/booking-provider'
import { Cursor } from '@/components/site/cursor'
import { JsonLd } from '@/components/site/json-ld'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Ticker } from '@/components/site/ticker'
import { graph, organizationSchema, websiteSchema } from '@/lib/seo'
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
    // Brand first: a "waybing" search has to match the very start of the title.
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.name,
  generator: 'v0.app',
  keywords: [...SITE.keywords],
  authors: [{ name: SITE.legalName, url: SITE.url }],
  creator: SITE.legalName,
  publisher: SITE.legalName,
  category: 'Digital marketing',
  openGraph: {
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
    type: 'website',
    siteName: SITE.name,
    url: SITE.url,
    locale: 'en_GB',
  },
  twitter: {
    card: 'summary_large_image',
    site: SITE.twitterHandle,
    creator: SITE.twitterHandle,
    title: `${SITE.name} — ${SITE.tagline}`,
    description: SITE.shortDescription,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1,
    },
  },
  // Set these in project env once the properties are claimed; omitted otherwise.
  verification: {
    google:
      process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION ??
      '4vqdvRGs9rsa2jcvjo6ZfAcy1Joknke8wEXE2SuoMYs',
    other: process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION
      ? { 'msvalidate.01': process.env.NEXT_PUBLIC_BING_SITE_VERIFICATION }
      : undefined,
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      { url: '/icon.svg', type: 'image/svg+xml' },
    ],
    apple: '/apple-icon.png',
  },
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
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:border focus:border-foreground focus:bg-background focus:px-4 focus:py-2 focus:font-mono focus:text-sm"
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
        {/* Brand entity + website node, present on every URL so Google can merge them. */}
        <JsonLd data={graph(organizationSchema, websiteSchema)} />
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
