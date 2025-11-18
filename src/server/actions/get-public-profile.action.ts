'use server'

import { IPublicProfileFullResponse } from "@/common/types/IPublicProfile";
import { getPublicProfileBySlug } from "@/server/services/public-profile/get-public-profile-by-slug";

export async function GetPublicProfileBySlugAction(slug: string): Promise<IPublicProfileFullResponse> {
  return await getPublicProfileBySlug(slug);
}
