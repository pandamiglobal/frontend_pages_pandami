'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { ProfileHeader } from '../profile-header/profile-header'

interface ProfileHeaderWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: any
}

/**
 * Wrapper for profile header in public view
 * Adapted from SaaS MySiteProfileHeader but read-only (no edit handlers)
 */
export function ProfileHeaderWrapper({ profile, viewModel }: ProfileHeaderWrapperProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <ProfileHeader
        profile={profile}
        formattedPhone={viewModel.formattedPhone}
        formattedAddress={viewModel.formattedAddress}
        isEditable={false}
      />
    </div>
  )
}
