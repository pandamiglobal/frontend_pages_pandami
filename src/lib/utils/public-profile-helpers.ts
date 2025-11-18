import type {
	IPublicProfileFullResponse,
	IPublicProfileOpeningHour,
	IPublicProfileService,
	IPaymentMethod,
	IPortfolioImage,
	IBusinessHours,
	ISocialMedia,
	ICustomLink,
} from "@/common/types/IPublicProfile";

/**
 * Normalize payment method string to standard format
 */
export function normalizePaymentMethod(
	method: string
): "PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" | "UNKNOWN" {
	switch (method.toUpperCase()) {
		case "PIX":
			return "PIX";
		case "DINHEIRO":
		case "CASH":
			return "CASH";
		case "CARTAO_CREDITO":
		case "CREDIT_CARD":
			return "CREDIT_CARD";
		case "CARTAO_DEBITO":
		case "DEBIT_CARD":
			return "DEBIT_CARD";
		case "TRANSFERENCIA_BANCARIA":
		case "BANK_TRANSFER":
			return "BANK_TRANSFER";
		default:
			return "UNKNOWN";
	}
}

/**
 * Payment method label mapping - Sempre em português legível
 */
const PAYMENT_LABELS: Record<string, string> = {
	PIX: "Pix",
	CASH: "Dinheiro",
	CREDIT_CARD: "Cartão de crédito",
	DEBIT_CARD: "Cartão de débito",
	BANK_TRANSFER: "Transferência bancária",
	UNKNOWN: "Método desconhecido",
};

/**
 * Payment method type mapping (for use with icon component)
 */
export const PAYMENT_METHOD_TYPES: Record<
	string,
	"PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER"
> = {
	PIX: "PIX",
	CASH: "CASH",
	CREDIT_CARD: "CREDIT_CARD",
	DEBIT_CARD: "DEBIT_CARD",
	BANK_TRANSFER: "BANK_TRANSFER",
};

/**
 * Payment method icon configuration
 * SSOT for payment method icons
 */
export const PAYMENT_METHOD_ICONS = {
	PIX: {
		type: "svg" as const,
		src: "/svg/pix-icon.svg",
		alt: "PIX",
	},
	CASH: {
		type: "lucide" as const,
		name: "Banknote",
	},
	CREDIT_CARD: {
		type: "lucide" as const,
		name: "CreditCard",
	},
	DEBIT_CARD: {
		type: "lucide" as const,
		name: "CreditCard",
	},
	BANK_TRANSFER: {
		type: "lucide" as const,
		name: "Building2",
	},
} as const;

/**
 * Get payment method icon configuration
 */
export function getPaymentMethodIcon(method: string) {
	const normalized = normalizePaymentMethod(method);
	if (normalized === "UNKNOWN") return null;
	return PAYMENT_METHOD_ICONS[normalized] || null;
}

/**
 * Get payment method label from method string
 */
export function getPaymentMethodLabel(method: string): string {
	const key = normalizePaymentMethod(method);
	return PAYMENT_LABELS[key] ?? method;
}

/**
 * Convert normalized payment method to API format (Portuguese)
 * Converts: PIX, CASH, CREDIT_CARD, DEBIT_CARD, BANK_TRANSFER
 * To API format: PIX, DINHEIRO, CARTAO_CREDITO, TRANSFERENCIA_BANCARIA
 */
export function convertPaymentMethodToApiFormat(
	method: "PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER"
): string {
	const apiFormatMap: Record<string, string> = {
		PIX: "PIX",
		CASH: "DINHEIRO",
		CREDIT_CARD: "CARTAO_CREDITO",
		DEBIT_CARD: "CARTAO_CREDITO", // API doesn't distinguish between credit and debit
		BANK_TRANSFER: "TRANSFERENCIA_BANCARIA",
	};
	return apiFormatMap[method] || method;
}

/**
 * Convert API format (Portuguese) back to normalized format
 * Converts: PIX, DINHEIRO, CARTAO_CREDITO, TRANSFERENCIA_BANCARIA
 * To normalized: PIX, CASH, CREDIT_CARD, BANK_TRANSFER
 */
