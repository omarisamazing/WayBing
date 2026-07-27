import type { Metadata } from 'next'
import { BookingSection } from '@/components/site/booking-section'
import { PageHero } from '@/components/site/page-hero'
import { PostList } from '@/components/site/post-list'
import { Shell } from '@/components/site/primitives'

export const metadata: Metadata = {
  title: 'Resources — Playbooks on CRO, tracking, paid and SEO',
  description:
    'The frameworks we run on client accounts, written out in full: server-side tracking, landing page teardowns, creative testing and commercial SEO.',
}

export default function BlogPage() {
  return (
    <>
      <PageHero
        label="Resources"
        title={
          <>
            The playbooks we run, <span className="text-accent">given away.</span>
          </>
        }
        intro="No email gate, no drip sequence. These are the actual frameworks our team uses on client accounts. If you want to run them yourself, everything you need is here."
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <PostList />
        </Shell>
      </section>

      <BookingSection />
    </>
  )
}
