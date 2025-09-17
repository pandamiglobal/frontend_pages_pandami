"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { HeroIcon } from '@/components/svg/hero-icon';
import { gsap } from 'gsap';
import { PieChart, Pie, Label, Cell } from 'recharts';

// Tipos para o sistema de animação
interface AnimationRefs {
  person1: React.RefObject<HTMLDivElement | null>;
  personFinal: React.RefObject<HTMLDivElement | null>;
  scanner: React.RefObject<HTMLDivElement | null>;
  scannerBox: React.RefObject<HTMLDivElement | null>;
  scannerCheck: React.RefObject<HTMLDivElement | null>;
  variantCardsBox: React.RefObject<HTMLDivElement | null>;
  angleCardsBox: React.RefObject<HTMLDivElement | null>;
  variantCards: React.RefObject<Array<HTMLDivElement | null>>;
  angleCards: React.RefObject<Array<HTMLDivElement | null>>;
}

interface AnimationCallbacks {
  onKeyframeChange: (keyframe: number) => void;
  onCardSelection: (index: number | null) => void;
}

interface AnimationConfig {
  refs: AnimationRefs;
  callbacks: AnimationCallbacks;
  waitTime?: number;
}

interface HeroAnimatedImageProps {
  waitTime?: number;
}

// Configurações de animação centralizadas
const ANIMATION_CONFIGS = {
  durations: {
    keyframe0Hold: 0.2,
    keyframe1Hold: 0.8,
    keyframe2Hold: 0.4,
    keyframe3Hold: 0.6,
    fadeTransition: 0.4,
    popAnimation: 0.3,
    scannerCycle: 0.8,
    cardSelection: 0.2
  },
  easings: {
    smoothEntry: "power2.out",
    smoothExit: "power2.in",
    smoothTransition: "power2.inOut",
    popEntry: "back.out(2.5)",
    popExit: "back.in(2)",
    elasticEntry: "elastic.out(1.2, 0.8)",
    elasticExit: "back.in(2.5)",
    scannerMove: "power1.inOut"
  },
  transforms: {
    initialPersonScale: 0.85,
    personFadeY: 30,
    personRotation: -3,
    blurAmount: "8px",
    cardPopScale: 0.1,
    cardEntryY: 50,
    cardExitY: -30
  },
  staggers: {
    cardEntry: 0.2,
    cardExit: 0.1,
    angleEntry: 0.15
  }
} as const;

// Controlador principal das animações - VERSÃO LIMPA
class HeroAnimationController {
  private timeline: gsap.core.Timeline | null = null;
  private refs: AnimationRefs;
  private callbacks: AnimationCallbacks;
  private waitTime: number;
  private isDestroyed = false;

  constructor(config: AnimationConfig) {
    this.refs = config.refs;
    this.callbacks = config.callbacks;
    this.waitTime = config.waitTime || 2; // Default 2 segundos
    this.setupInitialStates();
  }

  public start(): void {
    if (this.isDestroyed) return;
    
    this.timeline = gsap.timeline({ 
      repeat: -1,
      repeatDelay: 0,
      immediateRender: false
    });
    this.buildAnimationSequence();
  }

  public destroy(): void {
    this.isDestroyed = true;
    this.timeline?.kill();
    this.timeline = null;
  }

  private buildAnimationSequence(): void {
    if (!this.timeline) return;

    this.timeline
      .add(this.createKeyframe0())
      .add(this.createKeyframe1())
      .add(this.createKeyframe2())
      .add(this.createKeyframe3());
  }

  private createKeyframe0(): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    tl.call(() => {
      this.callbacks.onKeyframeChange(0);
      this.callbacks.onCardSelection(null);
    })
    .to({}, { duration: this.waitTime });

