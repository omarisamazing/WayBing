import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { ArrowUpRight, Check, X } from 'lucide-react'
import { BookingSection } from '@/components/site/booking-section'
import { CtaButton } from '@/components/site/cta-button'
import { PageHero } from '@/components/site/page-hero'
import { Shell, SectionHead } from '@/components/site/primitives'
import { CASE_STUDIES, SERVICES } from '@/lib/content'

export function generateStaticParams() {
  return SERVICES.map((service) => ({ slug: service.slug }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = SERVICES.find((item) => item.slug === slug)
  if (!service) return {}
  return { title: `${service.title} — WayBing`, description: service.short }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = SERVICES.find((item) => item.slug === slug)
  if (!service) notFound()

  const others = SERVICES.filter((item) => item.slug !== slug)
  const related = CASE_STUDIES.slice(0, 2)

  return (
    <>
      <PageHero
        label={`Service ${service.index} / ${service.badge}`}
        title={service.title}
        intro={service.pitch}
        meta={service.metrics.map((metric) => ({ value: metric.value, label: metric.label }))}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell className="grid gap-12 lg:grid-cols-2 lg:gap-16">
          <div>
            <p className="label-mono text-muted-foreground">
              <span className="text-accent">01 / </span>What is broken now
            </p>
            <h2 className="display-tight mt-5 text-[clamp(1.75rem,4vw,2.75rem)] text-balance">
              Symptoms we see on almost every account.
            </h2>
            <ul className="mt-8 flex flex-col border-t border-border">
              {service.problems.map((problem) => (
                <li key={problem} className="flex items-start gap-3 border-b border-border py-4 text-sm leading-relaxed">
                  <X className="mt-0.5 size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
                  <span className="text-muted-foreground">{problem}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="border border-foreground bg-foreground p-6 text-background sm:p-8">
            <p className="label-mono text-background/50">
              <span className="text-accent">02 / </span>What you get
            </p>
            <h2 className="display-tight mt-5 text-[clamp(1.75rem,4vw,2.75rem)] text-balance">Deliverables, itemised.</h2>
            <ul className="mt-8 flex flex-col border-t border-background/25">
              {service.deliverables.map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-background/25 py-4 text-sm leading-relaxed">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" aria-hidden="true" />
                  {item}
                </li>
              ))}
            </ul>
            <CtaButton
              intent="audit"
              size="lg"
              className="mt-8 w-full border-background bg-background text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              Get my free 48h audit
            </CtaButton>
          </div>
        </Shell>
      </section>

      <section className="border-b border-border bg-muted py-16 sm:py-24">
        <Shell>
          <SectionHead index="03" label="Proof" title="Accounts where this exact work ran." />
          <div className="mt-10 grid gap-4 lg:grid-cols-2">
            {related.map((study) => (
              <Link
                key={study.slug}
                href={`/work/${study.slug}`}
                className="group flex flex-col justify-between border border-border bg-background p-6 transition-colors hover:border-foreground sm:p-8"
              >
                <div>
                  <div className="flex items-center justify-between gap-4">
                    <p className="label-mono text-accent">{study.category}</p>
                    <p className="label-mono text-muted-foreground">{study.window}</p>
                  </div>
                  <h3 className="mt-6 text-xl font-semibold uppercase tracking-[-0.01em] text-balance sm:text-2xl">
                    {study.headline}
                  </h3>
                </div>
                <div className="mt-8 flex items-end justify-between gap-4 border-t border-border pt-5">
                  <p className="label-mono text-muted-foreground">{study.client}</p>
                  <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </div>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="04"
            label="Stacks with"
            title="What this compounds against."
            intro="Single-channel work produces single-channel results. These are the services that multiply this one."
          />
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {others.map((item) => (
              <Link
                key={item.slug}
                href={`/services/${item.slug}`}
                className="group flex flex-col justify-between gap-8 border border-border p-6 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <span className="font-mono text-2xl leading-none tracking-[-0.04em] text-accent">{item.index}</span>
                <span>
                  <span className="block text-base font-semibold">{item.title}</span>
                  <span className="mt-2 flex items-center gap-2 label-mono opacity-70">
                    View service
                    <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
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
