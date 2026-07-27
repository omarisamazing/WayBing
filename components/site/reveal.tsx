'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

/**
 * One IntersectionObserver is shared by every <Reveal> on the page instead of
 * one per element — the whole site costs a single observer.
 */
const callbacks = new WeakMap<Element, () => void>()
let sharedObserver: IntersectionObserver | null = null

function getObserver() {
  sharedObserver ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        callbacks.get(entry.target)?.()
        callbacks.delete(entry.target)
        sharedObserver?.unobserve(entry.target)
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )
  return sharedObserver
}

const VARIANTS = {
  up: '',
  fade: 'reveal-fade',
  left: 'reveal-left',
  scale: 'reveal-scale',
} as const

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Stagger, in milliseconds. */
  delay?: number
  variant?: keyof typeof VARIANTS
  as?: 'div' | 'section' | 'article' | 'li' | 'span'
  /** Anchor target, e.g. for in-page contents links. */
  id?: string
}

/** Fades its children in once they scroll into view. Reduced motion is handled in CSS. */
export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div', id }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const node = ref.current
    if (!node) return

    callbacks.set(node, () => setVisible(true))
    getObserver().observe(node)

    return () => {
      callbacks.delete(node)
      sharedObserver?.unobserve(node)
    }
  }, [])

  const Tag = as as React.ElementType<React.ComponentPropsWithRef<'div'>>

  return (
    <Tag
      ref={ref}
      id={id}
      data-visible={visible}
      style={{ '--reveal-delay': `${delay}ms` } as React.CSSProperties}
      className={cn('reveal', VARIANTS[variant], className)}
    >
      {children}
    </Tag>
  )
}
