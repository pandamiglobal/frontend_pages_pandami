"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Award,
  TrendingUp,
  CheckCircle2,
  ArrowRight,
  FileText,
  Scale,
  Clock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

export function WhyRegisterSection() {
  const scrollToForm = () => {
    document
      .getElementById("form-section")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative py-20 md:py-28 overflow-hidden bg-slate-50">
      {/* Background elements */}
      <div className="absolute inset-0 opacity-50">
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-blue-50 rounded-bl-full opacity-70"></div>
        <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-indigo-50 rounded-tr-full opacity-70"></div>
      </div>

      {/* Decorative elements */}
      <div className="absolute top-20 right-20 w-48 h-48 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-10 animate-blob animation-delay-4000"></div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        {/* Section header */}
        <div className="text-center mb-16 max-w-3xl mx-auto">
          <div className="inline-block uppercase bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-4">
            Referência no Brasil em Proteção de Marcas
          </div>

          <h2 className="text-4xl md:text-6xl font-bold mb-6 font-heading bg-gradient-to-r from-[#001E63] via-[#0055FF] to-[#0066CC] bg-clip-text text-transparent">
            Empresa séria registra
          </h2>

          <p className="text-xl text-slate-600">
            É fundamental garantir o registro da sua marca. Caso contrário, a
            qualquer momento, você pode perder todo o investimento feito no seu
            negócio
          </p>
        </div>

        {/* Main content */}
        <div className="grid md:grid-cols-2 gap-12 lg:gap-20 items-center mb-16">
          {/* Left column - Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden shadow-xl">
              <Image
                src="https://images.pexels.com/photos/2182975/pexels-photo-2182975.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Especialistas em registro de marca"
                width={1000}
                height={1000}
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>

              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <div className="flex items-center mb-3">
                  <Award className="h-6 w-6 mr-2 text-blue-300" />
                  <span className="font-medium text-lg">
                    Mais de 7.000 marcas registradas
                  </span>
                </div>
              </div>
            </div>

            {/* Stats overlay */}
            <div className="absolute -bottom-6 -right-6 bg-white p-4 rounded-lg shadow-lg border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="bg-green-50 p-2 rounded-full">
                  <TrendingUp className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-slate-500">Taxa de aprovação</p>
                  <p className="text-xl font-bold text-green-600">99%</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right column - Benefits */}
          <div>
            <ul className="space-y-6">
              {[
                {
                  icon: <Shield className="h-10 w-10 text-primary" />,
                  title: "Proteção contra falsários",
                  description:
                    "Empresas com marcas registradas estão protegidas contra falsificadores e concorrentes — ninguém pode tomar o que é seu por direito.",
                },
                {
                  icon: <TrendingUp className="h-10 w-10 text-primary" />,
                  title: "Valorização do seu Negócio",
                  description:
                    "Empresas com marcas registradas têm valor de mercado significativamente maior e mais facilidade para captação de investimentos.",
                },
                {
                  icon: <Award className="h-10 w-10 text-primary" />,
                  title: "Credibilidade e Confiança",
                  description:
                    "O símbolo ® transmite profissionalismo e seriedade, gerando mais confiança entre clientes e parceiros comerciais.",
                },
                {
                  icon: <Scale className="h-10 w-10 text-primary" />,
                  title: "Segurança Jurídica",
                  description:
                    "Evite processos por uso indevido de marca e tenha respaldo legal para defender seu patrimônio intelectual.",
                },
              ].map((item, i) => (
                <motion.li
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex gap-4"
                >
                  <div className="bg-primary/10 p-3 rounded-full h-16 w-16 flex items-center justify-center flex-shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-xl font-bold mb-2 text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-slate-600">{item.description}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </div>

        {/* Process cards */}
        <div className="mb-16">
          <h3 className="text-2xl font-bold text-center mb-10 text-slate-900">
            Entenda nosso Método de Registro de Marca
          </h3>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: <FileText className="h-8 w-8 text-blue-600" />,
                title: "Análise Prévia",
                description:
                  "Verificamos a disponibilidade da sua marca e identificamos possíveis impedimentos legais.",
              },
              {
                icon: <Shield className="h-8 w-8 text-blue-600" />,
                title: "Estratégia Personalizada",
                description:
                  "Desenvolvemos uma estratégia específica para maximizar as chances de aprovação.",
              },
              {
                icon: <Clock className="h-8 w-8 text-blue-600" />,
                title: "Acompanhamento Completo",
                description:
                  "Cuidamos de todo o processo junto ao INPI até a concessão final do registro.",
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
              >
                <Card className="border-0 shadow-lg hover:shadow-xl transition-all h-full bg-white">
                  <CardContent className="p-6">
                    <div className="bg-blue-50 p-3 rounded-full w-16 h-16 flex items-center justify-center mb-6">
                      {item.icon}
                    </div>
                    <h4 className="text-xl font-bold mb-3 text-slate-900">
                      {item.title}
                    </h4>
                    <p className="text-slate-600">{item.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Comparison */}
        <div className="mb-16 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10 text-slate-900">
            Porque somos a escolha certa para seguir com seu registro
          </h3>

          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-0 shadow-lg bg-white">
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4 text-red-600 flex items-center">
                  <div className="bg-red-50 p-2 rounded-full mr-3">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6 text-red-600"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </div>
                  Registrando sem a 3pi
                </h4>

                <ul className="space-y-3">
                  {[
                    "Baixa chance de aprovação na primeira tentativa",
                    "Desperdício de tempo e dinheiro com processos mal conduzidos",
                    "Ausência de análise prévia, aumentando o risco de conflitos com outras marcas",
                    "Documentação incompleta ou feita sem orientação técnica",
                    "Nenhuma estratégia pensada para o seu segmento",
                    "Total vulnerabilidade a oposições e indeferimentos",
                    "Você faz tudo sozinho, sem apoio especializado",
                    "Sem canal direto para tirar dúvidas durante o processo",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5 text-red-500 mt-0.5 flex-shrink-0"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                      <span className="text-slate-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg bg-gradient-to-br from-blue-50 to-indigo-50 relative overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <CardContent className="p-6">
                <h4 className="text-xl font-bold mb-4 text-primary flex items-center">
                  <div className="bg-primary/10 p-2 rounded-full mr-3">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  Registrando com a 3pi
                </h4>

                <ul className="space-y-3">
                  {[
                    "99% de aprovação logo na primeira tentativa",
                    "Economia real de tempo e dinheiro",
                    "Análise prévia para evitar conflitos com outras marcas",
                    "Documentação completa, feita por especialistas",
                    "Estratégia personalizada, de acordo com o seu nicho",
                    "Blindagem contra oposições e indeferimentos",
                    "Uma equipe de 5 especialistas dedicada ao seu registro",
                    "Grupo exclusivo no WhatsApp para suporte direto durante todo o processo",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle2 className="h-5 w-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-slate-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Button
            onClick={scrollToForm}
            size="lg"
            className="bg-gradient-to-r from-[#0057FF] to-[#007BFF] hover:from-[#0044CC] hover:to-[#0066CC] text-white py-6 px-8 text-lg shadow-lg hover:shadow-xl transition-all"
          >
            Fale com especialista da 3PI
            <ArrowRight className="ml-2 h-5 w-5" />
          </Button>

          <p className="mt-4 text-slate-500 text-sm">
            Análise de marca gratuita e sem compromisso
          </p>
        </motion.div>
      </div>
    </section>
  );
}
