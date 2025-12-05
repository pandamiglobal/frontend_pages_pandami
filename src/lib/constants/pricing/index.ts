/**
 * Pricing Constants - Single Source of Truth (SSOT)
 * Centralized pricing configuration for consistent pricing across the application
 */

import type { LucideIcon } from "lucide-react";

// Re-export B2C pricing constants
export * from "./b2c";

// ============================================================================
// Types
// ============================================================================

export type PricingPeriod = "monthly" | "semiannual" | "annual";

export interface PricingFeature {
	icon: LucideIcon;
	label: string;
}

export interface PlanConfig {
	title: string;
	description: string;
	users: number;
	analyses: number;
	credits: number;
	basePrice: number;
	baseTestPrice: number;
	variant?: "default" | "popular";
}

// ============================================================================
// Period Discounts
// ============================================================================

/**
 * Discount percentages per billing period
 * @example PERIOD_DISCOUNTS.annual // 20
 */
export const PERIOD_DISCOUNTS: Record<PricingPeriod, number> = {
	monthly: 0,
	semiannual: 10,
	annual: 20,
} as const;

// ============================================================================
// Base Prices (Monthly, without discount)
// ============================================================================

/**
 * Base monthly prices per plan (without discount)
 */
export const BASE_PRICES = {
	STARTER: 49.9,
	PRO: 99.9,
	MAX: 189.9,
} as const;

/**
 * Base test prices for 7-day trial (without discount)
 */
export const BASE_TEST_PRICES = {
	STARTER: 5.9,
	PRO: 9.9,
	MAX: 19.9,
} as const;

/**
 * Promotional test prices for STARTER plan per period
 * STARTER has fixed promotional prices that don't follow discount calculation
 */
export const STARTER_TEST_PRICES: Record<PricingPeriod, number> = {
	monthly: 5.9,
	semiannual: 4.9,
	annual: 3.9,
} as const;

// ============================================================================
// Plans Configuration
// ============================================================================

/**
 * Plans configuration - base data for all plans
 * Features are injected at component level for flexibility
 */
export const PLANS_CONFIG: PlanConfig[] = [
	{
		title: "STARTER",
		description: "Ideal para barbearias que não querem ficar para trás na tecnologia",
		users: 1,
		analyses: 30,
		credits: 3,
		basePrice: BASE_PRICES.STARTER,
		baseTestPrice: BASE_TEST_PRICES.STARTER,
	},
	{
		title: "PRO",
		description: "Ideal para quem deseja ampliar serviços e oferecer experiências avançadas",
		users: 3,
		analyses: 60,
		credits: 7,
		basePrice: BASE_PRICES.PRO,
		baseTestPrice: BASE_TEST_PRICES.PRO,
		variant: "popular",
	},
	{
		title: "MAX",
		description: "Ideal para barbearias que buscam o máximo de inovação e diferenciação",
		users: 9,
		analyses: 150,
		credits: 15,
		basePrice: BASE_PRICES.MAX,
		baseTestPrice: BASE_TEST_PRICES.MAX,
	},
] as const;

// ============================================================================
// Period Labels
// ============================================================================

/**
 * Period button labels for UI
 */
export const PERIOD_LABELS: Record<PricingPeriod, string> = {
	annual: "Anual",
	semiannual: "Semestral",
	monthly: "Mensal",
} as const;

/**
 * Period buttons configuration for tabs
 */
export const PERIOD_BUTTONS: Array<{ id: PricingPeriod; label: string }> = [
	{ id: "annual", label: PERIOD_LABELS.annual },
	{ id: "semiannual", label: PERIOD_LABELS.semiannual },
	{ id: "monthly", label: PERIOD_LABELS.monthly },
] as const;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Calculate discounted price with rounding to end in .90
 * @param basePrice - Original price without discount
 * @param discountPercent - Discount percentage (0-100)
 * @returns Price with discount, rounded to end in .90
 */
export const calculateDiscountedPrice = (
	basePrice: number,
	discountPercent: number
): number => {
	const rawDiscountedPrice = basePrice * (1 - discountPercent / 100);
	const roundedPrice = Math.round(rawDiscountedPrice);
	return roundedPrice - 0.1;
};

/**
 * Get test price for a plan based on period
 * STARTER uses fixed promotional prices, others use discount calculation
 * @param planTitle - Plan title (STARTER, PRO, MAX)
 * @param period - Billing period
 * @param baseTestPrice - Base test price for the plan
 */
export const getTestPrice = (
	planTitle: string,
	period: PricingPeriod,
	baseTestPrice: number
): number => {
	if (planTitle === "STARTER") {
		return STARTER_TEST_PRICES[period];
	}
	return calculateDiscountedPrice(baseTestPrice, PERIOD_DISCOUNTS[period]);
};

/**
 * Get monthly price for a plan based on period discount
 * @param basePrice - Base monthly price
 * @param period - Billing period
 */
export const getMonthlyPrice = (basePrice: number, period: PricingPeriod): number => {
	return calculateDiscountedPrice(basePrice, PERIOD_DISCOUNTS[period]);
};

/**
 * Format currency in Brazilian Real format
 * @param value - Numeric value
 * @returns Formatted string (e.g., "49,90")
 */
export const formatCurrency = (value: number): string => {
	return value.toFixed(2).replace(".", ",");
};

/**
 * Generate sign-up URL with plan and period parameters
 * @param planTitle - Plan title
 * @param period - Billing period
 * @param baseUrl - Base URL for sign-up (default: app.pandami.com.br)
 */
export const getSignUpUrl = (
	planTitle: string,
	period: PricingPeriod,
	baseUrl = "https://app.pandami.com.br/auth/sign-up"
): string => {
	return `${baseUrl}?plan=${encodeURIComponent(planTitle.toLowerCase())}&period=${encodeURIComponent(period)}`;
};

/**
 * Generate footer text based on period
 * @param period - Billing period
 * @param credits - Number of credits in trial
 * @param monthlyPrice - Monthly price after trial
 * @param discount - Discount percentage (optional)
 */
export const getPeriodFooterText = (
	period: PricingPeriod,
	credits: number,
	monthlyPrice: number,
	discount?: number
): string => {
	const baseText = `O teste dá direito a ${credits} créditos. Após o período de 7 dias,`;

	const periodTexts: Record<PricingPeriod, string> = {
		monthly: `${baseText} será cobrada a mensalidade de R$${formatCurrency(monthlyPrice)}.`,
		semiannual: `${baseText} será cobrado o valor total de R$${formatCurrency(monthlyPrice * 6)} a cada 6 meses (semestral com ${discount}% de desconto).`,
		annual: `${baseText} será cobrado o valor total de R$${formatCurrency(monthlyPrice * 12)} a cada 12 meses (anual com ${discount}% de desconto).`,
	};

	return periodTexts[period];
};
