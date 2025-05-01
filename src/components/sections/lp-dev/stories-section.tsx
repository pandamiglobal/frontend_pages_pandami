"use client"

import { useState } from "react"
import { AlertTriangle, ArrowRight, CheckCircle, Shield } from "lucide-react"
import Image from "next/image"
import { Container } from "@/components/ui/container"

// Tipos para os dados das empresas
type Company = {
  id: string
  category: string
  name: string
  description: string
  logo?: string
  beforeText: string
  processText: string
  resultsText: string
}

// Dados das empresas para cada categoria
const companiesData: Record<string, Company[]> = {
  startups: [
    {
      id: "luminaris",
      category: "startups",
      name: "Luminaris Start",
      description: "Descrição da empresa",
      beforeText:
        "Sem registro, qualquer pessoa pode copiar e registrar seu nome, logotipo e identidade visual, forçando você a rebatizar seu próprio negócio e recomeçar do zero",
      processText:
        "Sem registro, qualquer pessoa pode copiar e registrar seu nome, logotipo e identidade visual, forçando você a rebatizar seu próprio negócio e recomeçar do zero",
      resultsText:
        "Sem registro, qualquer pessoa pode copiar e registrar seu nome, logotipo e identidade visual, forçando você a rebatizar seu próprio negócio e recomeçar do zero",
    }
  ],
  infoprodutores: [
    {
      id: "educonecta",
      category: "infoprodutores",
      name: "EduConecta",
      description: "Plataforma de cursos online",
      beforeText: "Teve seu nome e metodologia copiados por concorrentes, perdendo mais de R$150 mil em vendas",
      processText: "Registrou marca, nome de cursos como marcas individuais e implementou proteção digital",
      resultsText: "Conseguiu derrubar 17 cópias nas redes sociais e aumentou faturamento em 230% com exclusividade",
    },
  ],
  ecommerce: [
    {
      id: "modaverde",
      category: "ecommerce",
      name: "ModaVerde",
      description: "E-commerce de moda sustentável",
      beforeText: "Sofreu com 5 lojas falsas usando seu nome e imagens, confundindo clientes",
      processText: "Registrou marca, domínios variantes e implementou monitoramento de marketplaces",
      resultsText:
        "Removeu todas as falsificações, garantiu exclusividade e expandiu para marketplace oficial com proteção",
    },
  ],
  nutraceuticos: [
    {
      id: "vitaessence",
      category: "nutraceuticos",
      name: "VitaEssence",
      description: "Empresa de suplementos naturais",
      beforeText: "Teve fórmula e nome copiados, com produtos falsificados prejudicando sua reputação",
      processText: "Registrou marca, embalagem como trade dress e implementou sistema anti-falsificação",
      resultsText:
        "Conseguiu indenização de R$400 mil por uso indevido e aumentou vendas em 180% com garantia de autenticidade",
    },
  ],
  fintechs: [
    {
      id: "payfacil",
      category: "fintechs",
      name: "PayFácil",
      description: "Solução de pagamentos digitais",
      beforeText: "Sofreu tentativa de golpe com site falso usando seu nome e visual, prejudicando clientes",
      processText: "Registrou marca, implementou monitoramento de domínios e proteção digital avançada",
      resultsText:
        "Bloqueou 23 tentativas de phishing, garantiu confiança dos usuários e fechou parceria com banco internacional",
    },
  ],
}

// Categorias para as tabs
const categories = [
  { id: "startups", label: "Startups" },
  { id: "infoprodutores", label: "Infoprodutores" },
  { id: "ecommerce", label: "E-commerce" },
  { id: "nutraceuticos", label: "Nutracêuticos" },
  { id: "fintechs", label: "Fintechs" },
]

