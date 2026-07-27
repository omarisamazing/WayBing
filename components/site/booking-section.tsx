'use client'

import { useState } from 'react'
import { ArrowUpRight, Check, Clock, User } from 'lucide-react'
import { useBooking } from '@/components/site/booking-provider'
import { Shell, SectionHead } from '@/components/site/primitives'
import { BOOKING_OPTIONS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function BookingSection({ index = '06' }: { index?: string }) {
  const { open } = useBooking()
  const [tab, setTab] = useState(BOOKING_OPTIONS[1].id)
  const active = BOOKING_OPTIONS.find((o) => o.id === tab) ?? BOOKING_OPTIONS[1]

  return (
    <section id="book" className="border-b border-border py-16 sm:py-24">
      <Shell>
        <SectionHead
          index={index}
          label="Segmented booking"
          title="Choose the call that matches your problem"
          intro="Three formats with three different hosts. Pick the one you need and the calendar switches to match."
        />

        <div className="mt-10 border border-foreground">
          <div role="tablist" aria-label="Call formats" className="grid sm:grid-cols-3">
            {BOOKING_OPTIONS.map((option, i) => {
              const selected = option.id === tab
              return (
                <button
                  key={option.id}
                  role="tab"
                  type="button"
                  aria-selected={selected}
                  onClick={() => setTab(option.id)}
                  className={cn(
                    'flex flex-col gap-2 border-border px-5 py-5 text-left transition-colors not-last:border-b sm:not-last:border-b-0 sm:not-last:border-r',
                    selected ? 'bg-foreground text-background' : 'hover:bg-muted'
                  )}
                >
                  <span className="label-mono opacity-60">
                    Tab {i + 1} / {option.duration}
                  </span>
                  <span className="text-base font-semibold uppercase tracking-[-0.01em]">{option.title}</span>
                </button>
              )
            })}
          </div>

          <div className="grid border-t border-foreground lg:grid-cols-[minmax(0,1fr)_minmax(0,22rem)]">
            <div className="p-6 sm:p-10">
              <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-muted-foreground">
                <span className="inline-flex items-center gap-2 label-mono">
                  <Clock className="size-3" /> {active.duration}
                </span>
                <span className="inline-flex items-center gap-2 label-mono">
                  <User className="size-3" /> Hosted by {active.host}
                </span>
              </div>
              <p className="mt-5 max-w-xl text-xl leading-snug text-pretty">{active.focus}</p>
              <ul className="mt-7 flex flex-col gap-3 border-t border-border pt-6">
                {active.bullets.map((b) => (
                  <li key={b} className="flex items-center gap-3 text-sm">
                    <Check className="size-4 shrink-0 text-accent" />
                    {b}
                  </li>
                ))}
              </ul>
            </div>

            <div className="flex flex-col justify-between gap-6 border-t border-border bg-muted p-6 sm:p-10 lg:border-t-0 lg:border-l">
              <div>
                <p className="label-mono text-muted-foreground">Next availability</p>
                <ul className="mt-4 flex flex-col gap-2 font-mono text-sm">
                  <li className="flex justify-between border-b border-border pb-2">
                    <span>Mon 28 Jul</span>
                    <span className="text-muted-foreground">3 slots</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span>Tue 29 Jul</span>
                    <span className="text-muted-foreground">1 slot</span>
                  </li>
                  <li className="flex justify-between border-b border-border pb-2">
                    <span>Wed 30 Jul</span>
                    <span className="text-muted-foreground">4 slots</span>
                  </li>
                </ul>
              </div>
              <button
                type="button"
                onClick={() => open(active.id)}
                className="group inline-flex h-14 items-center justify-between gap-3 border border-foreground bg-foreground px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-background transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
              >
                Open calendar
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
            </div>
          </div>
        </div>
      </Shell>
    </section>
  )
}
