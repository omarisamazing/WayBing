import type { Metadata } from 'next'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { BookingSection } from '@/components/site/booking-section'
import { FaqSection } from '@/components/site/faq-section'
import { PageHero } from '@/components/site/page-hero'
import { Shell, SectionHead } from '@/components/site/primitives'
import { ENGINE_STEPS, SERVICES } from '@/lib/content'

export const metadata: Metadata = {
  title: 'Services — Creative, CRO, Paid Ads & SEO',
  description:
    'Four services that compound: social and creative design, web design and CRO, paid ads with server-side tracking, and SEO growth.',
}

export default function ServicesPage() {
  return (
    <>
      <PageHero
        label="Services"
        title={
          <>
            Four services. One <span className="text-accent">compounding</span> system.
          </>
        }
        intro="You can buy any of these on their own, but they were designed to feed each other: creative gives paid something to spend on, CRO makes the click worth more, tracking tells the truth, and SEO lowers the blended cost of everything."
        meta={[
          { value: '48h', label: 'Audit turnaround' },
          { value: '60d', label: 'Guarantee window' },
          { value: '4', label: 'Channels covered' },
          { value: '$4.5k', label: 'Single-channel entry / mo' },
        ]}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="01"
            label="Service lines"
            title="Pick the leak you want closed first."
            intro="Every service page shows the exact deliverables, the problems it solves and the numbers it has moved."
          />

          <div className="mt-10 flex flex-col border-t border-border">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group grid items-start gap-6 border-b border-border py-8 transition-colors hover:bg-muted lg:grid-cols-[6rem_minmax(0,1.1fr)_minmax(0,1fr)_auto] lg:gap-10 lg:px-4"
              >
                <span className="figure-mono text-4xl leading-none tracking-[-0.04em] text-accent">{service.index}</span>

                <div>
                  <h3 className="text-2xl font-semibold uppercase tracking-[-0.02em] text-balance sm:text-3xl">
                    {service.title}
                  </h3>
                  <p className="mt-3 max-w-md text-sm leading-relaxed text-muted-foreground">{service.short}</p>
                </div>

                <dl className="flex flex-wrap gap-x-8 gap-y-4">
                  {service.metrics.map((metric) => (
                    <div key={metric.label}>
                      <dd className="figure-mono text-xl leading-none tracking-[-0.03em]">{metric.value}</dd>
                      <dt className="mt-2 label-mono text-muted-foreground">{metric.label}</dt>
                    </div>
                  ))}
                </dl>

                <span className="flex size-12 shrink-0 items-center justify-center border border-border transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-background">
                  <ArrowUpRight className="size-4" aria-hidden="true" />
                  <span className="sr-only">View {service.title}</span>
                </span>
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <section className="border-b border-border bg-muted py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="02"
            label="Engagement sequence"
            title="The order is not negotiable."
            intro="Media buying before measurement is how accounts scale losses efficiently. We run these four phases every time."
          />
          <ol className="mt-10 grid border-t border-l border-border md:grid-cols-2 xl:grid-cols-4">
            {ENGINE_STEPS.map((step) => (
              <li key={step.step} className="border-r border-b border-border bg-background p-6 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="figure-mono text-3xl leading-none tracking-[-0.04em] text-accent">{step.step}</span>
                  <span className="label-mono text-muted-foreground">Phase</span>
                </div>
                <h3 className="mt-8 text-xl font-semibold uppercase tracking-[-0.01em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
              </li>
            ))}
          </ol>
        </Shell>
      </section>

      <FaqSection />
      <BookingSection />
    </>
  )
}
