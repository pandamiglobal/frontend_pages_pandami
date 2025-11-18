import { notFound } from 'next/navigation'
import { GetPublicProfileBySlugAction } from '@/server/actions/get-public-profile.action'
import { PublicProfilePage } from '@/app/_components/pages/public-profile-page/public-profile-page'
import { PublicProfileSeoHelper } from '@/lib/utils/seo-helper'
import { isValidSlug } from '@/lib/utils/public-profile-helpers'
import { Metadata } from 'next'

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
    notFound()
  }

  try {
    // Fetch profile data using server action
    const profileData = await GetPublicProfileBySlugAction(slug)

    // Pass data to client component for interactive features
    return <PublicProfilePage initialData={profileData} slug={slug} />
  } catch (error: any) {
    // Handle specific error cases
    const errorMessage = error.message || '';
    
    if (errorMessage.includes('PROFILE_NOT_FOUND') || 
        errorMessage.includes('VALIDATION_ERROR') ||
        errorMessage === 'Perfil não encontrado') {
      notFound()
    }

    // For other errors, let the client component handle them
    // This allows for retry functionality and better UX
    return <PublicProfilePage initialData={null} slug={slug} error={errorMessage} />
  }
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
      title: 'Perfil não encontrado | Pandami',
      description: 'O perfil que você está procurando não foi encontrado.',
    }
  }

  try {
    const profileData = await GetPublicProfileBySlugAction(slug)
    
    return PublicProfileSeoHelper.generateMetadata({
      profile: profileData,
      profession: 'Cabeleireiro' // Hardcoded as per requirement, could be dynamic in future
    })
  } catch {
    // Fallback metadata for error cases
    return {
      title: 'Perfil não encontrado | Pandami',
      description: 'O perfil que você está procurando não foi encontrado.',
    }
  }
}
