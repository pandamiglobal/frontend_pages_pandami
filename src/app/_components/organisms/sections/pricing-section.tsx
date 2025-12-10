"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import { useState } from "react";
import { ButtonGroup, ButtonGroupItem } from "@/app/_components/atoms/ui/button-group";
import { PricingCard } from "@/app/_components/molecules/pricing-section/pricing-card";
import { UserRound, ScanFace, ChartPie, FileEdit, History } from "lucide-react";
import {
	type PricingPeriod,
	type PricingFeature,
	PERIOD_DISCOUNTS,
	PLANS_CONFIG,
	PERIOD_BUTTONS,
	getMonthlyPrice,
	getTestPrice,
} from "@/lib/constants/pricing";

// Função para gerar features dinâmicas por plano (injeção de dependências)
const buildPlanFeatures = (users: number, analyses: number): PricingFeature[] => [
	{ icon: UserRound, label: `${users} ${users === 1 ? "pessoa" : "pessoas"} na equipe` },
	{ icon: ScanFace, label: `${analyses} análises de visagismo` },
	{ icon: ChartPie, label: "Dashboard profissional" },
	{ icon: FileEdit, label: "Anotações personalizadas" },
	{ icon: History, label: "Histórico de clientes" },
];

export function PricingSection() {
	const [activePeriod, setActivePeriod] = useState<PricingPeriod>("annual");

	return (
		<section id="pricing" className="py-16 bg-neutral-50 dark:bg-neutral-900">
			<Container>
				<div className="flex flex-col items-center mb-3">
					<h2 className="text-2xl lg:text-3xl font-semibold text-center mb-4 text-stone-900">
						Planos para profissionais
					</h2>

					<ButtonGroup
						value={activePeriod}
						onValueChange={(v) => setActivePeriod(v as PricingPeriod)}
						aria-label="Selecione o período de assinatura"
						className="mb-3 bg-neutral-100 dark:bg-neutral-800 rounded-full p-1 h-auto"
					>
						{PERIOD_BUTTONS.map((p) => (
							<ButtonGroupItem
								key={p.id}
								value={p.id}
								className="relative rounded-full px-3 sm:px-4 md:px-6 py-2 text-xs sm:text-sm md:text-base aria-pressed:bg-white dark:aria-pressed:bg-neutral-700 aria-pressed:shadow-sm aria-pressed:text-neutral-800 dark:aria-pressed:text-neutral-100 min-w-0"
							>
								<div className="flex flex-row items-center gap-2">
									<span className="whitespace-nowrap">{p.label}</span>
									{PERIOD_DISCOUNTS[p.id] > 0 && (
										<span className="inline-flex items-center rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-400/20 dark:text-emerald-300 border border-emerald-200/70 dark:border-emerald-300/20 px-1.5 py-1.5 text-[9px] sm:text-[10px] md:text-[11px] font-medium leading-none">
											{PERIOD_DISCOUNTS[p.id]}% OFF
										</span>
									)}
								</div>
							</ButtonGroupItem>
						))}
					</ButtonGroup>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
					{PLANS_CONFIG.map((plan) => {
						const discount = PERIOD_DISCOUNTS[activePeriod];
						const monthlyPrice = getMonthlyPrice(plan.basePrice, activePeriod);
						const displayPrice = getTestPrice(plan.title, activePeriod, plan.baseTestPrice);
						const features = buildPlanFeatures(plan.users, plan.analyses);

						return (
							<PricingCard
								key={plan.title}
								title={plan.title}
								description={plan.description}
								monthlyPrice={monthlyPrice}
								displayPrice={displayPrice}
								period={activePeriod}
								discount={discount}
								credits={plan.credits}
								variant={plan.variant}
								features={features}
							/>
						);
					})}
				</div>
			</Container>
		</section>
	);
}
