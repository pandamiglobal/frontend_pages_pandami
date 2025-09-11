"use client"

import { Container } from "@/components/ui/container"
import Link from "next/link"
import Image from "next/image"
import { ArrowRight } from "lucide-react"
import { PrimaryButton } from "@/components/ui/primary-button"
import { HeroIcon } from "@/components/svg/hero-icon"


const heroPersonImage = "/lp/images/hero/heroPersonImage_Female1.png"


export function HeroSection() {
  return (
		<section
			id="home"
			className="relative bg-[#f7f7f7] overflow-hidden min-h-screen md:min-h-0"
		>
			{/* Background Grid Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

			<Container>
				<div className="relative pt-32  lg:pt-20 pb-0 flex flex-col items-center">
					{/* Content */}
					<div className="z-10 flex flex-col lg:flex-row items-center justify-between w-full">
						<div className="w-full max-w-[800px] flex flex-col gap-4 md:gap-6 px-0 text-center lg:text-left">
							<h1 className="font-semibold text-3xl sm:text-4xl md:text-5xl lg:text-[48px] text-black leading-tight">
								A primeira{" "}
								<span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-[#C16C3F]"> <br />
									IA de Visagismo
								</span>{" "}
								 <br /> para  cabeleireiros 
							</h1>

							<p className="text-gray-600 max-w-[520px] text-sm sm:text-base md:text-lg mx-auto lg:mx-0">
								Nossa inteligência artificial elimina a tentativa e erro:
								analisa o rosto, preferências e características únicas do 
								cliente para sugerir cortes, cores e estilos ideais.
							</p>

							<div className="flex gap-3 items-center justify-center lg:justify-start mt-2">
								<Link href="/#">
									<PrimaryButton 
										icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
										size="lg"
										className="px-4"
									>
										Comece grátis
									</PrimaryButton>
								</Link>
								<Link href="/#plans">
									<PrimaryButton variant="outline" size="lg" className="px-4" >
										Ver planos
									</PrimaryButton>
								</Link>
							</div>
						</div>

						{/* Hero Images */}
						<div className="relative block mt-6 lg:mt-0 w-full max-w-[400px] lg:max-w-[480px]">
							<div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-0">
								<div
									data-svg-wrapper
									data-layer="heroIconImage"
									className="Heroiconimage opacity-40 lg:opacity-100"
								>
									<HeroIcon className="w-full h-full object-contain" />
								</div>
							</div>
							<div className="relative w-full h-auto aspect-[3/4] lg:w-[486px] lg:h-[659px] lg:-mt-8">
								<Image
									src={heroPersonImage}
									alt="Hero Person"
									width={486}
									height={659}
									className="w-full h-full object-cover"
									priority
								/>
							</div>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
