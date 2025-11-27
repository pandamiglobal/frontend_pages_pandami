"use client"

import { Container } from "@/app/_components/atoms/ui/container"
import { PrimaryButton } from "@/app/_components/molecules/branded-button"
import { ArrowRight, Search, TrendingUp, Users, DollarSign, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { useRef } from "react"
import { AnimatedCounter } from "@/app/_components/molecules/animated-counter"

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
    <section className="relative bg-neutral-50 min-h-screen flex flex-col">
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-50 pointer-events-none"></div>

      <Container className="flex-1 flex flex-col justify-center">
        <div className="relative py-16 max-w-4xl mx-auto w-full">
          {/* Results Card */}
          <motion.div
            ref={cardRef}
            initial={{ opacity: 0, y: 30 }}
            animate={cardInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="bg-white rounded-2xl border border-neutral-200 shadow-lg p-8 md:p-12"
          >
            {/* Badge Quiz Completo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={cardInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.4, delay: 0.2, ease: "easeOut" }}
              className="flex justify-center mb-8"
            >
              <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-green-50 text-green-700 border border-green-100 rounded-full text-sm font-medium">
                <CheckCircle2 className="h-4 w-4" />
                <span>Análise Concluída</span>
              </div>
            </motion.div>

            {/* Icon and Title */}
            <div className="text-center mb-10">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-neutral-900 rounded-2xl mb-6 shadow-lg shadow-neutral-900/20">
                <Search className="h-10 w-10 text-white" />
              </div>
              
              <h1 className="font-bold text-3xl md:text-4xl lg:text-5xl text-neutral-900 leading-tight mb-6 tracking-tight">
                Seu salão tem um <span className="text-primary">potencial oculto</span> de faturamento.
              </h1>
            </div>

            {/* Main Result Text */}
            <div className="mb-12 max-w-3xl mx-auto text-center">
              <div className="space-y-6 text-lg md:text-xl text-neutral-600 leading-relaxed">
                <p>
                  Pelas suas respostas, identificamos um padrão claro: seus clientes poderiam 
                  <strong className="text-neutral-900"> confiar mais</strong>, 
                  <strong className="text-neutral-900"> indicar mais</strong> e 
                  <strong className="text-neutral-900"> aceitar serviços de maior valor</strong> — 
                  se tivessem a clareza visual necessária antes do atendimento.
                </p>

                <p>
                  Hoje, o faturamento é perdido não por falta de técnica, 
                  mas pela ausência de <strong className="text-neutral-900">previsibilidade</strong> e 
                  <strong className="text-neutral-900"> diferenciação</strong> na experiência do cliente.
                </p>
              </div>
            </div>

            {/* Prova Social */}
            <motion.div
              ref={socialProofRef}
              initial={{ opacity: 0, y: 20 }}
              animate={socialProofInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.3, ease: "easeOut" }}
              className="mb-12 text-center bg-neutral-50 rounded-xl p-6 border border-neutral-100"
            >
              <p className="text-neutral-600 text-base md:text-lg">
                Junte-se a <span className="font-bold text-neutral-900">
                  <AnimatedCounter value={250} duration={2} suffix="+ salões" />
                </span> que já estão transformando seus resultados com a PandaMi.
              </p>
            </motion.div>

            {/* Benefits Grid */}
            <motion.div
              ref={benefitsRef}
              initial={{ opacity: 0, y: 20 }}
              animate={benefitsInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
              className="grid md:grid-cols-2 gap-6 mb-12"
            >
              {[
                { icon: Search, text: "Mostrar resultado ideal antes do corte" },
                { icon: TrendingUp, text: "Aumentar a confiança do cliente" },
                { icon: Users, text: "Reduzir retrabalho e dúvidas" },
                { icon: DollarSign, text: "Aumentar ticket médio dos serviços" }
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ y: -4 }}
                  className="flex items-center p-5 bg-white border border-neutral-200 rounded-xl shadow-sm hover:shadow-md transition-all hover:border-green-200"
                >
                  <div className="flex-shrink-0 mr-4">
                    <div className="w-12 h-12 bg-green-50 rounded-full flex items-center justify-center">
                      <benefit.icon className="h-6 w-6 text-green-600" />
                    </div>
                  </div>
                  <p className="font-semibold text-neutral-900 text-lg">
                    {benefit.text}
                  </p>
                </motion.div>
              ))}
            </motion.div>

            {/* CTA Section */}
            <motion.div
              ref={ctaRef}
              initial={{ opacity: 0, y: 20 }}
              animate={ctaInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.4, ease: "easeOut" }}
              className="text-center pt-8 border-t border-neutral-100"
            >
              <div className="max-w-2xl mx-auto">
                <h3 className="text-2xl font-bold text-neutral-900 mb-6">
                  Quer ver como resolver isso na prática?
                </h3>
                
                <Link href="/" className="block w-full">
                  <motion.div
                    animate={{ scale: [1, 1.02, 1] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-full"
                  >
                    <PrimaryButton
                      icon={<ArrowRight className="h-5 w-5" />}
                      size="lg"
                      className="w-full h-auto min-h-[3.5rem] py-6 text-lg md:text-xl font-bold shadow-xl shadow-primary/20 hover:shadow-primary/30 transition-all text-white border-none whitespace-normal"
                    >
                      Conhecer a ferramenta agora
                    </PrimaryButton>
                  </motion.div>
                </Link>
                
                <p className="mt-4 text-sm text-neutral-500">
                  Sem compromisso. Apenas veja o que é possível.
                </p>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
