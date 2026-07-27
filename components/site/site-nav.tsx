'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'
import { Logo } from '@/components/site/logo'
import { CtaButton } from '@/components/site/cta-button'
import { NAV_LINKS } from '@/lib/content'
import { cn } from '@/lib/utils'

export function SiteNav() {
  const pathname = usePathname()
  const [open, setOpen] = useState(false)

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex w-full max-w-[100rem] items-center justify-between gap-4 px-4 sm:px-6 lg:px-10">
        <Link
          href="/"
          className="-ml-1 flex items-center py-3.5 pr-4 pl-1 outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          aria-label="WayBing home"
        >
          <Logo size="md" className="sm:hidden" />
          <Logo size="lg" className="hidden sm:inline-flex" />
        </Link>

        <nav aria-label="Main" className="hidden items-stretch self-stretch md:flex">
          {NAV_LINKS.map((link) => {
            const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  'group relative flex items-center overflow-hidden border-l border-border px-5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors last:border-r',
                  active ? 'bg-foreground text-background' : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                )}
              >
                <span
                  aria-hidden="true"
                  className={cn(
                    'absolute inset-x-0 top-0 h-[2px] bg-accent transition-transform duration-300 ease-out',
                    active ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                  )}
                />
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
        <div className="border-t border-border duration-200 animate-in fade-in slide-in-from-top-2 md:hidden">
          <nav aria-label="Mobile" className="flex flex-col">
            {NAV_LINKS.map((link, index) => {
              const active = pathname === link.href || pathname.startsWith(`${link.href}/`)
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  style={{ animationDelay: `${index * 40}ms` }}
                  className={cn(
                    'border-b border-border px-4 py-3.5 font-mono text-[11px] uppercase tracking-[0.14em] transition-colors duration-300 animate-in fade-in slide-in-from-left-2 active:bg-muted',
                    active ? 'border-l-2 border-l-accent text-foreground' : 'text-muted-foreground'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}
          </nav>
          <div className="p-4 sm:hidden">
            <CtaButton className="w-full">Book a call</CtaButton>
          </div>
        </div>
      ) : null}
    </header>
  )
}
