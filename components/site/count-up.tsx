'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Splits a display value like "$84.6M", "3.9x" or "+218%" into a numeric part
 * we can animate plus the surrounding prefix/suffix we keep static.
 */
function parseValue(value: string) {
  const match = value.match(/-?\d[\d,]*\.?\d*/)
  if (!match) return null

  const raw = match[0]
  const numeric = Number.parseFloat(raw.replace(/,/g, ''))
  if (!Number.isFinite(numeric)) return null

  return {
    prefix: value.slice(0, match.index ?? 0),
    suffix: value.slice((match.index ?? 0) + raw.length),
    numeric,
    decimals: raw.includes('.') ? (raw.split('.')[1]?.length ?? 0) : 0,
    grouped: raw.includes(','),
  }
}

const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts up to a numeric value the first time it scrolls into view. Any value
 * we can't parse is rendered verbatim, so this is safe to use everywhere.
 */
export function CountUp({ value, duration = 1400 }: { value: string; duration?: number }) {
  const parsed = parseValue(value)
  const ref = useRef<HTMLSpanElement | null>(null)
  const [display, setDisplay] = useState(() => (parsed ? null : value))

  useEffect(() => {
    if (!parsed) return

    const node = ref.current
    if (!node) return

    const reduced =
      typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

    const format = (n: number) => {
      const fixed = n.toFixed(parsed.decimals)
      if (!parsed.grouped) return fixed
      const [int, dec] = fixed.split('.')
      const withCommas = Number(int).toLocaleString('en-US')
      return dec ? `${withCommas}.${dec}` : withCommas
    }

    if (reduced || typeof IntersectionObserver === 'undefined') {
      setDisplay(`${parsed.prefix}${format(parsed.numeric)}${parsed.suffix}`)
      return
    }

    setDisplay(`${parsed.prefix}${format(0)}${parsed.suffix}`)

    let frame = 0
    let start = 0

    const tick = (now: number) => {
      if (!start) start = now
      const progress = Math.min((now - start) / duration, 1)
      setDisplay(`${parsed.prefix}${format(parsed.numeric * easeOut(progress))}${parsed.suffix}`)
      if (progress < 1) frame = requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            frame = requestAnimationFrame(tick)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.4 },
    )

    observer.observe(node)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(frame)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, duration])

  return (
    <span ref={ref} className="tabular">
      {display ?? value}
    </span>
  )
}
