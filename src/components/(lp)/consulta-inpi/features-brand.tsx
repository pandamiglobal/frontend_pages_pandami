"use client"

import { motion } from "framer-motion"
import { Search, Clock, Shield, Award } from "lucide-react"
import { Container } from "@/components/ui/container"

const features = [
  {
    icon: Search,
    title: "Busca Abrangente",
    description: "Acesso a toda base de dados do INPI para uma verificação completa.",
  },
  {
    icon: Clock,
    title: "Resultados Rápidos",
    description: "Obtenha informações sobre sua marca em questão de segundos.",
  },
  {
    icon: Shield,
    title: "Proteção Preventiva",
    description: "Identifique possíveis conflitos antes de iniciar o processo de registro.",
  },
  {
    icon: Award,
    title: "Confiabilidade",
    description: "Dados atualizados e precisos diretamente da fonte oficial.",
  },
]

export function Features() {
  return (
    <section>
      <Container section={true}>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
          viewport={{ once: true, margin: "-50px" }}
          className="title-3 text-center"
        >
          Por que usar nosso Buscador de Marcas?
        </motion.h2>
        <div className="grid place-content grid-cols-1 md:px-0 md:grid-cols-4 mt-16 w-full gap-6 justify-stretch">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true, amount: 0.1 }}
              className="bg-black/5 border border-black/10 text-white w-[100%] p-6 rounded-xl flex flex-col items-center justify-center min-h-40"
            >
              <feature.icon className="w-12 h-12 text-[#2845EF] mb-4" />
              <h3 className="text-xl font-semibold mb-3 text-gray-900">{feature.title}</h3>
              <p className="text-gray-600 text-center">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

