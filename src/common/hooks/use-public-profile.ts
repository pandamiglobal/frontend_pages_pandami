"use client";

import useSWR from "swr";
import { GetPublicProfileBySlugAction } from "@/server/actions/get-public-profile.action";
import {
	IPublicProfileFullResponse,
	PublicProfileApiError,
	PublicProfileErrorType,
	UsePublicProfileConfig,
	UsePublicProfileReturn,
	UsePublicProfileViewModelReturn,
} from "@/common/types/IPublicProfile";
import { logger } from "@/lib/utils/logger";
import { toast } from "react-toastify";
import {
	transformBusinessHours,
	formatPhoneNumber,
	formatAddress,
	calculatePriceRange,
	buildWhatsAppUrl,
	generateGoogleMapsUrl,
} from "@/lib/utils/public-profile-helpers";
import { PUBLIC_PROFILE_KEYS } from "@/lib/constants/public-profile/swr-keys";

/**
 * Default SWR configuration for public profile fetching
 */
const defaultConfig: UsePublicProfileConfig = {
	revalidateOnFocus: false,
	revalidateOnReconnect: true,
	refreshInterval: 0, // Manual revalidation only
	errorRetryCount: 3,
	errorRetryInterval: 5000,
	dedupingInterval: 60000, // 1 minute
};

/**
 * Fetcher function for SWR
 */
async function fetchPublicProfile(
	slug: string
): Promise<IPublicProfileFullResponse> {
	try {
		const result = await GetPublicProfileBySlugAction(slug);
		return result;
	} catch (error: any) {
		// Criar erro estruturado para o SWR
		const apiError = new PublicProfileApiError(
			error?.message === 'Perfil não encontrado' 
				? PublicProfileErrorType.NOT_FOUND 
				: PublicProfileErrorType.SERVER_ERROR,
			error?.message || 'Erro ao carregar perfil',
			error,
			error?.message !== 'Perfil não encontrado' // Retry apenas se não for 404
		);

		// Log apenas erros não esperados (não 404)
		if (apiError.type !== PublicProfileErrorType.NOT_FOUND) {
			logger.error('Error fetching profile:', error);
		}

		// Lançar erro para o SWR tratar
		throw apiError;
	}
}

/**
 * SWR hook for fetching public profile data
 *
 * @param slug - Profile slug identifier
 * @param config - Optional SWR configuration overrides
 * @returns SWR return object with profile data, loading state, and error handling
 */
export function usePublicProfile(
	slug: string,
	config: UsePublicProfileConfig = {}
): UsePublicProfileReturn {
	const { data, error, isLoading, isValidating, mutate } = useSWR<
		IPublicProfileFullResponse,
		PublicProfileApiError
	>(
		slug ? PUBLIC_PROFILE_KEYS.profile(slug) : null,
		() => fetchPublicProfile(slug),
		{
			...defaultConfig,
			...config,
			// Tratamento de erro integrado
			onError: (error: PublicProfileApiError) => {
				// Toast apenas para erros não esperados (não 404)
				if (error.type !== PublicProfileErrorType.NOT_FOUND) {
					toast.error(error.message);
				}
			},
			// Retry personalizado baseado no tipo de erro
			onErrorRetry: (error: PublicProfileApiError, key, config, revalidate, { retryCount }) => {
				// Não retry para 404
				if (error.type === PublicProfileErrorType.NOT_FOUND) return;
				
				// Não retry se não for retryable
				if (!error.retryable) return;
				
				// Limite de tentativas
				if (retryCount >= 3) return;
				
				// Retry com delay
				setTimeout(() => revalidate({ retryCount }), 5000);
			}
		}
	);

	return {
		data: data || null,
		error: error || null,
		isLoading,
		isValidating,
		mutate,
	};
}

/**
 * Extended hook with computed properties for view components
 */
