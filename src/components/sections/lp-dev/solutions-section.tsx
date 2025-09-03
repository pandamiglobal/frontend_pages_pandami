import SolutionDesktop from "@/components/svg/solution-desktop"
import SolutionMobile from "@/components/svg/solution-mobile"
import { Container } from "@/components/ui/container"
import { Search, Shield, Bell, Globe, Copyright, Database } from "lucide-react"

export default function SolutionsSection() {
  return (
    <section className="snap-start min-h-screen flex items-center bg-white py-16" id="solucoes">
      <Container section={true}>
        <div className="max-w-4xl mx-auto text-center mb-16">
          <h2 className="title-2 mb-4 md:mb-6">
            Soluções Completas para Proteção de Marcas e Cibersegurança
          </h2>

          <p className="text-3 !text-gray-700">
            Nossa plataforma integra serviços de registro de marcas com proteção avançada de cibersegurança, garantindo
            que sua identidade de marca e ativos digitais estejam totalmente protegidos.
          </p>
        </div>

        {/* Diagrama Central */}
        <div className="hidden md:block">
          <SolutionDesktop />
        </div>

        <div className="md:hidden">
          <SolutionMobile />
        </div>

        {/* Cards de Serviços */}
        <div className="grid md:grid-cols-3 gap-8">
          {/* Card 1: Registro de Marcas */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-solid">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Copyright className="w-6 h-6 text-[#2a4f94]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Registro de Marcas</h3>
            <p className="text-gray-700 mb-6">
              Proteção completa da sua identidade de marca com processo simplificado de registro nacional e
              internacional.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Análise prévia de disponibilidade da marca</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Protocolo e acompanhamento junto ao INPI</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Monitoramento contínuo contra infrações</span>
              </li>
            </ul>
          </div>

          {/* Card 2: Cibersegurança Inteligente */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-solid">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Shield className="w-6 h-6 text-[#2a4f94]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Cibersegurança Inteligente</h3>
            <p className="text-gray-700 mb-6">
              Proteção avançada contra ameaças digitais utilizando inteligência artificial e monitoramento em tempo
              real.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Detecção proativa de vulnerabilidades</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Proteção contra ataques de phishing e falsificação</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Monitoramento contínuo da dark web</span>
              </li>
            </ul>
          </div>

          {/* Card 3: Gestão Integrada de Ativos */}
          <div className="bg-white rounded-lg shadow-md p-8 border border-solid">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-6">
              <Database className="w-6 h-6 text-[#2a4f94]" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-4">Gestão Integrada de Ativos</h3>
            <p className="text-gray-700 mb-6">
              Plataforma unificada para gerenciar todos os seus ativos digitais e propriedade intelectual em um só
              lugar.
            </p>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Dashboard centralizado de todos os ativos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Alertas automáticos sobre vencimentos e renovações</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                  <div className="w-2 h-2 bg-[#2a4f94] rounded-full"></div>
                </div>
                <span className="text-gray-700">Relatórios detalhados de proteção e violações</span>
              </li>
            </ul>
          </div>
        </div>
      </Container>
    </section>
  )
}
