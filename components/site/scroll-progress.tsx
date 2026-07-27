'use client'

import { useEffect, useRef } from 'react'

/** Hairline read-progress bar. Passive scroll listener, rAF-coalesced, transform-only. */
export function ScrollProgress() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    let raf = 0

    const draw = () => {
      raf = 0
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(1, window.scrollY / max) : 0
      el.style.transform = `scaleX(${progress})`
    }

    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    draw()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
      cancelAnimationFrame(raf)
    }
  }, [])

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[2px] origin-left scale-x-0 bg-accent"
    />
  )
}
