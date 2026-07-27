import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowLeft, ArrowUpRight } from 'lucide-react'
import { BookingSection } from '@/components/site/booking-section'
import { PageHero } from '@/components/site/page-hero'
import { Shell, SectionHead } from '@/components/site/primitives'
import { CASE_STUDIES } from '@/lib/content'

export function generateStaticParams() {
  return CASE_STUDIES.map((study) => ({ slug: study.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) return {}
  return { title: `${study.client} — WayBing case study`, description: study.headline }
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const study = CASE_STUDIES.find((item) => item.slug === slug)
  if (!study) notFound()

  const next = CASE_STUDIES.filter((item) => item.slug !== slug).slice(0, 3)

  return (
    <>
      <PageHero
        label={`${study.category} / ${study.industry}`}
        title={study.headline}
        intro={study.summary}
        meta={[
          { value: study.window, label: 'Engagement window' },
          { value: study.client, label: 'Client' },
          { value: study.after[1].value, label: study.after[1].label },
          { value: study.after[2].value, label: study.after[2].label },
        ]}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="01"
            label="The movement"
            title="Kickoff numbers versus day-90 numbers."
            intro="Pulled from the client's own dashboard, not platform-reported figures."
          />

          <div className="mt-10 grid border-t border-l border-border md:grid-cols-3">
            {study.before.map((item, i) => (
              <article key={item.label} className="border-r border-b border-border p-6 sm:p-8">
                <p className="label-mono text-muted-foreground">{item.label}</p>
                <div className="mt-7 flex flex-col gap-4">
                  <div className="flex items-baseline justify-between gap-4 border-b border-border pb-4">
                    <span className="label-mono text-muted-foreground">Before</span>
                    <span className="figure-mono text-2xl leading-none tracking-[-0.03em] text-muted-foreground line-through decoration-muted-foreground/40">
                      {item.value}
                    </span>
                  </div>
                  <div className="flex items-baseline justify-between gap-4">
                    <span className="label-mono text-accent">After</span>
                    <span className="figure-mono text-[clamp(1.75rem,3vw,2.5rem)] font-medium leading-none tracking-[-0.04em]">
                      {study.after[i].value}
                    </span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-b border-border bg-foreground py-16 text-background sm:py-24">
        <Shell className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.3fr)] lg:gap-16">
          <div>
            <p className="label-mono text-background/50">
              <span className="text-accent">02 / </span>What we actually did
            </p>
            <h2 className="display-tight mt-5 text-[clamp(2rem,4.5vw,3.25rem)] text-balance">The intervention.</h2>
          </div>
          <div className="flex flex-col gap-6">
            <p className="text-lg leading-relaxed text-background/80">{study.summary}</p>
            <ol className="flex flex-col border-t border-background/25">
              {[
                'Audited the funnel, tracking layer and unit economics before changing anything.',
                'Instrumented the account so every downstream decision had a trustworthy number behind it.',
                'Rebuilt the highest-leverage asset first, then tested in structured weekly batches.',
                'Scaled only where contribution margin held, and logged every decision with reasoning.',
              ].map((item, i) => (
                <li key={item} className="flex items-start gap-4 border-b border-background/25 py-4">
                  <span className="font-mono text-xs text-accent">{String(i + 1).padStart(2, '0')}</span>
                  <span className="text-sm leading-relaxed text-background/75">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </Shell>
      </section>

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border pb-6">
            <h2 className="text-2xl font-semibold uppercase tracking-[-0.02em]">More breakdowns</h2>
            <Link
              href="/work"
              className="group inline-flex items-center gap-2 label-mono text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="size-3.5 transition-transform group-hover:-translate-x-0.5" />
              All case studies
            </Link>
          </div>
          <div className="mt-8 grid gap-3 md:grid-cols-3">
            {next.map((item) => (
              <Link
                key={item.slug}
                href={`/work/${item.slug}`}
                className="group flex flex-col justify-between gap-8 border border-border p-6 transition-colors hover:border-foreground hover:bg-muted"
              >
                <div>
                  <p className="label-mono text-accent">{item.category}</p>
                  <h3 className="mt-4 text-base font-semibold leading-snug text-balance">{item.headline}</h3>
                </div>
                <span className="flex items-center justify-between gap-2 label-mono text-muted-foreground">
                  {item.client}
                  <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <BookingSection />
    </>
  )
}
