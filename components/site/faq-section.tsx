'use client'

import { useState } from 'react'
import { Plus } from 'lucide-react'
import { Shell, SectionHead } from '@/components/site/primitives'
import { CtaButton } from '@/components/site/cta-button'
import { FAQS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  return (
    <section id="faq" className="border-b border-border py-16 sm:py-24">
      <Shell>
        <SectionHead
          index="05"
          label="Objections, answered"
          title="The questions you were going to ask on the call"
          intro="Pricing, contracts, timelines and who actually does the work — stated up front so the call can be about your account."
        />

        <div className="mt-10 grid gap-10 lg:grid-cols-[minmax(0,1fr)_20rem]">
          <div className="border-t border-border">
            {FAQS.map((faq, i) => {
              const isOpen = openIndex === i
              return (
                <div key={faq.q} className="border-b border-border">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={`faq-panel-${i}`}
                      onClick={() => setOpenIndex(isOpen ? null : i)}
                      className="group flex w-full items-start justify-between gap-6 py-5 text-left transition-colors hover:text-accent"
                    >
                      <span className="flex items-start gap-4">
                        <span className="mt-1 label-mono text-muted-foreground">
                          {String(i + 1).padStart(2, '0')}
                        </span>
                        <span className="text-lg font-medium tracking-[-0.01em] text-pretty sm:text-xl">{faq.q}</span>
                      </span>
                      <Plus
                        aria-hidden="true"
                        className={cn(
                          'mt-1 size-5 shrink-0 transition-transform duration-200',
                          isOpen ? 'rotate-45 text-accent' : 'rotate-0'
                        )}
                      />
                    </button>
                  </h3>
                  <div
                    id={`faq-panel-${i}`}
                    hidden={!isOpen}
                    className="grid grid-cols-1 pb-6 sm:pl-11 lg:grid-cols-[minmax(0,44rem)]"
                  >
                    <p className="text-sm leading-relaxed text-muted-foreground">{faq.a}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <aside className="h-fit border border-foreground bg-card p-6">
            <p className="label-mono text-muted-foreground">Still unconvinced</p>
            <p className="mt-4 text-lg leading-snug text-pretty">
              Book the 15-minute audit. We&apos;ll find the leaks live and you can decide afterwards whether we ever speak
              again.
            </p>
            <CtaButton intent="audit" className="mt-6 w-full">
              15-min audit call
            </CtaButton>
            <p className="mt-4 label-mono text-muted-foreground">No deck. No discovery form. Screen share and go.</p>
          </aside>
        </div>
      </Shell>
    </section>
  )
}
