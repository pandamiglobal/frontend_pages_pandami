/**
 * SWR Cache Keys for My Site
 * Centralized cache key management for consistent caching across the application
 */

/**
 * Generate cache keys for my-site related data
 * Keys can be scoped by slug for public profiles or use default for authenticated user
 */
export const MY_SITE_KEYS = {
	/**
	 * Main profile data cache key
	 * @param slug - Optional slug for public profile access
	 */
	profile: (slug?: string) =>
		slug ? `public-profile-${slug}` : "public-profile",

	/**
	 * Services list cache key
	 * @param slug - Optional slug for public profile access
	 */
	services: (slug?: string) => (slug ? `services-${slug}` : "services"),

	/**
	 * Payment methods cache key
	 * @param slug - Optional slug for public profile access
	 */
	paymentMethods: (slug?: string) =>
		slug ? `payment-methods-${slug}` : "payment-methods",

	/**
	 * Gallery/portfolio images cache key
	 * @param slug - Optional slug for public profile access
	 */
	gallery: (slug?: string) => (slug ? `gallery-${slug}` : "gallery"),

	/**
	 * Business hours cache key
	 * @param slug - Optional slug for public profile access
	 */
	businessHours: (slug?: string) =>
		slug ? `business-hours-${slug}` : "business-hours",

	/**
	 * Social media links cache key
	 * @param slug - Optional slug for public profile access
	 */
	socialMedia: (slug?: string) =>
		slug ? `social-media-${slug}` : "social-media",

	/**
	 * Custom links cache key
	 * @param slug - Optional slug for public profile access
	 */
	customLinks: (slug?: string) =>
		slug ? `custom-links-${slug}` : "custom-links",

	/**
	 * Avatar image cache key
	 * @param slug - Optional slug for public profile access
	 */
	avatar: (slug?: string) => (slug ? `avatar-${slug}` : "avatar"),
	/**
	 * Phone cache key (derived from profile)
	 * @param slug - Optional slug for public profile access
	 */
	phone: (slug?: string) => (slug ? `phone-${slug}` : "phone"),
} as const;

/**
 * Cache TTL (Time To Live) in milliseconds
 * Defines how long data should be considered fresh
 */
export const CACHE_TTL = {
	/** Profile data - 5 minutes */
	PROFILE: 5 * 60 * 1000,

	/** Services - 3 minutes */
	SERVICES: 3 * 60 * 1000,

	/** Payment methods - 5 minutes */
	PAYMENT_METHODS: 5 * 60 * 1000,

	/** Gallery images - 3 minutes */
	GALLERY: 3 * 60 * 1000,

	/** Business hours - 10 minutes */
	BUSINESS_HOURS: 10 * 60 * 1000,

	/** Social media - 5 minutes */
	SOCIAL_MEDIA: 5 * 60 * 1000,

	/** Custom links - 5 minutes */
	CUSTOM_LINKS: 5 * 60 * 1000,

	/** Avatar image - 2 minutes */
	AVATAR: 2 * 60 * 1000,

	/** Phone - 5 minutes */
	PHONE: 5 * 60 * 1000,
} as const;

export const PUBLIC_PROFILE_KEYS = {
	avatar: () => "public-profile-avatar",
} as const;
