'use client'

import { usePublicProfileViewModel } from '@/common/hooks/use-public-profile'
import { UsePublicProfileConfig } from '@/common/types/IPublicProfile'

/**
 * Model layer for PublicProfilePage component
 * Handles data fetching and business logic using SWR hook
 */
export function usePublicProfilePageModel(
  slug: string,
  initialData?: any,
  config?: UsePublicProfileConfig
) {
  // Use the view model hook with initial data for SSR optimization
  const viewModel = usePublicProfileViewModel(slug, {
    fallbackData: initialData || undefined,
    ...config,
  })

  return {
    ...viewModel,
    // Additional business logic can be added here
    isReady: !viewModel.isLoading && viewModel.profile !== null,
    hasError: Boolean(viewModel.error),
  }
}