export default function StoriesSection() {
  // Estado para controlar a categoria selecionada
  const [selectedCategory, setSelectedCategory] = useState("startups")
  // Estado para controlar a empresa selecionada dentro da categoria
  const [selectedCompanyIndex, setSelectedCompanyIndex] = useState(0)

  // Obter as empresas da categoria selecionada
  const companiesInCategory = companiesData[selectedCategory] || []
  const selectedCompany = companiesInCategory[selectedCompanyIndex] || companiesInCategory[0]

  // Função para mudar de categoria
  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(categoryId)
    setSelectedCompanyIndex(0) // Reset para a primeira empresa da categoria
  }

  return (
    <section className="snap-start min-h-screen flex items-center bg-gray-50" id="historias">
      <Container section={true} >
        <div className="text-center mb-8 md:mb-12">
          <h2 className="title-2 max-w-[900px] mx-auto !text-[#0038ff] mb-4 md:mb-6">
            De vulnerável a protegida:{" "}
            <span className="text-[#0038ff]">histórias reais de marcas que garantiram seu futuro</span>
          </h2>
        </div>

        {/* Tabs de categorias */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              onClick={() => handleCategoryChange(category.id)}
              className={`px-6 py-3 rounded-full text-sm md:text-base font-medium transition-colors ${selectedCategory === category.id
                ? "bg-[#0038ff] text-white"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
                }`}
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* Card da empresa */}
        {selectedCompany && (
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8 max-w-5xl mx-auto">
            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-8">
              <div className="flex items-center max-md:flex-col max-md:w-full gap-5">
                {/* Logo da empresa (placeholder) */}
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center shrink-0">
                  {selectedCompany.logo ? (
                    <Image
                      src={selectedCompany.logo || "/placeholder.svg"}
                      alt={`Logo ${selectedCompany.name}`}
                      width={80}
                      height={80}
                      className="rounded-full"
                    />
                  ) : (
                    <span className="text-2xl font-bold text-gray-400">{selectedCompany.name.charAt(0)}</span>
                  )}
                </div>

                {/* Informações da empresa */}
                <div className="flex-1">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{selectedCompany.name}</h3>
                  <p className="text-gray-600">{selectedCompany.description}</p>
                </div>

              </div>

              {/* Badges */}
              <div className="flex flex-wrap gap-3 max-md:w-full max-md:justify-center">
                <div className="flex items-center gap-2 bg-[#eaf1ff] text-[#0038ff] px-4 py-2 rounded-full">
                  <Shield className="w-5 h-5" />
                  <span>Registro de marca</span>
                </div>
                <div className="flex items-center gap-2 bg-[#e9ffea] text-[#007e06] px-4 py-2 rounded-full">
                  <CheckCircle className="w-5 h-5" />
                  <span>Empresa segura</span>
                </div>
              </div>
            </div>

            {/* Processo em 3 colunas */}
            <div className="grid md:grid-cols-3 gap-6">
              {/* Antes */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#fef2f2] flex items-center justify-center">
                    <AlertTriangle className="w-5 h-5 text-[#d56463]" />
                  </div>
                  <h4 className="text-lg font-semibold">Antes da PPPI</h4>
                </div>
                <p className="text-gray-700">{selectedCompany.beforeText}</p>
              </div>

              {/* Processo */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#eaf1ff] flex items-center justify-center">
                    <ArrowRight className="w-5 h-5 text-[#6498ff]" />
                  </div>
                  <h4 className="text-lg font-semibold">O processo</h4>
                </div>
                <p className="text-gray-700">{selectedCompany.processText}</p>
              </div>

              {/* Resultados */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#e9ffea] flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-[#007e06]" />
                  </div>
                  <h4 className="text-lg font-semibold">Resultados</h4>
                </div>
                <p className="text-gray-700">{selectedCompany.resultsText}</p>
              </div>
            </div>

            {/* Navegação entre empresas da mesma categoria (se houver mais de uma) */}
            {companiesInCategory.length > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex gap-2">
                  {companiesInCategory.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setSelectedCompanyIndex(index)}
                      className={`w-3 h-3 rounded-full ${selectedCompanyIndex === index ? "bg-[#0038ff]" : "bg-gray-300"
                        }`}
                      aria-label={`Ver empresa ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </Container>
    </section>
  )
}
