'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps<T extends React.ElementType> = {
  as?: T
  /** Delay in ms before the transition starts once in view. */
  delay?: number
  /** Fraction of the element that must be visible before revealing. */
  amount?: number
  className?: string
  children: React.ReactNode
}

/**
 * Reveals its children with a subtle rise + fade the first time the element
 * scrolls into view. Falls back to visible content when IntersectionObserver
 * is unavailable, and respects prefers-reduced-motion via globals.css.
 */
export function Reveal<T extends React.ElementType = 'div'>({
  as,
  delay = 0,
  amount = 0.15,
  className,
  children,
  ...rest
}: RevealProps<T> & Omit<React.ComponentPropsWithoutRef<T>, keyof RevealProps<T>>) {
  const Comp = (as ?? 'div') as React.ElementType
  const ref = useRef<HTMLElement | null>(null)
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
      { threshold: amount, rootMargin: '0px 0px -8% 0px' },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [amount])

  return (
    <Comp
      ref={ref}
      data-reveal={shown ? 'shown' : 'hidden'}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={cn(className)}
      {...rest}
    >
      {children}
    </Comp>
  )
}

/**
 * Wraps a list of children and staggers each one's reveal by `step` ms.
 */
export function RevealGroup({
  children,
  step = 70,
  amount = 0.1,
  className,
  childClassName,
}: {
  children: React.ReactNode
  step?: number
  amount?: number
  className?: string
  childClassName?: string
}) {
  const items = Array.isArray(children) ? children : [children]

  return (
    <div className={className}>
      {items.flat().map((child, i) => (
        <Reveal key={i} delay={i * step} amount={amount} className={childClassName}>
          {child}
        </Reveal>
      ))}
    </div>
  )
}
