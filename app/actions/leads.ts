'use server'

export type LeadResult = {
  ok: boolean
  message: string
  /** True when the lead was captured but no email provider is configured yet. */
  pending?: boolean
}

export type AuditLead = {
  kind: 'audit'
  site: string
  email: string
  budget: string
  bottleneck: string
  services: string[]
}

export type BookingLead = {
  kind: 'booking'
  email: string
  callType: string
  host: string
  day: string
  slot: string
  company?: string
}

export type Lead = AuditLead | BookingLead

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

function clean(value: unknown, max = 300) {
  return typeof value === 'string' ? value.trim().slice(0, max) : ''
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
}

function rows(pairs: [string, string][]) {
  return pairs
    .filter(([, v]) => v)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:8px 16px 8px 0;font:600 12px/1.4 monospace;text-transform:uppercase;letter-spacing:.08em;color:#6b6b6b;vertical-align:top;white-space:nowrap">${escapeHtml(
          k,
        )}</td><td style="padding:8px 0;font:400 14px/1.5 -apple-system,Segoe UI,sans-serif;color:#141414">${escapeHtml(v)}</td></tr>`,
    )
    .join('')
}

function buildEmail(lead: Lead) {
  const isAudit = lead.kind === 'audit'

  const subject = isAudit
    ? `New audit request — ${lead.site || lead.email}`
    : `New call booked — ${lead.callType} (${lead.day} ${lead.slot})`

  const pairs: [string, string][] = isAudit
    ? [
        ['Type', 'Free funnel audit request'],
        ['Website', lead.site],
        ['Email', lead.email],
        ['Monthly budget', lead.budget],
        ['Bottleneck', lead.bottleneck],
        ['Services wanted', lead.services.join(', ')],
      ]
    : [
        ['Type', 'Discovery call booking'],
        ['Call format', lead.callType],
        ['Host', lead.host],
        ['Requested slot', `${lead.day} at ${lead.slot} (GMT+0)`],
        ['Email', lead.email],
        ['Company', lead.company ?? ''],
      ]

  pairs.push(['Received', new Date().toUTCString()])

  const html = `<!doctype html><html><body style="margin:0;background:#f4f1eb;padding:24px">
  <div style="max-width:600px;margin:0 auto;background:#fdfcf8;border:1px solid #141414">
    <div style="background:#141414;padding:20px 24px">
      <p style="margin:0;font:600 11px/1 monospace;letter-spacing:.18em;text-transform:uppercase;color:#913CDC">WayBing / New lead</p>
      <h1 style="margin:10px 0 0;font:600 22px/1.2 -apple-system,Segoe UI,sans-serif;letter-spacing:-.02em;color:#f4f1eb">${escapeHtml(
        isAudit ? 'Audit request' : 'Call booking',
      )}</h1>
    </div>
    <table style="width:100%;border-collapse:collapse;padding:8px 24px" cellpadding="0" cellspacing="0">
      <tbody><tr><td style="padding:16px 24px"><table style="width:100%;border-collapse:collapse">${rows(
        pairs,
      )}</table></td></tr></tbody>
    </table>
    <div style="border-top:1px solid #dcd8ce;padding:16px 24px">
      <a href="mailto:${escapeHtml(lead.email)}" style="display:inline-block;background:#913CDC;color:#fff;text-decoration:none;padding:11px 20px;font:600 11px/1 monospace;letter-spacing:.14em;text-transform:uppercase">Reply to lead</a>
    </div>
  </div></body></html>`

  const text = pairs.map(([k, v]) => `${k}: ${v}`).join('\n')

  return { subject, html, text }
}

async function sendWithResend(lead: Lead) {
  const apiKey = process.env.RESEND_API_KEY
  const to = process.env.LEAD_INBOX_EMAIL

  if (!apiKey || !to) {
    console.log('[v0] lead captured but RESEND_API_KEY / LEAD_INBOX_EMAIL missing:', lead)
    return { delivered: false as const }
  }

  const { subject, html, text } = buildEmail(lead)

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      // onboarding@resend.dev works before a custom domain is verified.
      from: process.env.LEAD_FROM_EMAIL || 'WayBing Leads <onboarding@resend.dev>',
      to: [to],
      reply_to: lead.email,
      subject,
      html,
      text,
    }),
  })

  if (!res.ok) {
    const detail = await res.text()
    console.log('[v0] resend error', res.status, detail)
    throw new Error(`Resend responded ${res.status}`)
  }

  return { delivered: true as const }
}

export async function submitLead(input: Lead): Promise<LeadResult> {
  const email = clean(input.email, 160).toLowerCase()

  if (!EMAIL_RE.test(email)) {
    return { ok: false, message: 'That email address does not look right — check it and try again.' }
  }

  const lead: Lead =
    input.kind === 'audit'
      ? {
          kind: 'audit',
          email,
          site: clean(input.site, 160) || 'Not provided',
          budget: clean(input.budget, 60),
          bottleneck: clean(input.bottleneck, 160),
          services: Array.isArray(input.services) ? input.services.slice(0, 8).map((s) => clean(s, 60)) : [],
        }
      : {
          kind: 'booking',
          email,
          callType: clean(input.callType, 80),
          host: clean(input.host, 80),
          day: clean(input.day, 40),
          slot: clean(input.slot, 20),
          company: clean(input.company, 120),
        }

  if (lead.kind === 'booking' && (!lead.day || !lead.slot)) {
    return { ok: false, message: 'Pick a day and a time before confirming.' }
  }

  try {
    const { delivered } = await sendWithResend(lead)
    return {
      ok: true,
      pending: !delivered,
      message: delivered
        ? 'Sent — check your inbox for the confirmation.'
        : 'Received. Email delivery is not configured yet, so this was logged on the server.',
    }
  } catch {
    return {
      ok: false,
      message: 'We could not send that right now. Email hello@waybing.com and we will pick it up.',
    }
  }
}