    return tl;
  }

  private createKeyframe1(): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    tl.call(() => {
      this.callbacks.onKeyframeChange(1);
      this.callbacks.onCardSelection(null);
    })
    .add(this.animatePersonEntry())
    .to({}, { duration: this.waitTime });

    return tl;
  }

  private createKeyframe2(): gsap.core.Timeline {
    const tl = gsap.timeline();
    
    tl.call(() => this.callbacks.onKeyframeChange(2))
    .add(this.animateScanner())
    .add(this.animateVariantCardsEntry(), "-=2.5") // Ajustado para compensar o delay do check
    .to({}, { duration: this.waitTime })
    .add(this.animateCardSelection())
    .to({}, { duration: this.waitTime })
    .add(this.animateVariantCardsExit());

    return tl;
  }

  private createKeyframe3(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings } = ANIMATION_CONFIGS;
    
    tl.call(() => this.callbacks.onKeyframeChange(3))
    .add(this.animatePersonTransition())
    .add(this.animateAngleCardsEntry(), "-=0.6")
    .to({}, { duration: this.waitTime })
    .add(this.animateAngleCardsExit())
    .add(this.animateFinalExit())
    .add(this.resetAllStates());

    return tl;
  }

  private setupInitialStates(): void {
    const { transforms } = ANIMATION_CONFIGS;

    // Configurar estado inicial de todos os elementos
    gsap.set([this.refs.person1.current, this.refs.personFinal.current], {
      opacity: 0,
      scale: 1,
      y: 0,
      rotationZ: 0,
      filter: "blur(0px)"
    });
    
    gsap.set(this.refs.person1.current, {
      scale: transforms.initialPersonScale,
      y: transforms.personFadeY,
      rotationZ: transforms.personRotation,
      filter: `blur(${transforms.blurAmount})`
    });
    
    gsap.set(this.refs.scannerBox.current, {
      opacity: 0
    });
    
    gsap.set(this.refs.scanner.current, {
      opacity: 0,
      top: 0
    });
    
    gsap.set(this.refs.scannerCheck.current, {
      opacity: 0,
      scale: 0.5
    });
    
    gsap.set(this.refs.variantCards.current?.filter(Boolean), {
      opacity: 0,
      scale: 0.3,
      y: 40
    });
    
    gsap.set(this.refs.angleCards.current?.filter(Boolean), {
      opacity: 0,
      scale: 0.2,
      y: 60
    });
  }

  private animatePersonEntry(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings } = ANIMATION_CONFIGS;

    tl.to(this.refs.person1.current, {
      opacity: 1,
      scale: 1,
      y: 0,
      rotationZ: 0,
      filter: "blur(0px)",
      duration: durations.fadeTransition + 0.2,
      ease: easings.smoothEntry
    });

    return tl;
  }

  private animateScanner(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { easings } = ANIMATION_CONFIGS;

    tl.set(this.refs.scannerBox.current, {
      opacity: 1
    })
    .set(this.refs.scanner.current, {
      opacity: 1,
      top: 0
    })
    .to(this.refs.scanner.current, {
      top: "calc(100% - 8px)", // 8px = altura do scanner (h-2 = 8px)
      duration: 0.4, // Duração de cada ciclo (ida e volta)
      ease: easings.scannerMove,
      repeat: 4, // 4 ciclos completos (ida e volta) = 1.6s total
      yoyo: true
    })
    // Delay de 1.5s antes do check aparecer
    .to({}, { duration: 1.5 })
    // Mostrar o check
    .call(() => {
      gsap.set(this.refs.scannerCheck.current, {
        opacity: 1,
        scale: 0.5
      });
    })
    .to(this.refs.scannerCheck.current, {
      scale: 1,
      duration: 0.3,
      ease: easings.popEntry
    })
    // Aguardar um pouco e depois fazer fade out
    .to({}, { duration: 0.8 })
    .to([this.refs.scannerBox.current, this.refs.scanner.current, this.refs.scannerCheck.current], {
      opacity: 0,
      duration: 0.4,
      ease: easings.smoothExit
    });

    return tl;
  }

  private animateVariantCardsEntry(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings, transforms, staggers } = ANIMATION_CONFIGS;

    tl.fromTo(this.refs.variantCards.current?.filter(Boolean),
      {
        opacity: 0,
        scale: transforms.cardPopScale,
        y: transforms.cardEntryY,
        rotationZ: -20,
        rotationY: 60,
        transformOrigin: "center bottom"
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationZ: 0,
        rotationY: 0,
        duration: durations.popAnimation,
        stagger: staggers.cardEntry,
        ease: easings.popEntry
      }
    );

    return tl;
  }

  private animateVariantCardsExit(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings, staggers } = ANIMATION_CONFIGS;

    tl.to(this.refs.variantCards.current?.filter(Boolean), {
      opacity: 0,
      duration: 0.5,
      stagger: staggers.cardExit,
      ease: easings.smoothExit
    });

    return tl;
  }

  private animateCardSelection(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings } = ANIMATION_CONFIGS;
    
    tl.call(() => {
      const selectedIndex = 1;
      this.callbacks.onCardSelection(selectedIndex);
      
      this.refs.variantCards.current?.forEach((card, index) => {
        if (card) {
          gsap.to(card, {
            opacity: index === selectedIndex ? 1 : 0.5,
            duration: durations.cardSelection,
            ease: easings.smoothEntry
          });
        }
      });
    });

    return tl;
  }

  private resetCardSelection(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings } = ANIMATION_CONFIGS;
    
    tl.call(() => {
      this.callbacks.onCardSelection(null);
      this.refs.variantCards.current?.forEach((card) => {
        if (card) {
          card.classList.remove('outline', 'outline-2', 'outline-primary');
          gsap.to(card, {
            opacity: 1,
            duration: durations.cardSelection,
            ease: easings.smoothEntry
          });
        }
      });
    });

    return tl;
  }

  private animatePersonTransition(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings, transforms } = ANIMATION_CONFIGS;

    tl.to(this.refs.person1.current, {
      opacity: 0,
      scale: 0.95,
      rotationZ: 2,
      duration: durations.fadeTransition - 0.1,
      ease: easings.smoothTransition
    })
    .fromTo(this.refs.personFinal.current,
      {
        opacity: 0,
        scale: 0.9,
        rotationZ: -2,
        filter: "blur(4px)"
      },
      {
        opacity: 1,
        scale: 1,
        rotationZ: 0,
        filter: "blur(0px)",
        duration: durations.fadeTransition,
        ease: easings.smoothEntry
      }, "-=0.6"
    );

    return tl;
  }


  private animateAngleCardsEntry(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings, staggers } = ANIMATION_CONFIGS;

    tl.fromTo(this.refs.angleCards.current?.filter(Boolean),
      {
        opacity: 0,
        scale: 0.2,
        y: 60,
        rotationZ: -20,
        rotationX: 45,
        transformOrigin: "center center"
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        rotationZ: 0,
        rotationX: 0,
        duration: 0.5,
        stagger: staggers.angleEntry,
        ease: easings.elasticEntry
      }
    );

    return tl;
  }

  private animateAngleCardsExit(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { staggers, easings } = ANIMATION_CONFIGS;

    tl.to(this.refs.angleCards.current?.filter(Boolean), {
      opacity: 0,
      duration: 0.6,
      stagger: staggers.cardExit,
      ease: easings.smoothExit
    });

    return tl;
  }

  private animateFinalExit(): gsap.core.Timeline {
    const tl = gsap.timeline();
    const { durations, easings } = ANIMATION_CONFIGS;

    tl.to(this.refs.personFinal.current, {
      opacity: 0,
      scale: 0.95,
      rotationZ: 2,
      duration: durations.fadeTransition,
      ease: easings.smoothExit
    });

    return tl;
  }

  private resetAllStates(): gsap.core.Timeline {
    const tl = gsap.timeline();

    tl.call(() => {
      // Garantir que variant cards fiquem ocultos (não aparecem no keyframe 3)
      gsap.set(this.refs.variantCards.current?.filter(Boolean), {
        opacity: 0,
        scale: 0.3,
        y: 40,
        rotationZ: 0,
        rotationY: 0,
        rotationX: 0
      });

      // Garantir que angle cards fiquem ocultos (não aparecem no keyframe 0, 1, 2)
      gsap.set(this.refs.angleCards.current?.filter(Boolean), {
        opacity: 0,
        scale: 0.2,
        y: 60,
        rotationZ: 0,
        rotationY: 0,
        rotationX: 0
      });

      // Reset do scanner e check
      gsap.set([this.refs.scannerBox.current, this.refs.scanner.current, this.refs.scannerCheck.current], {
        opacity: 0,
        scale: 1
      });
      
      gsap.set(this.refs.scannerCheck.current, {
        scale: 0.5
      });

      // Reset dos callbacks
      this.callbacks.onKeyframeChange(0);
      this.callbacks.onCardSelection(null);
    });

    return tl;
  }
}

