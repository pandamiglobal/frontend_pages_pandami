'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Clock, MapPin, Star, ExternalLink, Pencil, BadgeCheck } from 'lucide-react'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import { MySiteProfileHeaderProps } from './my-site-profile-header.types'
import { UserProfileAvatar } from '@/app/_components/molecules/user-profile-avatar'

export function MySiteProfileHeader({
	name,
	isVerified,
	bio,
	rating,
	reviewsCount,
	openHours,
	openHoursDetails,
	businessStatus,
	location,
	locationUrl,
	profileImageName,
	onEditProfile,
    isEditable = true,
    onChangeProfileImage,
    onOpenProfileImageModal
}: MySiteProfileHeaderProps) {
	const fileInputRef = useRef<HTMLInputElement | null>(null)

	return (
		<header className="bg-neutral-950 px-6 pt-20 pb-6">
			<div className="flex flex-col items-center text-center">
				{/* Avatar with edit overlay */}
				<div className="relative group mb-4">
                    <UserProfileAvatar name={name} profileImageName={profileImageName} className="w-24 h-24" />
                    {isEditable && (
                        <div
                            className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
                            onClick={() => onOpenProfileImageModal?.()}
                            aria-label="Editar foto de perfil"
                        >
                            <Pencil className="w-5 h-5 text-white" />
                        </div>
                    )}
				</div>

				{/* Name with edit button */}
				<div className="flex items-center gap-2 mb-1">
					<h1 className="text-xl font-semibold text-white">{name}</h1>
					{isEditable && (
						<button
							onClick={onEditProfile}
							className="p-1 text-neutral-400 hover:text-white transition-colors"
							aria-label="Editar perfil"
						>
							<Pencil className="w-4 h-4" />
						</button>
					)}
				</div>

				{/* Verified badge */}
				{isVerified && (
					<div className="flex items-center gap-1 mb-3">
						<span className="text-sm text-neutral-300">Profissional Verificado</span>
						<BadgeCheck className="w-5 h-5 text-green-500" />
					</div>
				)}

				{/* Bio */}
				{bio && (
					<p className="text-sm text-neutral-300 mb-4 leading-relaxed max-w-[320px]">
						{bio}
					</p>
				)}

				{/* Smart Opening Hours */}
				<div className="flex flex-col items-center gap-1 mb-2">
					<div className="flex items-center gap-2">
						<Clock className="w-4 h-4 text-neutral-400" aria-hidden="true" />
						<div className="flex items-center gap-2">
							<span 
								className={`text-sm font-medium ${
									businessStatus === 'open' 
										? 'text-green-400' 
										: businessStatus === 'closed' 
										? 'text-yellow-400'
										: 'text-red-400'
								}`}
							>
								{openHours}
							</span>
							<div 
								className={`w-2 h-2 rounded-full ${
									businessStatus === 'open' 
										? 'bg-green-500' 
										: businessStatus === 'closed' 
										? 'bg-yellow-500'
										: 'bg-red-500'
								}`}
								aria-label={
									businessStatus === 'open' 
										? 'Aberto agora' 
										: businessStatus === 'closed' 
										? 'Fechado' 
										: 'Horários não informados'
								}
							/>
						</div>
					</div>
					{openHoursDetails && (
						<time className="text-xs text-neutral-400">
							{openHoursDetails}
						</time>
					)}
				</div>

				{/* Location */}
				<address className="flex items-center gap-2 text-sm text-neutral-300 mb-6 not-italic">
					<MapPin className="w-4 h-4 text-neutral-400" aria-hidden="true" />
					<span>{location}</span>
					{locationUrl && (() => {
						const googleMapsLink = locationUrl
						return (
							<Link 
								href={googleMapsLink}
								target="_blank"
								rel="noopener noreferrer"
								className="text-neutral-400 hover:text-neutral-200 transition-colors"
								aria-label="Ver localização no mapa"
							>
								<ExternalLink className="w-4 h-4 text-neutral-400" />
							</Link>
						)
					})()}
				</address>

			</div>
		</header>
	)
}
