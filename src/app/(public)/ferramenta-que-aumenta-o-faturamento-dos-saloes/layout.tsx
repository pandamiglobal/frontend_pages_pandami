import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Quanto dinheiro seu salão pode estar deixando na mesa?",
  description: "Descubra o potencial de faturamento escondido do seu salão com nosso quiz exclusivo. Identifique oportunidades de crescimento e aumente seus lucros.",
  keywords: "quiz salão, faturamento salão, visagismo, IA para cabeleireiros, aumentar lucros salão",
  openGraph: {
    title: "Quanto dinheiro seu salão pode estar deixando na mesa?",
    description: "Descubra o potencial de faturamento escondido do seu salão com nosso quiz exclusivo.",
    type: "website",
  },
}

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
