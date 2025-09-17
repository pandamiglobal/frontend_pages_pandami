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
  const keyframe1Ref = useRef<HTMLDivElement | null>(null);
  const keyframe2Ref = useRef<HTMLDivElement | null>(null);
  const keyframe3Ref = useRef<HTMLDivElement | null>(null);
  const scannerRef = useRef<HTMLDivElement | null>(null);
  const variantCardsRef = useRef<HTMLDivElement | null>(null);
  const angleCardsRef = useRef<HTMLDivElement | null>(null);
  
  // Configuração das animações GSAP
  useEffect(() => {
    // Configuração inicial
    gsap.set([keyframe2Ref.current, keyframe3Ref.current], { opacity: 0 });
    
    // Timeline para controle das animações
    const masterTimeline = gsap.timeline({
      repeat: -1,
      onUpdate: () => {
        // Atualizamos o estado com base na posição da timeline
        const progress = masterTimeline.progress();
        if (progress < 0.33) {
          setCurrentKeyframe(1);
        } else if (progress < 0.66) {
          setCurrentKeyframe(2);
        } else {
          setCurrentKeyframe(3);
        }
      }
    });
    
    // Keyframe 1 - Pessoa original
    masterTimeline.to({}, { duration: 4 }); // Pausa no keyframe 1
    
    // Transição para Keyframe 2 - Scanner (garante que a imagem nunca desapareça)
    masterTimeline.to(keyframe2Ref.current, { 
      opacity: 1, 
      duration: 0.8 
    });
    masterTimeline.to(keyframe1Ref.current, { 
      opacity: 0, 
      duration: 0.5 
    }, "<0.3");
    
    // Animação do scanner
    if (scannerRef.current) {
      masterTimeline.fromTo(scannerRef.current, 
        { top: 0 },
        { 
          top: "100%", 
          duration: 2, 
          ease: "power1.inOut",
          repeat: 1,
          yoyo: true
        }
      );
    }
    
    // Aparecimento dos cards de variantes
    if (variantCardsRef.current) {
      masterTimeline.fromTo((variantCardsRef.current?.children as unknown as Element[]) || [],
        { opacity: 0, y: 20 },
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
    
    masterTimeline.to({}, { duration: 3 }); // Pausa no keyframe 2
    
    // Transição para Keyframe 3 - Ângulos (fade-in antes do fade-out)
    masterTimeline.to(keyframe3Ref.current, { 
      opacity: 1, 
      duration: 0.8 
    });
    masterTimeline.to(keyframe2Ref.current, { 
      opacity: 0, 
      duration: 0.5 
    }, "<0.3");
    
    // Animação dos cards de ângulos
    if (angleCardsRef.current) {
      masterTimeline.fromTo((angleCardsRef.current?.children as unknown as Element[]) || [],
        { opacity: 0, scale: 0.8 },
        { 
          opacity: 1, 
          scale: 1, 
          duration: 0.5,
          stagger: 0.2,
          ease: "back.out(1.7)"
        }
      );
    }
    
    masterTimeline.to({}, { duration: 3 }); // Pausa no keyframe 3
    
    // Transição de volta para o Keyframe 1 (fade-in antes do fade-out)
    masterTimeline.to(keyframe1Ref.current, { 
      opacity: 1, 
      duration: 0.8 
    });
    masterTimeline.to(keyframe3Ref.current, { 
      opacity: 0, 
      duration: 0.5 
    }, "<0.3");
    
    return () => {
      // Limpeza da animação quando o componente for desmontado
      masterTimeline.kill();
    };
  }, []);

  function DonutPercent({ percent }: { percent: number }) {
    const clamped = Math.max(0, Math.min(100, percent));
    const data = [
      { name: 'value', value: clamped },
      { name: 'rest', value: 100 - clamped },
    ];
    const GREEN = '#22c55e';
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
            isAnimationActive={false}
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
      
      {/* Keyframe 1 - Pessoa */}
      <div 
        ref={keyframe1Ref}
        className={`absolute inset-0 flex items-end justify-center transition-opacity duration-700 ${
          currentKeyframe === 1 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <Image
          src={keyframeImages.person1}
          alt="Hero Person"
          width={486}
          height={659}
          className="w-full h-full object-contain"
          unoptimized
          priority
        />
      </div>
      
      {/* Keyframe 2 - Escaneamento e variantes de cortes */}
      <div 
        ref={keyframe2Ref}
        className={`absolute inset-0 flex items-end justify-center transition-opacity duration-700 z-10 ${
          currentKeyframe === 2 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full h-full relative overflow-hidden">
          <Image
            src={keyframeImages.person1}
            alt="Hero Person Scanned"
            width={480}
            height={650}
            className="w-full h-full object-contain"
            unoptimized
            priority
          />
          
          {/* Scanner Animation */}
          <div className="absolute left-1/2 -translate-x-1/2 top-[8%] w-1/2 max-w-[220px] h-[28%] max-h-[220px] bg-black/0 rounded-2xl outline outline-offset-[-1px] outline-gray-400 overflow-hidden">
            <div className="w-full h-full relative overflow-hidden">
              <div ref={scannerRef} className="absolute w-full h-2 bg-gradient-to-b from-white/40 to-transparent"></div>
            </div>
          </div>
          
          {/* Cards para as variantes */}
          <div ref={variantCardsRef} className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 flex flex-row items-center justify-center gap-4 px-2">
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
              <Image
                src={keyframeImages.variantA}
                alt="Opção A"
                width={106}
                height={106}
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                unoptimized
              />
              <div className="flex flex-col items-center gap-1.5">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Opção A</div>
                <div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">Harmonia</div>
                <DonutPercent percent={94} />
              </div>
            </div>
            
            {/* Variant B Card */}
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
              <Image
                src={keyframeImages.variantB}
                alt="Opção B"
                width={106}
                height={106}
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                unoptimized
              />
              <div className="flex flex-col items-center gap-1.5">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Opção B</div>
                <div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">Harmonia</div>
                <DonutPercent percent={96} />
              </div>
            </div>
            
            {/* Variant C Card */}
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-1px] outline-white/50 backdrop-blur-xl flex items-center gap-3">
              <Image
                src={keyframeImages.variantC}
                alt="Opção C"
                width={106}
                height={106}
                className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                unoptimized
              />
              <div className="flex flex-col items-center gap-1.5">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Opção C</div>
                <div className="text-neutral-800 text-[8px] font-normal font-['Ubuntu']">Harmonia</div>
                <DonutPercent percent={98} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Keyframe 3 - Ângulos */}
      <div 
        ref={keyframe3Ref}
        className={`absolute inset-0 flex items-end justify-center transition-opacity duration-700 z-10 ${
          currentKeyframe === 3 ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="w-full h-full relative">
          <Image
            src={keyframeImages.personFinal}
            alt="Hero Person with Angles"
            width={480}
            height={650}
            className="w-full h-full object-contain"
            unoptimized
            priority
          />
          
          {/* Ângulos Cards */}
          <div ref={angleCardsRef} className="absolute left-1/2 -translate-x-1/2 bottom-2 md:bottom-4 flex flex-row justify-center items-center gap-4 px-2">
            {/* Angle A Card */}
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Ângulo A</div>
                <Image
                  src={keyframeImages.angleA}
                  alt="Ângulo A"
                  width={106}
                  height={106}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                  unoptimized
                />
              </div>
            </div>
            
            {/* Angle B Card */}
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Ângulo B</div>
                <Image
                  src={keyframeImages.angleB}
                  alt="Ângulo B"
                  width={106}
                  height={106}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                  unoptimized
                />
              </div>
            </div>
            
            {/* Angle C Card */}
            <div className="p-3 bg-gradient-to-br from-white/50 to-white/10 rounded-2xl outline outline-offset-[-0.98px] outline-white/50 flex flex-row justify-center items-center gap-3">
              <div className="flex flex-col justify-center items-center gap-2">
                <div className="text-neutral-800 text-sm font-bold font-['Ubuntu']">Ângulo C</div>
                <Image
                  src={keyframeImages.angleC}
                  alt="Ângulo C"
                  width={106}
                  height={106}
                  className="w-24 h-24 md:w-28 md:h-28 rounded-xl object-cover"
                  unoptimized
                />
              </div>
            </div>
          </div>
        </div>
      </div>

     
    </div>
  );
}