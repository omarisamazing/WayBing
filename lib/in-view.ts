/**
 * One IntersectionObserver for the whole page instead of one per element.
 * Every scroll-triggered animation on the site (reveals, counters, charts)
 * shares this single instance, so the observer cost stays flat as sections grow.
 */
const callbacks = new WeakMap<Element, () => void>()
let observer: IntersectionObserver | null = null

function getObserver() {
  observer ??= new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue
        const fire = callbacks.get(entry.target)
        callbacks.delete(entry.target)
        observer?.unobserve(entry.target)
        fire?.()
      }
    },
    { rootMargin: '0px 0px -12% 0px', threshold: 0.05 },
  )
  return observer
}

/** Fires `onEnter` once, the first time `node` scrolls into view. Returns a cleanup. */
export function observeOnce(node: Element, onEnter: () => void) {
  callbacks.set(node, onEnter)
  getObserver().observe(node)
  return () => {
    callbacks.delete(node)
    observer?.unobserve(node)
  }
}

/** Single source of truth for the reduced-motion opt-out. */
export function prefersReducedMotion() {
  return typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
}
