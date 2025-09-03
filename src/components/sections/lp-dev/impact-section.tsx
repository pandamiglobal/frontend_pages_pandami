import { AlertTriangle, CheckCircle, Shield, DollarSign, Lock, TrendingUp, CheckCircle2, Medal, FileCheck } from "lucide-react"
import Link from "next/link"
import { Container } from "@/components/ui/container"

export default function ImpactSection() {
  return (
    <section className="snap-start min-h-screen flex items-center bg-white" id="impacto">
      <Container section={true}>
        <h2 className="title-2 mb-8 md:mb-16 text-center">
          O impacto da PPPI na segurança da sua empresa
        </h2>

        {/* Cards Antes/Depois */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* Card Antes */}
          <div className="border border-solid bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-[#f03634] mb-6">Antes da PPPI</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-[#f03634]" />
                </div>
                <span className="text-gray-700">Processo de registro de marca lento e burocrático</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-[#f03634]" />
                </div>
                <span className="text-gray-700">Monitoramento de violações limitado e manual</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-[#f03634]" />
                </div>
                <span className="text-gray-700">Vulnerabilidades cibernéticas não identificadas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-[#f03634]" />
                </div>
                <span className="text-gray-700">Resposta lenta a ataques e violações</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <AlertTriangle className="w-5 h-5 text-[#f03634]" />
                </div>
                <span className="text-gray-700">Prejuízos financeiros e de reputação</span>
              </li>
            </ul>
          </div>

          {/* Card Depois */}
          <div className="border border-solid bg-white rounded-xl shadow-md p-8">
            <h3 className="text-2xl font-bold text-[#0038ff] mb-6">Depois da PPPI</h3>
            <ul className="space-y-5">
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#0038ff]" />
                </div>
                <span className="text-gray-700">Processo de registro ágil e com acompanhamento especializado</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#0038ff]" />
                </div>
                <span className="text-gray-700">Monitoramento automático e contínuo de violações</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#0038ff]" />
                </div>
                <span className="text-gray-700">Proteção proativa contra ameaças cibernéticas</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#0038ff]" />
                </div>
                <span className="text-gray-700">Resposta rápida e eficaz em até 30 minutos</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="shrink-0 mt-0.5">
                  <CheckCircle className="w-5 h-5 text-[#0038ff]" />
                </div>
                <span className="text-gray-700">Marca segura e valor de negócio protegido</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Certificações */}
        <div className="flex flex-wrap justify-center gap-4 mb-8 md:mb-16">
          <div className="border border-solid bg-white rounded-full shadow-sm px-6 py-3 flex items-center gap-2">
            <Shield className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">ISO 27001</span>
          </div>
          <div className="border border-solid bg-white rounded-full shadow-sm px-6 py-3 flex items-center gap-2">
            <FileCheck className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">GDPR Compliant</span>
          </div>
          <div className="border border-solidbg-white rounded-full shadow-sm px-6 py-3 flex items-center gap-2">
            <Medal className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">SOC 2 Type II</span>
          </div>
          <div className="border border-solid bg-white rounded-full shadow-sm px-6 py-3 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-gray-700" />
            <span className="text-gray-800 font-medium">INPI Autorizado</span>
          </div>
        </div>

        {/* Cards de Estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6  mb-8 md:mb-16">
          {/* Card 1: Taxa de sucesso */}
          <div className="border border-solid bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Shield className="w-6 h-6 text-[#0038ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Proteção de marca</p>
                <h3 className="text-3xl font-bold">95%</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Taxa de sucesso em registro de marcas aprovados.</p>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#0038ff] rounded-full" style={{ width: "95%" }}></div>
            </div>
          </div>

          {/* Card 2: Economia */}
          <div className="border border-solid bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-[#0038ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Economia em processos</p>
                <h3 className="text-3xl font-bold">R$1,2M</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Economia média em litígios de marca evitados.</p>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#0038ff] rounded-full" style={{ width: "80%" }}></div>
            </div>
          </div>

          {/* Card 3: Taxa de detecção */}
          <div className="border border-solid bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <Lock className="w-6 h-6 text-[#0038ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Vulnerabilidades bloqueadas</p>
                <h3 className="text-3xl font-bold">98%</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Taxa de detecção e prevenção de ameaças.</p>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#0038ff] rounded-full" style={{ width: "98%" }}></div>
            </div>
          </div>

          {/* Card 4: ROI */}
          <div className="border border-solid bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center gap-4 mb-3">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                <TrendingUp className="w-6 h-6 text-[#0038ff]" />
              </div>
              <div>
                <p className="text-sm text-gray-600">ROI no primeiro ano</p>
                <h3 className="text-3xl font-bold">320%</h3>
              </div>
            </div>
            <p className="text-gray-600 text-sm">Retorno médio sobre o investimento no primeiro ano.</p>
            <div className="w-full h-2 bg-gray-100 rounded-full mt-4 overflow-hidden">
              <div className="h-full bg-[#0038ff] rounded-full" style={{ width: "100%" }}></div>
            </div>
          </div>
        </div>

        {/* CTA Button */}
        <div className="text-center">
          <Link
            href="https://wa.me/5548988809713?text=Ol%C3%A1!%20Quero%20garantir%20a%20seguran%C3%A7a%20da%20minha%20marca!"
            className="inline-block px-8 py-4 bg-[#f47834] text-white text-lg font-medium rounded-full hover:bg-[#e06724] transition-colors"
          >
            Proteger a minha marca!
          </Link>
        </div>
      </Container>
    </section>
  )
}
