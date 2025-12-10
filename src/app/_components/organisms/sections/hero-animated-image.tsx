"use client"

import { useState, useEffect, useCallback, memo, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { HeroIcon } from '@/app/_components/atoms/svg/hero-icon';
import { VariantCard } from './variant-card';
import { AngleCard } from './angle-card';

interface HeroAnimatedImageProps {
  waitTime?: number;
}

// Variantes de animação para framer-motion
const personEntryVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.85,
    y: 30,
    rotate: -3,
    filter: "blur(8px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 1, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    rotate: 2,
    transition: { duration: 0.7, ease: "easeInOut" }
  }
};

const personFinalVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.9,
    rotate: -2,
    filter: "blur(4px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    filter: "blur(0px)",
    transition: { duration: 0.8, ease: "easeOut" }
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    rotate: 2,
    transition: { duration: 0.8, ease: "easeIn" }
  }
};

const scannerBoxVariants: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 10 },
  visible: { 
    opacity: 1, 
    scale: 1,
    y: 0,
    transition: { duration: 0.5, ease: [0.34, 1.56, 0.64, 1] }
  },
  exit: { 
    opacity: 0,
    scale: 0.95,
    transition: { duration: 0.3, ease: "easeIn" }
  }
};

const scannerBarVariants: Variants = {
  hidden: { opacity: 0, top: 0, scaleX: 0.8 },
  scanning: {
    opacity: 1,
    top: ["0%", "calc(100% - 12px)"],
    scaleX: 1,
    transition: {
      top: { 
        duration: 1.2, 
        ease: "easeInOut",
        repeat: Infinity,
        repeatType: "reverse"
      },
      opacity: { duration: 0.2 },
      scaleX: { duration: 0.3 }
    }
  },
  done: {
    opacity: 0,
    scaleX: 0.5,
    transition: { duration: 0.3 }
  }
};

const scannerGlowVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: [0.3, 0.6, 0.3],
    transition: {
      opacity: { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
    }
  }
};

const cornerVariants: Variants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, delay: 0.1, ease: "easeOut" }
  }
};

const checkVariants: Variants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: [0.34, 1.56, 0.64, 1] } // back.out equivalent
  }
};

// Animation phase type
type AnimationPhase = 'idle' | 'person1Entry' | 'scanning' | 'scanComplete' | 'variantCards' | 'cardSelected' | 'personTransition' | 'angleCards' | 'exit';

// Timing configuration (in ms)
const PHASE_TIMINGS = {
  idle: 500,
  person1Entry: 1000,
  scanning: 2000,
  scanComplete: 1200,
  variantCards: 2000,
  cardSelected: 2000,
  personTransition: 1000,
  angleCards: 2500,
  exit: 800,
} as const;

// Imagens organizadas para facilitar mapeamento
const KEYFRAME_IMAGES = {
  person1: '/lp/images/hero/heroPersonImage_Female1.png',
  personFinal: '/lp/images/hero/heroPersonImage_Female-Final.png',
  variants: [
    '/lp/images/hero/heroPersonImageCard_Female-Variant-A.png',
    '/lp/images/hero/heroPersonImageCard_Female-Variant-B.png',
    '/lp/images/hero/heroPersonImageCard_Female-Variant-C.png',
  ],
  angles: [
    '/lp/images/hero/heroPersonImageCard_Female-angle-A.png',
    '/lp/images/hero/heroPersonImageCard_Female-angle-B.png',
    '/lp/images/hero/heroPersonImageCard_Female-angle-C.png',
  ]
};

