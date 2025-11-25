"use client"

import Image from "next/image"
import Link from "next/link"
import { ExternalLink } from "lucide-react"
import { formatPhoneNumber } from "@/lib/utils/public-profile-helpers"

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
    if (platform === "linkedin") return "LinkedIn"
    if (platform === "whatsapp") return "WhatsApp"
    if (platform === "tiktok") return "TikTok"
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  const formatSocialUrl = (platform: SocialPlatform, value: string): string => {
    if (!value) return '#'
    
    const cleanValue = value.trim()

    // If it looks like a full URL, assume it is one and ensure protocol
    if (cleanValue.startsWith('http://') || cleanValue.startsWith('https://')) {
       return cleanValue
    }
    
    // Specific platform handling for handles/usernames/numbers
    switch (platform) {
      case 'whatsapp':
        // Remove all non-digits
        const digits = cleanValue.replace(/\D/g, '')
        return `https://wa.me/${digits}`
      
      case 'instagram':
        // Remove @ and /
        const igHandle = cleanValue.replace(/^[@\/]+/, '')
        return `https://instagram.com/${igHandle}`
        
      case 'tiktok':
        // Ensure it has @
        const tiktokHandle = cleanValue.replace(/^[@\/]+/, '')
        return `https://tiktok.com/@${tiktokHandle}`
        
      case 'linkedin':
        // Assume profile if not full URL
        const linkedinHandle = cleanValue.replace(/^[\/]+/, '')
        return `https://linkedin.com/in/${linkedinHandle}`
        
      default:
         // Fallback to https://{value}
         return `https://${cleanValue}`
    }
  }

  const getDisplayHandle = (platform: SocialPlatform, url: string): string | null => {
    if (!url) return null
    
    // First, get the "full" url to parse it consistently
    const fullUrl = formatSocialUrl(platform, url)
    
    try {
       const parsed = new URL(fullUrl)
       
       if (platform === 'whatsapp') {
          // For whatsapp, we want the phone number formatted
          // path is /55489999...
          const digits = parsed.pathname.replace(/\D/g, '')
          return formatPhoneNumber(digits)
       }
       
       if (platform === 'linkedin') {
           // /in/username or /company/companyname
           // Just return the last part of the path
           const parts = parsed.pathname.split('/').filter(Boolean)
           return parts.length > 0 ? `/${parts[parts.length - 1]}` : null
       }
       
       // Instagram and TikTok
       // path is /username or /@username
       const path = parsed.pathname.replace(/^\//, '')
       if (!path) return null
       
       // For display, we usually want @username
       const handle = path.replace(/^@/, '')
       return `@${handle}`
       
    } catch {
       return url
    }
  }

  const socialLinks = [
    { platform: "instagram" as SocialPlatform, url: instagram },
    { platform: "whatsapp" as SocialPlatform, url: whatsapp },
    { platform: "tiktok" as SocialPlatform, url: tiktok },
    { platform: "linkedin" as SocialPlatform, url: linkedin },
  ].filter((link) => link.url)

  if (socialLinks.length === 0) {
    return (
      <p className="text-sm text-neutral-600">Nenhuma rede social adicionada.</p>
    )
  }

  return (
    <div className="space-y-2">
      {socialLinks.map(({ platform, url }) => {
        const safeUrl = formatSocialUrl(platform, url!)
        const handle = getDisplayHandle(platform, url!)

        return (
          <Link
            key={platform}
            href={safeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2 hover:bg-neutral-50 transition-colors group"
          >
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex items-center justify-center w-5 h-5 flex-shrink-0">
                <Image
                  src={getPlatformIcon(platform)}
                  alt={formatPlatformLabel(platform)}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <div className="flex flex-col text-left min-w-0">
                <span className="text-sm font-medium text-neutral-900 truncate">
                  {formatPlatformLabel(platform)}
                </span>
                {handle && (
                  <span className="text-xs text-neutral-500 truncate">
                    {handle}
                  </span>
                )}
              </div>
            </div>

            <ExternalLink className="w-4 h-4 text-neutral-400 group-hover:text-neutral-700 transition-colors flex-shrink-0 ml-3" />
          </Link>
        )
      })}
    </div>
  )
}