export function convertPaymentMethodFromApiFormat(
	method: string
): "PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER" {
	const normalizedFormatMap: Record<
		string,
		"PIX" | "CASH" | "CREDIT_CARD" | "DEBIT_CARD" | "BANK_TRANSFER"
	> = {
		PIX: "PIX",
		DINHEIRO: "CASH",
		CARTAO_CREDITO: "CREDIT_CARD",
		CARTAO_DEBITO: "DEBIT_CARD",
		TRANSFERENCIA_BANCARIA: "BANK_TRANSFER",
	};
	return normalizedFormatMap[method] || "CASH";
}

/**
 * Convert weekday string to Brazilian Portuguese day label
 * Supports multiple formats: MONDAY, MON, Monday, etc.
 */
export function getDayLabel(weekday: string): string {
	// Convert to uppercase and trim to handle any format
	const normalizedDay = String(weekday).toUpperCase().trim();

	switch (normalizedDay) {
		// Full English names
		case "MONDAY":
			return "Segunda-feira";
		case "TUESDAY":
			return "Terça-feira";
		case "WEDNESDAY":
			return "Quarta-feira";
		case "THURSDAY":
			return "Quinta-feira";
		case "FRIDAY":
			return "Sexta-feira";
		case "SATURDAY":
			return "Sábado";
		case "SUNDAY":
			return "Domingo";

		// Abbreviated English names (3 letters)
		case "MON":
			return "Segunda-feira";
		case "TUE":
			return "Terça-feira";
		case "WED":
			return "Quarta-feira";
		case "THU":
			return "Quinta-feira";
		case "FRI":
			return "Sexta-feira";
		case "SAT":
			return "Sábado";
		case "SUN":
			return "Domingo";

		// Portuguese names (just in case)
		case "SEGUNDA":
		case "SEGUNDA-FEIRA":
			return "Segunda-feira";
		case "TERÇA":
		case "TERÇA-FEIRA":
		case "TERCA-FEIRA":
			return "Terça-feira";
		case "QUARTA":
		case "QUARTA-FEIRA":
			return "Quarta-feira";
		case "QUINTA":
		case "QUINTA-FEIRA":
			return "Quinta-feira";
		case "SEXTA":
		case "SEXTA-FEIRA":
			return "Sexta-feira";
		case "SÁBADO":
		case "SABADO":
			return "Sábado";
		case "DOMINGO":
			return "Domingo";

		default:
			return String(weekday);
	}
}

/**
 * Format service price for display
 */
export function formatServicePrice(price: number): string {
	return new Intl.NumberFormat("pt-BR", {
		style: "currency",
		currency: "BRL",
	}).format(price);
}

/**
 * Service display format
 */
export interface IServiceDisplay {
	id: string;
	title: string;
	description: string;
	price: number;
	price_to?: number;
	duration: string;
	enabled: boolean;
}

/**
 * Transform API profile data to UI service format
 */
export function transformServices(
	apiData: IPublicProfileFullResponse
): IServiceDisplay[] {
	return apiData.services.map((service) => ({
		id: service.id.toString(),
		title: service.name,
		description: service.description || "",
		price: service.price_from || 0,
		price_to: service.price_to,
		duration: service.duration_hours
			? `${service.duration_hours}h`
			: "Não informado",
		enabled: true,
	}));
}

/**
 * Transform API profile data to UI payment method format
 * Converts Portuguese method names from API to normalized format
 */
export function transformPaymentMethods(
	apiData: IPublicProfileFullResponse
): IPaymentMethod[] {
	return apiData.payment_methods.map((method) => {
		// Convert from API format (Portuguese) to normalized format
		const normalizedMethod = convertPaymentMethodFromApiFormat(
			method.method as string
		);
		const label = getPaymentMethodLabel(normalizedMethod); // ← Sempre português legível
		return {
			id: method.id.toString(),
			icon: normalizedMethod,
			label: label || method.method, // Fallback se conversão falhar
		};
	});
}

