import type { MetadataRoute } from 'next'
import { parseStringPromise } from 'xml2js'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const wpSitemapUrl = `${process.env.NEXT_PUBLIC_API_URL}post/sitemap` // Altere para a URL correta
  let wpUrls: Array<{ url: string; lastModified: string, images: string[] }> = []
  const publicURL = new URL(process.env.NEXT_PUBLIC_SITE_URL as string);

  try {
    const response = await fetch(wpSitemapUrl)
    const xmlData = await response.text()

    const trimmedXml = xmlData.trim()

    if (!trimmedXml.includes('<?xml') || !trimmedXml.includes('<urlset')) {
      console.error('Invalid XML response:', xmlData.substring(0, 200)) // Log only first 200 chars
      throw new Error('Invalid XML response from WordPress')
    }
    const parsedXml = await parseStringPromise(xmlData, {
      trim: true,
      explicitArray: true,
      normalizeTags: true,
      strict: false // Add this to be more lenient with XML parsing
    })

    if (parsedXml?.urlset?.url) {
      wpUrls = parsedXml.urlset.url.map((item: any) => {
        const images: string[] = [];

        item['image:image'].map((image: { 'image:loc': string[] }) => {
          images.push(...image['image:loc']);
        })

        return {
          url: item.loc[0],
          lastModified: item.lastmod[0],
          images: images
        }
      })
    }
  } catch (error) {
    console.error('Erro ao buscar ou parsear o sitemap do WordPress:', error)
  }

  const nextPages: MetadataRoute.Sitemap[number][] = [
    {
      url: `${publicURL}`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'weekly',
      priority: 1.0,
      // images: [],
    },
    {
      url: `${publicURL}blog`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // images: ['https://seusite.com/image-sobre.jpg'],
    },
    {
      url: `${publicURL}consulta-inpi`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // images: ['https://seusite.com/image-sobre.jpg'],
    },
    {
      url: `${publicURL}registro-de-marca`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // images: ['https://seusite.com/image-sobre.jpg'],
    },
    {
      url: `${publicURL}sobre-nos`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.8,
      // images: ['https://seusite.com/image-sobre.jpg'],
    },
  ]

  const wpEntries: MetadataRoute.Sitemap[number][] = wpUrls.map(item => {
    const regex = new RegExp(`^https?:\/\/(www\.)?${process.env.POST_SITEMAP_DOMAIN}\/`);
    let url = item.url.replace(regex, `${process.env.NEXT_PUBLIC_SITE_URL as string}`);
    if (url.startsWith('http://')) {
      url = url.replace('http://', 'https://');
    }

    return {
      url,
      lastModified: item.lastModified,
      changeFrequency: 'weekly',
      priority: 0.5,
      images: item.images,
    }
  })

  const combinedSitemap: MetadataRoute.Sitemap = [
    ...nextPages,
    ...wpEntries,
  ]

  return combinedSitemap
}
