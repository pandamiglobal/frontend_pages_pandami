"use client"

import { useRef } from "react"
import { Container } from "@/app/_components/atoms/ui/container"
import { PrimaryButton } from "@/app/_components/molecules/branded-button"
import { Confetti, type ConfettiRef } from "@/app/_components/atoms/ui/confetti"
import { ArrowRight } from "lucide-react"
import { QuizRadioGroup } from "./quiz-radio"
import { QuizOptionButton } from "./quiz-option-button"
import { QuizProgress } from "./quiz-progress"
import { QuizConfirmation } from "./quiz-confirmation"
import { useQuiz } from "./use-quiz"
import { QUIZ_QUESTIONS } from "./quiz-questions"

interface QuizFormProps {
  onComplete: (answers: Record<number, number>) => void
}

export function QuizForm({ onComplete }: QuizFormProps) {
  const confettiRef = useRef<ConfettiRef>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)
  
  const {
    selectedOption,
    isAnimating,
    isGsapAnimating,
    stepIndex,
    currentQuestionData,
    progress,
    isLastQuestion,
    showConfirmation,
    questionRef,
    optionsRef,
    progressRef,
    handleOptionSelect,
    handleRadioChange,
    handleNext,
    handleConfirmationComplete
  } = useQuiz({ onComplete, confettiRef, buttonRef })

  return (
    <section className="relative bg-[#f7f7f7] min-h-screen flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

      {/* Confetti Canvas */}
      <Confetti
        ref={confettiRef}
        className="absolute top-0 left-0 z-40 size-full pointer-events-none"
        manualstart
      />

      {/* Quiz Confirmation */}
      <QuizConfirmation
        isVisible={showConfirmation}
        onComplete={handleConfirmationComplete}
      />

      <Container className="flex-1 flex flex-col justify-center">
        <div className="relative py-16 max-w-4xl mx-auto w-full">
          <QuizProgress
            currentQuestion={stepIndex}
            totalQuestions={QUIZ_QUESTIONS.length}
            progress={progress}
            ref={progressRef}
          />

          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 overflow-hidden">
            <div className="mb-8" ref={questionRef}>
              <h2 className="font-semibold text-2xl md:text-3xl text-black leading-tight mb-6">
                {currentQuestionData.question}
              </h2>
            </div>

            <QuizRadioGroup 
              value={selectedOption !== null ? `option-${selectedOption}` : undefined}
              onValueChange={handleRadioChange}
              className="space-y-4 mb-8" 
              ref={optionsRef}
            >
              {currentQuestionData.options.map((option, index) => (
                <QuizOptionButton
                  key={`${currentQuestionData.id}-${index}`}
                  option={option}
                  index={index}
                  isSelected={selectedOption === index}
                  onSelect={handleOptionSelect}
                />
              ))}
            </QuizRadioGroup>

            <div className="flex justify-end items-center w-full">
              <PrimaryButton
                ref={buttonRef}
                onClick={handleNext}
                disabled={selectedOption === null || isAnimating}
                icon={<ArrowRight className="h-4 w-4" />}
                size="lg"
                className={`px-8 w-full transition-opacity ${
                  isAnimating ? 'opacity-70 cursor-not-allowed' : ''
                }`}
              >
                {isLastQuestion ? "Ver Resultado" : "Continuar"}
              </PrimaryButton>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
