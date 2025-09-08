"use client"

import { useEffect, useRef, useState } from 'react'

type ImageComparisonSliderProps = {
  beforeImage: string
  afterImage: string
  beforeAlt: string
  afterAlt: string
  className?: string
  transitionDuration?: number
}

export function ImageComparisonSlider({
  beforeImage,
  afterImage,
  beforeAlt,
  afterAlt,
  className = 'w-64 h-72',
  transitionDuration = 1000
}: ImageComparisonSliderProps) {
  const [sliderPosition, setSliderPosition] = useState(100)
  const [direction, setDirection] = useState<'increasing' | 'decreasing'>('decreasing')
  const [isAnimating, setIsAnimating] = useState(true)
  const containerRef = useRef<HTMLDivElement>(null)
  const animationRef = useRef<number | null>(null)
  
  // Função para animar o slider usando requestAnimationFrame
  // para obter animações mais suaves
  const animate = () => {
    setSliderPosition((prev) => {
      if (direction === 'decreasing') {
        // Diminuindo (mostrando mais da imagem "depois")
        const newPos = prev - 0.5
        if (newPos <= 0) {
          // Pausa antes de mudar de direção
          setTimeout(() => {
            setDirection('increasing')
          }, 800)
          return 0
        }
        return newPos
      } else {
        // Aumentando (mostrando mais da imagem "antes")
        const newPos = prev + 0.5
        if (newPos >= 100) {
          // Pausa antes de mudar de direção
          setTimeout(() => {
            setDirection('decreasing')
          }, 800)
          return 100
        }
        return newPos
      }
    })
    
    // Continua a animação
    animationRef.current = requestAnimationFrame(animate)
  }

  // Inicia a animação quando o componente é montado
  useEffect(() => {
    if (isAnimating) {
      animationRef.current = requestAnimationFrame(animate)
    }
    
    // Limpa a animação quando o componente é desmontado
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current)
      }
    }
  }, [direction, isAnimating])

  return (
    <div
      ref={containerRef}
      className={`relative overflow-hidden rounded-2xl ${className} group`}
    >
      {/* Imagem "depois" (camada de fundo) */}
      <div className="absolute inset-0">
        <img 
          src={afterImage}
          alt={afterAlt}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Imagem "antes" (camada superior) com máscara de clipping */}
      <div className="absolute inset-0">
        <div 
          className="absolute inset-0"
          style={{
            clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
            transition: 'clip-path 0.05s linear'
          }}
        >
          <img 
            src={beforeImage}
            alt={beforeAlt}
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Linha divisória */}
      <div 
        className="absolute inset-y-0 border-r-2 border-white shadow-md pointer-events-none"
        style={{ 
          left: `${sliderPosition}%`,
          transition: 'left 0.05s linear'
        }}
      >
        {/* Indicador na linha divisória */}
        <div className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 rounded-full bg-white shadow-lg flex items-center justify-center">
          <div className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-cyan-500 to-blue-500"></div>
        </div>
      </div>

      {/* Rótulo "Antes" - visível apenas na parte esquerda da divisória */}
      <div 
        className="absolute bottom-3 left-3 bg-black/70 text-white px-2 py-1 text-xs rounded-md font-medium transition-opacity duration-300"
        style={{ 
          opacity: sliderPosition > 5 ? 1 : 0,
          clipPath: `inset(0 ${100 - sliderPosition}% 0 0)`,
        }}
      >
        Antes
      </div>
      
      {/* Rótulo "Depois" - visível apenas na parte direita da divisória */}
      <div 
        className="absolute bottom-3 right-3 bg-black/70 text-white px-2 py-1 text-xs rounded-md font-medium transition-opacity duration-300"
        style={{ 
          opacity: sliderPosition < 95 ? 1 : 0,
          clipPath: `inset(0 0 0 ${sliderPosition}%)`,
        }}
      >
        Depois
      </div>

      {/* Overlay para efeito hover */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 opacity-0 group-hover:opacity-100 transition-opacity"></div>
    </div>
  )
}
