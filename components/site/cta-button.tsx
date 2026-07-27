'use client'

import { ArrowUpRight } from 'lucide-react'
import { useBooking } from '@/components/site/booking-provider'
import { cn } from '@/lib/utils'

type Props = {
  children?: React.ReactNode
  intent?: string
  variant?: 'solid' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

const sizes = {
  sm: 'h-9 px-3.5 text-[10px]',
  md: 'h-11 px-5 text-[11px]',
  lg: 'h-14 px-7 text-xs',
}

export function CtaButton({ children = 'Request a meeting', intent, variant = 'solid', size = 'md', className }: Props) {
  const { open } = useBooking()
  return (
    <button
      type="button"
      onClick={() => open(intent)}
      className={cn(
        'group inline-flex items-center justify-center gap-2 border font-mono uppercase tracking-[0.14em] transition-colors',
        sizes[size],
        variant === 'solid'
          ? 'border-foreground bg-foreground text-background hover:border-accent hover:bg-accent hover:text-accent-foreground'
          : 'border-foreground bg-transparent text-foreground hover:bg-foreground hover:text-background',
        className
      )}
    >
      {children}
      <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
    </button>
  )
}
