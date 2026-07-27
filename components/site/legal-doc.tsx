import { PageHero } from '@/components/site/page-hero'
import { Shell } from '@/components/site/primitives'
import { Reveal } from '@/components/site/reveal'
import { SITE } from '@/lib/site'

export type LegalSection = {
  heading: string
  /** Each string renders as its own paragraph. */
  body: string[]
  list?: string[]
}

/** Shared shell for /privacy and /terms so both stay in the same voice and layout. */
export function LegalDoc({
  label,
  title,
  intro,
  sections,
}: {
  label: string
  title: string
  intro: string
  sections: LegalSection[]
}) {
  return (
    <>
      <PageHero
        label={label}
        title={title}
        intro={intro}
        meta={[
          { value: SITE.legalUpdated, label: 'Last updated' },
          { value: SITE.legalName, label: 'Data controller' },
          { value: SITE.locations.join(' / '), label: 'Operating from' },
          { value: SITE.email, label: 'Questions' },
        ]}
      />

      <section className="border-b border-border py-16 sm:py-24">
        <Shell className="grid gap-10 lg:grid-cols-[minmax(0,14rem)_minmax(0,52rem)] lg:gap-16">
          <nav aria-label="On this page" className="lg:sticky lg:top-28 lg:self-start">
            <p className="label-mono text-muted-foreground">Contents</p>
            <ol className="mt-4 flex flex-col gap-2.5">
              {sections.map((section, i) => (
                <li key={section.heading}>
                  <a
                    href={`#${slugify(section.heading)}`}
                    className="link-sweep inline-block font-mono text-[11px] uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="text-accent">{String(i + 1).padStart(2, '0')} / </span>
                    {section.heading}
                  </a>
                </li>
              ))}
            </ol>
          </nav>

          <div className="flex flex-col gap-12">
            {sections.map((section, i) => (
              <Reveal
                as="article"
                key={section.heading}
                id={slugify(section.heading)}
                className="scroll-mt-28 border-t border-border pt-8"
              >
                <p className="label-mono text-muted-foreground">
                  <span className="text-accent">{String(i + 1).padStart(2, '0')} / </span>Section
                </p>
                <h2 className="mt-4 text-2xl font-semibold uppercase tracking-[-0.02em] text-balance sm:text-3xl">
                  {section.heading}
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  {section.body.map((paragraph) => (
                    <p key={paragraph} className="text-sm leading-relaxed text-muted-foreground sm:text-base">
                      {paragraph}
                    </p>
                  ))}
                </div>
                {section.list?.length ? (
                  <ul className="mt-6 flex flex-col border-t border-border">
                    {section.list.map((item) => (
                      <li
                        key={item}
                        className="flex items-start gap-3 border-b border-border py-3.5 text-sm leading-relaxed text-muted-foreground"
                      >
                        <span aria-hidden="true" className="mt-2 size-1 shrink-0 bg-accent" />
                        {item}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </Reveal>
            ))}

            <p className="border-t border-border pt-8 text-sm leading-relaxed text-muted-foreground">
              Something here unclear, or you want a copy of what we hold on you? Email{' '}
              <a href={`mailto:${SITE.email}`} className="link-sweep font-medium text-foreground">
                {SITE.email}
              </a>{' '}
              and a person — not a ticketing system — will answer.
            </p>
          </div>
        </Shell>
      </section>
    </>
  )
}

function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '')
}
