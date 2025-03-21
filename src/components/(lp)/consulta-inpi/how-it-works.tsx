"use client"

import { Container } from "@/components/ui/container"
import { motion } from "framer-motion"

const steps = [
  {
    title: "Digite o Nome",
    description: "Insira o nome da marca que você deseja verificar em nossa ferramenta de busca.",
  },
  {
    title: "Realize a Busca",
    description: "Clique em 'Buscar' e nossa ferramenta irá consultar a base de dados do INPI.",
  },
  {
    title: "Analise os Resultados",
    description: "Receba um relatório detalhado sobre a disponibilidade e status da marca pesquisada.",
  },
  {
    title: "Tome Decisões Informadas",
    description: "Use as informações obtidas para decidir sobre o registro ou alterações na sua marca.",
  },
]

export function HowItWorks() {
  return (
    <section>
      <Container section={true} className="flex flex-col gap-8 md:gap-12">
        <h2 className="title-3 text-center">
          Como Funciona
        </h2>

        <div className="relative max-w-3xl mx-auto">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-blue-500/20 transform -translate-x-1/2"></div>

          {steps.map((step, index) => (
            <motion.div
              key={index}
              className="mb-8 flex items-center"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <div className={`flex items-center ${index % 2 === 0 ? "sm:flex-row-reverse" : ""} w-full`}>
                {/* Timeline dot */}
                <div className="absolute left-4 sm:left-1/2 w-8 h-8 bg-blue-600 rounded-full border-4 border-blue-950 transform -translate-x-1/2 flex items-center justify-center">
                  <span className="text-white font-bold">{index + 1}</span>
                </div>

                {/* Content */}
                <div
                  className={`bg-black/5 p-6 rounded-xl border border-black/10 w-full sm:w-[calc(50%-2rem)] ${index % 2 === 0 ? "sm:ml-auto" : "sm:mr-auto"}`}
                >
                  <h3 className="text-2 !font-semibold mb-2 text-gray-900">{step.title}</h3>
                  <p className="text-4 text-gray-600">{step.description}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  )
}

