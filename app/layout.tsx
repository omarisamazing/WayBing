import { Analytics } from '@vercel/analytics/next'
import type { Metadata, Viewport } from 'next'
import { Instrument_Sans, JetBrains_Mono } from 'next/font/google'
import { BookingProvider } from '@/components/site/booking-provider'
import { SiteNav } from '@/components/site/site-nav'
import { SiteFooter } from '@/components/site/site-footer'
import { Ticker } from '@/components/site/ticker'
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
  title: {
    default: 'WayBing — Performance Marketing & Growth Design Engine',
    template: '%s / WayBing',
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
    title: 'WayBing — Performance Marketing & Growth Design Engine',
    description:
      'A revenue engine, not a retainer. Creative, CRO, paid media and SEO measured against blended CAC and contribution margin.',
    type: 'website',
    siteName: 'WayBing',
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
        <BookingProvider>
          <Ticker />
          <SiteNav />
          <main>{children}</main>
          <SiteFooter />
        </BookingProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
