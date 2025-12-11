import type { MetadataRoute } from 'next'
import { parseStringPromise } from 'xml2js'

// Ensure Node.js runtime (xml2js relies on Node APIs)
export const runtime = 'nodejs'
// Revalidate daily when running in dynamic contexts (doesn't affect static export)
export const revalidate = 86400

type WpImage = { 'image:loc': string[] }
type WpUrlEntry = {
  loc: string[]
  lastmod: string[]
  'image:image'?: WpImage[]
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Resolve base URL de forma segura para evitar exceções em build/export
  const siteBase = process.env.NEXT_PUBLIC_SITE_URL;

  const apiBase = (process.env.NEXT_BLOG_API_URL || process.env.NEXT_PUBLIC_CMS_URL || '').replace(/\/$/, '')
  const wpSitemapUrl = apiBase ? `${apiBase}/wp-sitemap-posts-post-1.xml` : ''

  let wpUrls: Array<{ url: string; lastModified: string; images: string[] }> = []

  try {
    if (wpSitemapUrl) {
      const response = await fetch(wpSitemapUrl)
      if (!response.ok) throw new Error(`Failed to fetch WP sitemap: ${response.status}`)
      const xmlData = await response.text()

      const trimmedXml = xmlData.trim()

      if (!trimmedXml.includes('<?xml') || !trimmedXml.includes('<urlset')) {
        console.error('Invalid XML response:', xmlData.substring(0, 200)) // Log only first 200 chars
      } else {
        const parsedXml = await parseStringPromise(xmlData, {
          trim: true,
          explicitArray: true,
          normalizeTags: true,
          strict: false // be more lenient with XML parsing
        })

        if (parsedXml?.urlset?.url) {
          wpUrls = (parsedXml.urlset.url as WpUrlEntry[]).map((item) => {
            const images: string[] = []

            const imgArr = Array.isArray(item['image:image']) ? item['image:image'] : []
            imgArr.forEach((image) => {
              if (Array.isArray(image['image:loc'])) images.push(...image['image:loc'])
            })

            return {
              url: item.loc?.[0] || '',
              lastModified: item.lastmod?.[0] || new Date().toISOString(),
              images
            }
          })
        }
      }
    }
  } catch (error) {
    console.error('Erro ao buscar ou parsear o sitemap do WordPress:', error)
  }

  const nextPages: MetadataRoute.Sitemap[number][] = [
    {
      url: `${siteBase}/`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${siteBase}/blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${siteBase}/termos-de-uso`,
      lastModified: new Date('2025-09-19'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${siteBase}/politica-de-privacidade`,
      lastModified: new Date('2025-09-19'),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ]

  // URLs já definidas nas páginas estáticas (para evitar duplicatas)
  const staticUrls = new Set(nextPages.map(p => p.url.replace(/\/$/, '')))

  const wpEntries: MetadataRoute.Sitemap[number][] = wpUrls
    .map(item => {
      // Remove o subdomínio 'cms' e substitui pela URL pública (pandami.com.br)
      let url = item.url.replace(/^https?:\/\/cms\.pandami\.com\.br/, siteBase || 'https://pandami.com.br')
      if (url.startsWith('http://')) {
        url = url.replace('http://', 'https://');
      }

      return {
        url,
        lastModified: item.lastModified,
        changeFrequency: 'monthly' as const,
        priority: 0.5,
        images: item.images,
      }
    })
    .filter(entry => !staticUrls.has(entry.url.replace(/\/$/, '')))

  return [...nextPages, ...wpEntries]
}
