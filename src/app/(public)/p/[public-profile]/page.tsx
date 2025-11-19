import { notFound } from 'next/navigation'
import { GetPublicProfileBySlugAction } from '@/server/actions/get-public-profile.action'
import { PublicProfilePage } from '@/app/_components/pages/public-profile-page/public-profile-page'
import { PublicProfileErrorState } from '@/app/_components/pages/public-profile-page/public-profile-error-state'
import { PublicProfileSeoHelper } from '@/lib/utils/seo-helper'
import { isValidSlug } from '@/lib/utils/public-profile-helpers'
import { Metadata } from 'next'
import { PublicProfileErrorType } from '@/common/types/IPublicProfile'

interface PublicProfilePageProps {
  params: Promise<{
    'public-profile': string
  }>
}

/**
 * Server component for public profile page
 * Resolves slug, calls server action, and passes data to client view component
 */
export default async function PublicProfilePageRoute({ params }: PublicProfilePageProps) {
  const { 'public-profile': slug } = await params

  // Validate slug format strictly before API call
  // This prevents unnecessary requests for invalid URLs (e.g. containing @)
  if (!isValidSlug(slug)) {
    return <PublicProfileErrorState type="invalid_slug" />
  }

  // Fetch profile data using server action (returns structured result)
  const result = await GetPublicProfileBySlugAction(slug)

  // Handle error cases with structured error response
  if (!result.success) {
    const { error } = result

    // NOT_FOUND errors should use Next.js notFound() for proper 404 handling
    if (error.type === PublicProfileErrorType.NOT_FOUND) {
      notFound()
    }

    // For other errors, pass to client component for retry functionality
    return <PublicProfilePage 
      initialData={null} 
      slug={slug} 
      error={error.message}
      errorType={error.type}
      retryable={error.retryable}
    />
  }

  // Success case: pass data to client component
  return <PublicProfilePage initialData={result.data} slug={slug} />
}

/**
 * Generate metadata for SEO
 * Uses PublicProfileSeoHelper for standardized metadata generation
 */
export async function generateMetadata({ params }: PublicProfilePageProps): Promise<Metadata> {
  const { 'public-profile': slug } = await params

  // Validate slug format before API call
  if (!isValidSlug(slug)) {
    return {
      title: 'Busca inválida | Pandami',
      description: 'O termo pesquisado contém caracteres inválidos.',
    }
  }

  const result = await GetPublicProfileBySlugAction(slug)

  // Handle error cases
  if (!result.success) {
    return {
      title: 'Perfil não encontrado | Pandami',
      description: 'O perfil que você está procurando não foi encontrado.',
    }
  }

  // Success case: generate metadata
  return PublicProfileSeoHelper.generateMetadata({
    profile: result.data,
    profession: 'Cabeleireiro' // Hardcoded as per requirement, could be dynamic in future
  })
}
