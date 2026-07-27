import Link from 'next/link'
import { LogoMark } from '@/components/site/logo'
import { CtaButton } from '@/components/site/cta-button'
import { SERVICES } from '@/lib/content'

const columns = [
  {
    title: 'Engine',
    links: [
      { href: '/services', label: 'Services hub' },
      ...SERVICES.map((s) => ({ href: `/services/${s.slug}`, label: s.title })),
    ],
  },
  {
    title: 'Agency',
    links: [
      { href: '/about', label: 'About WayBing' },
      { href: '/work', label: 'Work & case studies' },
      { href: '/blog', label: 'Resources' },
    ],
  },
  {
    title: 'Social',
    links: [
      { href: 'https://linkedin.com', label: 'LinkedIn' },
      { href: 'https://x.com', label: 'X / Twitter' },
      { href: 'https://instagram.com', label: 'Instagram' },
      { href: 'https://youtube.com', label: 'YouTube' },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer className="border-t border-foreground bg-foreground text-background">
      <div className="mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-8 border-b border-background/20 py-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <LogoMark className="h-6 text-background" />
            <h2 className="display-tight mt-6 text-[clamp(2rem,5.5vw,4.5rem)]">
              Stop paying for <span className="text-accent">activity.</span>
              <br />
              Start buying outcomes.
            </h2>
          </div>
          <CtaButton
            size="lg"
            className="border-background bg-background text-foreground hover:border-accent hover:bg-accent hover:text-accent-foreground"
          >
            Claim a 48h audit
          </CtaButton>
        </div>

        <div className="grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
          {columns.map((col) => (
            <div key={col.title}>
              <p className="label-mono text-background/50">{col.title}</p>
              <ul className="mt-4 flex flex-col gap-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-background/80 underline-offset-4 transition-colors hover:text-accent hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
          <div>
            <p className="label-mono text-background/50">Contact</p>
            <ul className="mt-4 flex flex-col gap-2.5 font-mono text-sm text-background/80">
              <li>growth@waybing.com</li>
              <li>+1 (415) 555-0142</li>
              <li className="leading-relaxed text-background/50">
                Remote-first
                <br />
                London / New York
              </li>
            </ul>
          </div>
        </div>

        <div className="flex flex-col gap-3 border-t border-background/20 py-6 md:flex-row md:items-center md:justify-between">
          <p className="label-mono text-background/50">© {new Date().getFullYear()} WayBing Ltd. All rights reserved.</p>
          <p className="max-w-3xl font-mono text-[10px] leading-relaxed text-background/40">
            Results shown reflect specific client engagements and are not a guarantee of future performance. WayBing is not
            affiliated with, endorsed by, or sponsored by Meta, Google, TikTok or any advertising platform.
          </p>
          <div className="flex gap-4 label-mono text-background/50">
            <Link href="/privacy" className="hover:text-accent">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-accent">
              Terms
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
