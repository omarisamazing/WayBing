import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Shell } from '@/components/site/primitives'
import { NAV_LINKS } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function NotFound() {
  return (
    <section className="border-b border-border">
      <Shell className="grid gap-12 py-20 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] lg:gap-16 lg:py-28">
        <div>
          <p className="rise label-mono text-muted-foreground">
            <span className="text-accent">✳ </span>Error 404
          </p>
          <h1 className="rise rise-1 display-tight mt-6 text-[clamp(2.5rem,7vw,5.5rem)] text-balance">
            This page
            <br />
            <span className="text-accent">is not here.</span>
          </h1>
          <p className="rise rise-2 mt-7 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
            Either we moved it or the link was wrong. Nothing dramatic. Pick a direction below, or email{' '}
            <a href={`mailto:${SITE.email}`} className="link-sweep font-medium text-foreground">
              {SITE.email}
            </a>{' '}
            and tell us what you were looking for.
          </p>
          <Link
            href="/"
            className="rise rise-3 group mt-9 inline-flex h-14 items-center gap-2 border border-foreground bg-foreground px-7 font-mono text-xs uppercase tracking-[0.14em] text-background transition-colors hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            Back to the homepage
            <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
        </div>

        <nav aria-label="Site sections" className="rise rise-2 grid border-t border-l border-border sm:grid-cols-2">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group flex items-center justify-between gap-3 border-r border-b border-border px-5 py-6 font-mono text-[11px] uppercase tracking-[0.14em] text-muted-foreground transition-colors hover:bg-foreground hover:text-background"
            >
              {link.label}
              <ArrowUpRight className="size-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </Link>
          ))}
        </nav>
      </Shell>
    </section>
  )
}
