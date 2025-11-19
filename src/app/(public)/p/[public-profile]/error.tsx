'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { PublicProfileErrorState } from '@/app/_components/pages/public-profile-page/public-profile-error-state'

/**
 * Error boundary for public profile page
 * Shows error UI with retry functionality for API failures
 */
export default function PublicProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log error to monitoring service in production
    console.error('Public profile error:', error)
  }, [error])

  const handleRetry = () => {
    // Reset the error boundary
    reset()
    // Also clear SWR cache and retry
    router.refresh()
  }

  return (
    <PublicProfileErrorState 
      type="generic_error" 
      message={error.message} 
      onRetry={handleRetry} 
    />
  )
}
