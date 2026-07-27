import { ImageResponse } from 'next/og'
import { SITE } from '@/lib/site'

export const alt = `${SITE.name} — ${SITE.tagline}`
export const size = { width: 1200, height: 630 }
export const contentType = 'image/png'

/**
 * Social + search preview card. Generated at build time from the same tokens as
 * the site so the brand name is legible wherever a link is pasted.
 */
export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#f4f1eb',
          color: '#141414',
          padding: '64px 72px',
          fontFamily: 'sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
            <div style={{ width: 28, height: 28, background: '#913CDC' }} />
            <div style={{ fontSize: 34, fontWeight: 700, letterSpacing: '-0.02em', textTransform: 'uppercase' }}>
              {SITE.name}
            </div>
          </div>
          <div style={{ fontSize: 22, letterSpacing: '0.16em', textTransform: 'uppercase', color: '#6b6660' }}>
            Digital marketing
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div
            style={{
              fontSize: 84,
              fontWeight: 700,
              lineHeight: 1,
              letterSpacing: '-0.035em',
              textTransform: 'uppercase',
              maxWidth: 980,
            }}
          >
            We don&apos;t sell retainers. We build <span style={{ color: '#913CDC' }}>revenue engines.</span>
          </div>
          <div style={{ fontSize: 28, lineHeight: 1.4, color: '#4a4640', maxWidth: 900 }}>
            Creative, CRO, paid ads and SEO — wired to server-side tracking.
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: '2px solid #141414',
            paddingTop: 28,
            fontSize: 22,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
          }}
        >
          <div>waybing.com</div>
          <div style={{ color: '#913CDC' }}>60-day growth guarantee</div>
        </div>
      </div>
    ),
    size,
  )
}
