"use client"

import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ArrowRight, HelpCircle } from "lucide-react"
import Link from "next/link"

export function QuizCtaSection() {
  return (
    <section className="relative bg-white py-16 md:py-24">
      <Container>
        <div className="text-center max-w-4xl mx-auto">
          {/* Icon */}
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] rounded-full mb-6">
            <HelpCircle className="h-8 w-8 text-white" />
          </div>

          {/* Title */}
          <h2 className="font-semibold text-3xl md:text-4xl lg:text-5xl text-black leading-tight mb-6">
            Quanto dinheiro seu salão pode estar{" "}
            <span className="text-gradient bg-clip-text text-transparent bg-linear-to-r from-primary to-[#C16C3F]">
              deixando na mesa?
            </span>
          </h2>

          {/* Description */}
          <p className="text-gray-600 text-lg md:text-xl leading-relaxed mb-8 max-w-3xl mx-auto">
            Faça nosso quiz exclusivo e descubra o potencial de faturamento escondido do seu salão. 
            Em apenas 2 minutos, você terá insights valiosos sobre como aumentar seus lucros.
          </p>

          {/* CTA Button */}
          <Link href="/ferramenta-que-aumenta-o-faturamento-dos-saloes">
            <PrimaryButton
              icon={<ArrowRight className="h-5 w-5" />}
              size="lg"
              className="px-8 py-4 text-lg"
            >
              Fazer o Quiz Gratuito
            </PrimaryButton>
          </Link>

          {/* Additional Info */}
          <p className="text-sm text-gray-500 mt-4">
            ✓ Gratuito ✓ 2 minutos ✓ Resultado imediato
          </p>
        </div>
      </Container>
    </section>
  )
}
