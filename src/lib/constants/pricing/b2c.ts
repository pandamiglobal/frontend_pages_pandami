/**
 * B2C Pricing Constants - Single Source of Truth (SSOT)
 * Centralized B2C pricing configuration for consumer-facing pricing section
 */

import type { LucideIcon } from "lucide-react";

// ============================================================================
// Types
// ============================================================================

export interface B2CFeature {
	icon: LucideIcon;
	label: string;
}

export interface B2CPackageConfig {
	id: string;
	title: string;
	description: string;
	analyses: number;
	price: number;
	pricePerCredit: number;
	coinsImage: string;
	discount?: number;
	isPopular?: boolean;
	features: string[];
}

// ============================================================================
// B2C Packages Configuration
// ============================================================================

export const B2C_PACKAGES_CONFIG: B2CPackageConfig[] = [
	{
		id: "b2c-5",
		title: "5 análises",
		description: "para quem quer testar poucos cortes antes de uma mudança específica.",
		analyses: 5,
		price: 7.90,
		pricePerCredit: 2.63,
		coinsImage: "/pricing/pack-5-coins.png",
		features: [
			"5 análises de visagismo",
			"Análise de colorimetria",
			"Fotos de 01 ângulo",
			"Análise da textura do cabelo",
		],
	},
	{
		id: "b2c-15",
		title: "15 análises",
		description: "para quem quer experimentar vários estilos e cores diferentes.",
		analyses: 15,
		price: 11.90,
		pricePerCredit: 2.38,
		coinsImage: "/pricing/pack-15-coins.png",
		discount: 10,
		isPopular: true,
		features: [
			"15 análises de visagismo",
			"Análise de colorimetria e terços do rosto",
			"Fotos de 03 ângulos",
			"Análise avançada da textura do cabelo",
		],
	},
	{
		id: "b2c-30",
		title: "30 análises",
		description: "para quem está mudando de visual e quer explorar muitas possibilidades.",
		analyses: 30,
		price: 19.90,
		pricePerCredit: 1.99,
		coinsImage: "/pricing/pack-30-coins.png",
		discount: 20,
		features: [
			"30 análises de visagismo",
			"Análise de colorimetria terços do rosto",
			"Fotos de 03 ângulos",
			"Análise avançada da textura do cabelo",
		],
	},
] as const;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Format currency in Brazilian Real format
 * @param value - Numeric value
 * @returns Formatted string (e.g., "7,90")
 */
export const formatB2CCurrency = (value: number): string => {
	return value.toFixed(2).replace(".", ",");
};

/**
 * Get package by ID
 * @param id - Package ID
 * @returns Package config or undefined
 */
export const getB2CPackageById = (id: string): B2CPackageConfig | undefined => {
	return B2C_PACKAGES_CONFIG.find((pkg) => pkg.id === id);
};
