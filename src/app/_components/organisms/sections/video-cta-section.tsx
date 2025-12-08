"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import { BrandedButton } from "@/app/_components/molecules/branded-button";
import { VturbVideoPlayer } from "@/app/_components/molecules/vturb-video-player";
import { TrendingUp, Users, Zap, PlayCircle, ArrowRight } from "lucide-react";
import Image from "next/image";

export function VideoCtaSection() {
	return (
		<section
			id="video"
			className="w-full py-16 md:py-20 bg-white text-neutral-800 overflow-hidden relative"
		>
			<Container className="relative z-10">
				<div className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16">
					{/* Text Content */}
					<div className="flex flex-col gap-6 lg:flex-1 text-center lg:text-left order-1 lg:order-2">
						<div className="space-y-4">
							<div className="inline-flex mx-auto lg:mx-0 items-center gap-2 px-3 py-1 rounded-full bg-[#27D182]/10 border border-[#27D182]/20 w-fit">
								<span className="relative flex h-2 w-2">
									<span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#27D182] opacity-75"></span>
									<span className="relative inline-flex rounded-full h-2 w-2 bg-[#27D182]"></span>
								</span>
								<span className="text-[10px] md:text-xs font-bold text-[#27D182] uppercase tracking-wider">
									Para Profissionais de Beleza
								</span>
							</div>

							<h2 className="text-2xl md:text-3xl lg:text-4xl font-bold leading-tight text-neutral-900">
								Chega de deixar dinheiro na mesa. <br />
								<span className="bg-clip-text text-primary">
									Comece a faturar muito.
								</span>
							</h2>

							<p className="text-base md:text-lg text-neutral-600 leading-relaxed">
								A diferença entre um corte comum e uma experiência premium chega no fim do mês. Com a Pandami o cliente encontra seu salão no Google, perde o medo de cortar, volta todo mês e ainda sai falando bem.
							</p>
						</div>

						<div className="pt-2 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
							<BrandedButton
								size="lg"
								className="w-full sm:w-auto px-6 py-5 text-base font-bold  hover:-translate-y-0.5 transition-all duration-300"
								href="https://app.pandami.com.br/auth/sign-up/"
								icon={<ArrowRight className="size-5" />}
							>
								Quero no meu salão
							</BrandedButton>
						</div>
						<p className="text-xs text-neutral-500 text-center lg:text-left">
							Junte-se a centenas de barbearias inovadoras.
						</p>
					</div>

					{/* Video Section */}
					<div className="w-full lg:w-1/3 flex justify-center lg:justify-start relative">
						<div className="relative w-full max-w-[300px] md:max-w-[340px]">
							{/* Decorative Glow */}

							{/* Video Container */}
							<div className="relative w-full overflow-hidden rounded-2xl shadow-2xl border border-neutral-100 bg-white aspect-[9/16]">
								<VturbVideoPlayer
									videoId="692607a5cb74e367057e6868"
									accountId="6ac07b58-9e8e-40a1-8fed-da5b5628f8f1"
									m3u8Id="692607a5cb74e367057e6868"
									className="w-full h-full bg-neutral-100"
								/>


							</div>

							{/* Floating Elements */}
							<div className="absolute top-6 -right-4 md:-right-8 bg-white/80 backdrop-blur-md border border-white/20 p-2.5 rounded-xl shadow-lg animate-pulse hidden sm:block z-20">
								<PlayCircle className="text-[#27D182] w-6 h-6" />
							</div>

							<div className="absolute bottom-10 -left-4 md:-left-8 bg-white border border-neutral-100 p-3 rounded-xl shadow-lg hidden sm:flex items-center gap-3 max-w-[180px] z-20">
								<div className="flex -space-x-2 shrink-0">
									<div className="relative w-6 h-6 rounded-full border border-white overflow-hidden">
										<Image
											src="/lp/images/carrousel/man-1-after.png"
											alt="Avatar 1"
											fill
											className="object-cover"
											sizes="24px"
											loading="lazy"
										/>
									</div>
									<div className="relative w-6 h-6 rounded-full border border-white overflow-hidden z-1">
										<Image
											src="/lp/images/carrousel/woman-2-after.png"
											alt="Avatar 2"
											fill
											className="object-cover"
											sizes="24px"
											loading="lazy"
										/>
									</div>
									<div className="w-6 h-6 rounded-full bg-neutral-400 border border-white flex items-center justify-center text-[8px] font-bold text-white z-2">
										+500
									</div>
								</div>
								<div className="flex flex-col">
									<span className="text-[10px] font-bold text-neutral-900">
										Salões ativos
									</span>
									<span className="text-[8px] text-neutral-500">
										Resultados reais
									</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
