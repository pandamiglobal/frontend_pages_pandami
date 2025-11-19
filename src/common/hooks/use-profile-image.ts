import { useState, useEffect } from 'react'
import { SelectPublicProfileAvatarAction } from '@/server/actions/select-public-profile-avatar.action'

interface UseProfileImageReturn {
  imageUrl: string | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to fetch profile image using the server action
 * Handles fetching the image data (base64) and displaying it
 */
export function useProfileImage(fileName?: string): UseProfileImageReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true

    const fetchImage = async () => {
      if (!fileName) {
        setImageUrl(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        const response = await SelectPublicProfileAvatarAction(fileName)
        
        if (mounted) {
          if ('error' in response) {
            throw new Error(response.message)
          }

          // Assuming response.avatar is the image data (base64 or url)
          let avatarSrc = response.avatar
          
          // Add data URI prefix if it's a raw base64 string
          if (avatarSrc && !avatarSrc.startsWith('http') && !avatarSrc.startsWith('data:')) {
            avatarSrc = `data:image/png;base64,${avatarSrc}`
          }
          
          setImageUrl(avatarSrc)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error loading image'))
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchImage()

    return () => {
      mounted = false
    }
  }, [fileName])

  return { imageUrl, isLoading, error }
}
