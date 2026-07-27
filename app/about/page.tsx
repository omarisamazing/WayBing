import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { BookingSection } from '@/components/site/booking-section'
import { PageHero } from '@/components/site/page-hero'
import { Shell, SectionHead } from '@/components/site/primitives'
import { JsonLd } from '@/components/site/json-ld'
import { COMPARISON_ROWS, PRINCIPLES } from '@/lib/content'
import { breadcrumbSchema, graph, pageMeta } from '@/lib/seo'

export const metadata: Metadata = pageMeta({
  title: 'About WayBing — The Digital Marketing Team Behind the Engine',
  description:
    'WayBing is a deliberately small digital marketing team: ROI over vanity metrics, human-crafted creative, and total dashboard transparency. Founded 2019, London and New York.',
  path: '/about',
  keywords: ['about WayBing', 'WayBing agency', 'WayBing team', 'digital marketing agency London', 'digital marketing agency New York'],
})

const TEAM = [
  { role: 'Growth strategist', name: 'Mara Vasquez', detail: 'Ex-media buyer, $40M+ managed spend across DTC and health.' },
  { role: 'Media buyer', name: 'Devin Okoye', detail: 'Meta and Google architecture, margin-gated scaling systems.' },
  { role: 'Design lead', name: 'Iris Lund', detail: 'Creative volume systems, hook-first ad design, brand kits.' },
  { role: 'Growth engineer', name: 'Theo Brandt', detail: 'Server-side tracking, event schemas, dashboards, page builds.' },
]

const TIMELINE = [
  { year: '2019', title: 'Founded on one audit', body: 'Started as a single funnel audit for a DTC brand whose pixel had been broken for eleven months.' },
  { year: '2021', title: 'Tracking became the wedge', body: 'Server-side measurement moved from a nice-to-have to the first thing we build on every account.' },
  { year: '2023', title: 'The guarantee went in writing', body: 'We replaced long retainers with 60-day target agreements. Churn dropped, referrals doubled.' },
  { year: '2026', title: 'Four people, forty-one accounts scaled', body: 'Still deliberately small. The people on your kickoff call are the people doing the work.' },
]

export default function AboutPage() {
  return (
    <>
      <PageHero
        label="About WayBing"
        title={
          <>
            A small team that treats marketing like{' '}
            <span className="text-accent">engineering</span>, not decoration.
          </>
        }
        intro="WayBing exists because most agencies are structured to sell hours, not outcomes. We kept the parts that move revenue — measurement, creative volume, conversion design — and deleted everything built to justify an invoice."
        meta={[
          { value: '2019', label: 'Founded' },
          { value: '4', label: 'People on your account' },
          { value: '41', label: 'Accounts scaled past $100k/mo' },
          { value: '0', label: 'Marked-up ad spend, ever' },
        ]}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="01"
            label="Operating principles"
            title="Three rules we do not bend."
            intro="These are not values on a wall. Each one changes what we ship, what we report and how we get paid."
          />
          <div className="mt-10 grid border-t border-l border-border lg:grid-cols-3">
            {PRINCIPLES.map((principle) => (
              <article key={principle.index} className="border-r border-b border-border p-6 sm:p-8">
                <span className="figure-mono text-4xl leading-none tracking-[-0.04em] text-accent">{principle.index}</span>
                <h3 className="mt-8 text-2xl font-semibold uppercase tracking-[-0.02em] text-balance">{principle.title}</h3>
                <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{principle.body}</p>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-b border-border bg-muted py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="02"
            label="The honest comparison"
            title="Typical agency vs WayBing."
            intro="No spin. If the left column describes what you want, we are the wrong call and we will say so."
          />

          <div className="mt-10 overflow-x-auto border border-border bg-background">
            <table className="w-full min-w-[46rem] border-collapse text-left">
              <thead>
                <tr className="border-b border-border">
                  <th scope="col" className="px-5 py-4 label-mono text-muted-foreground">
                    Dimension
                  </th>
                  <th scope="col" className="border-l border-border px-5 py-4 label-mono text-muted-foreground">
                    <span className="inline-flex items-center gap-2">
                      <X className="size-3.5" aria-hidden="true" />
                      Typical agency
                    </span>
                  </th>
                  <th scope="col" className="border-l border-foreground bg-foreground px-5 py-4 label-mono text-background">
                    <span className="inline-flex items-center gap-2">
                      <Check className="size-3.5 text-accent" aria-hidden="true" />
                      WayBing
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {COMPARISON_ROWS.map((row) => (
                  <tr key={row.feature} className="border-b border-border last:border-b-0">
                    <th scope="row" className="px-5 py-4 text-sm font-medium">
                      {row.feature}
                    </th>
                    <td className="border-l border-border px-5 py-4 text-sm text-muted-foreground line-through decoration-muted-foreground/40">
                      {row.traditional}
                    </td>
                    <td className="border-l border-border bg-accent/5 px-5 py-4 text-sm font-medium">{row.waybing}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Shell>
      </section>

      <section className="border-b border-border py-16 sm:py-24">
        <Shell className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.4fr)] lg:gap-16">
          <div>
            <p className="label-mono text-muted-foreground">
              <span className="text-accent">03 / </span>The team
            </p>
            <h2 className="display-tight mt-5 text-[clamp(2rem,4.5vw,3.25rem)] text-balance">
              Four people. No account managers in between.
            </h2>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Every engagement is staffed with one of each discipline. That caps how many clients we can take, which is why
              slots are genuinely limited rather than a countdown timer.
            </p>
            <Link
              href="/work"
              className="group mt-8 inline-flex items-center gap-2 border-b border-foreground pb-1 font-mono text-xs uppercase tracking-[0.14em] transition-colors hover:border-accent hover:text-accent"
            >
              See what they shipped
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>

          <div className="grid border-t border-l border-border sm:grid-cols-2">
            {TEAM.map((member) => (
              <article key={member.name} className="border-r border-b border-border p-6">
                <p className="label-mono text-accent">{member.role}</p>
                <h3 className="mt-4 text-lg font-semibold">{member.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{member.detail}</p>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background sm:py-24">
        <Shell>
          <p className="label-mono text-background/50">
            <span className="text-accent">04 / </span>How we got here
          </p>
          <h2 className="display-tight mt-5 max-w-3xl text-[clamp(2rem,5vw,3.75rem)] text-balance">
            Seven years of removing things that did not work.
          </h2>
          <ol className="mt-12 grid border-t border-l border-background/25 md:grid-cols-2 xl:grid-cols-4">
            {TIMELINE.map((item) => (
              <li key={item.year} className="border-r border-b border-background/25 p-6 sm:p-8">
                <span className="font-mono text-sm tracking-[0.1em] text-accent">{item.year}</span>
                <h3 className="mt-6 text-xl font-semibold uppercase tracking-[-0.01em] text-balance">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-background/70">{item.body}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      <BookingSection />
      <JsonLd
        data={graph(
          breadcrumbSchema([
            { name: 'Home', path: '/' },
            { name: 'About', path: '/about' },
          ])
        )}
      />
    </>
  )
}
