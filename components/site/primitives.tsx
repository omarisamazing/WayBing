import { CountUp } from '@/components/site/count-up'
import { Reveal } from '@/components/site/reveal'
import { cn } from '@/lib/utils'

export function Shell({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn('mx-auto w-full max-w-[100rem] px-4 sm:px-6 lg:px-10', className)}>{children}</div>
}

export function SectionHead({
  index,
  label,
  title,
  intro,
  className,
}: {
  index?: string
  label: string
  title: string
  intro?: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-4 border-b border-border pb-6 md:flex-row md:items-end md:justify-between', className)}>
      <Reveal className="max-w-3xl">
        <p className="label-mono text-muted-foreground">
          {index ? <span className="text-accent">{index} / </span> : null}
          {label}
        </p>
        <h2 className="display-tight mt-4 text-[clamp(2rem,5vw,3.75rem)] text-balance">{title}</h2>
      </Reveal>
      {intro ? (
        <Reveal delay={120} as="p" className="max-w-sm text-sm leading-relaxed text-muted-foreground md:text-right">
          {intro}
        </Reveal>
      ) : null}
    </div>
  )
}

export function Stat({
  value,
  label,
  className,
}: {
  value: string
  label: string
  className?: string
}) {
  return (
    <div className={cn('flex flex-col gap-2 px-4 py-6 sm:px-6', className)}>
      <span className="font-mono text-[clamp(1.5rem,3vw,2.25rem)] font-medium leading-none tracking-[-0.03em]">
        <CountUp value={value} />
      </span>
      <span className="label-mono text-muted-foreground">{label}</span>
    </div>
  )
}

export function Tag({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1.5 border border-border px-2 py-1 label-mono text-muted-foreground', className)}>
      {children}
    </span>
  )
}
