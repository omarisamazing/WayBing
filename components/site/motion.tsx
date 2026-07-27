'use client'

import { useEffect, useMemo, useRef, useState } from 'react'
import { observeOnce, prefersReducedMotion } from '@/lib/in-view'
import { cn } from '@/lib/utils'

/* ------------------------------------------------------------------ *
 * useInView — one shared observer, boolean flag, fires once.
 * ------------------------------------------------------------------ */

export function useInView<T extends HTMLElement>() {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    // Reduced motion: skip the observer entirely and show the end state.
    if (prefersReducedMotion()) return setInView(true)
    return observeOnce(node, () => setInView(true))
  }, [])

  return [ref, inView] as const
}

/* ------------------------------------------------------------------ *
 * Number tweening — writes straight to the DOM node, so a running
 * count-up never triggers a React render.
 * ------------------------------------------------------------------ */

const easeOut = (p: number) => 1 - (1 - p) ** 3

function tween(node: HTMLElement, from: number, to: number, ms: number, format: (n: number) => string) {
  const start = performance.now()
  let raf = requestAnimationFrame(function step(now) {
    const p = Math.min(1, (now - start) / ms)
    node.textContent = format(from + (to - from) * easeOut(p))
    if (p < 1) raf = requestAnimationFrame(step)
    else {
      node.textContent = format(to)
      node.style.minWidth = ''
    }
  })
  return () => cancelAnimationFrame(raf)
}

/** Splits "$84.6M" into prefix `$`, target `84.6`, suffix `M`, 1 decimal. */
const SHAPE = /^(\D*?)(-?[\d,]*\.?\d+)(.*)$/s

function parse(value: string) {
  const match = SHAPE.exec(value)
  if (!match) return null
  const [, prefix, digits, suffix] = match
  const decimals = digits.split('.')[1]?.length ?? 0
  const nf = new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
    useGrouping: digits.includes(','),
  })
  return {
    to: Number(digits.replace(/,/g, '')),
    format: (n: number) => `${prefix}${nf.format(n)}${suffix}`,
  }
}

/**
 * Counts a display figure up from zero the first time it scrolls into view.
 * The final value is what renders on the server, so crawlers and no-JS
 * visitors always read the real number.
 */
export function Counter({
  value,
  duration = 1400,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const shape = useMemo(() => parse(value), [value])

  useEffect(() => {
    const node = ref.current
    if (!node || !shape || prefersReducedMotion()) return

    // Lock the rendered width before zeroing out, so counting cannot shift layout.
    node.style.minWidth = `${node.getBoundingClientRect().width}px`
    node.textContent = shape.format(0)

    let cancel: (() => void) | undefined
    const stop = observeOnce(node, () => {
      cancel = tween(node, 0, shape.to, duration, shape.format)
    })
    return () => {
      stop()
      cancel?.()
    }
  }, [shape, duration])

  return (
    <span ref={ref} className={cn('inline-block', className)}>
      {value}
    </span>
  )
}

/** Live figure that eases between values as its input changes (sliders, filters). */
export function Tween({
  value,
  format,
  duration = 420,
  className,
}: {
  value: number
  format: (n: number) => string
  duration?: number
  className?: string
}) {
  const ref = useRef<HTMLSpanElement>(null)
  const shown = useRef(value)

  useEffect(() => {
    const node = ref.current
    if (!node) return
    const from = shown.current
    shown.current = value
    if (from === value || prefersReducedMotion()) {
      node.textContent = format(value)
      return
    }
    return tween(node, from, value, duration, format)
  }, [value, format, duration])

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  )
}

/* ------------------------------------------------------------------ *
 * Charts — CSS transforms only, so the browser keeps them on the
 * compositor and never re-lays-out while they animate.
 * ------------------------------------------------------------------ */

/** Vertical bar chart that grows from the baseline, staggered, once in view. */
export function Bars({
  values,
  accentFrom = Infinity,
  className,
}: {
  values: number[]
  /** Index from which bars switch to the accent colour. */
  accentFrom?: number
  className?: string
}) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div ref={ref} role="presentation" aria-hidden="true" className={cn('flex items-end gap-1.5', className)}>
      {values.map((value, i) => (
        <div
          key={i}
          data-visible={inView}
          style={{ height: `${value}%`, '--d': `${i * 45}ms` } as React.CSSProperties}
          className={cn('bar flex-1', i >= accentFrom ? 'bg-accent' : 'bg-foreground/15')}
        />
      ))}
    </div>
  )
}

/** Horizontal share meter that wipes out to `value`% once in view. */
export function Meter({ value, delay = 0, className }: { value: number; delay?: number; className?: string }) {
  const [ref, inView] = useInView<HTMLDivElement>()

  return (
    <div ref={ref} aria-hidden="true" className={cn('h-[3px] w-full bg-foreground/10', className)}>
      <div
        data-visible={inView}
        style={{ width: `${value}%`, '--d': `${delay}ms` } as React.CSSProperties}
        className="meter h-full bg-accent"
      />
    </div>
  )
}
