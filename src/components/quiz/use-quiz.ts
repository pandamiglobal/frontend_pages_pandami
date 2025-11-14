import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import gsap from "gsap"
import { QUIZ_QUESTIONS } from "./quiz-questions"
import type { ConfettiRef } from "@/components/ui/confetti"

const ANIMATION_DURATION = {
  FAST: 0.2,
  MEDIUM: 0.3,
  SLOW: 0.5,
  PROGRESS: 0.8
} as const

const EASING = {
  POWER_OUT: "power1.out",
  POWER_IN: "power2.in",
  POWER_IN_OUT: "power2.inOut"
} as const

interface UseQuizProps {
  onComplete: (answers: Record<number, number>) => void
  confettiRef?: React.RefObject<ConfettiRef>
  buttonRef?: React.RefObject<HTMLButtonElement | null>
}

export function useQuiz({ onComplete, confettiRef, buttonRef }: UseQuizProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [answers, setAnswers] = useState<Record<number, number>>({})
  const [selectedOption, setSelectedOption] = useState<number | null>(null)
  const [selectedOptionColor, setSelectedOptionColor] = useState<'green' | 'blue' | 'amber' | 'red' | 'gray'>('green')
  const [isAnimating, setIsAnimating] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const questionRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  
  // Validar índice da pergunta e fazer redirect se inválido
  const stepIndex = parseInt(searchParams.get('stepIndex') || '0')
  const isValidIndex = !isNaN(stepIndex) && stepIndex >= 0 && stepIndex < QUIZ_QUESTIONS.length
  
  // Redirect para índice 0 se inválido
  useEffect(() => {
    try {
      if (!isValidIndex && stepIndex !== 0) {
        router.replace('/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=0')
        return
      }
    } catch (error) {
      console.error('Error during navigation redirect:', error)
      // Fallback to window.location if router fails
      window.location.href = '/ferramenta-que-aumenta-o-faturamento-dos-saloes'
    }
  }, [stepIndex, isValidIndex, router])
  
  const currentQuestion = isValidIndex ? stepIndex : 0
  const currentQuestionData = QUIZ_QUESTIONS[currentQuestion]
  const progress = ((currentQuestion + 1) / QUIZ_QUESTIONS.length) * 100
  const isLastQuestion = currentQuestion === QUIZ_QUESTIONS.length - 1
  
  // Cleanup timeouts
  const clearAllTimeouts = useCallback(() => {
    timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
    timeoutRefs.current = []
  }, [])
  
  const addTimeout = useCallback((callback: () => void, delay: number) => {
    const timeout = setTimeout(() => {
      callback()
      timeoutRefs.current = timeoutRefs.current.filter(t => t !== timeout)
    }, delay)
    timeoutRefs.current.push(timeout)
    return timeout
  }, [])

  const animateOptionSelection = useCallback((optionIndex: number) => {
    // A animação de seleção agora é feita diretamente no componente QuizOptionButton
    // usando useEffect quando isSelected muda para true
  }, [])

  const animateOutTransition = useCallback(() => {
    const timeline = gsap.timeline()
    
    // Simplificado - sem animações que podem causar problemas
    timeline.to({}, {
      duration: 0.1
    })
    
    return timeline
  }, [])

  const animateInTransition = useCallback((currentProgress: number) => {
    // Simplificado - apenas animar progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${currentProgress}%`,
        duration: 0.5,
        ease: "power2.out"
      })
    }
  }, [])

  const handleOptionSelect = useCallback((optionIndex: number) => {
    setSelectedOption(optionIndex)
    
    // Extract color from the selected option
    if (currentQuestionData && optionIndex !== null) {
      const option = currentQuestionData.options[optionIndex]
      if (option) {
        // Convert text-green-600 to green, text-blue-600 to blue, etc.
        const colorMatch = option.color.match(/text-(\w+)-/)
        if (colorMatch && colorMatch[1]) {
          setSelectedOptionColor(colorMatch[1] as 'green' | 'blue' | 'amber' | 'red' | 'gray')
        }
      }
    }
    
    animateOptionSelection(optionIndex)
  }, [animateOptionSelection, currentQuestionData])

  const handleRadioChange = useCallback((value: string) => {
    const optionIndex = parseInt(value.replace('option-', ''))
    handleOptionSelect(optionIndex)
  }, [handleOptionSelect])

  const handleConfirmationComplete = useCallback(() => {
    setShowConfirmation(false)
  }, [])

  const handleNext = useCallback(() => {
    if (selectedOption === null || isAnimating || !currentQuestionData) return
    
    // Limpar timeouts anteriores
    clearAllTimeouts()
    setIsAnimating(true)
    
    // 1. Mostrar confirmação primeiro
    setShowConfirmation(true)
    
    // 2. Disparar confete após um pequeno delay
    addTimeout(() => {
      if (confettiRef?.current && buttonRef?.current) {
        const buttonRect = buttonRef.current.getBoundingClientRect()
        const buttonCenterX = buttonRect.left + buttonRect.width / 2
        const buttonCenterY = buttonRect.top + buttonRect.height / 2
        
        confettiRef.current.fire({
          particleCount: 100,
          spread: 60,
          angle: 90,
          origin: { 
            x: buttonCenterX / window.innerWidth,
            y: buttonCenterY / window.innerHeight
          },
          startVelocity: 45,
          gravity: 0.8,
          drift: 0,
          ticks: 200
        })
      }
    }, 200)
    
    // 3. Aguardar animações antes de prosseguir
    addTimeout(() => {
      const newAnswers = {
        ...answers,
        [currentQuestionData.id]: selectedOption
      }
      setAnswers(newAnswers)

      const timeline = animateOutTransition()
      
      timeline.eventCallback("onComplete", () => {
        try {
          if (isLastQuestion) {
            // Navigate to results page
            router.push('/resultados')
            onComplete(newAnswers)
            setIsAnimating(false)
          } else {
            const nextStep = currentQuestion + 1
            router.push(`/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=${nextStep}`)
          }
        } catch (error) {
          console.error('Error during navigation:', error)
          // Fallback navigation
          if (isLastQuestion) {
            window.location.href = '/resultados'
          } else {
            const nextStep = currentQuestion + 1
            window.location.href = `/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=${nextStep}`
          }
          setIsAnimating(false)
        }
      })
    }, 1200)
    
  }, [selectedOption, isAnimating, currentQuestionData, answers, isLastQuestion, currentQuestion, onComplete, router, animateOutTransition, confettiRef, buttonRef, clearAllTimeouts, addTimeout])

  useEffect(() => {
    if (!currentQuestionData) return
    
    // Limpar timeouts anteriores
    clearAllTimeouts()
    
    // Reset states para nova pergunta
    const previousAnswer = answers[currentQuestionData.id] ?? null
    setSelectedOption(previousAnswer)
    setIsAnimating(false)
    setShowConfirmation(false)
    
    // Animar apenas a progress bar
    if (progressRef.current) {
      gsap.to(progressRef.current, {
        width: `${progress}%`,
        duration: 0.5,
        ease: "power2.out"
      })
    }
    
    return () => {
      clearAllTimeouts()
    }
  }, [currentQuestion, answers, currentQuestionData?.id, progress, clearAllTimeouts])

  return {
    // State
    selectedOption,
    selectedOptionColor,
    isAnimating,
    showConfirmation,
    currentQuestion,
    currentQuestionData,
    progress,
    isLastQuestion,
    
    // Refs
    questionRef,
    optionsRef,
    progressRef,
    
    // Handlers
    handleOptionSelect,
    handleRadioChange,
    handleNext,
    handleConfirmationComplete
  }
}