export function usePublicProfileViewModel(
	slug: string,
	config: UsePublicProfileConfig = {}
): UsePublicProfileViewModelReturn {
	const {
		data: profile,
		error,
		isLoading,
		isValidating,
		mutate,
	} = usePublicProfile(slug, config);

	// Computed properties
	const hasServices = profile?.services ? profile.services.length > 0 : false;
	const hasBusinessHours = profile?.opening_hours
		? profile.opening_hours.length > 0
		: false;
	const hasPaymentMethods = profile?.payment_methods
		? profile.payment_methods.length > 0
		: false;
	const hasSocialLinks = Boolean(
		profile?.instagram_link ||
			profile?.whatsapp_link ||
			profile?.tiktok_link ||
			profile?.linkedin_link
	);
	const hasCustomLinks = profile?.custom_links
		? profile.custom_links.length > 0
		: false;
	const hasAddress = Boolean(
		profile?.show_address && profile?.street && profile?.city && profile?.state
	);

	// Display formatting
	const formattedPhone = profile?.phone ? formatPhoneNumber(profile.phone) : "";
	const formattedAddress =
		profile && profile.show_address ? formatAddress(profile) : "";
	const priceRange = profile?.services
		? calculatePriceRange(profile.services)
		: "";
	const businessHoursDisplay = profile
		? transformBusinessHours(profile)
		: [];

	// WhatsApp integration
	const whatsappUrl = profile?.phone ? buildWhatsAppUrl(profile.phone) : "";
	const canContactViaWhatsApp = Boolean(profile?.phone && profile?.show_phone);

	// Google Maps integration
	// Generate URL if there's address data (city and state are minimum required)
	const googleMapsUrl = profile && (profile.city || profile.state) ? generateGoogleMapsUrl({
		street: profile.street,
		number: profile.address_number,
		city: profile.city,
		state: profile.state,
		zipCode: profile.postal_code,
		country: "Brasil"
	}) : "";
	
	// Only show maps button if show_address is explicitly true (or undefined for backward compatibility)
	const canViewOnMaps = Boolean(
		profile && 
		googleMapsUrl && 
		(profile.show_address === true || profile.show_address === undefined)
	);

	// Calculate smart opening hours using transformed business hours
	const todayHour = businessHoursDisplay.find(h => h.isToday);
	let openHours = 'Horários não informados';
	let openHoursDetails: string | undefined = undefined;
	let businessStatus: 'open' | 'closed' | 'no-hours' = 'no-hours';

	if (businessHoursDisplay.length > 0 && todayHour) {
		openHours = todayHour.day;
		if (todayHour.isOpen) {
			openHoursDetails = `${todayHour.openTime} - ${todayHour.closeTime}`;
			// Check if currently open based on time
			const now = new Date();
			const currentMinutes = now.getHours() * 60 + now.getMinutes();
			
			const [startHour, startMinute] = todayHour.openTime.split(':').map(Number);
			const startMinutes = startHour * 60 + startMinute;
			
			const [endHour, endMinute] = todayHour.closeTime.split(':').map(Number);
			const endMinutes = endHour * 60 + endMinute;

			businessStatus = (currentMinutes >= startMinutes && currentMinutes <= endMinutes) ? 'open' : 'closed';
		} else {
			openHoursDetails = 'Fechado hoje';
			businessStatus = 'closed';
		}
	} else if (businessHoursDisplay.length > 0) {
		// Has business hours but today is not configured
		openHours = 'Fechado hoje';
		openHoursDetails = 'Sem horário configurado para hoje';
		businessStatus = 'closed';
	}

	return {
		// Profile data
		profile,
		data: profile, // For compatibility with UsePublicProfileReturn
		isLoading,
		error,

		// Computed properties
		hasServices,
		hasBusinessHours,
		hasPaymentMethods,
		hasSocialLinks,
		hasCustomLinks,
		hasAddress,

		// Display formatting
		formattedPhone,
		formattedAddress,
		priceRange,
		businessHoursDisplay,

		// Smart opening hours
		openHours,
		openHoursDetails,
		businessStatus,

		// WhatsApp integration
		whatsappUrl,
		canContactViaWhatsApp,

		// Google Maps integration
		googleMapsUrl,
		canViewOnMaps,

		// SWR utilities
		isValidating,
		mutate,
	};
}
