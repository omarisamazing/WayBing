'use client'

import { useState } from 'react'
import { AlertCircle, ArrowRight, Check, Loader2, X } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import { cn } from '@/lib/utils'

const BUDGETS = ['< $10k / mo', '$10k – $30k / mo', '$30k – $75k / mo', '$75k+ / mo']
const BOTTLENECKS = [
  'Traffic is fine, nothing converts',
  'Ad costs climbing, ROAS falling',
  'Tracking data I do not trust',
  'Creative burns out too fast',
  'No organic pipeline at all',
]
const SERVICES = ['Creative design', 'Web / CRO', 'Paid ads + tracking', 'SEO growth']

type Status = 'idle' | 'sending' | 'done'

export function AuditRequest({ className, variant = 'hero' }: { className?: string; variant?: 'hero' | 'inline' }) {
  const [site, setSite] = useState('')
  const [openPanel, setOpenPanel] = useState(false)
  const [budget, setBudget] = useState(BUDGETS[1])
  const [bottleneck, setBottleneck] = useState(BOTTLENECKS[0])
  const [picked, setPicked] = useState<string[]>([SERVICES[2]])
  const [email, setEmail] = useState('')
  const [status, setStatus] = useState<Status>('idle')
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  function toggleService(service: string) {
    setPicked((prev) => (prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]))
  }

  async function submitScope(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    setError(null)

    const result = await submitLead({
      kind: 'audit',
      site,
      email,
      budget,
      bottleneck,
      services: picked,
    })

    if (!result.ok) {
      setError(result.message)
      setStatus('idle')
      return
    }

    setNotice(result.pending ? result.message : null)
    setStatus('done')
  }

  return (
    <div className={className}>
      <form
        onSubmit={(e) => {
          e.preventDefault()
          if (site.trim().length > 2) {
            setStatus('idle')
            setOpenPanel(true)
          }
        }}
        className={cn(
          'flex flex-col border border-foreground bg-card sm:flex-row',
          variant === 'hero' ? 'sm:items-stretch' : ''
        )}
      >
        <div className="flex flex-1 items-center gap-3 border-b border-border px-4 py-3.5 sm:border-b-0 sm:border-r">
          <span aria-hidden="true" className="label-mono text-muted-foreground">
            01
          </span>
          <label htmlFor="site-input" className="sr-only">
            Your website or social handle
          </label>
          <input
            id="site-input"
            value={site}
            onChange={(e) => setSite(e.target.value)}
            placeholder="yourbrand.com or @handle"
            className="w-full bg-transparent font-mono text-sm outline-none placeholder:text-muted-foreground/70"
          />
        </div>
        <button
          type="submit"
          className="group inline-flex h-12 shrink-0 items-center justify-center gap-2 bg-foreground px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-background transition-colors hover:bg-accent hover:text-accent-foreground sm:h-auto"
        >
          Get free audit
          <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
        </button>
      </form>
      <p className="mt-3 label-mono text-muted-foreground">
        Step 2 asks three questions. Checklist lands in your inbox within 48 hours.
      </p>

      {openPanel ? (
        <div className="fixed inset-0 z-50 flex justify-end">
          <button
            type="button"
            aria-label="Close panel"
            onClick={() => setOpenPanel(false)}
            className="absolute inset-0 bg-foreground/25 backdrop-blur-[2px]"
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Project scope"
            className="relative flex h-full w-full max-w-lg flex-col overflow-y-auto border-l border-foreground bg-background shadow-2xl duration-200 animate-in slide-in-from-right"
          >
            <div className="flex items-start justify-between gap-4 border-b border-border p-5 sm:p-7">
              <div>
                <p className="label-mono text-muted-foreground">
                  <span className="text-accent">Step 02 / </span>Project scope
                </p>
                <h2 className="display-tight mt-3 text-3xl">Three questions.</h2>
                <p className="mt-2 font-mono text-xs text-muted-foreground">Auditing: {site}</p>
              </div>
              <button
                type="button"
                onClick={() => setOpenPanel(false)}
                aria-label="Close"
                className="flex size-8 shrink-0 items-center justify-center border border-border hover:bg-muted"
              >
                <X className="size-4" />
              </button>
            </div>

            {status === 'done' ? (
              <div className="flex flex-1 flex-col items-center justify-center p-7 text-center duration-300 animate-in fade-in">
                <div className="flex size-10 items-center justify-center border border-accent bg-accent text-accent-foreground duration-500 animate-in zoom-in-50">
                  <Check className="size-5" />
                </div>
                <h3 className="mt-5 text-xl font-semibold uppercase tracking-[-0.02em]">Audit queued</h3>
                <p className="mt-2 max-w-sm text-sm leading-relaxed text-muted-foreground">
                  Your leak checklist for <span className="font-mono text-foreground">{site}</span> is being built. Watch{' '}
                  <span className="font-mono text-foreground">{email}</span> — it arrives within 48 hours, no call required.
                </p>
                {notice ? (
                  <p className="mt-4 max-w-sm border border-border bg-muted px-3 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                    {notice}
                  </p>
                ) : null}
                <button
                  type="button"
                  onClick={() => setOpenPanel(false)}
                  className="mt-6 inline-flex h-11 items-center gap-2 border border-foreground bg-foreground px-6 font-mono text-[11px] uppercase tracking-[0.14em] text-background hover:bg-accent"
                >
                  Done
                </button>
              </div>
            ) : (
              <form onSubmit={submitScope} className="flex flex-1 flex-col gap-7 p-5 sm:p-7">
                <fieldset>
                  <legend className="label-mono text-muted-foreground">Monthly media budget</legend>
                  <div className="mt-3 grid grid-cols-2 gap-2">
                    {BUDGETS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBudget(b)}
                        className={cn(
                          'border px-3 py-2.5 font-mono text-xs transition-colors',
                          budget === b ? 'border-foreground bg-foreground text-background' : 'border-border hover:border-foreground'
                        )}
                      >
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="label-mono text-muted-foreground">Primary bottleneck</legend>
                  <div className="mt-3 flex flex-col">
                    {BOTTLENECKS.map((b) => (
                      <button
                        key={b}
                        type="button"
                        onClick={() => setBottleneck(b)}
                        className={cn(
                          'flex items-center gap-3 border border-border px-3 py-2.5 text-left text-sm transition-colors not-last:border-b-0',
                          bottleneck === b ? 'bg-foreground text-background' : 'hover:bg-muted'
                        )}
                      >
                        <span className={cn('size-2 shrink-0 border', bottleneck === b ? 'border-accent bg-accent' : 'border-foreground')} />
                        {b}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <fieldset>
                  <legend className="label-mono text-muted-foreground">Services you want quoted</legend>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {SERVICES.map((s) => (
                      <button
                        key={s}
                        type="button"
                        aria-pressed={picked.includes(s)}
                        onClick={() => toggleService(s)}
                        className={cn(
                          'border px-3 py-2 font-mono text-xs transition-colors',
                          picked.includes(s)
                            ? 'border-foreground bg-foreground text-background'
                            : 'border-border hover:border-foreground'
                        )}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </fieldset>

                <div className="mt-auto flex flex-col gap-3">
                  <label htmlFor="audit-email" className="label-mono text-muted-foreground">
                    Where do we send the checklist?
                  </label>
                  <input
                    id="audit-email"
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@company.com"
                    className="h-12 border border-border bg-card px-3 font-mono text-sm outline-none transition-colors focus:border-accent"
                  />
                  {error ? (
                    <p
                      role="alert"
                      className="flex items-start gap-2 border border-destructive/40 bg-destructive/5 px-3 py-2.5 text-xs leading-relaxed text-destructive duration-200 animate-in fade-in slide-in-from-top-1"
                    >
                      <AlertCircle className="mt-px size-3.5 shrink-0" />
                      {error}
                    </p>
                  ) : null}
                  <button
                    type="submit"
                    disabled={status === 'sending'}
                    className="inline-flex h-12 items-center justify-center gap-2 border border-foreground bg-foreground font-mono text-[11px] uppercase tracking-[0.14em] text-background transition-colors enabled:hover:bg-accent disabled:opacity-60"
                  >
                    {status === 'sending' ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" /> Building audit
                      </>
                    ) : (
                      <>
                        Send my audit <ArrowRight className="size-3.5" />
                      </>
                    )}
                  </button>
                  <p className="label-mono text-muted-foreground">No newsletter. No sales sequence. One checklist.</p>
                </div>
              </form>
            )}
          </div>
        </div>
      ) : null}
    </div>
  )
}
