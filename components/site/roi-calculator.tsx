'use client'

import { useMemo, useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import { useBooking } from '@/components/site/booking-provider'
import { Shell, SectionHead } from '@/components/site/primitives'

const BENCHMARK = 3.5

function currency(value: number) {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)))
}

export function RoiCalculator() {
  const { open } = useBooking()
  const [spend, setSpend] = useState(35000)
  const [roas, setRoas] = useState(1.9)

  const { current, benchmarked, gap, annual } = useMemo(() => {
    const current = spend * roas
    const benchmarked = spend * BENCHMARK
    const gap = Math.max(0, benchmarked - current)
    return { current, benchmarked, gap, annual: gap * 12 }
  }, [spend, roas])

  const pct = Math.min(100, (roas / BENCHMARK) * 100)

  return (
    <section id="calculator" aria-labelledby="calculator-title" className="border-b border-border py-16 sm:py-24">
      <Shell>
        <SectionHead
          index="02"
          label="Ad spend & profit multiplier"
          title="See the revenue your account is leaving on the table"
          intro="Benchmarked against a 3.5x blended ROAS — the floor we hold accounts to after tracking and CRO are fixed."
          className="[&_h2]:max-w-2xl"
        />
        <h3 id="calculator-title" className="sr-only">
          Ad spend and profit multiplier calculator
        </h3>

        <div className="mt-10 grid border border-foreground lg:grid-cols-2">
          <div className="flex flex-col gap-10 border-b border-border p-6 sm:p-10 lg:border-b-0 lg:border-r">
            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="spend" className="label-mono text-muted-foreground">
                  Current monthly ad spend
                </label>
                <output htmlFor="spend" className="figure-mono text-2xl tracking-[-0.03em]">
                  {currency(spend)}
                </output>
              </div>
              <input
                id="spend"
                type="range"
                min={5000}
                max={300000}
                step={2500}
                value={spend}
                onChange={(e) => setSpend(Number(e.target.value))}
                className="mt-4 h-1 w-full cursor-pointer appearance-none bg-border accent-accent"
                style={{ accentColor: 'var(--accent)' }}
              />
              <div className="mt-2 flex justify-between label-mono text-muted-foreground">
                <span>$5k</span>
                <span>$300k</span>
              </div>
            </div>

            <div>
              <div className="flex items-baseline justify-between gap-4">
                <label htmlFor="roas" className="label-mono text-muted-foreground">
                  Current blended ROAS
                </label>
                <output htmlFor="roas" className="figure-mono text-2xl tracking-[-0.03em]">
                  {roas.toFixed(1)}x
                </output>
              </div>
              <input
                id="roas"
                type="range"
                min={0.5}
                max={5}
                step={0.1}
                value={roas}
                onChange={(e) => setRoas(Number(e.target.value))}
                className="mt-4 h-1 w-full cursor-pointer appearance-none bg-border"
                style={{ accentColor: 'var(--accent)' }}
              />
              <div className="mt-2 flex justify-between label-mono text-muted-foreground">
                <span>0.5x</span>
                <span>Benchmark 3.5x</span>
                <span>5.0x</span>
              </div>
            </div>

            <dl className="grid grid-cols-2 border-t border-border pt-6">
              <div className="pr-4">
                <dt className="label-mono text-muted-foreground">Revenue today</dt>
                <dd className="figure-mono mt-2 text-lg">{currency(current)}</dd>
              </div>
              <div className="border-l border-border pl-4">
                <dt className="label-mono text-muted-foreground">At 3.5x benchmark</dt>
                <dd className="figure-mono mt-2 text-lg">{currency(benchmarked)}</dd>
              </div>
            </dl>
          </div>

          <div className="flex flex-col justify-between gap-8 bg-foreground p-6 text-background sm:p-10">
            <div>
              <p className="label-mono text-background/50">Monthly revenue gap</p>
              <p className="figure-mono mt-4 text-[clamp(2.5rem,7vw,4.5rem)] font-medium leading-[0.9] tracking-[-0.04em] text-accent">
                {currency(gap)}
              </p>
              <p className="mt-5 max-w-md text-sm leading-relaxed text-background/70">
                {gap > 0
                  ? `That is ${currency(annual)} a year in unrealised revenue at your current spend level — before any budget increase.`
                  : 'You are already at or above benchmark. The next lever is margin-gated scaling and organic demand capture, not more testing.'}
              </p>

              <div className="mt-8">
                <div className="flex items-center justify-between label-mono text-background/50">
                  <span>Progress to benchmark</span>
                  <span className="tabular-nums text-accent">{pct.toFixed(0)}%</span>
                </div>
                <div className="mt-2 h-2 w-full bg-background/15">
                  <div
                    className="h-full bg-accent transition-[width] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={() => open('strategy')}
              className="group inline-flex h-14 items-center justify-between gap-3 border border-background bg-background px-6 text-left font-mono text-[11px] uppercase tracking-[0.14em] text-foreground transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
            >
              <span className="text-balance">
                {gap > 0 ? `Close my ${currency(gap)} gap` : 'Plan my next scaling phase'}
              </span>
              <ArrowUpRight className="size-4 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </button>
          </div>
        </div>
      </Shell>
    </section>
  )
}
