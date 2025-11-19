'use server'

import { GetPublicProfileResult } from "@/common/types/IPublicProfile";
import { getPublicProfileBySlug } from "@/server/services/public-profile/get-public-profile-by-slug";

/**
 * Server Action to fetch public profile by slug
 * Returns structured result for safe error handling in production
 * 
 * @param slug - Profile slug identifier
 * @returns Structured result with success/error state
 */
export async function GetPublicProfileBySlugAction(slug: string): Promise<GetPublicProfileResult> {
  return await getPublicProfileBySlug(slug);
}
