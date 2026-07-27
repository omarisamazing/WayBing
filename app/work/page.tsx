import type { Metadata } from 'next'
import { BookingSection } from '@/components/site/booking-section'
import { CaseGrid } from '@/components/site/case-grid'
import { PageHero } from '@/components/site/page-hero'
import { Shell } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/json-ld'
import { CASE_STUDIES } from '@/lib/content'
import { breadcrumbSchema, graph, pageMeta } from '@/lib/seo'
import { SITE } from '@/lib/site'

export const metadata: Metadata = pageMeta({
  title: 'Work — Digital Marketing Case Studies With Real Numbers',
  description:
    'WayBing case studies: ad creative, website rebuilds, server-side tracking and SEO engagements with the before and after metrics attached.',
  path: '/work',
  keywords: ['WayBing case studies', 'digital marketing case studies', 'CRO case study', 'paid ads case study'],
})

export default function WorkPage() {
  return (
    <>
      <PageHero
        label="Case studies"
        title={
          <>
            Before and after numbers, <span className="text-accent">not logos on a wall.</span>
          </>
        }
        intro="Every case below lists the metric we were hired to move, what it was at kickoff, and where it landed. Client names are used with permission; figures are pulled from their own dashboards."
        meta={[
          { value: '$84.6M', label: 'Tracked client revenue' },
          { value: '6', label: 'Published breakdowns' },
          { value: '3.9x', label: 'Average blended ROAS' },
          { value: '100%', label: 'Client-verified figures' },
        ]}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <CaseGrid />
        </Shell>
      </section>

      <BookingSection />
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'Work', path: '/work' },
          ]),
          {
            '@type': 'ItemList',
            name: 'WayBing case studies',
            itemListElement: CASE_STUDIES.map((study, i) => ({
              '@type': 'ListItem',
              position: i + 1,
              name: study.headline,
              url: `${SITE.url}/work/${study.slug}`,
            })),
          }
        )}
      />
    </>
  )
}
