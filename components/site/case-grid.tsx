'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { CASE_FILTERS, CASE_STUDIES } from '@/lib/content'

export function CaseGrid() {
  const [active, setActive] = useState<string>('All')
  const studies = active === 'All' ? CASE_STUDIES : CASE_STUDIES.filter((study) => study.category === active)

  return (
    <div>
      <div className="flex flex-wrap items-center gap-2 border-b border-border pb-6">
        <span className="mr-2 label-mono text-muted-foreground">Filter</span>
        {CASE_FILTERS.map((filter) => {
          const isActive = filter === active
          return (
            <button
              key={filter}
              type="button"
              onClick={() => setActive(filter)}
              aria-pressed={isActive}
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-colors ${
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {filter}
              <span className="ml-2 opacity-50">
                {filter === 'All' ? CASE_STUDIES.length : CASE_STUDIES.filter((s) => s.category === filter).length}
              </span>
            </button>
          )
        })}
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-2">
        {studies.map((study) => (
          <Link
            key={study.slug}
            href={`/work/${study.slug}`}
            className="group flex flex-col border border-border transition-colors hover:border-foreground"
          >
            <div className="flex items-center justify-between gap-4 border-b border-border px-6 py-4">
              <p className="label-mono text-accent">{study.category}</p>
              <p className="label-mono text-muted-foreground">{study.window}</p>
            </div>

            <div className="flex flex-1 flex-col p-6">
              <p className="label-mono text-muted-foreground">
                {study.client} — {study.industry}
              </p>
              <h3 className="mt-4 text-xl font-semibold uppercase tracking-[-0.01em] text-balance sm:text-2xl">
                {study.headline}
              </h3>
              <p className="mt-4 flex-1 text-sm leading-relaxed text-muted-foreground">{study.summary}</p>

              <dl className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-5">
                {study.before.map((item, i) => (
                  <div key={item.label}>
                    <dt className="label-mono text-muted-foreground">{item.label}</dt>
                    <dd className="mt-2 flex flex-wrap items-baseline gap-1.5 font-mono text-sm">
                      <span className="text-muted-foreground line-through decoration-muted-foreground/40">{item.value}</span>
                      <ArrowRight className="size-3 shrink-0 text-accent" aria-hidden="true" />
                      <span className="font-medium">{study.after[i].value}</span>
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <span className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 label-mono transition-colors group-hover:bg-foreground group-hover:text-background">
              Read the breakdown
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  )
}
