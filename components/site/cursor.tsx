'use client'

import { useEffect, useRef, useState } from 'react'
import { prefersReducedMotion } from '@/lib/in-view'

const INTERACTIVE = 'a,button,input,textarea,select,summary,[role="tab"],[role="button"],[data-cursor]'
const SIZE = 26
const EASE = 0.2

/**
 * A square bracket that trails the pointer and swells over anything clickable.
 * The native cursor is left visible on purpose — precision and accessibility
 * stay intact, this only adds the tactile layer.
 *
 * Cost: one fixed element, one pointermove listener, and a rAF loop that
 * parks itself the moment the pointer stops moving. No React renders while
 * it animates.
 */
export function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  const [enabled, setEnabled] = useState(false)

  useEffect(() => {
    // Opt out of touch — a trailing ring on a finger tap is noise, not polish.
    // Testing for coarse/touch rather than for `pointer: fine` keeps the ring
    // working in the environments that report no pointer capability at all.
    if (window.matchMedia('(pointer: coarse)').matches) return
    if (navigator.maxTouchPoints > 0) return
    if (prefersReducedMotion()) return
    setEnabled(true)
  }, [])

  useEffect(() => {
    const el = ref.current
    if (!enabled || !el) return

    let x = 0
    let y = 0
    let tx = 0
    let ty = 0
    let scale = 0.4
    let target = 1
    let down = false
    let placed = false
    let raf = 0

    const draw = () => {
      raf = 0
      x += (tx - x) * EASE
      y += (ty - y) * EASE
      scale += (target * (down ? 0.75 : 1) - scale) * EASE
      el.style.transform = `translate3d(${x - SIZE / 2}px, ${y - SIZE / 2}px, 0) scale(${scale})`

      const settled = Math.abs(tx - x) < 0.1 && Math.abs(ty - y) < 0.1 && Math.abs(target - scale) < 0.005
      if (!settled) raf = requestAnimationFrame(draw)
    }

    const wake = () => {
      if (!raf) raf = requestAnimationFrame(draw)
    }

    const onMove = (e: PointerEvent) => {
      tx = e.clientX
      ty = e.clientY
      if (!placed) {
        placed = true
        x = tx
        y = ty
        el.dataset.on = 'true'
      }
      const hot = (e.target as Element | null)?.closest?.(INTERACTIVE)
      target = hot ? 1.85 : 1
      el.dataset.hot = String(Boolean(hot))
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
    const onLeave = () => {
      el.dataset.on = 'false'
    }
    const onEnter = () => {
      if (placed) el.dataset.on = 'true'
    }

    window.addEventListener('pointermove', onMove, { passive: true })
    window.addEventListener('pointerdown', onDown, { passive: true })
    window.addEventListener('pointerup', onUp, { passive: true })
    document.addEventListener('pointerleave', onLeave)
    document.addEventListener('pointerenter', onEnter)

    return () => {
      window.removeEventListener('pointermove', onMove)
      window.removeEventListener('pointerdown', onDown)
      window.removeEventListener('pointerup', onUp)
      document.removeEventListener('pointerleave', onLeave)
      document.removeEventListener('pointerenter', onEnter)
      cancelAnimationFrame(raf)
    }
  }, [enabled])

  if (!enabled) return null
  return <div ref={ref} aria-hidden="true" className="cursor-ring" data-on="false" />
}
