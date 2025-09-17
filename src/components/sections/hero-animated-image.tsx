"use client"

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { HeroIcon } from '@/components/svg/hero-icon';
import { gsap } from 'gsap';
import { PieChart, Pie, Label, Cell } from 'recharts';

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

export function HeroAnimatedImage() {
  const [currentKeyframe, setCurrentKeyframe] = useState(1);
  
  // Referências para os elementos que serão animados com GSAP
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const scannerBoxRef = useRef<HTMLDivElement | null>(null);
  const variantCardsRef = useRef<HTMLDivElement | null>(null);
  const angleCardsRef = useRef<HTMLDivElement | null>(null);
  const person1ImgRef = useRef<HTMLDivElement | null>(null);
  const personFinalImgRef = useRef<HTMLDivElement | null>(null);
  const variantItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  const angleItemRefs = useRef<Array<HTMLDivElement | null>>([]);
  
  // Configuração das animações GSAP
  useEffect(() => {
    const tl = gsap.timeline({ repeat: -1 });

    // KF1 hold + fade in base image
    tl.call(() => setCurrentKeyframe(1))
      .fromTo(person1ImgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .to({}, { duration: 2.4 });

    // KF2 enter: crossfade base image remains person1
    tl.call(() => setCurrentKeyframe(2))
      .fromTo(scannerRef.current, { top: 0 }, { top: "100%", duration: 2, ease: "power1.inOut", repeat: 1, yoyo: true })
      // pop-in variants sequentially
      .fromTo(variantItemRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.9, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.15, ease: "back.out(1.4)" }, "-=1.2")
      .to({}, { duration: 1.0 })
      // destaque de seleção em um card antes de ir ao KF3
      .call(() => {
        const pick = variantItemRefs.current.filter(Boolean)[1] as HTMLDivElement | undefined;
        if (pick) {
          pick.classList.add('outline', 'outline-2', 'outline-primary');
        }
      })
      .to({}, { duration: 0.6 })
      .call(() => {
        const pick = variantItemRefs.current.filter(Boolean)[1] as HTMLDivElement | undefined;
        if (pick) {
          pick.classList.remove('outline', 'outline-2', 'outline-primary');
        }
      });

    // KF3 enter: crossfade final image + pop-in angle cards
    tl.call(() => setCurrentKeyframe(3))
      .fromTo(personFinalImgRef.current, { opacity: 0 }, { opacity: 1, duration: 0.6 })
      .fromTo(angleItemRefs.current.filter(Boolean),
        { opacity: 0, scale: 0.9, y: 12 },
        { opacity: 1, scale: 1, y: 0, duration: 0.35, stagger: 0.15, ease: "back.out(1.4)" })
      .to({}, { duration: 2.0 })
      // voltar para KF1
      .to(personFinalImgRef.current, { opacity: 0, duration: 0.5 });

    return () => { tl.kill(); };
  }, []);

  // Reanima o scanner toda vez que entramos no keyframe 2
  useEffect(() => {
    if (currentKeyframe === 2 && scannerRef.current) {
      gsap.set(scannerRef.current, { top: 0 });
      gsap.to(scannerRef.current, {
        top: "100%",
        duration: 2,
        ease: "power1.inOut",
        repeat: 1,
        yoyo: true,
      });
    }
  }, [currentKeyframe]);

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

  const currentImageSrc = currentKeyframe === 3 ? keyframeImages.personFinal : keyframeImages.person1;
  const showScanner = currentKeyframe === 2;
  const showVariants = currentKeyframe === 2;
  const showAngles = currentKeyframe === 3;

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
						<div className="absolute inset-0 flex items-end justify-center">
				<div className="w-full h-full relative overflow-hidden">
					<Image
						src={currentImageSrc}
						alt="Hero Person"
						width={486}
						height={659}
						className="w-full h-auto object-contain"
						unoptimized
						priority
					/>

					{/* Scanner (only on KF2) */}
					{showScanner && (
						<div
							ref={scannerBoxRef}
							className="absolute left-1/2 -translate-x-1/2 top-[16%] w-1/2 max-w-[220px] h-[300px] max-h-[320px] bg-black/0 rounded-2xl outline outline-offset-[-1px] outline-gray-400 overflow-hidden"
						>
							<div className="w-full h-full relative overflow-hidden">
								<div
									ref={scannerRef}
									className="absolute w-full h-2 bg-gradient-to-b from-white/40 to-transparent"
								></div>
							</div>
						</div>
					)}

					{/* Variant cards (KF2) */}
							{showVariants && (
								<div
									ref={variantCardsRef}
									className="absolute right-3 md:right-6 bottom-2 md:bottom-4 grid grid-cols-2 grid-rows-2 gap-3 px-2 w-full max-w-[480px]"
								>
									{/* célula 1 vazia para formar o L invertido */}
									<div className="hidden md:block" />

									{/* topo direito */}
									<div ref={(el) => { variantItemRefs.current[0] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
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

									{/* base esquerda */}
									<div ref={(el) => { variantItemRefs.current[1] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
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

									{/* base direita */}
									<div ref={(el) => { variantItemRefs.current[2] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
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
					)}

					{/* Angle cards (KF3) */}
					{showAngles && (
						<div
							ref={angleCardsRef}
							className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 flex flex-row justify-center items-center gap-4 px-2 w-[480px]"
						>
									<div ref={(el) => { angleItemRefs.current[0] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
								<div className="flex flex-col justify-center items-center gap-2">
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
							</div>
									<div ref={(el) => { angleItemRefs.current[1] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
								<div className="flex flex-col justify-center items-center gap-2">
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
							</div>
									<div ref={(el) => { angleItemRefs.current[2] = el; }} className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
								<div className="flex flex-col justify-center items-center gap-2">
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
					)}
				</div>
			</div>
		</div>
	);
}