/**
 * Transform API profile data to UI portfolio image format
 * Note: Gallery/portfolio images are not currently in the API response
 * This function is kept for future implementation
 */
export function transformPortfolioImages(
	apiData: IPublicProfileFullResponse
): IPortfolioImage[] {
	// Gallery is not yet implemented in the API
	// Return empty array for now
	return [];
}

/**
 * Transform API profile data to UI social media format
 */
export function transformSocialMedia(
	apiData: IPublicProfileFullResponse
): ISocialMedia[] {
	const socialMedia: ISocialMedia[] = [];

	if (apiData.instagram_link) {
		socialMedia.push({
			id: "instagram",
			platform: "instagram",
			handle: apiData.instagram_link
				.replace("https://www.instagram.com/", "")
				.replace("https://instagram.com/", "")
				.replace("@", "")
				.replace("/", ""),
			url: apiData.instagram_link,
		});
	}

	if (apiData.whatsapp_link) {
		socialMedia.push({
			id: "whatsapp",
			platform: "whatsapp",
			handle: apiData.whatsapp_link.replace("https://wa.me/", ""),
			url: apiData.whatsapp_link,
		});
	}

	if (apiData.tiktok_link) {
		socialMedia.push({
			id: "tiktok",
			platform: "tiktok",
			handle: apiData.tiktok_link
				.replace("https://tiktok.com/@", "")
				.replace("https://www.tiktok.com/@", ""),
			url: apiData.tiktok_link,
		});
	}

	if (apiData.linkedin_link) {
		socialMedia.push({
			id: "linkedin",
			platform: "linkedin",
			handle: apiData.linkedin_link
				.replace("https://linkedin.com/in/", "")
				.replace("https://www.linkedin.com/in/", ""),
			url: apiData.linkedin_link,
		});
	}

	return socialMedia;
}

/**
 * Transform API profile data to UI custom links format
 */
export function transformCustomLinks(
	apiData: IPublicProfileFullResponse
): ICustomLink[] {
	return apiData.custom_links.map((link) => ({
		id: link.id,
		name: link.name,
		url: link.url,
		active: link.active,
	}));
}

/**
 * Transform API profile data to UI business hours format
 * Ensures all 7 days are present with proper formatting
 */
export function transformBusinessHours(
	apiData: IPublicProfileFullResponse
): IBusinessHours[] {
	const raw = apiData.opening_hours || [];

	// Map to normalize API weekday format to full format
	const normalizeWeekday = (weekday: string): string => {
		const normalized = String(weekday).toUpperCase().trim();

		// Map abbreviated format (MON, TUE, etc.) to full format
		const abbreviationMap: Record<string, string> = {
			SUN: "SUNDAY",
			MON: "MONDAY",
			TUE: "TUESDAY",
			WED: "WEDNESDAY",
			THU: "THURSDAY",
			FRI: "FRIDAY",
			SAT: "SATURDAY",
		};

		// If it's already in full format, return as is
		if (
			[
				"SUNDAY",
				"MONDAY",
				"TUESDAY",
				"WEDNESDAY",
				"THURSDAY",
				"FRIDAY",
				"SATURDAY",
			].includes(normalized)
		) {
			return normalized;
		}

		// Otherwise, try to map from abbreviated format
		return abbreviationMap[normalized] || normalized;
	};

	// Create a map of existing hours by weekday
	const byWeekday: Record<string, IPublicProfileOpeningHour> = raw.reduce(
		(acc, h) => {
			const key = normalizeWeekday(h.weekday);
			acc[key] = h;
			return acc;
		},
		{} as Record<string, IPublicProfileOpeningHour>
	);

	// Ensure all 7 days are present
	const WEEKDAYS = [
		"SUNDAY",
		"MONDAY",
		"TUESDAY",
		"WEDNESDAY",
		"THURSDAY",
		"FRIDAY",
		"SATURDAY",
	] as const;

	return WEEKDAYS.map((dayKey) => {
		const existing = byWeekday[dayKey];
		const now = new Date();
		const currentDay = now.getDay();
		const dayNumber = getDayNumber(dayKey);

		return {
			id: existing ? String(existing.id) : `${dayKey.toLowerCase()}`,
			day: getDayLabel(dayKey),
			isOpen: existing ? existing.active : false,
			openTime: existing ? existing.start_time : "09:00",
			closeTime: existing ? existing.end_time : "18:00",
			isToday: dayNumber === currentDay,
		};
	});
}

