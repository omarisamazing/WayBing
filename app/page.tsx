import Link from 'next/link'
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react'
import { AuditRequest } from '@/components/site/audit-request'
import { BookingSection } from '@/components/site/booking-section'
import { CtaButton } from '@/components/site/cta-button'
import { FaqSection } from '@/components/site/faq-section'
import { LogoMark } from '@/components/site/logo'
import { RoiCalculator } from '@/components/site/roi-calculator'
import { Shell, SectionHead, Stat } from '@/components/site/primitives'
import { CLIENT_LOGOS, ENGINE_STEPS, HEADLINE_STATS, SERVICES } from '@/lib/content'

/** Rich-result data for the FAQ block below. Static, so it costs nothing at runtime. */
const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: FAQS.map((faq) => ({
    '@type': 'Question',
    name: faq.q,
    acceptedAnswer: { '@type': 'Answer', text: faq.a },
  })),
}

/** The 2x2 block inside the hero snapshot card. */
const SNAPSHOT_STATS = [
  ...HEADLINE_STATS.slice(1),
  { value: '41', label: 'Accounts scaled past $100k/mo' },
]

export default function HomePage() {
  return (
    <>
      <section className="border-b border-border">
        <Shell className="grid gap-12 py-14 sm:py-20 lg:grid-cols-[minmax(0,1.45fr)_minmax(0,1fr)] lg:gap-16 lg:py-24">
          <div>
            <p className="rise label-mono text-muted-foreground">
              <span className="text-accent">✳</span> Performance marketing & growth design
            </p>
            <h1 className="rise rise-1 display-tight mt-6 text-[clamp(2.75rem,8.5vw,7rem)] text-balance">
              We don&apos;t sell
              <br />
              retainers. We build
              <br />
              <span className="text-accent">revenue engines.</span>
            </h1>
            <p className="rise rise-2 mt-8 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              Conversion-first design, CRO, paid media and SEO — wired to server-side tracking so every decision is made on
              numbers that match your bank account, not a platform screenshot.
            </p>

            <AuditRequest className="rise rise-3 mt-9 max-w-2xl" />

            <div className="rise rise-4 mt-10 flex flex-wrap items-center gap-x-8 gap-y-3">
              {['No lock-in contracts', 'You own every asset', '60-day guarantee'].map((item) => (
                <span key={item} className="inline-flex items-center gap-2 label-mono text-muted-foreground">
                  <Check className="size-3.5 text-accent" />
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="rise rise-2 flex flex-col justify-between border border-foreground bg-card">
            <div className="border-b border-border p-6">
              <div className="flex items-center justify-between">
                <p className="label-mono text-muted-foreground">Live account snapshot</p>
                <LogoMark className="h-3 text-accent" />
              </div>
              <p className="mt-5 font-mono text-[clamp(2rem,4vw,2.75rem)] leading-none tracking-[-0.04em]">$84.6M</p>
              <p className="mt-3 label-mono text-muted-foreground">Tracked client revenue since 2019</p>
            </div>

            <div className="flex flex-1 flex-col justify-end gap-4 border-b border-border p-6">
              <div className="flex items-center justify-between">
                <p className="label-mono text-muted-foreground">Attributed revenue by channel</p>
                <p className="label-mono text-accent">Trailing 90d</p>
              </div>
              <div
                aria-hidden="true"
                className="flex h-24 items-end gap-1.5 sm:h-28"
                role="presentation"
              >
                {[34, 41, 38, 52, 47, 63, 58, 71, 66, 82, 78, 96].map((height, i) => (
                  <div
                    key={i}
                    style={{ height: `${height}%`, '--rise-delay': `${300 + i * 45}ms` } as React.CSSProperties}
                    className={`grow-bar flex-1 ${i > 8 ? 'bg-accent' : 'bg-foreground/15'}`}
                  />
                ))}
              </div>
              <dl className="flex flex-col gap-2 border-t border-border pt-4">
                {[
                  ['Paid social', '38%'],
                  ['Paid search', '31%'],
                  ['Organic / SEO', '24%'],
                  ['Email & lifecycle', '7%'],
                ].map(([channel, share]) => (
                  <div key={channel} className="flex items-center justify-between label-mono">
                    <dt className="text-muted-foreground">{channel}</dt>
                    <dd>{share}</dd>
                  </div>
                ))}
              </dl>
            </div>

            {/* Hairlines are placed by position, so cells can be added or removed freely. */}
            <dl className="grid grid-cols-2">
              {SNAPSHOT_STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="border-border p-6 [&:not(:nth-last-child(-n+2))]:border-b [&:nth-child(odd)]:border-r"
                >
                  <dd className="font-mono text-2xl leading-none tracking-[-0.03em]">{stat.value}</dd>
                  <dt className="mt-3 label-mono text-muted-foreground">{stat.label}</dt>
                </div>
              ))}
            </dl>
            <Link
              href="/work"
              className="group flex items-center justify-between gap-3 border-t border-foreground bg-foreground px-6 py-5 text-background transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <span className="font-mono text-[11px] uppercase tracking-[0.14em]">See the receipts</span>
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          </div>
        </Shell>
      </section>

      <section aria-label="Client proof" className="overflow-hidden border-b border-border bg-muted">
        <Shell>
          <dl className="grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {HEADLINE_STATS.map((stat) => (
              <div key={stat.label} className="border-r border-b border-border">
                <Stat value={stat.value} label={stat.label} />
              </div>
            ))}
          </dl>
        </Shell>
        <div className="flex w-max animate-marquee items-center py-5">
          {[...CLIENT_LOGOS, ...CLIENT_LOGOS].map((logo, i) => (
            <span
              key={`${logo}-${i}`}
              className="px-8 font-sans text-lg font-semibold uppercase tracking-[0.08em] whitespace-nowrap text-muted-foreground/70"
            >
              {logo}
            </span>
          ))}
        </div>
      </section>

      <RoiCalculator />

      <section id="engine" className="border-b border-border py-16 sm:py-24">
        <Shell>
          <SectionHead
            index="03"
            label="The revenue engine"
            title="Four steps. One measurable outcome."
            intro="Every engagement runs this sequence in order. Skipping straight to media buying is how accounts end up scaling losses."
          />

          <div className="mt-10 grid border-t border-l border-border md:grid-cols-2 xl:grid-cols-4">
            {ENGINE_STEPS.map((step) => (
              <article key={step.step} className="flex flex-col border-r border-b border-border p-6 sm:p-8">
                <div className="flex items-baseline justify-between">
                  <span className="font-mono text-4xl leading-none tracking-[-0.04em] text-accent">{step.step}</span>
                  <span className="label-mono text-muted-foreground">Step</span>
                </div>
                <h3 className="mt-8 text-2xl font-semibold uppercase tracking-[-0.02em]">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
                <ul className="mt-6 flex flex-col gap-2 border-t border-border pt-5">
                  {step.points.map((point) => (
                    <li key={point} className="flex items-center gap-2 label-mono text-muted-foreground">
                      <span aria-hidden="true" className="size-1 bg-accent" />
                      {point}
                    </li>
                  ))}
                </ul>
              </article>
            ))}
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
            {SERVICES.map((service) => (
              <Link
                key={service.slug}
                href={`/services/${service.slug}`}
                className="group flex items-center justify-between gap-3 border border-border px-5 py-4 transition-colors hover:border-foreground hover:bg-foreground hover:text-background"
              >
                <span className="text-sm font-medium">{service.title}</span>
                <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            ))}
          </div>
        </Shell>
      </section>

      <section id="guarantee" className="border-b border-foreground bg-foreground py-16 text-background sm:py-24">
        <Shell className="grid gap-12 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16">
          <div>
            <p className="label-mono text-background/50">
              <span className="text-accent">04 / </span>Risk reversal
            </p>
            <h2 className="display-tight mt-5 text-[clamp(2.25rem,6vw,4.75rem)] text-balance">
              The 60-day
              <br />
              <span className="text-accent">zero-fluff</span> growth
              <br />
              guarantee
            </h2>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-background/70 sm:text-lg">
              At kickoff we agree on trackable targets — conversion rate, blended CAC or contribution margin. If those numbers
              are not hit inside 60 days, we keep working at zero cost until they are. It sits in the agreement, not just on
              this page.
            </p>
            <div className="mt-9 flex flex-wrap gap-3">
              <CtaButton
                size="lg"
                intent="strategy"
                className="border-background bg-background text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Set my 60-day targets
              </CtaButton>
              <Link
                href="/about"
                className="inline-flex h-14 items-center gap-2 border border-background/40 px-7 font-mono text-xs uppercase tracking-[0.14em] text-background/80 transition-colors hover:border-background hover:text-background"
              >
                Why we work this way
              </Link>
            </div>
          </div>

          <div className="border border-background/25">
            <div className="flex items-center gap-3 border-b border-background/25 p-6">
              <ShieldCheck className="size-5 text-accent" />
              <p className="label-mono text-background/60">What is written into the agreement</p>
            </div>
            <ul className="flex flex-col">
              {[
                'Targets defined in writing before invoice one',
                'Work continues free until targets are met',
                'Cancel any time after the 60-day cycle',
                'All accounts, files and containers stay yours',
                'Weekly decision log, shared dashboard access',
              ].map((item) => (
                <li key={item} className="flex items-start gap-3 border-b border-background/25 p-5 text-sm last:border-b-0">
                  <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </Shell>
      </section>

      <FaqSection />
      <BookingSection />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
    </>
  )
}
