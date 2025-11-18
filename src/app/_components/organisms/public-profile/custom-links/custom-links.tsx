'use client'

import { ICustomLink } from '@/common/types/IPublicProfile'
import { ExternalLink } from 'lucide-react'

interface CustomLinksProps {
  links: ICustomLink[]
}

/**
 * Custom links component for public view
 * Respects show_links visibility and URL sanitization
 * Displays custom external links without edit functionality
 */
export function CustomLinks({ links }: CustomLinksProps) {
  // Filter only active links
  const activeLinks = links.filter(link => link.active)

  if (activeLinks.length === 0) {
    return (
      <div className="text-center py-4 text-neutral-500">
        <p>Nenhum link disponível.</p>
      </div>
    )
  }

  // Validate and sanitize URL
  const sanitizeUrl = (url: string): string => {
    try {
      // Ensure URL has protocol
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`
      }
      // Validate URL format
      new URL(url)
      return url
    } catch {
      return '#'
    }
  }

  // Extract domain from URL for display
  const getDomain = (url: string): string => {
    try {
      const urlObj = new URL(sanitizeUrl(url))
      return urlObj.hostname.replace('www.', '')
    } catch {
      return 'Link'
    }
  }

  return (
    <div className="space-y-3">
      {activeLinks.map((link) => {
        const safeUrl = sanitizeUrl(link.url)
        const domain = getDomain(link.url)

        return (
          <a
            key={link.id}
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between p-4 border border-neutral-200 rounded-lg hover:bg-neutral-50 transition-all group"
          >
            <div className="flex-1 min-w-0">
              <h3 className="font-medium text-neutral-900 group-hover:text-primary transition-colors">
                {link.name}
              </h3>
              <p className="text-sm text-neutral-500 truncate">{domain}</p>
            </div>
            <ExternalLink className="w-5 h-5 text-neutral-400 group-hover:text-primary transition-colors flex-shrink-0 ml-3" />
          </a>
        )
      })}
    </div>
  )
}
