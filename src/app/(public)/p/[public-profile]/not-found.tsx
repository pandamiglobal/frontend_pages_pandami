import { PublicProfileErrorState } from '@/app/_components/pages/public-profile-page/public-profile-error-state'

/**
 * Custom not-found page for public profiles
 * Friendly message when profile is not found
 */
export default function PublicProfileNotFound() {
  return <PublicProfileErrorState type="not_found" />
}
