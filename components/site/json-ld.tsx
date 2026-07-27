/**
 * Renders a structured-data block. The payload is always assembled from static
 * site content in `lib/seo.ts` — no user input is ever interpolated here.
 */
export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return (
    <script
      type="application/ld+json"
      // Escaping `<` prevents a stray sequence from closing the script element early.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, '\\u003c') }}
    />
  )
}
