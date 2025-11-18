import { IPublicProfileFullResponse } from "@/common/types/IPublicProfile";
import api from "@/server/services/api";

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
			`/public-profile/public/${slug}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.status === 404) {
      console.log(error.response.data);
			throw new Error("Perfil não encontrado");
		}
		throw new Error("Erro ao carregar perfil público");
	}
}
