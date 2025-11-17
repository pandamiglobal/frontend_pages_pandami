import { QuizRadio } from "./quiz-radio"
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
  const fillColor = option.color.includes('text-') ? option.color.replace('text-', 'fill-') : `fill-${option.color}`
  
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
  
  // Helper functions for color handling
  const getBorderClass = () => {
    if (!isSelected) return "border-gray-200"
    if (option.color.includes('green')) return "border-green-600"
    if (option.color.includes('blue')) return "border-blue-600"
    if (option.color.includes('amber')) return "border-amber-600"
    if (option.color.includes('red')) return "border-red-600"
    if (option.color.includes('gray')) return "border-gray-600"
    return "border-gray-200"
  }
  
  const getBackgroundColorWithOpacity = (color: string): string => {
    if (color.includes('green')) return 'rgba(34, 197, 94, 0.1)' // green-500 with opacity
    if (color.includes('blue')) return 'rgba(59, 130, 246, 0.1)' // blue-500 with opacity
    if (color.includes('amber')) return 'rgba(245, 158, 11, 0.1)' // amber-500 with opacity
    if (color.includes('red')) return 'rgba(239, 68, 68, 0.1)' // red-500 with opacity
    if (color.includes('gray')) return 'rgba(107, 114, 128, 0.1)' // gray-500 with opacity
    return 'rgba(34, 197, 94, 0.1)' // Default green
  }
  
  const getShadowColor = (color: string): string => {
    if (color.includes('green')) return 'rgba(34, 197, 94, 0.4)' // green-500 with opacity
    if (color.includes('blue')) return 'rgba(59, 130, 246, 0.4)' // blue-500 with opacity
    if (color.includes('amber')) return 'rgba(245, 158, 11, 0.4)' // amber-500 with opacity
    if (color.includes('red')) return 'rgba(239, 68, 68, 0.4)' // red-500 with opacity
    if (color.includes('gray')) return 'rgba(107, 114, 128, 0.4)' // gray-500 with opacity
    return 'rgba(34, 197, 94, 0.4)' // Default green
  }
  
  return (
    <div
      ref={buttonRef}
      onClick={() => onSelect(index)}
      className={`w-full text-left p-4 rounded-xl border-2 transition-all duration-300 cursor-pointer relative overflow-hidden group ${
        isSelected
          ? `${getBorderClass()} ${option.bgColor} shadow-lg`
          : "hover:border-gray-300 hover:shadow-md hover:scale-[1.02] text-gray-700 hover:bg-gray-50"
      }`}
    >
      {/* Glow effect para animação de confirmação */}
      <div
        ref={glowRef}
        className="absolute inset-0 rounded-xl opacity-0 pointer-events-none"
        style={{
          backgroundColor: isSelected ? getBackgroundColorWithOpacity(option.color) : 'rgba(34, 197, 94, 0.1)',
          boxShadow: isSelected 
            ? `0 0 30px ${getShadowColor(option.color)}`
            : '0 0 30px rgba(34, 197, 94, 0.25)'
        }}
      />
      
      {/* Shimmer effect no hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out" />
      
      <div className="flex items-center relative z-10">
        <QuizRadio
          value={buttonId}
          checked={isSelected}
          onChange={() => onSelect(index)}
          fillColor={fillColor}
          className="mr-4 size-5 transition-all duration-300 shadow-sm"
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
