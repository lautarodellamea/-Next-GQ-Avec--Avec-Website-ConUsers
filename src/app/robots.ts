import { siteConfig } from '@/config'
import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ["/gracias", "/privacy"],
    },
    sitemap: `${siteConfig.url}/sitemap.xml`,
  }
}

