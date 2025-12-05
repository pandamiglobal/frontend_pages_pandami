"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import {
	B2CPackageCard,
	buildB2CFeatures,
} from "@/app/_components/molecules/pricing-section/b2c-package-card";
import { B2C_PACKAGES_CONFIG } from "@/lib/constants/pricing/b2c";

export function B2CPricingSection() {
	return (
		<section id="b2c-pricing" className="py-8 sm:py-14 bg-neutral-50 dark:bg-neutral-900">
			<Container>
				<div className="flex flex-col justify-start items-center gap-6 sm:gap-8">
					<div className="self-stretch flex flex-col justify-center items-center gap-2 px-2">
						<h2 className="text-center text-neutral-900 dark:text-neutral-100 text-xl sm:text-2xl lg:text-3xl font-semibold">
							Planos para consumidores
						</h2>
						<p className="text-center text-neutral-600 dark:text-neutral-400 text-xs sm:text-sm leading-relaxed max-w-3xl">
							Pensado para o consumidor que quer testar novos cortes direto no celular, para levar o relatório ao salão ou profissional.
						</p>
					</div>

					<div className="self-stretch grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
						{B2C_PACKAGES_CONFIG.map((pkg) => (
							<B2CPackageCard
								key={pkg.id}
								id={pkg.id}
								title={pkg.title}
								description={pkg.description}
								price={pkg.price}
								pricePerCredit={pkg.pricePerCredit}
								credits={pkg.analyses}
								coinsImage={pkg.coinsImage}
								discount={pkg.discount}
								variant={pkg.isPopular ? "popular" : "default"}
								features={buildB2CFeatures(pkg.analyses)}
							/>
						))}
					</div>
				</div>
			</Container>
		</section>
	);
}
