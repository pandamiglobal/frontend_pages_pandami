"use client"

import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import { ArrowRight, Search, TrendingUp, Users, DollarSign, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedCounter } from "@/components/(lp)/ui/animated-counter"

interface QuizResultsProps {
  answers: Record<number, number>
  onRestart: () => void
}

export function QuizResults({ answers }: QuizResultsProps) {
  const cardRef = useRef(null)
  const benefitsRef = useRef(null)
  const ctaRef = useRef(null)
  const socialProofRef = useRef(null)
  
  const cardInView = useInView(cardRef, { once: true, margin: "-50px" })
  const benefitsInView = useInView(benefitsRef, { once: true, margin: "-50px" })
  const ctaInView = useInView(ctaRef, { once: true, margin: "-50px" })
  const socialProofInView = useInView(socialProofRef, { once: true, amount: 0.5 })

  return (
    <section className="relative bg-[#f7f7f7] min-h-screen flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

      <Container className="flex-1 flex flex-col justify-center">
        <div className="relative py-16 max-w-4xl mx-auto w-full">
          {/* Results Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-12"
          >
            {/* Badge Quiz Completo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={cardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center mb-4"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-primary/10 text-primary rounded-full text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Quiz Completo</span>
              </div>
            </motion.div>

            {/* Icon and Title */}
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] rounded-full mb-6">
                <Search className="h-8 w-8 text-white" />
              </div>
              
              <h1 className="font-semibold text-2xl sm:text-3xl md:text-4xl text-black leading-tight mb-4 px-2 sm:px-0">
                Seu salão tem um grande potencial de faturamento escondido.
              </h1>
            </div>

            {/* Main Result Text */}
            <div className="mb-8">
              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                Pelas suas respostas, existe um ponto em comum: seus clientes poderiam 
                <span className="font-semibold text-primary"> confiar mais</span>, 
                <span className="font-semibold text-primary"> indicar mais</span> e 
                <span className="font-semibold text-primary"> aceitar cortes e serviços de maior valor</span> — 
                se tivessem mais clareza antes do atendimento.
              </p>

              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                Hoje, muitos profissionais perdem faturamento não por falta de talento, 
                mas por falta de <span className="font-semibold">previsibilidade</span>, 
                <span className="font-semibold"> diferenciação</span> e 
                <span className="font-semibold"> comunicação visual clara</span>.
              </p>

              <p className="text-gray-700 text-base sm:text-lg md:text-xl leading-relaxed mb-4">
                E é exatamente isso que a tecnologia certa consegue resolver.
              </p>
            </div>

            {/* Prova Social */}
            <motion.div
              ref={socialProofRef}
              initial={{ opacity: 0, y: 20 }}
              animate={socialProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mb-8 text-center"
            >
              <p className="text-gray-600 text-base md:text-lg">
                <span className="font-semibold text-primary">
                  <AnimatedCounter value={250} duration={2} suffix="+ salões" />
                </span>{" "}
                já estão melhorando seu faturamento com a PandaMi
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              ref={benefitsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-4 mb-10"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start space-x-3 md:space-x-4 p-4 bg-gray-50 rounded-xl cursor-default transition-shadow hover:shadow-md active:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Search className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    Mostrar resultado ideal antes do corte
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start space-x-3 md:space-x-4 p-4 bg-gray-50 rounded-xl cursor-default transition-shadow hover:shadow-md active:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <TrendingUp className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    Aumentar a confiança do cliente
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start space-x-3 md:space-x-4 p-4 bg-gray-50 rounded-xl cursor-default transition-shadow hover:shadow-md active:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <Users className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    Reduzir retrabalho
                  </p>
                </div>
              </motion.div>

              <motion.div
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className="flex items-start space-x-3 md:space-x-4 p-4 bg-gray-50 rounded-xl cursor-default transition-shadow hover:shadow-md active:shadow-md"
              >
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                    <DollarSign className="h-5 w-5 text-primary" />
                  </div>
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-semibold text-gray-900 mb-1 text-sm md:text-base">
                    Aumentar ticket médio
                  </p>
                </div>
              </motion.div>
            </motion.div>

            {/* CTA Section */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-center border-t border-gray-200 pt-8"
            >
              <div className="mb-6 px-2 sm:px-0">
                <Link href="/" className="block w-full">
                  <motion.div
                    animate={{
                      scale: [1, 1.03, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    whileHover={{
                      scale: 1.05,
                    }}
                    className="w-full"
                  >
                    <PrimaryButton
                      icon={<ArrowRight className="h-4 w-4 md:h-5 md:w-5 flex-shrink-0" />}
                      size="lg"
                      className="px-4 py-4 md:px-10 md:py-5 text-sm sm:text-base md:text-lg w-full min-h-[64px] sm:min-h-[68px] md:min-h-[72px] !flex-wrap justify-center gap-2 md:gap-2 leading-snug"
                    >
                      <span className="text-center block max-w-[90%] mx-auto">Quero ver a ferramenta que aumenta o faturamento dos salões</span>
                    </PrimaryButton>
                  </motion.div>
                </Link>
              </div>

             
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
