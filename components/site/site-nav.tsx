'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { CtaButton } from '@/components/site/cta-button'
import { ScrollProgress } from '@/components/site/scroll-progress'
import { NAV_LINKS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link href="/" className="-ml-1 flex items-center py-4 pr-4 pl-1" aria-label="WayBing home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-stretch self-stretch md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'flex items-center border-l border-border px-5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors last:border-r',
                  active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        <div className="flex items-center gap-2">
          <CtaButton size="sm" className="hidden sm:inline-flex">
            Book a call
          </CtaButton>
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="flex size-9 items-center justify-center border border-border text-foreground md:hidden"
          >
            {open ? <X className="size-4" /> : <Menu className="size-4" />}
          </button>
        </div>
      </div>

      {open ? (
        <div className="anim-fade overflow-hidden border-t border-border md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link, i) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{ animationDelay: `${i * 45}ms` }}
                className="anim-rise border-b border-border px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-muted hover:text-foreground"
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="p-4 sm:hidden">
            <CtaButton className="w-full">Book a call</CtaButton>
          </div>
        </div>
      ) : null}

      <ScrollProgress />
    </header>
  )
}
