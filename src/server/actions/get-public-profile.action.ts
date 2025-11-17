'use server'

import { IPublicProfileFullResponse } from "@/common/types/types/IPublicProfile";
import { getPublicProfileBySlug } from "../services/public-profile/get-public-profile-by-slug";

/**
 * Server action to fetch public profile by slug
 * 
 * This action is called from client components via SWR hook
 * and provides a clean interface for fetching profile data.
 * 
 * @param slug - Profile slug identifier
 * @returns Public profile data
 * @throws Error with specific error types for different failure scenarios
 */
export async function GetPublicProfileBySlugAction(slug: string): Promise<IPublicProfileFullResponse> {
  return await getPublicProfileBySlug(slug);
}
