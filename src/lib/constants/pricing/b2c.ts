/**
 * B2C Pricing Constants - Single Source of Truth (SSOT)
 * Centralized B2C pricing configuration for consumer-facing pricing section
 */

import { ScanFace, ChartPie, SquarePen, History, type LucideIcon } from "lucide-react";

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
	features: B2CFeature[];
}

// ============================================================================
// B2C Packages Configuration
// ============================================================================

export const B2C_PACKAGES_CONFIG: B2CPackageConfig[] = [
	{
		id: "costumer-3",
		title: "3 análises",
		description:
			"para quem quer testar poucos cortes antes de uma mudança específica.",
		analyses: 3,
		price: 7.9,
		pricePerCredit: 2.63,
		coinsImage: "/pricing/pack-5-coins.png",
		features: [
			{ icon: ScanFace, label: "3 análises de visagismo" },
			{ icon: ChartPie, label: "Análise de colorimetria" },
			{ icon: SquarePen, label: "Foto de 01 ângulo" },
			{ icon: History, label: "Análise da textura do cabelo" },
		],
	},
	{
		id: "costumer-5",
		title: "5 análises",
		description:
			"para quem quer experimentar vários estilos e cores diferentes.",
		analyses: 5,
		price: 11.9,
		pricePerCredit: 2.38,
		coinsImage: "/pricing/pack-15-coins.png",
		discount: 10,
		isPopular: true,
		features: [
			{ icon: ScanFace, label: "5 análises de visagismo" },
			{ icon: ChartPie, label: "Análise de colorimetria e terços do rosto" },
			{ icon: SquarePen, label: "Fotos de 03 ângulos: frente, costas e lateral" },
			{ icon: History, label: "Análise avançada da textura do cabelo" },
		],
	},
	{
		id: "costumer-10",
		title: "10 análises",
		description:
			"para quem está mudando de visual e quer explorar muitas possibilidades.",
		analyses: 10,
		price: 19.9,
		pricePerCredit: 1.99,
		coinsImage: "/pricing/pack-30-coins.png",
		discount: 20,
		features: [
			{ icon: ScanFace, label: "10 análises de visagismo" },
			{ icon: ChartPie, label: "Análise de colorimetria e terços do rosto" },
			{ icon: SquarePen, label: "Fotos de 03 ângulos: frente, costas e lateral" },
			{ icon: History, label: "Análise avançada da textura do cabelo" },
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
