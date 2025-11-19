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
			`/public-profile/${slug}`
		);
		return response.data;
	} catch (error: any) {
		if (error.response?.status === 404) {
			throw new Error("Desculpe, esse perfil não foi encontrado");
		} if (error.response?.status === 500) {
			throw new Error("Desculpe esse perfil é inválido ou foi movido");
		}
		throw new Error;
	}
}
