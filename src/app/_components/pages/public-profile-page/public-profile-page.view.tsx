'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { usePublicProfileViewModel } from '@/common/hooks/use-public-profile'
import { ProfileHeaderWrapper } from '../../organisms/public-profile/wrappers/profile-header-wrapper'
import { ServicesSectionWrapper } from '../../organisms/public-profile/wrappers/services-section-wrapper'
import { InformationSectionWrapper } from '../../organisms/public-profile/wrappers/information-section-wrapper'

interface PublicProfilePageViewProps {
  initialData: IPublicProfileFullResponse | null
  slug: string
  error?: string
}

/**
 * Main client view component for public profile page
 * Reuses SaaS MySitePageView card layout patterns but rendered as single-page layout
 * No tab navigation, all sections/cards stacked on same page, no editing/settings UI
 */
export function PublicProfilePageView({ initialData, slug, error: initialError }: PublicProfilePageViewProps) {
  // Use SWR hook with initial data for optimal performance
  const viewModel = usePublicProfileViewModel(slug, {
    fallbackData: initialData || undefined,
  })

  const { profile, isLoading, error } = viewModel

  // Handle error states
  if (error || initialError) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <h2 className="text-xl font-semibold text-red-800 mb-2">
              Erro ao carregar perfil
            </h2>
            <p className="text-red-600">
              {error?.message || initialError || 'Ocorreu um erro ao carregar o perfil.'}
            </p>
          </div>
        </div>
      </div>
    )
  }

  // Handle loading state
  if (isLoading || !profile) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Loading skeleton */}
          <div className="animate-pulse">
            <div className="h-48 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-32 bg-gray-200 rounded-lg mb-6"></div>
            <div className="h-64 bg-gray-200 rounded-lg"></div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Profile Header Section */}
        <ProfileHeaderWrapper profile={profile} viewModel={viewModel} />

        {/* Services Section */}
        {viewModel.hasServices && (
          <ServicesSectionWrapper profile={profile} viewModel={viewModel} />
        )}

        {/* Information Section (Business Hours, Contact, Address, Payment Methods) */}
        <InformationSectionWrapper profile={profile} viewModel={viewModel} />
      </div>
    </div>
  )
}
