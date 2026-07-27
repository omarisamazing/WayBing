'use client'

import { useState } from 'react'
import Link from 'next/link'
import { ArrowUpRight, ArrowRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Reveal } from '@/components/site/reveal'
import { CASE_FILTERS, CASE_STUDIES } from '@/lib/content'
import { AnimatedCounter } from '@/components/site/animated-counter'

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
              className={`border px-4 py-2 font-mono text-[11px] uppercase tracking-[0.12em] transition-[color,background-color,border-color] duration-300 ease-out ${
                isActive
                  ? 'border-foreground bg-foreground text-background'
                  : 'border-border text-muted-foreground hover:border-foreground hover:text-foreground'
              }`}
            >
              {filter}
              <span className="ml-2 tabular-nums opacity-50">
                {filter === 'All' ? CASE_STUDIES.length : CASE_STUDIES.filter((s) => s.category === filter).length}
              </span>
            </button>
          )
        })}
      </div>

      <motion.div
        className="mt-8 grid gap-4 lg:grid-cols-2"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        viewport={{ once: true }}
      >
        {studies.map((study, index) => (
          <Reveal key={`${active}-${study.slug}`} delay={index * 70} className="flex">
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.6,
              delay: index * 0.1,
              ease: [0.16, 1, 0.3, 1],
            }}
            viewport={{ once: true, amount: 0.3 }}
            className="flex"
          >
          <Link
            href={`/work/${study.slug}`}
            className="lift group flex flex-1 flex-col border border-border hover:border-foreground"
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

              <motion.dl
                className="mt-7 grid grid-cols-3 gap-3 border-t border-border pt-5"
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                viewport={{ once: true, amount: 0.5 }}
              >
                {study.before.map((item, i) => {
                  const beforeNum = parseInt(item.value.replace(/[^0-9]/g, ''))
                  const afterNum = parseInt(study.after[i].value.replace(/[^0-9]/g, ''))

                  return (
                    <div key={item.label}>
                      <dt className="label-mono text-muted-foreground">{item.label}</dt>
                      <dd className="figure-mono mt-2 flex flex-wrap items-baseline gap-1.5 text-sm">
                        <span className="text-muted-foreground line-through decoration-muted-foreground/40">
                          {item.value.includes('%') ? `${beforeNum}%` : item.value.includes('$') ? `$${beforeNum}` : beforeNum}
                        </span>
                        <ArrowRight className="size-3 shrink-0 text-accent" aria-hidden="true" />
                        <span className="font-medium">
                          {study.after[i].value.includes('%') ? (
                            <>
                              <AnimatedCounter value={afterNum} duration={1.4} className="inline" suffix="%" />
                            </>
                          ) : study.after[i].value.includes('$') ? (
                            <>
                              $<AnimatedCounter value={afterNum} duration={1.4} className="inline" />
                            </>
                          ) : study.after[i].value.includes('x') ? (
                            <>
                              <AnimatedCounter value={afterNum} duration={1.4} className="inline" suffix="x" />
                            </>
                          ) : (
                            <AnimatedCounter value={afterNum} duration={1.4} className="inline" />
                          )}
                        </span>
                      </dd>
                    </div>
                  )
                })}
              </motion.dl>
            </div>

            <span className="flex items-center justify-between gap-3 border-t border-border px-6 py-4 label-mono transition-colors group-hover:bg-foreground group-hover:text-background">
              Read the breakdown
              <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </span>
          </Link>
          </motion.div>
          </Reveal>
        ))}
      </motion.div>

      {studies.length === 0 ? (
        <p className="mt-4 border border-dashed border-border p-10 text-center text-sm text-muted-foreground">
          No case studies filed under this discipline yet.
        </p>
      ) : null}
    </div>
  )
}
