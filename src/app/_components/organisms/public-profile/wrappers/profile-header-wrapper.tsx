'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { ProfileHeader } from '../profile-header/profile-header'

interface ProfileHeaderWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: any
}

/**
 * Generate Google Maps link from address
 */
function generateGoogleMapsLink(profile: IPublicProfileFullResponse): string {
  if (!profile.show_address) return ''
  
  const parts: string[] = []
  
  if (profile.street) parts.push(profile.street)
  if (profile.address_number) parts.push(profile.address_number)
  if (profile.postal_code) parts.push(profile.postal_code)
  if (profile.city) parts.push(profile.city)
  if (profile.state) parts.push(profile.state)
  
  if (parts.length === 0) return ''
  
  const query = encodeURIComponent(parts.join(', '))
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

/**
 * Wrapper for profile header in public view
 * Adapted from SaaS MySiteProfileHeader but read-only (no edit handlers)
 */
export function ProfileHeaderWrapper({ profile, viewModel }: ProfileHeaderWrapperProps) {
  const locationUrl = generateGoogleMapsLink(profile)
  
  return (
    <ProfileHeader
      profile={profile}
      formattedPhone={viewModel.formattedPhone}
      locationUrl={locationUrl}
      openHours={viewModel.openHours}
      openHoursDetails={viewModel.openHoursDetails}
      businessStatus={viewModel.businessStatus}
    />
  )
}
