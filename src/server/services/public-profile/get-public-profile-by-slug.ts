import { IPublicProfileFullResponse } from "@/common/types/types/IPublicProfile";
import axios from "axios";

const PANDAMI_API_URL = process.env.PANDAMI_API_URL;

/**
 * Fetches a public profile by slug from the Pandami API
 * 
 * @param slug - Profile slug identifier
 * @returns Public profile data
 * @throws Error with specific error types for different failure scenarios
 */
export async function getPublicProfileBySlug(slug: string): Promise<IPublicProfileFullResponse> {
  // Validate slug format
  const slugRegex = /^[a-z0-9-]+$/;
  if (!slug || slug.length < 3 || slug.length > 50 || !slugRegex.test(slug)) {
    throw new Error('VALIDATION_ERROR: Invalid slug format');
  }

  try {
    const response = await axios.get<IPublicProfileFullResponse>(
      `${PANDAMI_API_URL}public-profile/${slug}`,
      {
        timeout: 10000, // 10 second timeout
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    // Validate response data
    if (!response.data || !response.data.id) {
      throw new Error('SERVER_ERROR: Invalid response data');
    }

    return response.data;
  } catch (error: any) {
    // Handle axios errors
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNABORTED' || error.code === 'ETIMEDOUT') {
        throw new Error('TIMEOUT: Request timeout');
      }

      if (error.response) {
        const status = error.response.status;
        
        if (status === 404) {
          throw new Error('PROFILE_NOT_FOUND: Profile not found');
        } else if (status === 400) {
          throw new Error('VALIDATION_ERROR: Invalid request');
        } else if (status >= 500) {
          throw new Error('SERVER_ERROR: Internal server error');
        }
      }

      // Network errors
      if (error.request) {
        throw new Error('NETWORK_ERROR: Network connection failed');
      }
    }

    // Re-throw if already formatted
    if (error.message.includes(':')) {
      throw error;
    }

    // Generic error
    throw new Error('SERVER_ERROR: Failed to fetch profile');
  }
}
