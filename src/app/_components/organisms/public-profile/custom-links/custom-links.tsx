'use client'

import { ICustomLink } from '@/common/types/IPublicProfile'
import { ExternalLink } from 'lucide-react'
import { useMemo } from 'react'

interface CustomLinksProps {
  links: ICustomLink[]
}

/**
 * Custom links component for public profile view
 * Displays active external links with URL sanitization and security
 * Follows project design patterns for consistent UI/UX
 */
export function CustomLinks({ links }: CustomLinksProps) {
  // Memoize active links filtering for performance
  const activeLinks = useMemo(() => {
    if (!links || !Array.isArray(links)) return []
    return links.filter(link => link?.active && link?.url && link?.name)
  }, [links])

  // Memoize URL utilities for performance
  const urlUtils = useMemo(() => {
    const sanitizeUrl = (url: string): string => {
      if (!url || typeof url !== 'string') return '#'
      
      try {
        const trimmedUrl = url.trim()
        if (!trimmedUrl) return '#'
        
        // Add protocol if missing
        const urlWithProtocol = trimmedUrl.startsWith('http://') || trimmedUrl.startsWith('https://')
          ? trimmedUrl
          : `https://${trimmedUrl}`
        
        // Validate URL format
        const urlObj = new URL(urlWithProtocol)
        
        // Security: Only allow http/https protocols
        if (!['http:', 'https:'].includes(urlObj.protocol)) {
          return '#'
        }
        
        return urlObj.toString()
      } catch {
        return '#'
      }
    }

    const getDomain = (url: string): string => {
      try {
        const sanitizedUrl = sanitizeUrl(url)
        if (sanitizedUrl === '#') return 'Link inválido'
        
        const urlObj = new URL(sanitizedUrl)
        return urlObj.hostname.replace(/^www\./, '')
      } catch {
        return 'Link inválido'
      }
    }

    return { sanitizeUrl, getDomain }
  }, [])

  // Early return for empty state
  if (activeLinks.length === 0) {
    return (
      <div className="text-center py-4 text-neutral-500">
        <p className="text-sm">Nenhum link disponível.</p>
      </div>
    )
  }

  return (
    <div className="space-y-2" role="list" aria-label="Links personalizados">
      {activeLinks.map((link) => {
        const safeUrl = urlUtils.sanitizeUrl(link.url)
        const domain = urlUtils.getDomain(link.url)
        const isValidUrl = safeUrl !== '#'

        return (
          <a
            key={link.id}
            href={isValidUrl ? safeUrl : undefined}
            target={isValidUrl ? "_blank" : undefined}
            rel={isValidUrl ? "noopener noreferrer" : undefined}
            className={`flex items-center justify-between rounded border border-neutral-200 px-3 py-2 transition-colors group ${
              isValidUrl 
                ? 'hover:bg-neutral-50 cursor-pointer' 
                : 'cursor-not-allowed opacity-60'
            }`}
            role="listitem"
            aria-label={`${link.name} - ${domain}`}
            onClick={!isValidUrl ? (e) => e.preventDefault() : undefined}
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                <ExternalLink 
                  className={`w-4 h-4 ${
                    isValidUrl ? 'text-neutral-500' : 'text-neutral-300'
                  }`} 
                  aria-hidden="true"
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className={`text-sm font-medium truncate ${
                  isValidUrl ? 'text-neutral-900' : 'text-neutral-500'
                }`}>
                  {link.name}
                </span>
                <span className="text-xs text-neutral-500 truncate">
                  {domain}
                </span>
              </div>
            </div>

            <ExternalLink 
              className={`w-4 h-4 transition-colors flex-shrink-0 ml-3 ${
                isValidUrl 
                  ? 'text-neutral-400 group-hover:text-neutral-700' 
                  : 'text-neutral-300'
              }`}
              aria-hidden="true"
            />
          </a>
        )
      })}
    </div>
  )
}
