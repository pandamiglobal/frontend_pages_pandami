'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { MapPin, Phone, Briefcase } from 'lucide-react'
import Image from 'next/image'

interface ProfileHeaderProps {
  profile: IPublicProfileFullResponse
  formattedPhone: string
}

/**
 * Profile header component for public view
 * Mapped from SaaS MySiteProfileHeader but with isEditable hardcoded to false
 * Displays profile image, name, bio, and basic info
 */
export function ProfileHeader({ profile, formattedPhone }: ProfileHeaderProps) {
  // Construct profile image URL
  const profileImageUrl = profile.public_profile_image?.file_name
    ? `${process.env.NEXT_SAAS_API_URL}/storage/${profile.public_profile_image.file_name}`
    : '/images/default-profile.png'

  return (
    <div className="relative">
      {/* Header Background */}
      <div className="h-32 bg-gradient-to-r from-purple-500 to-pink-500"></div>

      {/* Profile Content */}
      <div className="px-6 pb-6">
        {/* Profile Image */}
        <div className="relative -mt-16 mb-4">
          <div className="relative w-32 h-32 rounded-full border-4 border-white shadow-lg overflow-hidden bg-gray-100">
            <Image
              src={profileImageUrl}
              alt={profile.name}
              fill
              className="object-cover"
              sizes="128px"
              priority
            />
          </div>
        </div>

        {/* Profile Info */}
        <div className="space-y-3">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">{profile.name}</h1>
            {profile.business_name && (
              <p className="text-lg text-gray-600 mt-1">{profile.business_name}</p>
            )}
          </div>

          {profile.bio && (
            <p className="text-gray-700 leading-relaxed">{profile.bio}</p>
          )}

          {/* Quick Info */}
          <div className="flex flex-wrap gap-4 pt-2">
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span className="text-sm">{profile.city}, {profile.state}</span>
            </div>

            {profile.show_phone && formattedPhone && (
              <div className="flex items-center gap-2 text-gray-600">
                <Phone className="w-4 h-4" />
                <span className="text-sm">{formattedPhone}</span>
              </div>
            )}

            {profile.business_name && (
              <div className="flex items-center gap-2 text-gray-600">
                <Briefcase className="w-4 h-4" />
                <span className="text-sm">Profissional</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
