import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Resultados do Quiz - Ferramenta que Aumenta o Faturamento dos Salões",
  description: "Descubra o potencial de faturamento escondido do seu salão e como a tecnologia certa pode resolver problemas de previsibilidade e comunicação visual.",
  robots: "noindex, nofollow"
}

export default function ResultadosLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
