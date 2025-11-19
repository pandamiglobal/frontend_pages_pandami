"use client";

import useSWR from "swr";
import { useMemo } from "react";
import { GetPublicProfileBySlugAction } from "@/server/actions/get-public-profile.action";
import {
	IPublicProfileFullResponse,
	PublicProfileApiError,
	PublicProfileErrorType,
	UsePublicProfileConfig,
	UsePublicProfileReturn,
	UsePublicProfileViewModelReturn,
} from "@/common/types/IPublicProfile";
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
import { useBusinessStatus } from "./use-business-status";

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
 * Processes structured result from Server Action
 */
async function fetchPublicProfile(
	slug: string
): Promise<IPublicProfileFullResponse> {
	const result = await GetPublicProfileBySlugAction(slug);
	
	// Handle structured error response
	if (!result.success) {
		const { error } = result;
		
		// Create structured error for SWR
		const apiError = new PublicProfileApiError(
			error.type,
			error.message,
			error,
			error.retryable
		);
		
		// Throw error for SWR to handle
		throw apiError;
	}
	
	// Return data on success
	return result.data;
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
 * Refactored for SOLID/Clean Code:
 * - Separated concerns (Business status logic moved to useBusinessStatus)
 * - Memoized heavy calculations
 * - Removed hydration mismatch risks
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

	// 1. Computed boolean flags (fast, no memo needed usually, but consistent style)
	const flags = useMemo(() => ({
		hasServices: profile?.services ? profile.services.length > 0 : false,
		hasBusinessHours: profile?.opening_hours ? profile.opening_hours.length > 0 : false,
		hasPaymentMethods: profile?.payment_methods ? profile.payment_methods.length > 0 : false,
		hasSocialLinks: Boolean(
			profile?.instagram_link ||
			profile?.whatsapp_link ||
			profile?.tiktok_link ||
			profile?.linkedin_link
		),
		hasCustomLinks: profile?.custom_links ? profile.custom_links.filter(link => link.active).length > 0 : false,
	}), [profile]);

	// 2. Address logic
	const addressInfo = useMemo(() => {
		// Address visibility (backward compatible: undefined = true)
		const canShowAddress = Boolean(
			profile && (profile.show_address === true || profile.show_address === undefined)
		);
		const hasAddressData = Boolean(
			profile && (profile.street || profile.city || profile.state || profile.postal_code)
		);
		const hasAddress = Boolean(canShowAddress && hasAddressData);
		
		return { canShowAddress, hasAddressData, hasAddress };
	}, [profile]);

	// 3. Formatting (memoized)
	const formattedData = useMemo(() => ({
		formattedPhone: profile?.phone ? formatPhoneNumber(profile.phone) : "",
		formattedAddress: profile && (profile.show_address === true || profile.show_address === undefined)
			? formatAddress(profile)
			: "",
		priceRange: profile?.services ? calculatePriceRange(profile.services) : "",
	}), [profile]);

	// 4. Business Hours - Separation of concerns
	// First, get the raw transformed list
	const baseBusinessHours = useMemo(() => 
		profile ? transformBusinessHours(profile) : [], 
		[profile]
	);

	// Then, delegate status logic to specific hook
	const { 
		businessStatus, 
		openHours, 
		openHoursDetails, 
		currentDayIndex 
	} = useBusinessStatus(baseBusinessHours);

	// Finally, merge isToday flag for display (Client-side only to avoid hydration mismatch)
	const businessHoursDisplay = useMemo(() => {
		if (currentDayIndex === -1) return baseBusinessHours;
		return baseBusinessHours.map((h, index) => ({
			...h,
			isToday: index === currentDayIndex
		}));
	}, [baseBusinessHours, currentDayIndex]);

	// 5. Integrations (WhatsApp & Google Maps)
	const integrations = useMemo(() => {
		const whatsappUrl = profile?.whatsapp_link ||
			(profile?.phone ? buildWhatsAppUrl(profile.phone) : "");
		const canContactViaWhatsApp = Boolean(whatsappUrl);

		const googleMapsUrl = profile && (profile.city || profile.state) ? generateGoogleMapsUrl({
			street: profile.street,
			number: profile.address_number,
			city: profile.city,
			state: profile.state,
			zipCode: profile.postal_code,
			country: "Brasil"
		}) : "";

		const canViewOnMaps = Boolean(
			profile && 
			googleMapsUrl && 
			(profile.show_address === true || profile.show_address === undefined)
		);

		return { whatsappUrl, canContactViaWhatsApp, googleMapsUrl, canViewOnMaps };
	}, [profile]);

	return {
		// Profile data
		profile,
		data: profile,
		isLoading,
		error,

		// Boolean flags
		...flags,
		hasAddress: addressInfo.hasAddress,

		// Formatted data
		...formattedData,
		businessHoursDisplay,

		// Smart opening hours (from useBusinessStatus)
		openHours,
		openHoursDetails,
		businessStatus,

		// Integrations
		...integrations,

		// SWR utilities
		isValidating,
		mutate,
	};
}
