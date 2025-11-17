'use client'

import { IPublicProfileFullResponse } from '@/common/types/types/IPublicProfile'
import { ServicesList } from '../services-list/services-list'

interface ServicesSectionWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: any
}

/**
 * Wrapper for services section in public view
 * Displays services list in read-only mode (no add/edit/delete buttons)
 */
export function ServicesSectionWrapper({ profile, viewModel }: ServicesSectionWrapperProps) {
  if (!profile.services || profile.services.length === 0) {
    return null
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Serviços</h2>
      <ServicesList services={profile.services} />
    </div>
  )
}
