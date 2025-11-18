import { IPublicProfileFullResponse } from "@/common/types/IPublicProfile";
import api from "@/server/services/api";
import { logger } from "@/lib/utils/logger";

/**
 * Fetches a public profile by slug from the Pandami API
 * 
 * @param slug - Profile slug identifier
 * @returns Public profile data
 */
export async function getPublicProfileBySlug(
	slug: string
): Promise<IPublicProfileFullResponse> {
	try {
		const response = await api.get<IPublicProfileFullResponse>(
			`/public-profile/${slug}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.status === 404) {
      logger.debug('Profile not found details:', error.response.data);
			throw new Error("Perfil não encontrado");
		}
    
    // Log unexpected errors for debugging
    logger.error('Error in getPublicProfileBySlug:', error);
		throw new Error("Erro ao carregar perfil público");
	}
}
