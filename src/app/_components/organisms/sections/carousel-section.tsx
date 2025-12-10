"use client";

import { Container } from "@/app/_components/atoms/ui/container";
import { BadgeIcon } from "@/app/_components/atoms/svg/badge-icon";
import { ImageComparisonSlider } from "./image-comparison-slider";
import { useRef, useEffect, useMemo, useState } from "react";
import { motion, useAnimationControls } from "framer-motion";

// Tipos otimizados para melhor performance e type safety
interface BeforeAfterPair {
	readonly beforeSrc: string;
	readonly afterSrc: string;
	readonly beforeAlt: string;
	readonly afterAlt: string;
	readonly className?: string;
}

interface MarqueeRowProps {
	readonly items: readonly BeforeAfterPair[];
	readonly reverse?: boolean;
	readonly speed?: number; // Velocidade: valores menores = mais rápido, maiores = mais lento
}

// Constantes para melhor manutenção e performance
const ANIMATION_CONFIG = {
	BASE_SPEED: 50, // Velocidade base para cálculos
	GAP_BETWEEN_ITEMS: 6,
	EDGE_FADE_WIDTH: 24,
} as const;

// Função auxiliar otimizada para criar pares de imagens
const createImagePair = (
	gender: "woman" | "man",
	index: number,
	className: string = "w-64 h-72"
): BeforeAfterPair =>
	({
		beforeSrc: `/lp/images/carrousel/${gender}-${index}-before.png`,
		afterSrc: `/lp/images/carrousel/${gender}-${index}-after.png`,
		beforeAlt: `${gender === "woman" ? "Mulher" : "Homem"} antes do visagismo`,
		afterAlt: `${gender === "woman" ? "Mulher" : "Homem"} depois do visagismo`,
		className,
	} as const);

// Dados das imagens - memoizados para evitar recriação
const womenPairs = [
	createImagePair("woman", 1),
	createImagePair("woman", 2, "w-72 h-72"),
	createImagePair("woman", 3, "w-56 h-72"),
	createImagePair("woman", 4),
	createImagePair("woman", 5),
] as const;

const menPairs = [
	createImagePair("man", 1),
	createImagePair("man", 2, "w-80 h-72"),
	createImagePair("man", 3),
	createImagePair("man", 4),
	createImagePair("man", 5),
] as const;

/**
 * MarqueeRow - Componente de rolagem infinita usando framer-motion
 */
function MarqueeRow({ items, reverse = false, speed = 50 }: MarqueeRowProps) {
	const containerRef = useRef<HTMLDivElement>(null);
	const controls = useAnimationControls();
	const [isVisible, setIsVisible] = useState(true);

	// Cálculo da duração baseado na velocidade
	const animationDuration = useMemo(() => {
		const baseSpeed = speed || ANIMATION_CONFIG.BASE_SPEED;
		return Math.max(20, (ANIMATION_CONFIG.BASE_SPEED / baseSpeed) * 40);
	}, [speed]);

	// Observer para pausar quando fora da viewport
	useEffect(() => {
		const container = containerRef.current;
		if (!container) return;

		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.1 }
		);

		observer.observe(container);
		return () => observer.disconnect();
	}, []);

	// Controla animação baseado na visibilidade
	useEffect(() => {
		if (isVisible) {
			controls.start({
				x: reverse ? "0%" : "-50%",
				transition: {
					x: {
						repeat: Infinity,
						repeatType: "loop",
						duration: animationDuration,
						ease: "linear",
					},
				},
			});
		} else {
			controls.stop();
		}
	}, [isVisible, controls, reverse, animationDuration]);

	const renderItems = (keyPrefix: string) =>
		items.map((item, i) => (
			<div key={`${keyPrefix}-${i}`} className="relative shrink-0">
				<ImageComparisonSlider
					beforeImage={item.beforeSrc}
					afterImage={item.afterSrc}
					beforeAlt={item.beforeAlt}
					afterAlt={item.afterAlt}
					className={item.className}
				/>
			</div>
		));

	return (
		<div ref={containerRef} className="relative w-full overflow-hidden">
			<motion.div
				className="flex will-change-transform"
				initial={{ x: reverse ? "-50%" : "0%" }}
				animate={controls}
			>
				{/* Primeira sequência */}
				<div
					className="flex flex-nowrap shrink-0"
					style={{
						gap: `${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
						padding: `0 ${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS}px`,
					}}
				>
					{renderItems("first")}
				</div>

				{/* Segunda sequência duplicada para loop infinito */}
				<div
					className="flex flex-nowrap shrink-0"
					style={{
						gap: `${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
						padding: `0 ${ANIMATION_CONFIG.GAP_BETWEEN_ITEMS * 4}px`,
					}}
				>
					{renderItems("second")}
				</div>
			</motion.div>

			{/* Efeito de fade nas bordas */}
			<div
				className="pointer-events-none absolute inset-y-0 left-0 bg-linear-to-r from-neutral-50 to-transparent z-10"
				style={{ width: `${ANIMATION_CONFIG.EDGE_FADE_WIDTH}px` }}
			/>
			<div
				className="pointer-events-none absolute inset-y-0 right-0 bg-linear-to-l from-neutral-50 to-transparent z-10"
				style={{ width: `${ANIMATION_CONFIG.EDGE_FADE_WIDTH}px` }}
			/>
		</div>
	);
}

/**
 * CarouselSection - Seção otimizada de showcase de transformações visuais
 * Exibe uma seleção de imagens antes/depois em rolagem automática infinita
 */
export default function CarouselSection() {
	return (
		<>
			<div className="bg-neutral-800">
				<section
					id="carousel"
					className="w-full pt-20 pb-40 bg-neutral-50 overflow-hidden relative flex flex-col justify-center items-center rounded-bl-[32px] rounded-br-[32px]"
				>
					<Container>
						{/* Cabeçalho da seção otimizado */}
						<div className="max-w-3xl mx-auto text-center mb-12">
							<h2 className="font-semibold text-center mb-2   text-neutral-900">
								Transformações reais de{" "}
								<span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-primary to-[#C16C3F]">
									visagismo
								</span>{" "}
								feito por nossa IA
							</h2>

							<p className="text-center text-neutral-600 max-w-4xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
								Cada resultado seguiu exatamente as recomendações da nossa
								análise matemática. Veja como diferentes formatos de rosto foram
								valorizados cientificamente.
							</p>
						</div>

						{/* Carousel de imagens otimizado */}
						<div className="flex flex-col justify-start items-center gap-14">
							{/* Linha superior - Mulheres - Speed menor para movimento mais rápido */}
							<section className="w-full" aria-label="Transformações femininas">
								<MarqueeRow items={womenPairs} speed={30} />
							</section>

							{/* Linha inferior - Homens (direção invertida) */}
							<section
								className="w-full"
								aria-label="Transformações masculinas"
							>
								<MarqueeRow items={menPairs} reverse speed={40} />
							</section>
						</div>
					</Container>
				</section>

				{/* Seção separada para o badge */}
				<section
					className="w-full py-10  h-20 z-20  bg-neutral-800  relative flex flex-col justify-center items-center"
				>
					<BadgeIcon />
				</section>
			</div>
		</>
	);
}
