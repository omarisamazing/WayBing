import type { Metadata } from 'next'
import { LegalDoc, type LegalSection } from '@/components/site/legal-doc'
import { SITE } from '@/lib/site'

export const metadata: Metadata = {
  title: 'Terms of use',
  description: `The terms that apply to this website, the 60-day growth guarantee and any engagement with ${SITE.legalName}.`,
  alternates: { canonical: '/terms' },
}

const SECTIONS: LegalSection[] = [
  {
    heading: 'About these terms',
    body: [
      `This website is operated by ${SITE.legalName}. By browsing it or submitting a form you agree to what is on this page. Actual client work is governed by the signed engagement agreement, which always overrides anything written here.`,
    ],
  },
  {
    heading: 'The 60-day guarantee, precisely',
    body: [
      'The guarantee is real, and it is also specific. It only means something once targets are written down, so here is how it actually works.',
    ],
    list: [
      'Targets are agreed in writing before the first invoice, and they are metrics we can both see in a shared dashboard.',
      'If those targets are not met within 60 days of kickoff, we keep working at no additional fee until they are.',
      'It covers our fees. It does not refund your ad spend, which is paid directly to the platforms and never marked up by us.',
      'It assumes reasonable cooperation: access to accounts, timely feedback, and no mid-flight change to the offer or pricing that invalidates the target.',
      'The exact wording lives in your engagement agreement. If the two ever disagree, the agreement wins.',
    ],
  },
  {
    heading: 'Results and figures on this site',
    body: [
      'Case study numbers describe specific engagements with specific brands, budgets and offers. They are historical outcomes, not projections, and they are not a promise that your account will perform the same way.',
      'Marketing depends on your product, margins, market and timing. Anyone who guarantees you a specific revenue figure before seeing your data is guessing.',
    ],
  },
  {
    heading: 'Who owns what',
    body: [
      'You own everything we build for you: ad accounts, tracking containers, creative files, page builds, dashboards and documentation. Ownership transfers as work is delivered and paid for, and nothing is held hostage at the end of an engagement.',
      'We keep ownership of our internal templates, frameworks and tooling, and we may describe the work in a case study only with your written permission.',
    ],
  },
  {
    heading: 'Fees and cancellation',
    body: [
      'Fees are invoiced monthly in advance. There is no long lock-in: you can end the engagement at any point after the initial 60-day cycle with 30 days written notice.',
      'Ad spend is billed by the platforms to your own payment method. We never take a percentage of spend, because that rewards spending more rather than earning more.',
    ],
  },
  {
    heading: 'Third-party platforms',
    body: [
      'We are not affiliated with, endorsed by or sponsored by Meta, Google, TikTok, Shopify or any other platform. Their policies, approval decisions, outages and pricing are outside our control, and account restrictions imposed by a platform are not a failure of the guarantee.',
    ],
  },
  {
    heading: 'Liability',
    body: [
      'Nothing on this website is legal, tax or financial advice. To the extent permitted by law, our total liability in connection with any engagement is limited to the fees you paid us in the preceding three months. Nothing here limits liability for fraud or anything else that cannot be limited by law.',
    ],
  },
  {
    heading: 'Governing law',
    body: [
      `These terms are governed by the laws of England and Wales, and the courts of England and Wales have exclusive jurisdiction. Last updated ${SITE.legalUpdated}.`,
    ],
  },
]

export default function TermsPage() {
  return (
    <LegalDoc
      label="Legal / Terms"
      title="Terms of use"
      intro="No twelve pages of boilerplate. These are the terms that apply to this site, the 60-day guarantee, and how we work together."
      sections={SECTIONS}
    />
  )
}
