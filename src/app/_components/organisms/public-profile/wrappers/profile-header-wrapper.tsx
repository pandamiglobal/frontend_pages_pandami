'use client'

import { IPublicProfileFullResponse, UsePublicProfileViewModelReturn } from '@/common/types/IPublicProfile'
import { ProfileHeader } from '../profile-header/profile-header'

interface ProfileHeaderWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: UsePublicProfileViewModelReturn
}

/**
 * Wrapper for profile header in public view
 * Adapted from SaaS MySiteProfileHeader but read-only (no edit handlers)
 * Uses googleMapsUrl from viewModel (computed by usePublicProfileViewModel hook)
 */
export function ProfileHeaderWrapper({ profile, viewModel }: ProfileHeaderWrapperProps) {
  return (
    <ProfileHeader
      profile={profile}
      formattedPhone={viewModel.formattedPhone}
      locationUrl={viewModel.googleMapsUrl}
      openHours={viewModel.openHours}
      openHoursDetails={viewModel.openHoursDetails}
      businessStatus={viewModel.businessStatus}
    />
  )
}
