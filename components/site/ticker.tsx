import { TICKER_ITEMS } from '@/lib/content'

export function Ticker() {
  const items = [...TICKER_ITEMS, ...TICKER_ITEMS]
  return (
    <div className="group relative overflow-hidden border-b border-foreground/20 bg-foreground text-background">
      <div className="flex w-max animate-marquee items-center py-2 group-hover:[animation-play-state:paused]">
        {items.map((item, i) => (
          <span key={`${item}-${i}`} className="flex items-center label-mono">
            <span className="px-5 whitespace-nowrap">{item}</span>
            <span aria-hidden="true" className="text-accent">
              ✳
            </span>
          </span>
        ))}
      </div>
    </div>
  )
}
