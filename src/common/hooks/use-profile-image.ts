import { useState, useEffect } from 'react'

interface UseProfileImageReturn {
  imageUrl: string | null
  isLoading: boolean
  error: Error | null
}

/**
 * Hook to fetch profile image from API using filename
 * Handles fetching the image blob and converting to an Object URL for display
 * This is useful for handling authenticated images or controlling image loading manually
 */
export function useProfileImage(fileName?: string): UseProfileImageReturn {
  const [imageUrl, setImageUrl] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    let mounted = true
    let objectUrl: string | null = null

    const fetchImage = async () => {
      if (!fileName) {
        setImageUrl(null)
        return
      }

      setIsLoading(true)
      setError(null)

      try {
        // Construct the URL
        const url = `${process.env.NEXT_PUBLIC_SAAS_API_URL}/storage/${fileName}`
        
        // Fetch the image data
        const response = await fetch(url)
        
        if (!response.ok) {
          throw new Error(`Failed to fetch image: ${response.statusText}`)
        }

        // Get blob data
        const blob = await response.blob()
        
        if (mounted) {
          // Create an object URL (more efficient than base64 strings)
          objectUrl = URL.createObjectURL(blob)
          setImageUrl(objectUrl)
        }
      } catch (err) {
        if (mounted) {
          setError(err instanceof Error ? err : new Error('Unknown error loading image'))
          // Fallback: try setting the direct URL if fetch fails (e.g. CORS issues)
          // setImageUrl(`${process.env.NEXT_PUBLIC_SAAS_API_URL}/storage/${fileName}`)
        }
      } finally {
        if (mounted) {
          setIsLoading(false)
        }
      }
    }

    fetchImage()

    // Cleanup function to revoke object URL and avoid memory leaks
    return () => {
      mounted = false
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl)
      }
    }
  }, [fileName])

  return { imageUrl, isLoading, error }
}
