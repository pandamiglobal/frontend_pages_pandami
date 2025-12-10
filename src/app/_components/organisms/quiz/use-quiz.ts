import { useState, useEffect, useRef, useCallback } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { QUIZ_QUESTIONS } from "./quiz-questions"
import type { ConfettiRef } from "@/app/_components/atoms/ui/confetti"

const ANIMATION_DURATION = {
  FAST: 200,
  MEDIUM: 300,
  SLOW: 500,
  PROGRESS: 800
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
  const [isTransitioning, setIsTransitioning] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  
  const questionRef = useRef<HTMLDivElement>(null)
  const optionsRef = useRef<HTMLDivElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const timeoutRefs = useRef<NodeJS.Timeout[]>([])
  
  // Validar índice da pergunta e fazer redirect se inválido (stepIndex 1-7)
  const stepIndex = parseInt(searchParams.get('stepIndex') || '1')
  const isValidIndex = !isNaN(stepIndex) && stepIndex >= 1 && stepIndex <= QUIZ_QUESTIONS.length
  
  // Redirect para índice 1 se inválido
  useEffect(() => {
    try {
      if (!isValidIndex && stepIndex !== 1) {
        router.replace('/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=1')
        return
      }
    } catch (error) {
      console.error('Error during navigation redirect:', error)
      // Fallback to window.location if router fails
      window.location.href = '/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=1'
    }
  }, [stepIndex, isValidIndex, router])
  
  // stepIndex is 1-indexed (1-7), but array is 0-indexed (0-6)
  const currentQuestionData = QUIZ_QUESTIONS[stepIndex - 1]
  const progress = (stepIndex / QUIZ_QUESTIONS.length) * 100
  const isLastQuestion = stepIndex === QUIZ_QUESTIONS.length
  
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


  const animateOutTransition = useCallback(() => {
    setIsTransitioning(true)
    
    if (questionRef.current && optionsRef.current) {
      // Apply CSS transitions
      questionRef.current.style.transition = 'opacity 0.3s ease-in, transform 0.3s ease-in'
      optionsRef.current.style.transition = 'opacity 0.3s ease-in 0.1s, transform 0.3s ease-in 0.1s'
      
      questionRef.current.style.opacity = '0'
      questionRef.current.style.transform = 'translateY(-20px)'
      optionsRef.current.style.opacity = '0'
      optionsRef.current.style.transform = 'translateY(-20px)'
    }
    
    // Return a promise-like object for compatibility
    const duration = 400 // 300ms + 100ms stagger
    setTimeout(() => {
      setIsTransitioning(false)
    }, duration)
    
    return {
      eventCallback: (event: string, callback: () => void) => {
        if (event === 'onComplete') {
          setTimeout(callback, duration)
        }
      }
    }
  }, [])

  const animateInTransition = useCallback(() => {
    if (questionRef.current && optionsRef.current) {
      setIsTransitioning(true)
      
      // Set initial state
      questionRef.current.style.opacity = '0'
      questionRef.current.style.transform = 'translateY(20px)'
      optionsRef.current.style.opacity = '0'
      optionsRef.current.style.transform = 'translateY(20px)'
      
      // Trigger reflow
      questionRef.current.offsetHeight
      
      // Apply transitions
      questionRef.current.style.transition = 'opacity 0.4s ease-out 0.1s, transform 0.4s ease-out 0.1s'
      optionsRef.current.style.transition = 'opacity 0.4s ease-out 0.2s, transform 0.4s ease-out 0.2s'
      
      questionRef.current.style.opacity = '1'
      questionRef.current.style.transform = 'translateY(0)'
      optionsRef.current.style.opacity = '1'
      optionsRef.current.style.transform = 'translateY(0)'
      
      setTimeout(() => {
        setIsTransitioning(false)
      }, 600)
    }
  }, [])

  const handleOptionSelect = useCallback((optionIndex: number) => {
    // Bloquear seleção durante animações ou confirmação
    if (isAnimating || showConfirmation || isTransitioning) return
    
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
  }, [currentQuestionData, isAnimating, showConfirmation, isTransitioning])

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
        [stepIndex]: selectedOption
      }
      setAnswers(newAnswers)

      const timeline = animateOutTransition()
      
      timeline.eventCallback("onComplete", () => {
        try {
          if (isLastQuestion) {
            // Navigate to results page
            router.push('/ferramenta-que-aumenta-o-faturamento-dos-saloes/resultado')
            onComplete(newAnswers)
            setIsAnimating(false)
          } else {
            const nextStep = stepIndex + 1
            router.push(`/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=${nextStep}`)
            // Aguardar navegação e então animar entrada
            addTimeout(() => {
              animateInTransition()
            }, 100)
          }
        } catch (error) {
          console.error('Error during navigation:', error)
          // Fallback navigation
          if (isLastQuestion) {
            window.location.href =
							"/ferramenta-que-aumenta-o-faturamento-dos-saloes/resultado";
          } else {
            const nextStep = stepIndex + 1
            window.location.href = `/ferramenta-que-aumenta-o-faturamento-dos-saloes?stepIndex=${nextStep}`
          }
          setIsAnimating(false)
        }
      })
    }, 1200)
    
  }, [selectedOption, isAnimating, currentQuestionData, answers, isLastQuestion, stepIndex, onComplete, router, animateOutTransition, confettiRef, buttonRef, clearAllTimeouts, addTimeout])

  useEffect(() => {
    if (!currentQuestionData) return
        
    // Limpar timeouts anteriores
    clearAllTimeouts()
    
    // Reset states para nova pergunta
    const previousAnswer = answers[stepIndex] ?? null
    setSelectedOption(previousAnswer)
    setShowConfirmation(false)
    
    // Reset estado de animação
    setIsAnimating(false)
    setIsTransitioning(false)

    if (questionRef.current && optionsRef.current) {
      // Reset styles without animation
      questionRef.current.style.transition = 'none'
      optionsRef.current.style.transition = 'none'
      questionRef.current.style.opacity = '1'
      questionRef.current.style.transform = 'translateY(0)'
      optionsRef.current.style.opacity = '1'
      optionsRef.current.style.transform = 'translateY(0)'
    }
    
    return () => {
      timeoutRefs.current.forEach(timeout => clearTimeout(timeout))
      timeoutRefs.current = []
    }
  }, [stepIndex]) // Apenas stepIndex como dependência principal
  
  // Separar animação da progress bar em useEffect separado
  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.style.transition = 'width 0.5s ease-out'
      progressRef.current.style.width = `${progress}%`
    }
  }, [progress])

  return {
    // State
    selectedOption,
    selectedOptionColor,
    isAnimating,
    isTransitioning,
    showConfirmation,
    stepIndex,
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
