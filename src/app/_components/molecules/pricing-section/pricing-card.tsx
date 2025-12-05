"use client";

import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";
import { BrandedButton } from "@/app/_components/molecules/branded-button";
import {
	type PricingPeriod,
	type PricingFeature,
	formatCurrency,
	getPeriodFooterText,
	getSignUpUrl,
} from "@/lib/constants/pricing";

// Re-export types for convenience
export type { PricingPeriod, PricingFeature };

export interface PricingCardProps extends VariantProps<typeof pricingCardVariants> {
	title: string;
	description: string;
	monthlyPrice: number;
	displayPrice: number;
	period: PricingPeriod;
	discount?: number;
	credits: number;
	features?: PricingFeature[];
	ctaLabel?: string;
	footerText?: string;
	signUpUrl?: string;
}

// Variants
const pricingCardVariants = cva(
	[
		"rounded-2xl bg-white dark:bg-neutral-950 p-6 flex flex-col relative",
		"border border-neutral-200 dark:border-neutral-800",
		"shadow-[0_4px_8px_0_rgba(0,0,0,0.02),0_15px_15px_0_rgba(0,0,0,0.02),0_34px_20px_0_rgba(0,0,0,0.01),0_60px_24px_0_rgba(0,0,0,0)]",
	],
	{
		variants: {
			variant: {
				default: "",
				popular:
					"ring-1 ring-[hsl(var(--primary))] shadow-[0_20px_32px_-4px_hsl(var(--primary)/0.25)]",
			},
		},
		defaultVariants: {
			variant: "default",
		},
	}
);

// Component
export function PricingCard({
	title,
	description,
	monthlyPrice,
	displayPrice,
	period,
	discount,
	credits,
	variant,
	features = [],
	ctaLabel,
	footerText,
	signUpUrl,
}: PricingCardProps) {
	const isPopular = variant === "popular";
	const resolvedSignUpUrl = signUpUrl ?? getSignUpUrl(title, period);
	const resolvedCtaLabel =
		ctaLabel ?? `Começar por apenas R$${formatCurrency(displayPrice)}`;
	const resolvedFooterText =
		footerText ?? getPeriodFooterText(period, credits, monthlyPrice, discount);

	return (
		<div className={cn(pricingCardVariants({ variant }))}>
			{/* Popular badge */}
			{isPopular && (
				<div className="absolute top-3 right-3 rounded-full bg-primary/15 text-primary border border-primary/20 px-3 py-1 text-xs font-medium">
					Mais popular 🔥
				</div>
			)}

			{/* Header */}
			<div className="mb-6">
				<h3 className="text-xl font-bold mb-2 text-neutral-800 dark:text-neutral-200 uppercase tracking-tight">
					{title}
				</h3>
				<p className="text-neutral-600 dark:text-neutral-400 text-sm leading-tight">
					{description}
				</p>
			</div>

			{/* Pricing */}
			<div className="mb-6">
				<div className="flex items-baseline">
					<span className="text-neutral-500 dark:text-neutral-400 text-sm">
						de R${formatCurrency(monthlyPrice)} por mês ou
					</span>
				</div>
				<div className="flex items-baseline mt-1">
					<span className="text-3xl font-medium text-neutral-800 dark:text-neutral-100">
						R${formatCurrency(displayPrice)}
					</span>
					<span className="text-neutral-500 dark:text-neutral-400 text-sm ml-1">
						/por 7 dias de teste
					</span>
				</div>
			</div>

			{/* Features */}
			<div className="space-y-3 mb-6">
				{features.map((feature, index) => (
					<div key={index} className="flex items-center">
						<feature.icon className="h-5 w-5 text-primary mr-2" />
						<span className="text-sm text-neutral-800 dark:text-neutral-200">
							{feature.label}
						</span>
					</div>
				))}
			</div>

			{/* CTA */}
			<BrandedButton href={resolvedSignUpUrl} className="w-full mt-auto" size="lg">
				{resolvedCtaLabel}
			</BrandedButton>

			{/* Footer */}
			<p className="text-neutral-500 dark:text-neutral-400 text-xs mt-4 text-center">
				{resolvedFooterText}
			</p>
		</div>
	);
}
