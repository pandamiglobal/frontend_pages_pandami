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
		<section id="home" className="relative bg-[#f7f7f7] overflow-hidden min-h-screen md:min-h-0">
			{/* Background Grid Pattern */}
			<div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

			<Container>
				<div className="relative pt-32  lg:pt-20 pb-0 flex flex-col items-center">
					{/* Content */}
					<div className="z-10 flex flex-col lg:flex-row items-center justify-between w-full">
						<div className="w-full max-w-[600px] flex flex-col gap-4 md:gap-6 px-4 text-center lg:text-left">
							<h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-black leading-tight">
								A tecnologia que vai aposentar salões comuns{" "}
							</h1>

							<p className="text-gray-600 max-w-[520px] text-sm sm:text-base md:text-lg mx-auto lg:mx-0">
								Nossa inteligência artificial elimina a tentativa e erro:
								analisa o rosto, preferências e características únicas do seu
								cliente para sugerir cortes, cores e estilos ideais.
							</p>

							<div className="flex gap-3 items-center justify-center lg:justify-start flex-wrap mt-2">
								<Link href="/#">
									<PrimaryButton
										icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
										size="lg"
									>
										Comece grátis
									</PrimaryButton>
								</Link>
								<Link href="/#plans">
									<PrimaryButton variant="outline" size="lg">
										Ver planos
									</PrimaryButton>
								</Link>
							</div>
						</div>

						{/* Hero Images */}
						<div className="relative block mt-6 lg:mt-0 w-full max-w-[400px] lg:max-w-[486px]">
							
								
							
							<div className="relative w-full h-auto aspect-[3/4] lg:w-[486px] lg:h-[659px] lg:-mt-8">
								<HeroIcon className="absolute w-full h-full object-contain" />
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
