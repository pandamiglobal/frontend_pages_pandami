"use client"

import { useEffect, useRef } from "react"
import { CheckCircle } from "lucide-react"
import gsap from "gsap"

interface QuizConfirmationProps {
  isVisible: boolean
  onComplete?: () => void
}

export function QuizConfirmation({ isVisible, onComplete }: QuizConfirmationProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const iconRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isVisible && containerRef.current && iconRef.current) {
      const tl = gsap.timeline({
        onComplete: () => {
          setTimeout(() => {
            onComplete?.()
          }, 300)
        }
      })

      // Reset inicial
      gsap.set(containerRef.current, { opacity: 0, scale: 0 })
      gsap.set(iconRef.current, { scale: 0, rotation: -180 })

      // Animação principal - mais simples e focada
      tl.to(containerRef.current, {
        opacity: 1,
        scale: 1,
        duration: 0.4,
        ease: "back.out(2)"
      })
      .to(iconRef.current, {
        scale: 1,
        rotation: 0,
        duration: 0.6,
        ease: "elastic.out(1, 0.3)"
      }, "-=0.2")
      .to(iconRef.current, {
        scale: 1.1,
        duration: 0.2,
        ease: "power2.out",
        yoyo: true,
        repeat: 1
      }, "+=0.1")
      .to(containerRef.current, {
        opacity: 0,
        scale: 0,
        duration: 0.3,
        ease: "power2.in"
      }, "+=0.2")
    }
  }, [isVisible, onComplete])

  if (!isVisible) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
      <div
        ref={containerRef}
        className="flex items-center justify-center"
      >
        {/* Ícone único centralizado */}
        <div
          ref={iconRef}
          className="w-20 h-20 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl border-4 border-white"
          style={{
            filter: 'drop-shadow(0 10px 20px rgba(34, 197, 94, 0.3))'
          }}
        >
          <CheckCircle className="w-10 h-10 text-white" />
        </div>
      </div>
    </div>
  )
}
