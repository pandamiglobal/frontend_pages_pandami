"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";
import { Container } from "@/components/ui/container";
import { AboutVisagismComparisonSlider } from "@/components/sections/about-visagism-comparison-slider";
import { PrimaryButton } from "@/components/ui/primary-button";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { cn } from "@/common/lib/utils";

interface Testimonial {
  id: string;
  name: string;
  age: number;
  text: string;
  before: string; // path imagem antes
  after: string;  // path imagem depois
  avatar: string; // pequeno círculo
}

// Imagens reais de antes/depois em /public/lp/images/social-proof
const testimonials: Testimonial[] = [
  {
    id: "patricia",
    name: "Patrícia Costa",
    age: 45,
    text:
      "Gente, chegando nos 45 eu me sentia completamente invisível, usava o mesmo corte há anos e uma make que não combinava nada comigo. Me olhava no espelho e pensava 'cadê aquela mulher poderosa que eu era?'. Depois do visagismo eu voltei a me sentir gata de novo! Mudaram meu corte, me ensinaram técnicas que valorizam meu rosto, e agora eu me reconheço no espelho sabe? É incrível como me trouxe de volta a confiança que eu tinha perdido.",
    before: "/lp/images/social-proof/social-proof_patricia-before.png",
    after: "/lp/images/social-proof/social-proof_patricia-after.png",
    avatar: "/lp/images/social-proof/social-proof_patricia-after.png",
  },
  {
    id: "carlos",
    name: "Carlos Santana",
    age: 34,
    text:
      "Eu sempre pedia o mesmo corte: passa a máquina no 1 na cabeça toda, Meu cabelo crespo ficava sem forma, armado, parecia que eu tinha 15 anos. Descobri o visagismo masculino e o profissional me explicou que cabelo crespo precisa de corte específico. Fez um mid fade bem feito e deixou o topo num comprimento que define os cachos, até me ensinou como finalizar. Agora meu cabelo tem forma, pareço mais maduro e confiante.",
    before: "/lp/images/social-proof/social-proof_carlos-before.png",
    after: "/lp/images/social-proof/social-proof_carlos-after.png",
    avatar: "/lp/images/social-proof/social-proof_carlos-after.png",
  },
  {
    id: "marcelo",
    name: "Marcelo Ribeiro",
    age: 35,
    text:
      "Eu cortava cabelo sempre no mesmo lugar, falava pro barbeiro 'corta aí' e pronto. E sempre era o mesmo resultado, ficava sempre igual, sem forma nenhuma. Aí descobri o visagismo, o cara analisou meu rosto todo e fui fazendo as sessões. Ele me explicou que meu rosto é mais quadrado então precisava de um corte que valorizasse meu rosto, e a diferença foi absurda! Saio na rua e ninguém me conhece mais, falam que tô diferente. Nunca pensei que corte de cabelo fazia tanta diferença assim.",
    before: "/lp/images/social-proof/social-proof_marcelo-before.png",
    after: "/lp/images/social-proof/social-proof_marcelo-after.png",
    avatar: "/lp/images/social-proof/social-proof_marcelo-after.png",
  },
  {
    id: "valquiria",
    name: "Valquíria Santos",
    age: 25,
    text:
      "Eu sempre fui meio perdida com meu visual, tinha aquele cabelo bem básico, sempre preso num rabo de cavalo, e uma franja que eu mesma cortava em casa. Me achava sem graça, meio sem personalidade, e toda vez que eu saia eu passava despercebida. Uma amiga me indicou o visagismo e resolvi tentar. A profissional analisou meu rosto e mostrou que eu podia ousar mais! A transformação foi incrível! Me sinto muito mais confiante, todo rolê que eu vou as pessoas me notam mais.",
    before: "/lp/images/social-proof/social-proof_valquiria-before.png",
    after: "/lp/images/social-proof/social-proof_valquiria-after.png",
    avatar: "/lp/images/social-proof/social-proof_valquiria-after.png",
  },
  {
    id: "andrew",
    name: "Andrew Borges",
    age: 31,
    text:
      "Cara, eu estava com aquele visual meio bagunçado há muito tempo, cabelo crescido sem forma e barba mal cuidada. Achava que estava normal, mas quando olho essa foto de antes vejo que parecia meio largado mesmo. Descobri o visagismo e o profissional fez um trabalho incrível! Cortou meu cabelo num estilo moderno que valoriza meu rosto, fez um degradê perfeito nas laterais e ajustou a barba de um jeito que define minha mandíbula. Agora me sinto muito mais confiante e elegante.",
    before: "/lp/images/social-proof/social-proof_andrew-before.png",
    after: "/lp/images/social-proof/social-proof_andrew-after.png",
    avatar: "/lp/images/social-proof/social-proof_andrew-after.png",
  },
  {
    id: "simone",
    name: "Simone Martins",
    age: 21,
    text:
      "Gente, eu não me reconhecia mais no espelho, depois da gravidez do Enzo meu rosto parecia sem vida e meu cabelo estava tão ressecado que eu até pensei em raspar tudo. Agora eu me olho no espelho e me acho tão gata, me sinto eu de novo sabe? É incrível como o visagismo me trouxe de volta a pessoa que eu sempre fui por dentro, só que agora ela aparece por fora também, me senti super acolhida no atendimento. Sério, foi a melhor decisão que já tomei na vida!!",
    before: "/lp/images/social-proof/social-proof_simone-before.png",
    after: "/lp/images/social-proof/social-proof_simone-after.png",
    avatar: "/lp/images/social-proof/social-proof_simone-after.png",
  },
];

