'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Stagger in milliseconds. */
  delay?: number
  variant?: 'up' | 'fade' | 'left' | 'scale'
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
}

const variants = {
  up: '',
  fade: 'reveal-fade',
  left: 'reveal-left',
  scale: 'reveal-scale',
} as const

/** Reveals its children once they scroll into view. Respects reduced-motion via CSS. */
export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div' }: RevealProps) {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    // Already in view on mount (above the fold) — show immediately.
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setVisible(true)
            observer.unobserve(entry.target)
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [])

  const Tag = as as 'div'

  return (
    <Tag
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ref={ref as any}
      data-visible={visible ? 'true' : 'false'}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={cn('reveal', variants[variant], className)}
    >
      {children}
    </Tag>
  )
}
