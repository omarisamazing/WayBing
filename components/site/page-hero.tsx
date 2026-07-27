import { Shell } from '@/components/site/primitives'

export function PageHero({
  label,
  title,
  intro,
  meta,
}: {
  label: string
  title: React.ReactNode
  intro?: string
  meta?: { value: string; label: string }[]
}) {
  return (
    <section className="border-b border-border bg-muted">
      <Shell className="py-14 sm:py-20">
        <p className="label-mono text-muted-foreground">
          <span className="text-accent">✳ </span>
          {label}
        </p>
        <h1 className="display-tight mt-6 max-w-5xl text-[clamp(2.5rem,7vw,5.5rem)] text-balance">{title}</h1>
        {intro ? (
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg">{intro}</p>
        ) : null}
        {meta?.length ? (
          <dl className="mt-12 grid border-t border-l border-border sm:grid-cols-2 lg:grid-cols-4">
            {meta.map((item) => (
              <div key={item.label} className="border-r border-b border-border px-5 py-6">
                <dd className="font-mono text-2xl leading-none tracking-[-0.03em]">{item.value}</dd>
                <dt className="mt-3 label-mono text-muted-foreground">{item.label}</dt>
              </div>
            ))}
          </dl>
        ) : null}
      </Shell>
    </section>
  )
}
