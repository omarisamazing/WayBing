import type { MetadataRoute } from 'next'
import { CASE_STUDIES, POSTS, SERVICES } from '@/lib/content'
import { SITE } from '@/lib/site'

export default function sitemap(): MetadataRoute.Sitemap {
  const url = (path: string) => `${SITE.url}${path}`
  const now = new Date()

  return [
    { url: url('/'), lastModified: now, priority: 1, changeFrequency: 'weekly' },
    { url: url('/services'), lastModified: now, priority: 0.9, changeFrequency: 'monthly' },
    { url: url('/work'), lastModified: now, priority: 0.8, changeFrequency: 'monthly' },
    { url: url('/about'), lastModified: now, priority: 0.6, changeFrequency: 'yearly' },
    { url: url('/blog'), lastModified: now, priority: 0.7, changeFrequency: 'weekly' },
    ...SERVICES.map((s) => ({
      url: url(`/services/${s.slug}`),
      lastModified: now,
      priority: 0.8,
      changeFrequency: 'monthly' as const,
    })),
    ...CASE_STUDIES.map((c) => ({
      url: url(`/work/${c.slug}`),
      lastModified: now,
      priority: 0.6,
      changeFrequency: 'yearly' as const,
    })),
    ...POSTS.map((p) => ({
      url: url(`/blog/${p.slug}`),
      lastModified: new Date(p.date),
      priority: 0.5,
      changeFrequency: 'yearly' as const,
    })),
    { url: url('/privacy'), priority: 0.2, changeFrequency: 'yearly' },
    { url: url('/terms'), priority: 0.2, changeFrequency: 'yearly' },
  ]
}
