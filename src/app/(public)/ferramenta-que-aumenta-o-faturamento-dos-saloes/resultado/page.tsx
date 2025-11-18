"use client"

import { QuizResults } from "@/app/_components/organisms/quiz/quiz-results"
import PageLayout from "@/app/_components/templates/page-layout"

export default function ResultadoPage() {
  const handleRestart = () => {
    window.location.href = '/ferramenta-que-aumenta-o-faturamento-dos-saloes'
  }

  return (
   <PageLayout headerVariant="hidden" hideFooter={true}>
      <QuizResults 
        answers={{}} 
        onRestart={handleRestart} 
      />
    </PageLayout>
  )
}
