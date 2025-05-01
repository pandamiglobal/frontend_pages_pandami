import { Container } from "@/components/ui/container"
import Link from "next/link"
import { GlobeAlternative } from "./globe-alternative"

export default function HeroSection() {
  return (
    <section className="snap-start min-h-screen flex pt-12 justify-center overflow-hidden relative">
      {/* Background com grid pattern e gradiente animado */}
      <div className="absolute inset-0 bg-[#F3F4F6]">
        <div className="absolute inset-0 bg-grid-pattern"></div>
        <div className="absolute inset-0 animated-gradient"></div>
      </div>

      {/* Content Container */}
      <Container section={true} className="z-10">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="title-1 mb-6">
            Proteção Inteligente para <span className="text-[#f47834]">Marcas</span>
          </h1>
          <p className="text-3 !text-gray-700 mb-8">
            Registro de marcas e cibersegurança avançada com tecnologia de IA para proteger seu negócio em tempo real
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="#registrar"
              className="py-4 px-2 md:px-6 rounded-full flex items-center justify-center md:justify-start relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-[#f47834] text-white font-medium hover:bg-[#e06724] transition-colors"
            >
              Registrar Minha Marca
            </Link>
            <Link
              href="#consultoria"
              className="py-4 px-2 md:px-6 rounded-full flex items-center justify-center md:justify-start relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed bg-white text-[#f47834] border-2 border-[#f47834] font-medium hover:bg-gray-50 transition-colors"
            >
              Consultoria em Cibersegurança
            </Link>
          </div>
        </div>
      </Container>
      
      <GlobeAlternative className="absolute bottom-[-100px] min-w-[400px]:bottom-[-200px] sm:bottom-[-300px] left-1/2 -translate-x-1/2" />
    </section>
  )
}
