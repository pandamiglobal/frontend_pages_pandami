'use client'

import React, { useEffect, useRef } from 'react'
import { cn } from '@/common/lib/utils'
import gsap from 'gsap'
import Image from 'next/image'

interface SwipeHandAffordanceProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string
}

export function SwipeHandAffordance({
  className,
  ...props
}: SwipeHandAffordanceProps) {
  const containerRef = useRef<HTMLDivElement>(null)

  // Sem sizeMap: tamanhos fixos por padrão; personalize via className externo se necessário

  useEffect(() => {
    // Referência para limpeza
    const container = containerRef.current
    
    if (!container) return
    
    // Resetar qualquer transformação existente
    gsap.set(container, { rotation: -20 })
    
    // Animação do conjunto (mão + seta) com rotação de -8° a 8° (mais sutil)
    const containerTween = gsap.to(container, {
      rotation: 20, // Rotação máxima
      duration: 0.8, // Duração mais lenta para suavidade
      yoyo: true,
      repeat: -1, // Repetição infinita
      ease: "sine.inOut", // Easing mais suave
      transformOrigin: "center center", // Override do transform origin
    })
    
    // Limpeza da animação quando o componente desmonta
    return () => {
      containerTween.kill()
      gsap.set(container, { rotation: 0 }) // Reset na limpeza
    }
  }, [])

  return (
		<div
			ref={containerRef}
			className={cn(
				"relative flex flex-col items-center justify-center gap-[0px] mb-1",
				className
			)}
			style={{
				transformOrigin: "center bottom",
			}}
			{...props}
		>
			{/* Container da Mão */}
			<div className="relative flex-shrink-0 w-[14px] h-[14px]">
				<Image
					src="/svg/FingerSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					style={{
						filter: `brightness(0) saturate(100%)`,
					}}
					className="opacity-100"
				/>
			</div>

			{/* Container da Seta */}
			<div className={cn("relative flex-shrink-0 w-6 h-6")}>
				<Image
					src="/svg/ArrowSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					style={{
						filter: `brightness(0) saturate(100%)`,
					}}
					className="opacity-100"
				/>
			</div>
		</div>
	);
}