/**
 * Get day number from weekday string (0 = Sunday, 6 = Saturday)
 */
function getDayNumber(weekday: string): number {
	const dayMap: Record<string, number> = {
		SUNDAY: 0,
		MONDAY: 1,
		TUESDAY: 2,
		WEDNESDAY: 3,
		THURSDAY: 4,
		FRIDAY: 5,
		SATURDAY: 6,
	};
	return dayMap[weekday.toUpperCase()] ?? 0;
}

/**
 * Format phone number to Brazilian format
 * @param phone - Phone number string
 * @returns Formatted phone number: +55 (XX) XXXXX-XXXX
 */
export function formatPhoneNumber(phone: string): string {
	const cleaned = phone.replace(/\D/g, "");

	// Format for Brazilian numbers: +55 (XX) XXXXX-XXXX
	if (cleaned.length === 13 && cleaned.startsWith("55")) {
		return `+55 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`;
	}

	return phone;
}

/**
 * Format address from profile data
 * @param profile - Public profile data
 * @returns Formatted address string
 */
export function formatAddress(profile: IPublicProfileFullResponse): string {
	const parts = [
		profile.street,
		profile.address_number,
		profile.city,
		profile.state,
		profile.postal_code,
	].filter(Boolean);

	return parts.join(", ");
}

/**
 * Calculate price range from services
 * @param services - Array of services
 * @returns Formatted price range string
 */
export function calculatePriceRange(services: IPublicProfileFullResponse['services']): string {
	const activeServices = services.filter((s) => s.price_from || s.price_to);

	if (activeServices.length === 0) return "";

	const prices = activeServices
		.flatMap((s) => [s.price_from || Infinity, s.price_to || Infinity])
		.filter((p) => p !== Infinity);

	if (prices.length === 0) return "";

	const min = Math.min(...prices);
	const max = Math.max(...prices);

	if (min === max) {
		return `R$ ${min.toFixed(2)}`;
	}

	return `R$ ${min.toFixed(2)} - ${max.toFixed(2)}`;
}

/**
 * Build WhatsApp URL with optional message
 * @param phone - Phone number
 * @param message - Optional message to pre-fill
 * @returns WhatsApp URL
 */
export function buildWhatsAppUrl(phone: string, message?: string): string {
	const cleanedPhone = phone.replace(/\D/g, "");
	const encodedMessage = message ? encodeURIComponent(message) : "";

	return `https://wa.me/${cleanedPhone}${encodedMessage ? `?text=${encodedMessage}` : ""}`;
}

/**
 * Generate Google Maps search URL from address components
 * Based on SaaS GenerateGoogleMapsLink implementation
 * @param address - Address components
 * @returns Google Maps search URL
 */
export function generateGoogleMapsUrl(address?: {
	street?: string;
	number?: string;
	city?: string;
	state?: string;
	zipCode?: string;
	country?: string;
}): string {
	if (!address) return "";

	const parts: string[] = [];

	// Prefer more specific street+number first if available
	const streetLine = [address.street, address.number].filter(Boolean).join(" ");
	if (streetLine) parts.push(streetLine);

	// Core query parts
	if (address.zipCode) parts.push(address.zipCode);
	if (address.city) parts.push(address.city);
	if (address.state) parts.push(address.state);

	// Country is optional; include if present
	if (address.country) parts.push(address.country);

	if (parts.length === 0) return "";

	const query = encodeURIComponent(parts.join(", "));
	return `https://www.google.com/maps/search/?api=1&query=${query}`;
}
