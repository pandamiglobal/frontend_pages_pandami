import { notFound } from 'next/navigation'
import { GetPublicProfileBySlugAction } from '@/server/actions/get-public-profile.action'
import { PublicProfilePageView } from '@/app/_components/pages/public-profile/public-profile-page'

interface PublicProfilePageProps {
  params: {
    'public-profile': string
  }
}

/**
 * Server component for public profile page
 * Resolves slug, calls server action, and passes data to client view component
 */
export default async function PublicProfilePage({ params }: PublicProfilePageProps) {
  const { 'public-profile': slug } = params

  try {
    // Validate slug format
    if (!slug || typeof slug !== 'string') {
      notFound()
    }

    // Validate slug according to API contract
    if (!/^[a-z0-9-]+$/.test(slug) || slug.length < 3 || slug.length > 50) {
      notFound()
    }

    // Fetch profile data using server action
    const profileData = await GetPublicProfileBySlugAction(slug)

    // Pass data to client component for interactive features
    return <PublicProfilePageView initialData={profileData} slug={slug} />
  } catch (error: any) {
    // Handle specific error cases
    if (error.message.includes('PROFILE_NOT_FOUND') || 
        error.message.includes('VALIDATION_ERROR')) {
      notFound()
    }

    // For other errors, let the client component handle them
    // This allows for retry functionality and better UX
    return <PublicProfilePageView initialData={null} slug={slug} error={error.message} />
  }
}

/**
 * Generate metadata for SEO (optional enhancement)
 */
export async function generateMetadata({ params }: PublicProfilePageProps) {
  const slug = params['public-profile']

  try {
    const profileData = await GetPublicProfileBySlugAction(slug)
    
    return {
      title: `${profileData.name} - Profissional | Pandami`,
      description: profileData.bio || `Conheça ${profileData.name}, profissional em ${profileData.city}, ${profileData.state}`,
      openGraph: {
        title: profileData.name,
        description: profileData.bio || `Profissional em ${profileData.city}, ${profileData.state}`,
        type: 'profile',
      },
    }
  } catch {
    // Fallback metadata for error cases
    return {
      title: 'Perfil não encontrado | Pandami',
      description: 'O perfil que você está procurando não foi encontrado.',
    }
  }
}
