import Link from "next/link"
import { Check } from "lucide-react"
import { Container } from "@/components/ui/container"

export default function CTASection() {
  return (
    <section className="snap-start min-h-screen flex items-center justify-center bg-gray-50" id="registrar">
      <Container section={true}>
        <div className="mb-8 md:mb-12">
          <h2 className="text-center title-2 max-w-[900px] mx-auto mb-4 md:mb-6">
            Proteja a sua empresa, tome uma <span className="text-[#f47834]">decisão agora</span>
          </h2>
          <p className="text-center text-3 !text-gray-700 max-w-3xl mx-auto">
            Só em 2025, mais de 17 mil pedidos foram negados porque outro empresário registrou primeiro. Enquanto isso,
            a pirataria gera quase 1 bilhão de reais em prejuízos para as marcas.
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-8 md:p-12 max-w-3xl mx-auto">
          <h3 className="title-3 mb-6 md:mb-8 text-center">
            De o primeiro passo para proteger sua empresa, registre sua marca agora!
          </h3>

          <div className="mb-8">
            <h4 className="text-xl font-semibold mb-6">Benefícios exclusivos:</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eaf1ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#0038ff]" />
                </div>
                <span className="text-lg text-gray-700">Análise de viabilidade expressa (72h)</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eaf1ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#0038ff]" />
                </div>
                <span className="text-lg text-gray-700">Depósito prioritário no INPI</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eaf1ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#0038ff]" />
                </div>
                <span className="text-lg text-gray-700">Monitoramento contínuo de novas solicitações</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eaf1ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#0038ff]" />
                </div>
                <span className="text-lg text-gray-700">Certificado digital de pedido em andamento</span>
              </li>
              <li className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-[#eaf1ff] flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-4 h-4 text-[#0038ff]" />
                </div>
                <span className="text-lg text-gray-700">
                  <strong>Bônus:</strong> E-book "Como valorizar sua marca após o registro"
                </span>
              </li>
            </ul>
          </div>

          <div className="border-t border-gray-200 pt-8 mb-8"></div>

          <div className="text-center">
            <Link
              href="https://wa.me/5548988809713?text=Ol%C3%A1!%20Quero%20garantir%20a%20seguran%C3%A7a%20da%20minha%20marca!"
              className="inline-block w-full py-4 px-8 bg-[#f47834] text-white text-lg font-medium rounded-full hover:bg-[#e06724] transition-colors"
            >
              Fale conosco
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