export function SocialProofSection() {
  const [index, setIndex] = useState(5); // começa no depoimento da Simone conforme screenshot
  const current = testimonials[index];
  const leftRef = useRef<HTMLDivElement | null>(null);
  const rightRef = useRef<HTMLDivElement | null>(null);
  const navRef = useRef<HTMLDivElement | null>(null);
  const firstRender = useRef(true);
  const prevIndex = useRef(index);
  const directionRef = useRef<1 | -1>(1); // 1 = avançando, -1 = retrocedendo
  const [isMobile, setIsMobile] = useState(false);

  // Detecta se é mobile
  useEffect(() => {
    const checkIsMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    
    checkIsMobile();
    window.addEventListener('resize', checkIsMobile);
    
    return () => {
      window.removeEventListener('resize', checkIsMobile);
    };
  }, []);

  // Animação slide-in direcional a cada mudança de slide
  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      prevIndex.current = index;
      return;
    }

    // Determina direção considerando wrap
    if (index === 0 && prevIndex.current === testimonials.length - 1) {
      directionRef.current = 1;
    } else if (index === testimonials.length - 1 && prevIndex.current === 0) {
      directionRef.current = -1;
    } else {
      directionRef.current = index > prevIndex.current ? 1 : -1;
    }

    prevIndex.current = index;

    const reduceMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) return;

    const dir = directionRef.current; // 1 ou -1
    const l = leftRef.current;
    const r = rightRef.current;
    const tl = gsap.timeline({ defaults: { ease: 'power3.out', duration: 0.6 } });

    if (navRef.current) {
      tl.fromTo(
        navRef.current.querySelectorAll('button[aria-label^="Ver depoimento"]'),
        { opacity: 0.65 },
        { opacity: 1, stagger: 0.04, duration: 0.3 },
        0
      );
    }

    if (l && r) {
      gsap.set([l, r], { willChange: 'opacity, transform' });
      // Estado inicial fora de tela leve + fade
      gsap.set(l, { x: dir * 60, autoAlpha: 0 });
      gsap.set(r, { x: dir * 80, autoAlpha: 0 });

      tl.to(l, { x: 0, autoAlpha: 1 }, 0.05)
        .to(r, { x: 0, autoAlpha: 1 }, 0.1)
        .add(() => {
          gsap.set([l, r], { clearProps: 'willChange' });
        });
    }

    return () => {
      tl.kill();
    };
  }, [index]);

  function prev() {
    setIndex((i) => (i === 0 ? testimonials.length - 1 : i - 1));
  }

  function next() {
    setIndex((i) => (i === testimonials.length - 1 ? 0 : i + 1));
  }

  return (
		<section id="socialproof" className="py-20 bg-neutral-50 overflow-hidden">
			<Container className="overflow-visible">
				<h2 className="text-2xl lg:text-3xl font-semibold text-center mb-2   text-stone-900">
					Clientes reais, transformações reais com análise PandaMi
				</h2>
				<p className="text-center text-gray-600 max-w-3xl mx-auto mb-12 lg:mb-8 px-4 lg:px-0">
					Veja o que acontece quando profissionais usam nossa IA para escolher o
					corte perfeito. Deslize nas fotos para ver o antes e depois.
				</p>

				{/* Navegação */}
				<div
					ref={navRef}
					className="flex items-center justify-center gap-4 sm:gap-6 mb-10 max-w-full px-2"
				>
					<button
						onClick={prev}
						aria-label="Anterior"
						className="p-2 rounded-full bg-orange-50 border border-orange-200 text-stone-900 hover:bg-orange-100 transition shrink-0"
					>
						<ArrowLeft className="size-4 sm:size-5" />
					</button>
					<ul className="flex gap-2 sm:gap-4 items-center overflow-x-hidden max-w-[calc(100%-5rem)]">
						{/* No mobile: apenas 3 avatares (anterior, atual e próximo) */}
						{testimonials.map((t, i) => {
							// Determina os 3 índices visíveis no mobile (para telas pequenas)
							const prevIdx = index === 0 ? testimonials.length - 1 : index - 1;
							const nextIdx = index === testimonials.length - 1 ? 0 : index + 1;
							const isVisibleOnMobile =
								i === prevIdx || i === index || i === nextIdx;

							return (
								<li
									key={t.id}
									className={cn(
										!isVisibleOnMobile && "hidden sm:block" // Oculta no mobile se não for um dos 3 avatares visíveis
									)}
								>
									<button
										aria-label={`Ver depoimento de ${t.name}`}
										onClick={() => setIndex(i)}
										className={cn(
											"relative size-12 rounded-full border overflow-hidden transition",
											i === index
												? "border-orange-400 ring-2 ring-orange-200"
												: "border-white/70 opacity-70 hover:opacity-100"
										)}
									>
										<Image
											src={t.avatar}
											alt={t.name}
											width={128}
											height={128}
											className="w-12 h-12 object-cover object-center"
											sizes="256px"
											priority={i === index}
										/>
									</button>
								</li>
							);
						})}
					</ul>
					<button
						onClick={next}
						aria-label="Próximo"
						className="p-2 rounded-full bg-orange-50 border border-orange-200 text-stone-900 hover:bg-orange-100 transition shrink-0"
					>
						<ArrowRight className="size-5" />
					</button>
				</div>

				{/* Slide atual */}
				<div className="flex flex-col lg:flex-row gap-6 lg:gap-8 items-stretch">
					<div ref={leftRef} key={current.id + "-left"} className="lg:w-1/2">
						<AboutVisagismComparisonSlider
							before={current.before}
							after={current.after}
							beforeAlt="Antes do visagismo"
							afterAlt="Depois do visagismo"
							className="w-full h-[420px] md:h-[500px]"
						/>
					</div>
					<div
						ref={rightRef}
						key={current.id + "-right"}
						className="lg:w-1/2 bg-white rounded-[32px] border border-gray-200 p-6 md:p-8 flex flex-col justify-between"
					>
						<div className="flex flex-col gap-4">
							<p className="text-stone-900 text-lg md:text-2xl leading-relaxed">
								“{current.text}”
							</p>
							<p className="text-neutral-600 text-sm md:text-base">
								{current.name}, {current.age} anos
							</p>
						</div>
						<div className="mt-6">
							<PrimaryButton
								size="lg"
								className="w-full md:w-auto px-8"
								icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5" />}
							>
								Quero no meu salão
							</PrimaryButton>
						</div>
					</div>
				</div>
			</Container>
		</section>
	);
}
