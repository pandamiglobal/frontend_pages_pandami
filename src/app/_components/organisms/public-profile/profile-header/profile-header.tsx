'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { MapPin, ExternalLink, Clock } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

interface ProfileHeaderProps {
  profile: IPublicProfileFullResponse
  formattedPhone: string
  locationUrl?: string
  openHours?: string
  openHoursDetails?: string
  businessStatus?: 'open' | 'closed' | 'no-hours'
}

/**
 * Profile header component for public view
 * Inspired by SaaS MySiteProfileHeader with dark theme
 * Displays profile image, name, bio, smart opening hours, and location
 */
export function ProfileHeader({ 
  profile, 
  formattedPhone, 
  locationUrl,
  openHours = 'Horários não informados',
  openHoursDetails,
  businessStatus = 'no-hours'
}: ProfileHeaderProps) {
  // Check if profile has image
  const hasProfileImage = Boolean(profile.public_profile_image?.file_name)
  const profileImageUrl = hasProfileImage
    ? `${process.env.NEXT_PUBLIC_SAAS_API_URL}/storage/${profile.public_profile_image.file_name}`
    : null

  // Get first letter of name for fallback
  const firstLetter = profile.name.charAt(0).toUpperCase()

  // Build location string
  const location = [profile.city, profile.state].filter(Boolean).join(', ')

  return (
		<header className="bg-neutral-950 px-6 pt-6 pb-6 rounded-xl">
			<div className="flex flex-col items-center text-center">
				{/* Avatar */}
				<div className="relative mb-4">
					<div className="relative w-24 h-24 rounded-full border-4 border-neutral-800 shadow-lg overflow-hidden bg-neutral-800">
						{hasProfileImage && profileImageUrl ? (
							<Image
								src={profileImageUrl}
								alt={profile.name}
								fill
								className="object-cover"
								sizes="96px"
								priority
							/>
						) : (
							<div className="w-full h-full bg-neutral-700 flex items-center justify-center">
								<span className="text-3xl font-medium text-white">
									{firstLetter}
								</span>
							</div>
						)}
					</div>
				</div>

				{/* Name */}
				<div className="flex items-center gap-2 mb-1">
					<h1 className="text-xl font-semibold text-white">{profile.name}</h1>
				</div>

				{/* Business Name */}
				{profile.business_name && (
					<p className="text-sm text-neutral-400 mb-3">
						{profile.business_name}
					</p>
				)}

				{/* Bio */}
				{profile.bio && (
					<p className="text-sm text-neutral-300 mb-4 leading-relaxed max-w-[320px]">
						{profile.bio}
					</p>
				)}

				{/* Smart Opening Hours */}
				<div className="flex flex-col items-center gap-1 mb-2">
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4 text-neutral-400" aria-hidden="true" />
						<div className="flex items-center gap-2">
							<span
								className={`text-sm font-medium ${
									businessStatus === "open"
										? "text-green-400"
										: businessStatus === "closed"
										? "text-yellow-400"
										: "text-red-400"
								}`}
							>
								{openHours}
							</span>
							<div
								className={`w-2 h-2 rounded-full ${
									businessStatus === "open"
										? "bg-green-500"
										: businessStatus === "closed"
										? "bg-yellow-500"
										: "bg-red-500"
								}`}
								aria-label={
									businessStatus === "open"
										? "Aberto agora"
										: businessStatus === "closed"
										? "Fechado"
										: "Horários não informados"
								}
							/>
						</div>
					</div>
					{openHoursDetails && (
						<time className="text-xs text-neutral-400">{openHoursDetails}</time>
					)}
				</div>

				{/* Location */}
				{location && (
					<address className="flex items-center gap-2 text-sm text-neutral-300 not-italic">
						<MapPin className="w-4 h-4 text-neutral-400" aria-hidden="true" />
						<span>{location}</span>
					</address>
				)}

				{/* View Location Button */}
				{locationUrl && (
					<Link
						href={locationUrl}
						target="_blank"
						rel="noopener noreferrer"
						className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-neutral-800 hover:bg-neutral-700 text-white text-sm font-medium transition-colors"
					>
						Ver localização no Maps
						<ExternalLink className="w-4 h-4" />
					</Link>
				)}
			</div>
		</header>
	);
}
