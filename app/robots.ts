import type { MetadataRoute } from 'next'
import { SITE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  // Ensure no leading/trailing newline characters break the output line
  const baseUrl = SITE.url.trim()

  return {
    rules: [
      // Nothing on this site is private, so every crawler gets the whole tree.
      { userAgent: '*', allow: '/', disallow: ['/api/'] },
      // Spelled out for engines that read brand queries / answer engines
      { userAgent: 'Googlebot', allow: '/' },
      { userAgent: 'Bingbot', allow: '/' },
      { userAgent: 'GPTBot', allow: '/' },
      { userAgent: 'PerplexityBot', allow: '/' },
      { userAgent: 'ClaudeBot', allow: '/' },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
