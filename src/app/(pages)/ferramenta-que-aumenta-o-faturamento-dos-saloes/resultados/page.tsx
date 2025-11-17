"use client"

import { QuizResults } from "@/components/quiz/quiz-results"

export default function ResultadosPage() {
  const handleRestart = () => {
    window.location.href = '/ferramenta-que-aumenta-o-faturamento-dos-saloes'
  }

  return (
    <div data-no-header data-no-footer>
      <QuizResults 
        answers={{}} 
        onRestart={handleRestart}
      />
    </div>
  )
}
