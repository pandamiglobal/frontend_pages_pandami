'use client'

import Image from 'next/image'
import Link from 'next/link'

interface SocialLinksProps {
  instagram?: string
  whatsapp?: string
  tiktok?: string
  linkedin?: string
}

type SocialPlatform = 'instagram' | 'whatsapp' | 'tiktok' | 'linkedin'

/**
 * Social links component for public view
 * Displays social media links with branded SVG icons
 * Following project pattern with simple-icons style
 */
export function SocialLinks({ instagram, whatsapp, tiktok, linkedin }: SocialLinksProps) {
  const getPlatformIcon = (platform: SocialPlatform): string => {
    return `/svg/branded-social-media/social-media-${platform}.svg`
  }

  const formatPlatformLabel = (platform: string): string => {
    if (platform === 'linkedin') return 'LinkedIn'
    if (platform === 'whatsapp') return 'WhatsApp'
    if (platform === 'tiktok') return 'TikTok'
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  const sanitizeUrl = (url: string): string => {
    try {
      if (!url.startsWith('http://') && !url.startsWith('https://')) {
        return `https://${url}`
      }
      new URL(url)
      return url
    } catch {
      return '#'
    }
  }

  const socialLinks = [
    { platform: 'instagram' as SocialPlatform, url: instagram },
    { platform: 'whatsapp' as SocialPlatform, url: whatsapp },
    { platform: 'tiktok' as SocialPlatform, url: tiktok },
    { platform: 'linkedin' as SocialPlatform, url: linkedin },
  ].filter(link => link.url)

  if (socialLinks.length === 0) {
    return (
      <p className="text-sm text-neutral-600">Nenhuma rede social adicionada.</p>
    )
  }

  return (
    <div className="flex flex-col gap-2">
      {socialLinks.map(({ platform, url }) => (
        <Link
          key={platform}
          href={sanitizeUrl(url!)}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2 hover:bg-neutral-50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <div className="flex items-center justify-center w-5 h-5">
              <Image
                src={getPlatformIcon(platform)}
                alt={formatPlatformLabel(platform)}
                width={20}
                height={20}
                className="w-5 h-5"
              />
            </div>
            <span className="text-sm font-medium text-neutral-900">
              {formatPlatformLabel(platform)}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}
