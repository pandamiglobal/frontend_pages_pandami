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

  const sanitizeUrl = (url: string): string => {
    try {
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        return `https://${url}`
      }
      new URL(url)
      return url
    } catch {
      return "#"
    }
  }

  const formatHandle = (platform: SocialPlatform, url: string): string | null => {
    try {
      const safeUrl = sanitizeUrl(url)
      const parsed = new URL(safeUrl)
      const path = parsed.pathname.replace(/\/+$/, "") // remove barra final

      if (!path || path === "/") return null

      // Casos específicos por plataforma
      if (platform === "instagram" || platform === "tiktok") {
        const handle = path.replace(/^\//, "")
        return handle ? `@${handle}` : null
      }

      if (platform === "linkedin") {
        return path // ex: /in/carlosbarber
      }

      if (platform === "whatsapp") {
        // Para WhatsApp, formatar o path numérico como telefone brasileiro
        const digits = path.replace(/\D/g, "")
        if (!digits) return null
        return formatPhoneNumber(digits)
      }

      return path
    } catch {
      return null
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
        const safeUrl = sanitizeUrl(url!)
        const handle = formatHandle(platform, url!)

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
