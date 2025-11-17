"use client"

import { QuizForm } from "@/components/quiz/quiz-form"

export default function FaturamentoQuizPage() {
  const handleQuizComplete = (answers: Record<number, number>) => {
    // Navigation is handled by the useQuiz hook
  }

  return (
    <div data-no-header data-no-footer>
      <QuizForm onComplete={handleQuizComplete} />
    </div>
  )
}