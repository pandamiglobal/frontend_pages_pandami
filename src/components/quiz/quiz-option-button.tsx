import { RadioGroupItem } from "@/components/ui/radio-group"
import { type QuizOption } from "./quiz-questions"
import { useEffect, useRef, memo } from "react"
import gsap from "gsap"

interface QuizOptionButtonProps {
  option: QuizOption
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

export const QuizOptionButton = memo(function QuizOptionButton({ option, index, isSelected, onSelect }: QuizOptionButtonProps) {
  const buttonId = `option-${index}`
  const buttonRef = useRef<HTMLDivElement>(null)
  const glowRef = useRef<HTMLDivElement>(null)
  
  // Extract color for radio fill (convert text-green-600 to fill-green-600)
  const fillColor = option.color.replace('text-', 'fill-')
  
  // Animação de confirmação quando selecionado
  useEffect(() => {
    if (isSelected && buttonRef.current && glowRef.current) {
      const tl = gsap.timeline()
      
      // Animação de confirmação marketizada
      tl.to(buttonRef.current, {
        scale: 1.05,
        duration: 0.2,
        ease: "power2.out"
      })
      .to(glowRef.current, {
        opacity: 1,
        scale: 1.2,
        duration: 0.3,
        ease: "power2.out"
      }, 0)
      .to(buttonRef.current, {
        scale: 1,
        duration: 0.4,
        ease: "elastic.out(1, 0.5)"
      })
      .to(glowRef.current, {
        opacity: 0,
        scale: 1,
        duration: 0.3,
        ease: "power2.in"
      }, "-=0.2")
    }
  }, [isSelected])
  
  return (
    <div
      ref={buttonRef}
      onClick={() => onSelect(index)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
        isSelected
          ? `border-${option.color.replace('text-', '')} ${option.bgColor} shadow-lg`
          : "border-gray-200 hover:border-gray-300 hover:shadow-md hover:scale-[1.02] text-gray-700 hover:bg-gray-50"
      }`}
    >
      {/* Glow effect para animação de confirmação */}
      <div
        ref={glowRef}
        className={`absolute inset-0 rounded-xl opacity-0 pointer-events-none ${
          isSelected ? `bg-${option.color.replace('text-', '')}/10` : 'bg-green-500/10'
        }`}
        style={{
          boxShadow: isSelected 
            ? `0 0 30px ${option.color.includes('green') ? '#22c55e' : '#3b82f6'}40`
            : '0 0 30px rgba(34, 197, 94, 0.25)'
        }}
      />
      
      {/* Shimmer effect no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      <div className="flex items-center relative z-10">
        <RadioGroupItem
          value={buttonId}
          fillColor={fillColor}
          className={`mr-4 size-5 transition-all duration-300 ${
            isSelected 
              ? `border-${option.color.replace('text-', '')} data-[state=checked]:bg-${option.color.replace('text-', '')} data-[state=checked]:border-${option.color.replace('text-', '')} shadow-sm` 
              : "border-gray-300 group-hover:border-gray-400"
          }`}
        />
        <div className="flex items-center">
          <div className={`mr-3 transition-all duration-300 ${
            isSelected 
              ? `${option.color} scale-110` 
              : 'text-gray-500 group-hover:text-gray-600 group-hover:scale-105'
          }`}>
            {option.icon}
          </div>
          <span className={`text-base md:text-lg font-medium transition-all duration-300 ${
            isSelected 
              ? option.color 
              : 'text-gray-700 group-hover:text-gray-900'
          }`}>
            {option.text}
          </span>
        </div>
      </div>
      
      {/* Pulse ring effect quando selecionado */}
      {isSelected && (
        <div className="absolute inset-0 rounded-xl animate-pulse-glow pointer-events-none" />
      )}
    </div>
  )
})
