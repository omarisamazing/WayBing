'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * Decorative bar chart whose columns grow from the baseline when the chart
 * scrolls into view. Bars past `accentFrom` are painted in the accent colour.
 */
export function MiniBars({
  values,
  accentFrom,
  className,
}: {
  values: number[]
  accentFrom: number
  className?: string
}) {
  const ref = useRef<HTMLDivElement | null>(null)
  const [shown, setShown] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    if (typeof IntersectionObserver === 'undefined') {
      setShown(true)
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setShown(true)
            observer.disconnect()
          }
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  return (
    <div ref={ref} aria-hidden="true" role="presentation" className={cn('flex items-end gap-1.5', className)}>
      {values.map((height, i) => (
        <div
          key={i}
          style={{
            height: shown ? `${height}%` : '0%',
            transitionDelay: `${i * 55}ms`,
          }}
          className={cn(
            'flex-1 origin-bottom transition-[height] duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] motion-reduce:transition-none',
            i >= accentFrom ? 'bg-accent' : 'bg-foreground/15',
          )}
        />
      ))}
    </div>
  )
}