const keyframeImages = {
  person1: '/lp/images/hero/heroPersonImage_Female1.png',
  personFinal: '/lp/images/hero/heroPersonImage_Female-Final.png',
  variantA: '/lp/images/hero/heroPersonImageCard_Female-Variant-A.png',
  variantB: '/lp/images/hero/heroPersonImageCard_Female-Variant-B.png',
  variantC: '/lp/images/hero/heroPersonImageCard_Female-Variant-C.png',
  angleA: '/lp/images/hero/heroPersonImageCard_Female-angle-A.png',
  angleB: '/lp/images/hero/heroPersonImageCard_Female-angle-B.png',
  angleC: '/lp/images/hero/heroPersonImageCard_Female-angle-C.png',
};

export function HeroAnimatedImage({ waitTime = 2 }: HeroAnimatedImageProps) {
  const [currentKeyframe, setCurrentKeyframe] = useState(0);
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  
  // Referências para os elementos que serão animados com GSAP
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const scannerBoxRef = useRef<HTMLDivElement | null>(null);
  const scannerCheckRef = useRef<HTMLDivElement | null>(null);
  const variantCardsRef = useRef<HTMLDivElement | null>(null);
  const angleCardsRef = useRef<HTMLDivElement | null>(null);
  const person1ImgRef = useRef<HTMLDivElement | null>(null);
  const personFinalImgRef = useRef<HTMLDivElement | null>(null);
  const variantItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const angleItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroContainerRef = useRef<HTMLDivElement | null>(null);
  
  // Sistema de controle de animações
  const animationController = useRef<HeroAnimationController | null>(null);

  useEffect(() => {
    if (!animationController.current) {
      animationController.current = new HeroAnimationController({
        refs: {
          person1: person1ImgRef,
          personFinal: personFinalImgRef,
          scanner: scannerRef,
          scannerBox: scannerBoxRef,
          scannerCheck: scannerCheckRef,
          variantCardsBox: variantCardsRef,
          angleCardsBox: angleCardsRef,
          variantCards: variantItemRefs,
          angleCards: angleItemRefs
        },
        callbacks: {
          onKeyframeChange: setCurrentKeyframe,
          onCardSelection: setSelectedCardIndex
        },
        waitTime: waitTime
      });
    }

    animationController.current.start();

    return () => {
      animationController.current?.destroy();
    };
  }, []);

  function DonutPercent({ percent }: { percent: number }) {
    const clamped = Math.max(0, Math.min(100, percent));
    const data = [
      { name: 'value', value: clamped },
      { name: 'rest', value: 100 - clamped },
    ];
    const GREEN = '#bbf7d0'; // Tailwind green-200
    const TRACK = '#e5e7eb';

    return (
      <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
        <PieChart width={64} height={64}>
          <Pie
            data={data}
            dataKey="value"
            startAngle={90}
            endAngle={-270}
            innerRadius={20}
            outerRadius={30}
            strokeWidth={0}
            isAnimationActive
            animationDuration={600}
            cornerRadius={9999}
          >
            {data.map((entry, index) => (
              <Cell key={index} fill={index === 0 ? GREEN : TRACK} />
            ))}
            <Label
              content={({ viewBox }) => {
                if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                  return (
                    <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                      <tspan className="fill-neutral-800 text-xs font-medium">{clamped}</tspan>
                      <tspan className="fill-neutral-800 text-[9.6px] font-medium">%</tspan>
                    </text>
                  );
                }
                return null;
              }}
            />
          </Pie>
        </PieChart>
      </div>
    );
  }

  return (
		<div className="relative flex items-end justify-center lg:justify-start h-full w-full max-w-[320px] md:max-w-[400px] lg:max-w-[480px] mx-auto lg:mx-0 self-end">
			<div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-0">
				<div
					data-svg-wrapper
					data-layer="heroIconImage"
					className="Heroiconimage opacity-40 lg:opacity-100"
				>
					<HeroIcon className="w-96 h-64 lg:w-full lg:h-full object-contain" />
				</div>
			</div>

			{/* Unified Keyframe Layer */}
			<div className="absolute inset-0 flex items-end justify-center" ref={heroContainerRef}>
				<div className="w-full h-full relative overflow-hidden">
					{/* Imagem person1 */}
					<div ref={person1ImgRef} className="absolute inset-0 opacity-0">
						<Image
							src={keyframeImages.person1}
							alt="Hero Person 1"
							width={486}
							height={659}
							className="w-full h-auto object-contain"
							unoptimized
							priority
						/>
					</div>
					
					{/* Imagem personFinal */}
					<div ref={personFinalImgRef} className="absolute inset-0 opacity-0">
						<Image
							src={keyframeImages.personFinal}
							alt="Hero Person Final"
							width={486}
							height={659}
							className="w-full h-auto object-contain"
							unoptimized
							priority
						/>
					</div>

					{/* Scanner */}
					<div
						ref={scannerBoxRef}
						className="absolute left-1/2 -translate-x-1/2 top-[80px] w-1/2 max-w-[220px] h-[300px] max-h-[320px] bg-black/0 rounded-2xl outline outline-offset-[-1px] outline-gray-400 overflow-hidden opacity-0"
					>
						<div className="w-full h-full relative overflow-hidden">
							<div
								ref={scannerRef}
								className="absolute w-full h-2 bg-gradient-to-b from-white/60 via-white/40 to-transparent top-0 shadow-lg"
							></div>
							{/* Ícone de check */}
							<div
								ref={scannerCheckRef}
								className="absolute inset-0 flex items-center justify-center opacity-0"
							>
								<div className="w-16 h-16 bg-green-300 rounded-full flex items-center justify-center shadow-lg">
									<svg
										className="w-8 h-8 text-neutral-800"
										fill="none"
										stroke="currentColor"
										viewBox="0 0 24 24"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											strokeLinecap="round"
											strokeLinejoin="round"
											strokeWidth={3}
											d="M5 13l4 4L19 7"
										/>
									</svg>
								</div>
							</div>
						</div>
					</div>

					{/* Variant cards */}
					<div
						ref={variantCardsRef}
						className="absolute bottom-0 right-0 md:bottom-2 md:right-4 grid grid-cols-2 grid-rows-2 gap-3 p-1 md:p-2 w-max"
					>
						{/* célula 1 vazia para formar o L invertido */}
						<div className="hidden md:block" />

						{/* topo direito - Opção A */}
						<div 
							ref={(el) => { variantItemRefs.current[0] = el; }} 
							className={`p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] ${
								selectedCardIndex === 0 ? 'outline-primary outline-2 shadow-lg shadow-primary/20' : 'outline-white/50'
							} backdrop-blur-xl flex items-center gap-3 transition-all duration-300 opacity-0`}>
							<Image
								src={keyframeImages.variantA}
								alt="Opção A"
								width={106}
								height={106}
								className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
								unoptimized
							/>
							<div className="flex flex-col items-center gap-1.5">
								<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
									Opção A
								</div>
								<div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">
									Harmonia
								</div>
								<DonutPercent percent={94} />
							</div>
						</div>

						{/* base esquerda - Opção B */}
						<div 
							ref={(el) => { variantItemRefs.current[1] = el; }} 
							className={`p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] ${
								selectedCardIndex === 1 ? 'outline-primary outline-2 shadow-lg shadow-primary/20' : 'outline-white/50'
							} backdrop-blur-xl flex items-center gap-3 transition-all duration-300 opacity-0`}>
							<Image
								src={keyframeImages.variantB}
								alt="Opção B"
								width={106}
								height={106}
								className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
								unoptimized
							/>
							<div className="flex flex-col items-center gap-1.5">
								<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
									Opção B
								</div>
								<div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">
									Harmonia
								</div>
								<DonutPercent percent={96} />
							</div>
						</div>

						{/* base direita - Opção C */}
						<div 
							ref={(el) => { variantItemRefs.current[2] = el; }} 
							className={`p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] ${
								selectedCardIndex === 2 ? 'outline-primary outline-2 shadow-lg shadow-primary/20' : 'outline-white/50'
							} backdrop-blur-xl flex items-center gap-3 transition-all duration-300 opacity-0`}>
							<Image
								src={keyframeImages.variantC}
								alt="Opção C"
								width={106}
								height={106}
								className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
								unoptimized
							/>
							<div className="flex flex-col items-center gap-1.5">
								<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
									Opção C
								</div>
								<div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">
									Harmonia
								</div>
								<DonutPercent percent={98} />
							</div>
						</div>
					</div>

					{/* Angle cards */}
					<div
						ref={angleCardsRef}
						className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-row justify-center items-end gap-4 p-1 md:p-2 w-max"
					>
						{/* Ângulo A */}
						<div ref={(el) => { angleItemRefs.current[0] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-col justify-center items-center gap-2 opacity-0">
							<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
								Ângulo A
							</div>
							<Image
								src={keyframeImages.angleA}
								alt="Ângulo A"
								width={112}
								height={112}
								className="size-28 md:size-[7rem] rounded-xl object-cover aspect-square"
								unoptimized
							/>
						</div>
						{/* Ângulo B */}
						<div ref={(el) => { angleItemRefs.current[1] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-col justify-center items-center gap-2 opacity-0">
							<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
								Ângulo B
							</div>
							<Image
								src={keyframeImages.angleB}
								alt="Ângulo B"
								width={112}
								height={112}
								className="size-28 md:size-[7rem] rounded-xl object-cover aspect-square"
								unoptimized
							/>
						</div>
						{/* Ângulo C */}
						<div ref={(el) => { angleItemRefs.current[2] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-col justify-center items-center gap-2 opacity-0">
							<div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">
								Ângulo C
							</div>
							<Image
								src={keyframeImages.angleC}
								alt="Ângulo C"
								width={112}
								height={112}
								className="size-28 md:size-[7rem] rounded-xl object-cover aspect-square"
								unoptimized
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}