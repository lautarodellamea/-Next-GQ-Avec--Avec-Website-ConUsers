// TODO: Modificar la URL, prioridad, frecuencia de actualización y ultima modificación

import { siteConfig } from '@/config'
import type { MetadataRoute } from 'next'



export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteConfig.url}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `${siteConfig.url}/cerokm`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/usados`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/postventa`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
    {
      url: `${siteConfig.url}/nosotros`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${siteConfig.url}/contacto`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.5,
    },
  ]
}

