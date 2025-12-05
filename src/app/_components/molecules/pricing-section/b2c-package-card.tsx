"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { BrandedButton } from "@/app/_components/molecules/branded-button";
import { ScanFace, ChartPie, SquarePen, History, type LucideIcon } from "lucide-react";
import Image from "next/image";

// Types
export interface B2CPackageFeature {
	icon: LucideIcon;
	label: string;
}

export interface B2CPackageCardProps extends VariantProps<typeof cardVariants> {
	id: string;
	title: string;
	description: string;
	price: number;
	pricePerCredit: number;
	credits: number;
	coinsImage: string;
	discount?: number;
	features?: B2CPackageFeature[];
}

// Variants
const cardVariants = cva(
	"rounded-2xl bg-white dark:bg-neutral-950 p-4 sm:p-6 flex flex-col relative border border-neutral-200 dark:border-neutral-800 shadow-sm",
	{
		variants: {
			variant: {
				default: "",
				popular: "ring-1 ring-primary shadow-lg shadow-primary/10",
			},
		},
		defaultVariants: { variant: "default" },
	}
);

// Helpers
const formatCurrency = (value: number) => value.toFixed(2).replace(".", ",");

// Component
const getSignUpUrl = (credits: number) =>
	`https://app.pandami.com.br/auth/sign-up?plan=customer&credits=${credits}`;

export function B2CPackageCard({
	id,
	title,
	description,
	price,
	pricePerCredit,
	credits,
	coinsImage,
	discount,
	variant,
	features = [],
}: B2CPackageCardProps) {
	return (
		<div className={cn(cardVariants({ variant }))}>
			{variant === "popular" && (
				<span className="absolute top-3 right-3 rounded-full bg-primary/15 text-primary border border-primary/20 px-3 py-1 text-xs font-medium">
					Mais popular 🔥
				</span>
			)}

			<div className="mb-4 sm:mb-6">
				<h3 className="text-lg sm:text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-200 uppercase tracking-tight">
					{title}
				</h3>
				<p className="text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-tight">
					{description}
				</p>
			</div>

			<div className="mb-4 sm:mb-6 p-4 relative rounded-lg border border-neutral-300 dark:border-neutral-700 overflow-hidden min-h-[120px]">
				<div className="flex items-center gap-2 mb-3">
					<span className="text-neutral-800 dark:text-neutral-200 text-sm">Economize</span>
					{discount && (
						<span className="px-2 py-0.5 bg-green-200 dark:bg-green-900/30 rounded text-green-900 dark:text-green-300 text-xs font-medium">
							{discount}% OFF
						</span>
					)}
				</div>

				<div className="flex items-end gap-0.5 pr-16 sm:pr-20">
					<span className="text-neutral-800 dark:text-neutral-200 text-sm font-semibold">R$</span>
					<span className="text-neutral-800 dark:text-neutral-100 text-3xl sm:text-4xl font-medium leading-none">
						{formatCurrency(price)}
					</span>
					<span className="text-neutral-500 dark:text-neutral-400 text-xs ml-1">/avulsa</span>
				</div>

				<Image
					src={coinsImage}
					alt="Coins"
					width={80}
					height={64}
					className="w-14 sm:w-20 h-auto absolute right-2 bottom-2 object-contain"
				/>
			</div>

			<p className="text-neutral-600 dark:text-neutral-400 text-xs mb-4">
				Um crédito = uma análise de visagismo
			</p>

			<div className="space-y-2 mb-4 sm:mb-6">
				{features.map((feature, i) => (
					<div key={i} className="flex items-center gap-2">
						<feature.icon className="size-4 sm:size-5 text-primary shrink-0" />
						<span className="text-xs sm:text-sm text-neutral-800 dark:text-neutral-200">
							{feature.label}
						</span>
					</div>
				))}
			</div>

			<BrandedButton href={getSignUpUrl(credits)} className="w-full mt-auto" size="lg">
				Começar por R$ {formatCurrency(pricePerCredit)}/crédito
			</BrandedButton>
		</div>
	);
}

// Feature builder
export const buildB2CFeatures = (analyses: number): B2CPackageFeature[] => {
	const isBasic = analyses <= 5;
	return [
		{ icon: ScanFace, label: `${analyses} análises de visagismo` },
		{ icon: ChartPie, label: isBasic ? "Análise de colorimetria" : "Análise de colorimetria e terços do rosto" },
		{ icon: SquarePen, label: isBasic ? "Fotos de 01 ângulo" : "Fotos de 03 ângulos" },
		{ icon: History, label: isBasic ? "Análise da textura do cabelo" : "Análise avançada da textura do cabelo" },
	];
};
