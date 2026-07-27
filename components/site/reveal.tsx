'use client'

import { useInView } from '@/components/site/motion'
import { cn } from '@/lib/utils'

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

/**
 * Fades its children in once they scroll into view. Shares a single
 * IntersectionObserver with every other animation on the page; reduced motion
 * is handled in CSS.
 */
export function Reveal({ children, className, delay = 0, variant = 'up', as = 'div', id }: RevealProps) {
  const [ref, visible] = useInView<HTMLDivElement>()
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
