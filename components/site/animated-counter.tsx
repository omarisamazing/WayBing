'use client'

import { useEffect, useRef } from 'react'
import { useInView } from 'framer-motion'

interface AnimatedCounterProps {
  value: number
  format?: (value: number) => string
  duration?: number
  className?: string
  prefix?: string
  suffix?: string
}

export function AnimatedCounter({
  value,
  format,
  duration = 1.8,
  className = '',
  prefix = '',
  suffix = '',
}: AnimatedCounterProps) {
  const ref = useRef<HTMLSpanElement>(null)
  const isInView = useInView(ref, { once: true, amount: 0.5 })

  useEffect(() => {
    if (!isInView || !ref.current) return

    const element = ref.current
    const start = 0
    const end = value
    const startTime = Date.now()
    const durationMs = duration * 1000

    const animate = () => {
      const now = Date.now()
      const elapsed = now - startTime
      const progress = Math.min(elapsed / durationMs, 1)

      // Easing function for smoother animation
      const easeOutQuad = 1 - (1 - progress) * (1 - progress)
      const current = Math.floor(start + (end - start) * easeOutQuad)

      if (format) {
        element.textContent = prefix + format(current) + suffix
      } else {
        element.textContent = prefix + current.toLocaleString() + suffix
      }

      if (progress < 1) {
        requestAnimationFrame(animate)
      }
    }

    animate()
  }, [isInView, value, duration, format, prefix, suffix])

  return <span ref={ref} className={className} />
}

export function AnimatedCurrency({
  value,
  duration = 1.8,
  className = '',
}: {
  value: number
  duration?: number
  className?: string
}) {
  const formatter = (num: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(num)

  return (
    <AnimatedCounter value={value} format={formatter} duration={duration} className={className} />
  )
}

export function AnimatedPercent({
  value,
  duration = 1.8,
  className = '',
  decimals = 1,
}: {
  value: number
  duration?: number
  className?: string
  decimals?: number
}) {
  const formatter = (num: number) => {
    const percent = (num / 100) * (value % 100)
    return percent.toFixed(decimals)
  }

  return (
    <AnimatedCounter
      value={Math.min(100, (value / 3.5) * 100)}
      format={formatter}
      duration={duration}
      className={className}
      suffix="%"
    />
  )
}