export function HeroAnimatedImage({ waitTime = 2 }: HeroAnimatedImageProps) {
  const [phase, setPhase] = useState<AnimationPhase>('idle');
  const [selectedCardIndex, setSelectedCardIndex] = useState<number | null>(null);
  const [isReady, setIsReady] = useState(false);
  const hasStartedRef = useRef(false);

  // Dados de variantes
  const variantData = [
    { title: 'Opção A', subtitle: 'Harmonia', percent: 94 },
    { title: 'Opção B', subtitle: 'Harmonia', percent: 96 },
    { title: 'Opção C', subtitle: 'Harmonia', percent: 98 },
  ];

  // Dados de ângulos
  const angleData = [
    { title: 'Ângulo A' },
    { title: 'Ângulo B' },
    { title: 'Ângulo C' },
  ];

  // Sequência de fases da animação
  const advancePhase = useCallback(() => {
    setPhase(current => {
      const phases: AnimationPhase[] = [
        'idle', 'person1Entry', 'scanning', 'scanComplete', 
        'variantCards', 'cardSelected', 'personTransition', 
        'angleCards', 'exit'
      ];
      const currentIndex = phases.indexOf(current);
      const nextIndex = (currentIndex + 1) % phases.length;
      
      // Reset card selection when transitioning
      if (phases[nextIndex] === 'cardSelected') {
        setSelectedCardIndex(1); // Select middle card
      } else if (phases[nextIndex] === 'personTransition') {
        setSelectedCardIndex(null);
      }
      
      return phases[nextIndex];
    });
  }, []);

  // Wait for network idle before starting animation to avoid LCP delay
  useEffect(() => {
    if (hasStartedRef.current) return;
    
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      setPhase('angleCards');
      setIsReady(true);
      hasStartedRef.current = true;
      return;
    }

    // Use requestIdleCallback to start animation when browser is idle
    // This prevents animation from competing with LCP resources
    const startAnimation = () => {
      if (hasStartedRef.current) return;
      hasStartedRef.current = true;
      setIsReady(true);
    };

    // Fallback timeout if requestIdleCallback takes too long (max 2s)
    const fallbackTimeout = setTimeout(startAnimation, 2000);
    let idleId: number | undefined;
    let loadHandler: (() => void) | undefined;

    const scheduleStart = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(startAnimation, { timeout: 1500 });
      } else {
        // Fallback for Safari - start immediately after load
        startAnimation();
      }
    };

    if (document.readyState === 'complete') {
      scheduleStart();
    } else {
      loadHandler = () => scheduleStart();
      window.addEventListener('load', loadHandler);
    }

    return () => {
      clearTimeout(fallbackTimeout);
      if (idleId) window.cancelIdleCallback(idleId);
      if (loadHandler) window.removeEventListener('load', loadHandler);
    };
  }, []);

  // Timer para avançar as fases automaticamente (only when ready)
  useEffect(() => {
    if (!isReady) return;
    
    const timing = PHASE_TIMINGS[phase] + (phase === 'variantCards' || phase === 'cardSelected' || phase === 'angleCards' ? waitTime * 1000 : 0);
    const timer = setTimeout(advancePhase, timing);
    
    return () => clearTimeout(timer);
  }, [phase, waitTime, advancePhase, isReady]);

  // Derived states for visibility (show static image until animation is ready)
  const showPerson1 = !isReady || ['person1Entry', 'scanning', 'scanComplete', 'variantCards', 'cardSelected'].includes(phase);
  const showPersonFinal = isReady && ['personTransition', 'angleCards'].includes(phase);
  const showScanner = ['scanning', 'scanComplete'].includes(phase);
  const showScannerBar = phase === 'scanning';
  const showCheck = phase === 'scanComplete';
  const showVariantCards = ['variantCards', 'cardSelected'].includes(phase);
  const showAngleCards = phase === 'angleCards';

  return (
    <div
      className="relative flex flex-col justify-end h-full w-full max-w-[320px] md:max-w-[400px] lg:max-w-[480px] mx-auto lg:mx-0"
      aria-label="Demonstração animada de análise de visagismo"
    >
      {/* Background Icon */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 lg:left-0 lg:translate-x-0 z-0">
        <div className="opacity-40 lg:opacity-100">
          <HeroIcon className="w-96 h-64 lg:w-full lg:h-full object-contain" />
        </div>
      </div>

      {/* Animation Container */}
      <div className="relative w-full h-full flex flex-col justify-end">
        <div className="w-full relative">
          {/* Person 1 Image */}
          <AnimatePresence>
            {showPerson1 && (
              <motion.div
                key="person1"
                variants={personEntryVariants}
                initial={isReady ? "hidden" : "visible"}
                animate="visible"
                exit="exit"
                className="absolute inset-x-0 bottom-0"
              >
                <Image
                  src={KEYFRAME_IMAGES.person1}
                  alt="Pessoa para análise de visagismo - etapa inicial"
                  width={486}
                  height={659}
                  className="w-full h-auto object-contain object-bottom"
                  priority
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                  fetchPriority="high"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Person Final Image */}
          <AnimatePresence>
            {showPersonFinal && (
              <motion.div
                key="personFinal"
                variants={personFinalVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute inset-x-0 bottom-0"
              >
                <Image
                  src={KEYFRAME_IMAGES.personFinal}
                  alt="Pessoa após análise de visagismo - resultado final"
                  width={486}
                  height={659}
                  className="w-full h-auto object-contain object-bottom"
                  loading="eager"
                  sizes="(max-width: 768px) 320px, (max-width: 1024px) 400px, 480px"
                />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Scanner */}
          <AnimatePresence>
            {showScanner && (
              <motion.div
                key="scanner"
                variants={scannerBoxVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                className="absolute left-1/2 -translate-x-1/2 bottom-[160px] md:bottom-[180px] lg:bottom-[240px] w-1/2 max-w-[220px] h-[200px] md:h-[300px] max-h-[320px] rounded-2xl overflow-visible"
                aria-hidden="true"
              >
                {/* Background glow effect */}
                <motion.div
                  variants={scannerGlowVariants}
                  initial="hidden"
                  animate="visible"
                  className="absolute -inset-0.5 bg-gradient-to-r from-primary/5 via-accent/8 to-primary/5 rounded-2xl -z-10"
                />
                
                {/* Scanner frame with glass effect */}
                <div className="w-full h-full relative bg-black/30 rounded-2xl border border-white/20 overflow-hidden">
                  {/* Corner accents */}
                  <motion.div variants={cornerVariants} initial="hidden" animate="visible" className="absolute top-2 left-2 w-6 h-6 border-l-2 border-t-2 border-primary rounded-tl-lg" />
                  <motion.div variants={cornerVariants} initial="hidden" animate="visible" className="absolute top-2 right-2 w-6 h-6 border-r-2 border-t-2 border-primary rounded-tr-lg" />
                  <motion.div variants={cornerVariants} initial="hidden" animate="visible" className="absolute bottom-2 left-2 w-6 h-6 border-l-2 border-b-2 border-primary rounded-bl-lg" />
                  <motion.div variants={cornerVariants} initial="hidden" animate="visible" className="absolute bottom-2 right-2 w-6 h-6 border-r-2 border-b-2 border-primary rounded-br-lg" />
                  
                  {/* Scanner Bar with gradient and glow */}
                  <motion.div
                    variants={scannerBarVariants}
                    initial="hidden"
                    animate={showScannerBar ? "scanning" : "done"}
                    className="absolute w-full h-3 z-20"
                  >
                    {/* Main bar */}
                    <div className="w-full h-full bg-gradient-to-r from-transparent via-primary to-transparent" />
                    {/* Glow trail */}
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/60 to-transparent blur-md" />
                    {/* Light beam effect */}
                    <div className="absolute -bottom-8 left-0 right-0 h-12 bg-gradient-to-b from-primary/20 to-transparent" />
                  </motion.div>
                  
                  {/* Subtle grid overlay */}
                  <div className="absolute inset-0 opacity-10" style={{
                    backgroundImage: 'linear-gradient(to right, rgba(255,255,255,0.8) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.8) 1px, transparent 1px)',
                    backgroundSize: '20px 20px'
                  }} />
                  
                  {/* Check Icon */}
                  <AnimatePresence>
                    {showCheck && (
                      <motion.div
                        key="check"
                        variants={checkVariants}
                        initial="hidden"
                        animate="visible"
                        className="absolute inset-0 flex items-center justify-center z-30"
                      >
                        <motion.div 
                          className="w-16 h-16 bg-gradient-to-br from-green-400 to-green-500 rounded-full flex items-center justify-center shadow-lg shadow-green-500/30"
                          animate={{ 
                            boxShadow: ['0 10px 15px -3px rgba(34, 197, 94, 0.3)', '0 10px 25px -3px rgba(34, 197, 94, 0.5)', '0 10px 15px -3px rgba(34, 197, 94, 0.3)']
                          }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          <svg
                            className="w-8 h-8 text-white drop-shadow-sm"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            aria-label="Verificação concluída"
                          >
                            <motion.path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={3}
                              d="M5 13l4 4L19 7"
                              initial={{ pathLength: 0 }}
                              animate={{ pathLength: 1 }}
                              transition={{ duration: 0.4, delay: 0.1 }}
                            />
                          </svg>
                        </motion.div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Variant Cards */}
          <AnimatePresence mode="wait">
            {showVariantCards && (
              <motion.div
                key="variant-cards-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute bottom-0 md:bottom-2 left-2 md:left-0 md:right-4 grid grid-cols-2 grid-rows-2 gap-3 p-1 md:p-2 w-max scale-50 md:scale-100 lg:mb-0 z-10"
                aria-label="Opções de variantes de visagismo"
              >
                <div className="block" />
                {variantData.map((variant, index) => (
                  <motion.div
                    key={`variant-${index}`}
                    initial={{ opacity: 0, scale: 0.1, y: 50, rotateZ: -20 }}
                    animate={{ 
                      opacity: selectedCardIndex === null ? 1 : selectedCardIndex === index ? 1 : 0.5,
                      scale: 1, 
                      y: 0, 
                      rotateZ: 0 
                    }}
                    transition={{ 
                      duration: 0.4, 
                      delay: index * 0.15,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    style={{ transformOrigin: "center bottom" }}
                  >
                    <VariantCard
                      index={index}
                      imageSrc={KEYFRAME_IMAGES.variants[index]}
                      title={variant.title}
                      subtitle={variant.subtitle}
                      percent={variant.percent}
                      isSelected={selectedCardIndex === index}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          {/* Angle Cards */}
          <AnimatePresence mode="wait">
            {showAngleCards && (
              <motion.div
                key="angle-cards-container"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, transition: { duration: 0.3 } }}
                className="absolute bottom-0 md:bottom-2 left-1/2 -translate-x-1/2 flex flex-row justify-center items-end gap-4 p-1 md:p-2 w-max scale-50 md:scale-100 z-10"
                aria-label="Opções de ângulos de visualização"
              >
                {angleData.map((angle, index) => (
                  <motion.div
                    key={`angle-${index}`}
                    initial={{ opacity: 0, scale: 0.2, y: 60, rotateZ: -20 }}
                    animate={{ opacity: 1, scale: 1, y: 0, rotateZ: 0 }}
                    transition={{ 
                      duration: 0.5, 
                      delay: index * 0.15,
                      ease: [0.34, 1.56, 0.64, 1]
                    }}
                    style={{ transformOrigin: "center center" }}
                  >
                    <AngleCard
                      index={index}
                      imageSrc={KEYFRAME_IMAGES.angles[index]}
                      title={angle.title}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

export default memo(HeroAnimatedImage);