'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { ServicesList } from '../services-list/services-list'
import { SectionCard } from '../section-card/section-card'

interface ServicesSectionWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: any
}

/**
 * Wrapper for services section in public view
 * Displays services list in read-only mode (no add/edit/delete buttons)
 */
export function ServicesSectionWrapper({ profile, viewModel }: ServicesSectionWrapperProps) {
  return (
    <SectionCard title="Serviços">
      <ServicesList services={profile.services || []} />
    </SectionCard>
  )
}
