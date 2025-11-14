"use client"

import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ArrowRight, Search, TrendingUp, Users, DollarSign } from "lucide-react"
import Link from "next/link"

interface QuizResultsProps {
  answers: Record<number, number>
  onRestart: () => void
}

export function QuizResults({ answers, onRestart }: QuizResultsProps) {
  // Error boundary fallback for production
  if (!onRestart) {
    console.error('QuizResults: onRestart prop is required')
  }

  return (
    <section className="relative bg-[#f7f7f7] min-h-screen flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

      <Container className="flex-1 flex flex-col justify-center">
        <div className="relative py-16 max-w-4xl mx-auto w-full">
          {/* Results Card */}
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
            {/* Icon and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] rounded-full mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="font-semibold text-3xl md:text-4xl text-black leading-tight mb-4">
                🔎 Seu salão tem um grande potencial de faturamento escondido.
              </h1>
            </div>

            {/* Main Result Text */}
            <div className="mb-8">
              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-6">
                Pelas suas respostas, existe um ponto em comum: seus clientes poderiam 
                <span className="font-semibold text-primary"> confiar mais</span>, 
                <span className="font-semibold text-primary"> indicar mais</span> e 
                <span className="font-semibold text-primary"> aceitar cortes e serviços de maior valor</span> — 
                se tivessem mais clareza antes do atendimento.
              </p>

              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                Hoje, muitos profissionais perdem faturamento não por falta de talento, 
                mas por falta de <span className="font-semibold">previsibilidade</span>, 
                <span className="font-semibold"> diferenciação</span> e 
                <span className="font-semibold"> comunicação visual clara</span>.
              </p>

              <p className="text-gray-700 text-lg md:text-xl leading-relaxed mb-8">
                E é exatamente isso que a tecnologia certa consegue resolver.
              </p>
            </div>

            {/* Benefits Grid */}
            <div className="grid md:grid-cols-2 gap-6 mb-10">
              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    👉 Mostrar o resultado ideal antes do corte
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    👉 Aumentar a confiança do cliente
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    👉 Reduzir retrabalho
                  </h3>
                </div>
              </div>

              <div className="flex items-start space-x-4 p-4 bg-gray-50 rounded-xl">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    👉 Aumentar ticket médio
                  </h3>
                </div>
              </div>
            </div>

            {/* CTA Section */}
            <div className="text-center border-t border-gray-200 pt-8">
              <div className="mb-6">
                <Link href="/">
                  <PrimaryButton
                    icon={<ArrowRight className="h-5 w-5" />}
                    size="lg"
                    className="px-8 py-4 text-lg w-full"
                  >
                    Quero ver a ferramenta que aumenta o faturamento dos salões
                  </PrimaryButton>
                </Link>
              </div>

             
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
