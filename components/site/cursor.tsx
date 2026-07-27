'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/in-view'

const INTERACTIVE = 'a,button,input,textarea,select,summary,label,[role="tab"],[role="button"],[data-cursor]'
const SIZE = 26
/** Time constant for the follow. Lower = snappier. Framerate independent. */
const TAU = 55
const HOT_SCALE = 1.85
const PRESS_SCALE = 0.78

/**
 * A square bracket that trails the pointer and swells over anything clickable.
 * The native cursor is left visible on purpose — precision and accessibility
 * stay intact, this only adds the tactile layer.
 *
 * Cost: one fixed element, a pointermove listener, and a rAF loop that parks
 * itself the moment the ring settles. No React renders while it animates.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // A hover-capable fine pointer is the only environment where a trailing
    // ring makes sense. Testing capability rather than `maxTouchPoints` keeps
    // it working on touchscreen laptops, which report touch points but are
    // driven by a mouse or trackpad the vast majority of the time.
    const query = window.matchMedia('(hover: hover) and (pointer: fine)')
    const sync = () => setEnabled(query.matches && !prefersReducedMotion())

    sync()
    query.addEventListener('change', sync)
    return () => query.removeEventListener('change', sync)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let scale = 0.6
    let hot = false
    let down = false
    let placed = false
    let raf = 0
    let last = 0

    const targetScale = () => (hot ? HOT_SCALE : 1) * (down ? PRESS_SCALE : 1)

    const paint = () => {
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0) scale(${scale})`
    }

    const draw = (now: number) => {
      raf = 0
      // Delta-time smoothing, so the follow feels identical on a 60Hz panel and
      // a 120Hz one. A fixed per-frame lerp makes the ring twice as fast at 120Hz.
      const dt = last ? Math.min(now - last, 64) : 16
      last = now
      const t = 1 - Math.exp(-dt / TAU)

      const goal = targetScale()
      x += (tx - x) * t
      y += (ty - y) * t
      scale += (goal - scale) * t
      paint()

      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(goal - scale) < 0.004
      if (settled) {
        // Snap the last sub-pixel so the ring never rests visibly off-target.
        x = tx
        y = ty
        scale = goal
        paint()
        last = 0
        return
      }
      raf = requestAnimationFrame(draw)
    }

    const wake = () => {
      if (!raf) {
        last = 0
        raf = requestAnimationFrame(draw)
      }
    }

    const setHot = (node: Element | null) => {
      const next = Boolean(node?.closest?.(INTERACTIVE))
      if (next === hot) return
      hot = next
      el.dataset.hot = String(hot)
      wake()
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!placed) {
        // First sighting: drop the ring exactly on the pointer instead of
        // flying it in from the top-left corner of the viewport.
        placed = true
        x = tx
        y = ty
        paint()
        el.dataset.on = 'true'
      }
      setHot(e.target as Element | null)
      wake()
    }

    const onDown = () => {
      down = true
      wake()
    }
    const onUp = () => {
      down = false
      wake()
    }
    const onLeave = (e: PointerEvent) => {
      // `pointerout` also fires when moving between elements; only a null
      // relatedTarget means the pointer actually left the window.
      if (e.relatedTarget) return
      el.dataset.on = 'false'
    }
    const onEnter = () => {
      if (placed) el.dataset.on = 'true'
    }
    /** The element under a stationary pointer changes as the page scrolls. */
    const onScroll = () => {
      if (!placed) return
      setHot(document.elementFromPoint(tx, ty))
    }
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf)
        raf = 0
        down = false
      }
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    window.addEventListener('pointercancel', onUp, { passive: true })
    window.addEventListener('blur', onUp)
    window.addEventListener('scroll', onScroll, { passive: true })
    document.addEventListener('pointerout', onLeave)
    document.addEventListener('pointerover', onEnter)
    document.addEventListener('visibilitychange', onVisibility)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      window.removeEventListener('pointercancel', onUp)
      window.removeEventListener('blur', onUp)
      window.removeEventListener('scroll', onScroll)
      document.removeEventListener('pointerout', onLeave)
      document.removeEventListener('pointerover', onEnter)
      document.removeEventListener('visibilitychange', onVisibility)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={ref} aria-hidden="true" className="cursor-ring" data-on="false" data-hot="false" />
}
