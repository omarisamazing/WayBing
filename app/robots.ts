import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Nothing on this site is private, so every crawler gets the whole tree.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // Spelled out for the two engines that read brand queries, plus the
      // answer engines that increasingly surface agency recommendations.
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
    ],
    sitemap: `${SITE.url}/sitemap.xml`,
    host: SITE.url,
  }
}
