import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { PrimaryButton } from "@/components/ui/primary-button";
import { HeroIcon } from "@/components/svg/hero-icon";
import { Container } from "../ui/container";

export const CtaSection: React.FC = () => {
	return (
		<section id="cta" className="py-20">
			<Container>
				{" "}
				<div className="relative">
					<div className="px-6 md:px-16 py-8 bg-orange-50 rounded-2xl flex flex-col md:flex-row-reverse justify-between items-center gap-8 md:gap-10 overflow-hidden ">
						{/* Textos e botão */}
						<div className="w-full md:w-1/2 lg:max-w-[560px] flex flex-col gap-6 z-10">
							<div className="flex flex-col gap-3">
								<h3 className="text-neutral-800 text-2xl md:text-3xl font-bold">
									Cada beleza é única e merece um visual perfeito, o Visagismo
									Pandami torna isso possível para todos
								</h3>
								<p className="text-neutral-600 text-base font-normal leading-relaxed">
									Nossa análise personalizada com IA de Visagismo entende o
									formato do rosto e encontra exatamente o que realça a beleza
									natural do seu cliente!
								</p>
							</div>
							<Link href="/#">
								<PrimaryButton
									size="lg"
									icon={<ArrowRight className="h-4 w-4" />}
									className="max-w-72 px-4"
								>
									Comece grátis
								</PrimaryButton>
							</Link>
						</div>

						{/* Imagem */}
						<div className="md:absolute md:left-24 md:bottom-0 z-20">
							<Image
								src="/lp/images/ctasection/ctaSection_womanImage.png"
								alt="Mulher usando o visagismo Pandami"
								width={351}
								height={444}
								className="w-full h-auto md:w-80 md:h-96"
							/>
						</div>

						{/* Elementos decorativos */}
						<div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 md:left-auto md:right-10 md:translate-x-0 z-0 opacity-40 md:opacity-70">
							<div className="w-[489px] h-[252px] md:w-full md:h-full">
								<HeroIcon className="w-full h-full" />
							</div>
						</div>
						<div className="absolute left-0 top-0 w-80 h-80 bg-gradient-to-br from-orange-400/25 to-white/25 rounded-full blur-[50px] z-0" />
					</div>
				</div>
			</Container>
		</section>
	);
};
