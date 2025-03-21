"use client"

import { Container } from "@/components/ui/container"
import Image from "next/image"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Link from "next/link"

interface ServiceTab {
  id: string
  title: string
  content: {
    title: string
    description: string
    details: string
    ctaText: string
    image: string
  }
}

export function CyberSecuritySection() {
  const serviceTabs: ServiceTab[] = [
    {
      id: "registro",
      title: "Registro de marca",
      content: {
        title: "Registro de Marca",
        description:
          "Antes de registrar sua marca, nossa equipe disponibiliza um consultor especializado para tirar todas as suas dúvidas.",
        details:
          "Realizamos uma análise detalhada da sua logo, nome da marca e fornecemos orientações personalizadas para adaptar o nome às diretrizes e normas ISO, garantindo que sua marca esteja totalmente em conformidade com os requisitos legais e pronta para ser registrada com segurança.",
        ctaText: "FALAR CONSULTOR AGORA",
        image: "/marca-registrada.png",
      },
    },
    {
      id: "monitoria",
      title: "Monitoria de marcas",
      content: {
        title: "Monitoria de Marcas",
        description: "Temos uma inteligência artificial com a capacidade de cinco advogados trabalhando diariamente. Ela monitora constantemente o INPI, identificando possíveis riscos e notificando você a cada movimentação relevante. dúvidas.",
        details:
          "Assim que uma ameaça é identificada, nossa equipe de consultores fica à disposição para orientar você sobre os próximos passos. Dessa forma, sua marca está sempre protegida com segurança e eficiência.",
        ctaText: "SOLICITAR MONITORAMENTO",
        image: "/monitoramento-de-marca.png",
      },
    },
  ]

  return (
    <section className="py-16 bg-gray-50 border-b border-[#E5E7EB]" id="servicos">
      <Container>
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">Segurança Ciberfísica Avançada</h2>
          <p className="text-lg text-[#4B5563] max-w-4xl">
            Registro de marcas, monitoramento contínuo no INPI e takedowns rápidos para bloquear infrações da sua marca. Proteja sua propriedade intelectual com tecnologia avançada e ação estratégica contra falsificação e concorrência desleal
          </p>
        </div>

        <Tabs defaultValue="registro" className="w-full">
          {/* Tabs estilizadas conforme o Figma */}
          <div className="inline-block bg-white rounded-lg border border-[#E5E7EB] p-1 mb-8 max-md:w-full">
            <TabsList className="bg-transparent h-auto p-1 gap-1 flex max-md:flex-col">
              {serviceTabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className="px-8 py-3 rounded-lg text-base font-medium max-md:w-full transition-colors data-[state=active]:bg-[#0147FC] data-[state=active]:text-white data-[state=inactive]:bg-transparent data-[state=inactive]:text-[#71717A]"
                >
                  {tab.title}
                </TabsTrigger>
              ))}
            </TabsList>
          </div>

          {serviceTabs.map((service) => (
            <TabsContent key={service.id} value={service.id} className="mt-0">
              <div className="bg-white rounded-2xl p-6 md:p-12 border border-[#E5E7EB]">
                <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8 lg:gap-12">
                  <div className="flex flex-col justify-center">
                    <h3 className="text-3xl font-bold text-[#111827] mb-6">{service.content.title}</h3>
                    <p className="text-lg text-[#334155] mb-6">{service.content.description}</p>
                    <p className="text-base text-[#334155] mb-10">{service.content.details}</p>
                    <div className="max-w-[450px]">
                      <Link
                        href="/#contato"
                        type="button"
                        className="cursor-pointer w-full bg-gradient-to-r from-[#0047FF] via-[#0037C3] to-[#002B99] hover:opacity-90 text-white font-medium py-4 px-6 rounded-full flex items-center justify-start relative overflow-hidden"
                      >
                        <span className="ml-4 relative z-10">{service.content.ctaText}</span>
                        <span className="max-[500px]:text-center max-[500px]:hidden ml-auto bg-white rounded-full p-1 text-[#0047FF] relative z-10">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              d="M5 12H19M19 12L12 5M19 12L12 19"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </span>
                        <div
                          className="absolute top-0 -left-[100%] w-[120%] h-full bg-gradient-to-r from-transparent via-white/20 to-transparent z-0"
                          style={{
                            animation: "shineEffect 3s infinite linear",
                          }}
                        ></div>
                        <style jsx>{`
                          @keyframes shineEffect {
                            0% { transform: translateX(0%); }
                            100% { transform: translateX(100%); }
                          }
                        `}</style>
                      </Link>
                    </div>
                  </div>
                  <div className="relative h-[300px] md:h-[400px] lg:h-auto rounded-xl overflow-hidden p-3 border border-solid border-[#E5E7EB] bg-[#F9FAFB]">
                    <Image
                      src={service.content.image || "/placeholder.svg"}
                      alt={service.content.title}
                      fill
                      className="object-contain block"
                    />
                  </div>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </Container>
    </section>
  )
}

