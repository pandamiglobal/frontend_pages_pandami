"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import { Container } from "@/app/_components/atoms/ui/container";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/app/_components/atoms/ui/tabs";
import { AboutVisagismComparisonSlider } from "@/app/_components/molecules/about-visagism-comparison-slider";
import { SwipeHandAffordance } from "@/app/_components/atoms/svg/swipe-hand-affordance";
import Image from "next/image";
import { Sparkles, ArrowRight } from "lucide-react";
import { BrandedButton } from "@/app/_components/molecules/branded-button";
import Link from "next/link";

interface VariantSet {
  mainBefore: string;
  mainAfter: string;
  variants: string[]; // 4 imagens
}

const woman: VariantSet = {
  mainBefore: "/lp/images/about-visagism/female-main-before.png",
  mainAfter: "/lp/images/about-visagism/female-main-after.png",
  variants: [
    "/lp/images/about-visagism/female-variant-1.png",
    "/lp/images/about-visagism/female-variant-2.png",
    "/lp/images/about-visagism/female-variant-3.png",
    "/lp/images/about-visagism/female-variant-4.png",
  ],
};

const man: VariantSet = {
  mainBefore: "/lp/images/about-visagism/male-main-before.png",
  mainAfter: "/lp/images/about-visagism/male-main-after.png",
  variants: [
    "/lp/images/about-visagism/male-variant-1.png",
    "/lp/images/about-visagism/male-variant-2.png",
    "/lp/images/about-visagism/male-variant-3.png",
    "/lp/images/about-visagism/male-variant-4.png",
  ],
};

const chips = [
	"Veja como cada formato de rosto foi analisado",
	"Compare o antes e depois de cada sugestão",
	"Entenda por que cada corte funcionou perfeitamente",
];

export function AboutVisagismSection() {
  const [gender, setGender] = useState<"woman" | "man">("woman");
  const prevGender = useRef<"woman" | "man">("woman");
  const directionRef = useRef<1 | -1>(1); // 1 indo para 'man', -1 voltando para 'woman'
  const data = gender === "woman" ? woman : man;

  // Atualiza direção ao mudar gênero
  useEffect(() => {
    if (gender !== prevGender.current) {
      directionRef.current = gender === "man" && prevGender.current === "woman" ? 1 : -1;
      prevGender.current = gender;
    }
  }, [gender]);

  const ChipIcon = useMemo(
    () => (
      <Sparkles className="size-5 text-stone-900/70" strokeWidth={1.8} />
    ),
    []
  );

  return (
		<section id="aboutvisagism" className="py-20 bg-white">
			<Container>
				<h2 className="font-semibold text-center mb-8 text-neutral-900">
					Conheça o Visagismo PandaMi
				</h2>

				<Tabs
					value={gender}
					onValueChange={(v) => setGender(v as any)}
					className="flex flex-col items-center"
				>
					<TabsList className="mb-10 bg-neutral-100 rounded-full p-1 h-auto">
						<TabsTrigger
							value="woman"
							className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 rounded-full px-6 py-2 text-sm md:text-base"
						>
							Feminino
						</TabsTrigger>
						<TabsTrigger
							value="man"
							className="data-[state=active]:bg-white data-[state=active]:shadow-sm data-[state=active]:text-stone-900 rounded-full px-6 py-2 text-sm md:text-base"
						>
							Masculino
						</TabsTrigger>
					</TabsList>

					<TabsContent value="woman" className="w-full">
						{gender === "woman" && (
							<GenderContent
								key={gender}
								data={woman}
								direction={directionRef.current}
							/>
						)}
					</TabsContent>
					<TabsContent value="man" className="w-full">
						{gender === "man" && (
							<GenderContent
								key={gender}
								data={man}
								direction={directionRef.current}
							/>
						)}
					</TabsContent>
				</Tabs>
			</Container>
		</section>
	);
}

interface GenderContentProps { data: VariantSet; direction: 1 | -1 }

function GenderContent({ data, direction }: GenderContentProps) {
  const [selectedVariantIndex, setSelectedVariantIndex] = useState<number | null>(null);

  // Sempre que o dataset (gênero) mudar, limpar seleção para voltar ao padrão
  useEffect(() => {
    setSelectedVariantIndex(null);
  }, [data]);

  const handleVariantClick = (idx: number) => {
    setSelectedVariantIndex((curr) => (curr === idx ? null : idx));
  };

  // Animation config for framer-motion
  const getInitialX = direction * 60;

  return (
		<div className="flex flex-col-reverse md:flex-row gap-8 md:gap-10">
			{/* Right side (texto / variantes / chips / ações) – em mobile fica abaixo */}
			<motion.div
				initial={{ x: getInitialX, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ type: "tween", duration: 0.5 }}
				className="md:w-1/2 flex flex-col gap-6 bg-white rounded-3xl border border-gray-200 p-6 md:p-8 h-full"
			>
				<div>
					<h3 className="text-xl md:text-2xl font-medium text-stone-900 mb-4">
						Veja nossa IA Pandami em ação (demonstração interativa)
					</h3>
					<div className="grid grid-cols-4 gap-4">
						{data.variants.map((v, i) => {
							const isActive = selectedVariantIndex === i;
							return (
								<button
									key={i}
									type="button"
									aria-pressed={isActive}
									onClick={() => handleVariantClick(i)}
									className={cn(
										"relative w-full aspect-3/4 rounded-2xl overflow-hidden border transition focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-primary",
										isActive
											? "border-orange-400 ring-2 ring-orange-300"
											: "border-gray-200 hover:border-gray-300"
									)}
								>
									<Image
										src={v}
										alt={`Estilo ${i + 1}`}
										fill
										className="object-cover"
										sizes="(max-width: 640px) 80px, (max-width: 1024px) 120px, 160px"
										loading="lazy"
										quality={90}
									/>
								</button>
							);
						})}
					</div>
				</div>

				<div className="flex flex-col gap-3">
					{chips.map((c) => (
						<div
							key={c}
							className="flex items-start gap-2 rounded-lg bg-orange-50 px-3 py-2"
						>
							<Sparkles
								className="size-5 text-stone-900/70 mt-0.5"
								strokeWidth={1.8}
							/>
							<p className="text-sm md:text-base text-stone-900 leading-snug">
								{c}
							</p>
						</div>
					))}
				</div>

				<div className="flex flex-col md:flex-row gap-4 mt-2">
					<BrandedButton
							href="https://app.pandami.com.br/auth/sign-up/"
							size="lg"
							icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
						>
							COMEÇAR TESTE DE 7 DIAS
						</BrandedButton>
				</div>
			</motion.div>

			{/* Left slider */}
			<motion.div
				initial={{ x: getInitialX, opacity: 0 }}
				animate={{ x: 0, opacity: 1 }}
				transition={{ type: "tween", duration: 0.5, delay: 0.1 }}
				className="md:w-1/2"
			>
				<AboutVisagismComparisonSlider
					before={data.mainBefore}
					after={
						selectedVariantIndex !== null
							? data.variants[selectedVariantIndex]
							: data.mainAfter
					}
					beforeAlt="Antes do visagismo"
					afterAlt="Depois do visagismo"
					className="w-full"
					affordanceSlot={<SwipeHandAffordance />}
				/>
			</motion.div>
		</div>
	);
}
