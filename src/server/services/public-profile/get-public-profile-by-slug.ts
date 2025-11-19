import { 
	IPublicProfileFullResponse, 
	GetPublicProfileResult,
	PublicProfileErrorType 
} from "@/common/types/IPublicProfile";
import api from "@/server/services/api";

/**
 * Fetches a public profile by slug from the Pandami API
 * Returns a structured result instead of throwing errors for safe serialization in production
 * 
 * @param slug - Profile slug identifier
 * @returns Structured result with success/error state
 */
export async function getPublicProfileBySlug(
	slug: string
): Promise<GetPublicProfileResult> {
	try {
		const response = await api.get<IPublicProfileFullResponse>(
			`/public-profile/${slug}`
		);
		
		return {
			success: true,
			data: response.data
		};
	} catch (error: any) {
		// Handle specific error cases with structured error responses
		if (error.response?.status === 500) {
			return {
				success: false,
				error: {
					type: PublicProfileErrorType.SERVER_ERROR,
					message:
						"Desculpe, o perfil que você está procurando não existe ou foi removido. Verifique o endereço digitado! ",
					retryable: true,
				},
			};
		}
		
		if (error.response?.status === 404) {
			return {
				success: false,
				error: {
					type: PublicProfileErrorType.NOT_FOUND,
					message:
						"Desculpe, estamos enfrentando instabilidade no momento. Tente novamente mais tarde!",
					retryable: false,
				},
			};
		}
		
		// Generic network/unknown errors
		return {
			success: false,
			error: {
				type: PublicProfileErrorType.NETWORK_ERROR,
				message: "Erro ao carregar perfil. Verifique sua conexão e tente novamente.",
				retryable: true
			}
		};
	}
}
