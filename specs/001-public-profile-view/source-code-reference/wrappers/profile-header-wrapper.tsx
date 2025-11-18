'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { MySiteProfileHeader } from '@/app/_components/organisms/my-site/my-site-profile-header/my-site-profile-header'
import { MySiteProfileHeaderSkeleton } from '@/app/_components/organisms/my-site/my-site-profile-header/my-site-profile-header-skeleton'

export function ProfileHeaderWrapper({ model }: { model: IMySitePageModel }) {
  if (model.isLoadingProfile) {
    return <MySiteProfileHeaderSkeleton />
  }

  return (
    <MySiteProfileHeader
      name={model.name}
      isVerified={model.isVerified}
      bio={model.bio}
      rating={model.rating}
      reviewsCount={model.reviewsCount}
      openHours={model.openHours}
      openHoursDetails={model.openHoursDetails}
      businessStatus={model.businessStatus}
      location={model.location}
      locationUrl={model.locationUrl}
      profileImageName={model.profileImageName}
      onEditProfile={model.handleEditProfile}
      isEditable={model.isEditable}
      onOpenProfileImageModal={() => model.setModalState('editProfileImage', true)}
    />
  )
}