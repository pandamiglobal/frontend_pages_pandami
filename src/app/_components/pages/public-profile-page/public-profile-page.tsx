'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { usePublicProfilePageModel } from './public-profile-page.model'
import { PublicProfilePageView } from './public-profile-page.view'

interface PublicProfilePageProps {
  initialData: IPublicProfileFullResponse | null
  slug: string
  error?: string
}

/**
 * Controller component for PublicProfilePage
 * Orchestrates Model and View layers following MVC pattern
 */
export function PublicProfilePage({ initialData, slug, error: initialError }: PublicProfilePageProps) {
  // Use model layer for data management
  const model = usePublicProfilePageModel(slug, initialData)

  // Handle error states at controller level
  const error = model.error || (initialError ? new Error(initialError) : null)

  // Pass data and handlers to view
  return (
    <PublicProfilePageView
      profile={model.profile}
      isLoading={model.isLoading}
      error={error}
      viewModel={model}
    />
  )
}
