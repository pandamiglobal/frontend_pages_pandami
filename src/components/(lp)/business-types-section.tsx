import { Plus } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { Button } from "../ui/button";
import Link from "next/link";

export default function BusinessTypesSection() {
  const scrollToSection = (id: any) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="py-16 bg-white border-t border-gray-100">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-[400px_1fr] items-center gap-8 md:gap-16">
          {/* Left column - Business types */}
          <div className="flex flex-col gap-2">
            <Accordion type="single" collapsible className="space-y-4">
              <AccordionItem value="item-1" className="overflow-hidden">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-xl md:text-2xl">
                    MEI, ME, EPP +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Micro Empresas e Pequenas Empresas.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2" className="overflow-hidden">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-xl md:text-2xl">
                    INDUSTRIAS +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Industrias, Registro de Marca, Patentes.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3" className="overflow-hidden">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-xl md:text-2xl">
                    CORPORAÇÕES +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Grandes Corporações, Grandes Empresas, Tudo e qualquer
                    Registro.
                  </p>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4" className="overflow-hidden">
                <AccordionTrigger className="px-6 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium text-xl md:text-2xl">
                    SOFTWARES +
                  </span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2">
                  <p className="text-gray-700">
                    Registro de Softwares de todos Segmentos.
                  </p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
            {/* <div className="flex items-center gap-2 border-gray-200 pb-4">
              <h3 className="text-2xl font-bold text-[#000000]">MEI, ME, EPP</h3>
              <Plus className="h-6 w-6 text-[#000000]" />
            </div>

            <div className="flex items-center gap-2 border-gray-200 pb-4">
              <h3 className="text-2xl font-bold text-[#000000]">INDUSTRIAS</h3>
              <Plus className="h-6 w-6 text-[#000000]" />
            </div>

            <div className="flex items-center gap-2 border-gray-200 pb-4">
              <h3 className="text-2xl font-bold text-[#000000]">CORPORAÇÕES</h3>
              <Plus className="h-6 w-6 text-[#000000]" />
            </div>

            <div className="flex items-center gap-2 border-gray-200 pb-4">
              <h3 className="text-2xl font-bold text-[#000000]">SOFTWARES</h3>
              <Plus className="h-6 w-6 text-[#000000]" />
            </div> */}
          </div>

          {/* Right column - CTA */}
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-6">
              Não importa o tamanho da sua marca
            </h2>
            <p className="text-[#4b5563] text-lg mb-8">
              Com nossa vasta experiência, somos especializados em registrar
              qualquer tipo de marca, atendendo empresas de todos os setores com
              eficiência e segurança.
            </p>

            <div
              className="flex flex-col sm:flex-row gap-4"
              onClick={() => scrollToSection("hero-brand")}
            >
              <Button
                size="lg"
                className="bg-[#0047ff] hover:bg-[#0047ff]/90 text-white rounded-full w-full"
              >
                INICIAR REGISTRO
              </Button>

              <Link
                href="https://api.whatsapp.com/send?phone=48988793250"
                target="__blank"
                className="w-full"
              >
                <Button
                  size="lg"
                  variant={"secondary"}
                  className="rounded-full w-full"
                >
                  FALE COM UM CONSULTOR
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
