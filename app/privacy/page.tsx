import type { Metadata } from 'next'
import { LegalDoc, type LegalSection } from '@/components/site/legal-doc'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Privacy policy',
  description: `How ${SITE.legalName} collects, uses and stores the information you send through this website.`,
  alternates: { canonical: '/privacy' },
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'What we collect',
    body: [
      'Only what you type into a form on this site. There are no hidden trackers, no data brokers, and no third-party advertising pixels on these pages.',
    ],
    list: [
      'Audit requests: your website URL, email address, monthly ad budget range, the bottleneck you described, and the services you ticked.',
      'Call bookings: your email address, company name if you gave one, and the day and time slot you picked.',
      'Anonymous page analytics: page path, referrer, country, and device type — aggregated, with no cookies and no cross-site profile.',
    ],
  },
  {
    heading: 'Why we collect it',
    body: [
      'To reply to you and to prepare the audit or call you asked for. That is the whole purpose. Under UK and EU GDPR our lawful basis is legitimate interest for replying to a direct enquiry, and consent where you have explicitly opted in.',
      'We do not add you to a mailing list because you requested an audit. If we ever start a newsletter, you will have to tick a box to join it.',
    ],
  },
  {
    heading: 'Who can see it',
    body: [
      'The four people who work on client accounts, plus the small number of processors we rely on to run the business. Each one is bound by its own data processing terms.',
    ],
    list: [
      'Vercel — website hosting and anonymous analytics.',
      'Resend — transactional email delivery for form notifications.',
      'Google Workspace — our email and documents.',
      'Our analytics and ad platform accounts, only once you are a client and only for accounts you own.',
    ],
  },
  {
    heading: 'We never sell your data',
    body: [
      'We have never sold, rented or traded enquiry data, and we are not going to. We also do not use your submitted information to build lookalike audiences or retargeting lists.',
    ],
  },
  {
    heading: 'How long we keep it',
    body: [
      'Enquiries that do not turn into work are deleted within 24 months. Client records are kept for seven years after the engagement ends, because tax law requires it. Anonymous analytics are retained in aggregate only.',
    ],
  },
  {
    heading: 'Cookies',
    body: [
      'This site sets no marketing or advertising cookies, which is why you did not get a consent banner. Analytics are collected without cookies and cannot identify you individually.',
    ],
  },
  {
    heading: 'Your rights',
    body: [
      'You can ask for a copy of what we hold, ask us to correct it, or ask us to delete it. Email us and we will action it within 30 days, usually within two working days.',
      'If you are in the UK you also have the right to complain to the Information Commissioner\u2019s Office. In the EU, to your local supervisory authority.',
    ],
  },
  {
    heading: 'Changes to this policy',
    body: [
      `This page was last updated in ${SITE.legalUpdated}. If we make a material change we will update the date here rather than quietly editing the text.`,
    ],
  },
]

export default function PrivacyPage() {
  return (
    <LegalDoc
      label="Legal / Privacy"
      title="Privacy policy"
      intro="Written in plain English, because a privacy policy nobody can read is not really a privacy policy. Here is exactly what we collect, why, and how to get rid of it."
      sections={SECTIONS}
    />
  )
}
