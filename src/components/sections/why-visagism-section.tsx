"use client";

import { Container } from "@/components/ui/container";
import Image from "next/image";

export function WhyVisagismSection() {
	const features = [
		{
			title: "Sintonia Humana",
			description:
				"No visagismo levamos em conta todas as suas preferências, realidade e expectativas, e buscamos traduzir isso numa imagem com uma estética e harmonia que são 100% suas",
			image: "/lp/images/bentogrid/BentoGrid-1_Sintonia-Humana.png",
		},
		{
			title: "Visual Inteligente",
			description:
				"Nosso processo de análise facial é um estudo técnico e detalhado das suas características únicas, onde avaliamos cada linha, forma e volume, antes de você escolher qualquer procedimento",
			image: "/lp/images/bentogrid/BentoGrid-2_Visual-Inteligente.png",
		},
		{
			title: "Imagem Comunica",
			description:
				"Sente que não passa autoridade? Com o visagismo PandaMi sua imagem transmite exatamente a sua essência, para você dominar qualquer ocasião",
			image: "/lp/images/bentogrid/BentoGrid-3_Imagem-Comunica.png",
		},
		{
			title: "Suas Regras",
			description:
				"Chega de dar ouvidos a palpiteiros. A opinião que importa é a do seu cliente, validada pela nossa análise. Escolha a opção que mais te agrada sem revistas, sem filtro e sem medo de errar",
			image: "/lp/images/bentogrid/BentoGrid-4_Suas-Regras.png",
		},
	];

	return (
		<section id="why" className="w-full pb-10 pt-24 lg:pb-14 bg-neutral-50">
			<Container>
				<h2 className="text-3xl lg:text-4xl font-semibold text-center mb-6 lg:mb-8 text-stone-900">
					Por que Visagismo?
				</h2>

				{/* Primeira linha de cards */}
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 mb-6 lg:mb-8">
					{/* Card 1 - Sintonia Humana - Card maior */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[58%] pt-8 pl-8 ">
						<div className="w-full lg:w-[320px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[0].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[0].description}
							</p>
						</div>

						<Image
							src={features[0].image}
							alt="Sintonia Humana"
							width={400}
							height={300}
							className="lg:w-[40%] w-full  h-full object-contain object-bottom"
							sizes="(max-width: 768px) 100vw, 40vw"
						/>
					</div>

					{/* Card 2 - Visual Inteligente - Card menor */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[42%] pt-8 pl-8 justify-between">
						<div className="w-full lg:w-[288px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[1].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[1].description}
							</p>
						</div>

						<Image
							src={features[1].image}
							alt="Visual Inteligente"
							width={400}
							height={300}
							className="lg:w-[40%] w-full  h-full object-contain object-right"
							sizes="(max-width: 768px) 100vw, 30vw"
						/>
					</div>
				</div>

				{/* Segunda linha de cards */}
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
					{/* Card 3 - Imagem Comunica - Card menor */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[42%] pt-8 pl-8 justify-between">
						<div className="w-full lg:w-[240px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[2].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[2].description}
							</p>
						</div>

						<Image
							src={features[2].image}
							alt="Imagem Comunica"
							width={400}
							height={300}
							className="lg:w-[40%] w-full  h-full object-contain object-bottom"
							sizes="(max-width: 768px) 100vw, 30vw"
						/>
					</div>

					{/* Card 4 - Suas Regras - Card maior */}
					<div className="bg-white border border-gray-200 rounded-2xl shadow-[0px_12px_32px_0px_rgba(6,28,61,0.04)] overflow-hidden flex flex-col lg:flex-row min-h-[300px] max-h-[700px] lg:h-64 lg:w-[58%] pt-8 pl-8 justify-between">
						<div className="w-full lg:w-[320px]">
							<h3 className="text-xl lg:text-2xl font-medium text-stone-900 mb-2 lg:mb-3">
								{features[3].title}
							</h3>
							<p className="text-base lg:text-lg text-gray-700 leading-relaxed">
								{features[3].description}
							</p>
						</div>

						<Image
							src={features[3].image}
							alt="Suas Regras"
							width={400}
							height={300}
							className="lg:w-[40%] w-full  h-full object-contain object-bottom"
							sizes="(max-width: 768px) 100vw, 30vw"
						/>
					</div>
				</div>
			</Container>
		</section>
	);
}
