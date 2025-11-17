'use client'

import { Instagram, Linkedin, MessageCircle } from 'lucide-react'
import { ExternalLink } from 'lucide-react'

interface SocialLinksProps {
  instagram?: string
  whatsapp?: string
  tiktok?: string
  linkedin?: string
}

/**
 * Social links component for public view
 * Displays social media links with platform icons and safe external links
 * No edit/delete buttons - read-only display
 */
export function SocialLinks({ instagram, whatsapp, tiktok, linkedin }: SocialLinksProps) {
  const links = [
    {
      name: 'Instagram',
      url: instagram,
      icon: Instagram,
      color: 'text-pink-600',
      bgColor: 'bg-pink-50 hover:bg-pink-100',
    },
    {
      name: 'WhatsApp',
      url: whatsapp,
      icon: MessageCircle,
      color: 'text-green-600',
      bgColor: 'bg-green-50 hover:bg-green-100',
    },
    {
      name: 'TikTok',
      url: tiktok,
      icon: ExternalLink,
      color: 'text-black',
      bgColor: 'bg-gray-50 hover:bg-gray-100',
    },
    {
      name: 'LinkedIn',
      url: linkedin,
      icon: Linkedin,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50 hover:bg-blue-100',
    },
  ].filter(link => link.url) // Only show links that exist

  if (links.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Nenhuma rede social disponível.</p>
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

  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
      {links.map((link) => {
        const Icon = link.icon
        const safeUrl = sanitizeUrl(link.url!)

        return (
          <a
            key={link.name}
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={`flex flex-col items-center justify-center p-4 rounded-lg border border-gray-200 transition-colors ${link.bgColor}`}
          >
            <Icon className={`w-6 h-6 mb-2 ${link.color}`} />
            <span className="text-sm font-medium text-gray-900">{link.name}</span>
          </a>
        )
      })}
    </div>
  )
}
