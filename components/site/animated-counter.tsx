'use client'

import { useEffect, useRef, useState } from 'react'

/**
 * Splits a display string like "$71.40", "4.1x", "+112%", "<48h" or "1.2B" into
 * the parts we need to animate the numeral while leaving every unit, sign and
 * decimal place exactly as the content author wrote it.
 */
function parseFigure(display: string) {
  const match = display.match(/^([^\d]*)([\d,]+(?:\.\d+)?)(.*)$/)
  if (!match) return null

  const [, prefix, rawNumber, suffix] = match
  const plain = rawNumber.replace(/,/g, '')
  const target = Number(plain)
  if (!Number.isFinite(target)) return null

  const decimals = plain.includes('.') ? plain.split('.')[1].length : 0

  return {
    prefix,
    suffix,
    target,
    decimals,
    // Only re-introduce separators if the source had them.
    grouped: rawNumber.includes(','),
  }
}

function formatFigure(
  value: number,
  { prefix, suffix, decimals, grouped }: NonNullable<ReturnType<typeof parseFigure>>
) {
  const body = grouped
    ? value.toLocaleString('en-US', {
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
      })
    : value.toFixed(decimals)

  return `${prefix}${body}${suffix}`
}

const EASE_OUT = (t: number) => 1 - Math.pow(1 - t, 3)

/**
 * Counts a figure up when it first scrolls into view, then tweens between
 * values whenever the input changes (so sliders read as a smooth roll rather
 * than restarting from zero).
 *
 * The final value is rendered on the server, so the number is always present
 * for crawlers, for users without JS, and before the animation runs — nothing
 * ever reflows in from an empty box.
 */
export function AnimatedFigure({
  value,
  duration = 1.6,
  className,
}: {
  value: string
  duration?: number
  className?: string
}) {
  const parsed = parseFigure(value)
  const ref = useRef<HTMLSpanElement>(null)
  const frame = useRef<number>(0)
  const current = useRef<number | null>(null)
  const [hasEntered, setHasEntered] = useState(false)

  // Wait until the figure is actually on screen before the first count-up.
  useEffect(() => {
    const el = ref.current
    if (!el || hasEntered) return

    if (typeof IntersectionObserver === 'undefined') {
      setHasEntered(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setHasEntered(true)
          observer.disconnect()
        }
      },
      { threshold: 0.4 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [hasEntered])

  useEffect(() => {
    const el = ref.current
    if (!el || !parsed || !hasEntered) return

    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches

    if (reduced) {
      el.textContent = formatFigure(parsed.target, parsed)
      current.current = parsed.target
      return
    }

    const from = current.current ?? 0
    const to = parsed.target

    if (from === to) {
      el.textContent = formatFigure(to, parsed)
      return
    }

    // Tweening a short distance for a full duration feels sluggish, so scale
    // the time down for small deltas (slider nudges) and keep it long for the
    // initial 0 -> target reveal.
    const span = Math.abs(to - from)
    const reference = Math.max(Math.abs(to), 1)
    const ratio = Math.min(1, span / reference)
    const ms = Math.max(220, duration * 1000 * ratio)

    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / ms, 1)
      const eased = from + (to - from) * EASE_OUT(progress)

      el.textContent = formatFigure(eased, parsed)
      current.current = eased

      if (progress < 1) {
        frame.current = requestAnimationFrame(tick)
      } else {
        el.textContent = formatFigure(to, parsed)
        current.current = to
      }
    }

    frame.current = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame.current)
  }, [parsed?.target, hasEntered, duration, value])

  // Values we can't confidently parse are rendered verbatim.
  if (!parsed) return <span className={className}>{value}</span>

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  )
}

/** Convenience wrapper for the calculator's live currency read-outs. */
export function AnimatedCurrency({
  value,
  duration = 1.6,
  className,
}: {
  value: number
  duration?: number
  className?: string
}) {
  const display = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(Math.max(0, Math.round(value)))

  return <AnimatedFigure value={display} duration={duration} className={className} />
}
