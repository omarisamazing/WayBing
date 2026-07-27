'use client'

import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { AlertCircle, ArrowRight, Check, Clock, Loader2, User } from 'lucide-react'
import { submitLead } from '@/app/actions/leads'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { BOOKING_OPTIONS } from '@/lib/content'
import { cn } from '@/lib/utils'

type BookingContextValue = {
  open: (intent?: string) => void
}

const BookingContext = createContext<BookingContextValue | null>(null)

export function useBooking() {
  const ctx = useContext(BookingContext)
  if (!ctx) throw new Error('useBooking must be used inside BookingProvider')
  return ctx
}

const DAYS = ['Mon 28', 'Tue 29', 'Wed 30', 'Thu 31', 'Fri 01']
const SLOTS = ['09:00', '10:30', '12:00', '13:30', '15:00', '16:30']

export function BookingProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false)
  const [intent, setIntent] = useState(BOOKING_OPTIONS[1].id)
  const [day, setDay] = useState<string | null>(null)
  const [slot, setSlot] = useState<string | null>(null)
  const [email, setEmail] = useState('')
  const [company, setCompany] = useState('')
  const [confirmed, setConfirmed] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [notice, setNotice] = useState<string | null>(null)

  const open = useCallback((nextIntent?: string) => {
    if (nextIntent) setIntent(nextIntent)
    setConfirmed(false)
    setError(null)
    setIsOpen(true)
  }, [])

  const value = useMemo(() => ({ open }), [open])
  const active = BOOKING_OPTIONS.find((o) => o.id === intent) ?? BOOKING_OPTIONS[1]

  async function confirmBooking(e: React.FormEvent) {
    e.preventDefault()
    if (!day || !slot) return

    setSending(true)
    setError(null)

    const result = await submitLead({
      kind: 'booking',
      email,
      company,
      callType: active.title,
      host: active.host,
      day,
      slot,
    })

    setSending(false)

    if (!result.ok) {
      setError(result.message)
      return
    }

    setNotice(result.pending ? result.message : null)
    setConfirmed(true)
  }

  return (
    <BookingContext.Provider value={value}>
      {children}
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent
          showCloseButton
          className="max-h-[92dvh] w-[calc(100vw-2rem)] max-w-3xl gap-0 overflow-y-auto border border-foreground bg-background p-0 ring-0 sm:max-w-3xl"
        >
          <div className="border-b border-border px-5 py-4 sm:px-7">
            <p className="label-mono text-muted-foreground">Book a call / no pitch decks</p>
            <DialogTitle className="mt-2 text-2xl font-semibold uppercase tracking-[-0.02em]">
              Pick the call you actually need
            </DialogTitle>
            <DialogDescription className="mt-1.5 text-sm text-muted-foreground">
              Three formats, three hosts. Choose the one that matches where you are.
            </DialogDescription>
          </div>

          {confirmed ? (
            <div className="px-5 py-12 text-center duration-300 animate-in fade-in sm:px-7">
              <div className="mx-auto flex size-10 items-center justify-center border border-accent bg-accent text-accent-foreground duration-500 animate-in zoom-in-50">
                <Check className="size-5" />
              </div>
              <h3 className="mt-5 text-xl font-semibold uppercase tracking-[-0.02em]">Slot held</h3>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">
                {active.title} — {day} at {slot}. A calendar invite and the pre-call audit checklist are on the way to{' '}
                <span className="font-mono text-foreground">{email || 'your inbox'}</span>.
              </p>
              {notice ? (
                <p className="mx-auto mt-4 max-w-md border border-border bg-muted px-3 py-2 font-mono text-[11px] leading-relaxed text-muted-foreground">
                  {notice}
                </p>
              ) : null}
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="mt-6 inline-flex h-10 items-center gap-2 border border-foreground bg-foreground px-5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-colors hover:bg-accent hover:border-accent"
              >
                Close
              </button>
            </div>
          ) : (
            <div className="grid md:grid-cols-[minmax(0,15rem)_minmax(0,1fr)]">
              <div className="border-b border-border md:border-b-0 md:border-r">
                <div role="tablist" aria-label="Call type" className="flex md:flex-col">
                  {BOOKING_OPTIONS.map((option) => {
                    const selected = option.id === intent
                    return (
                      <button
                        key={option.id}
                        role="tab"
                        type="button"
                        aria-selected={selected}
                        onClick={() => {
                          setIntent(option.id)
                          setSlot(null)
                        }}
                        className={cn(
                          'flex-1 border-border px-4 py-4 text-left transition-colors not-last:border-r md:not-last:border-r-0 md:not-last:border-b',
                          selected ? 'bg-foreground text-background' : 'hover:bg-muted'
                        )}
                      >
                        <span className="label-mono opacity-70">{option.duration}</span>
                        <span className="mt-2 block text-[13px] font-semibold uppercase tracking-[0.02em] leading-tight">
                          {option.title}
                        </span>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div className="p-5 sm:p-7">
                <div className="flex flex-wrap items-center gap-x-5 gap-y-2 text-muted-foreground">
                  <span className="inline-flex items-center gap-1.5 label-mono">
                    <Clock className="size-3" /> {active.duration}
                  </span>
                  <span className="inline-flex items-center gap-1.5 label-mono">
                    <User className="size-3" /> {active.host}
                  </span>
                </div>
                <p className="mt-3 text-sm leading-relaxed">{active.focus}</p>
                <ul className="mt-3 flex flex-wrap gap-2">
                  {active.bullets.map((b) => (
                    <li key={b} className="border border-border px-2 py-1 label-mono text-muted-foreground">
                      {b}
                    </li>
                  ))}
                </ul>

                <p className="label-mono mt-6 text-muted-foreground">Select a day</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {DAYS.map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDay(d)}
                      className={cn(
                        'border px-3 py-2 font-mono text-xs transition-colors',
                        day === d
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border hover:border-foreground'
                      )}
                    >
                      {d}
                    </button>
                  ))}
                </div>

                <p className="label-mono mt-5 text-muted-foreground">Select a time (GMT+0)</p>
                <div className="mt-2 grid grid-cols-3 gap-2 sm:grid-cols-6">
                  {SLOTS.map((s) => (
                    <button
                      key={s}
                      type="button"
                      disabled={!day}
                      onClick={() => setSlot(s)}
                      className={cn(
                        'border px-2 py-2 font-mono text-xs transition-colors disabled:opacity-40',
                        slot === s
                          ? 'border-foreground bg-foreground text-background'
                          : 'border-border enabled:hover:border-foreground'
                      )}
                    >
                      {s}
                    </button>
                  ))}
                </div>

                <form className="mt-6 flex flex-col gap-2" onSubmit={confirmBooking}>
                  <div className="flex flex-col gap-2 sm:flex-row">
                    <label className="sr-only" htmlFor="booking-email">
                      Work email
                    </label>
                    <Input
                      id="booking-email"
                      type="email"
                      required
                      placeholder="you@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="h-11 rounded-none border-border bg-card font-mono text-sm transition-colors focus-visible:border-accent"
                    />
                    <label className="sr-only" htmlFor="booking-company">
                      Company
                    </label>
                    <Input
                      id="booking-company"
                      placeholder="Company (optional)"
                      value={company}
                      onChange={(e) => setCompany(e.target.value)}
                      className="h-11 rounded-none border-border bg-card font-mono text-sm transition-colors focus-visible:border-accent"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={!day || !slot || sending}
                    className="group inline-flex h-11 shrink-0 items-center justify-center gap-2 border border-foreground bg-foreground px-5 text-xs font-semibold uppercase tracking-[0.14em] text-background transition-all enabled:hover:border-accent enabled:hover:bg-accent disabled:opacity-40"
                  >
                    {sending ? (
                      <>
                        <Loader2 className="size-3.5 animate-spin" /> Holding slot
                      </>
                    ) : (
                      <>
                        Confirm slot
                        <ArrowRight className="size-3.5 transition-transform group-enabled:group-hover:translate-x-0.5" />
                      </>
                    )}
                  </button>
                </form>
                {error ? (
                  <p
                    role="alert"
                    className="mt-3 flex items-start gap-2 border border-destructive/40 bg-destructive/5 px-3 py-2.5 text-xs leading-relaxed text-destructive duration-200 animate-in fade-in slide-in-from-top-1"
                  >
                    <AlertCircle className="mt-px size-3.5 shrink-0" />
                    {error}
                  </p>
                ) : (
                  <p className="mt-3 label-mono text-muted-foreground">
                    {day && slot ? (
                      <span className="text-accent">{`Selected — ${day} / ${slot}`}</span>
                    ) : (
                      'Pick a day and time to continue'
                    )}
                  </p>
                )}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </BookingContext.Provider>
  )
}
