import { Avatar, AvatarFallback } from "../ui/avatar"

export default function TestimonialsSection() {
  const testimonials = [
    {
      name: "Ricardo Santos",
      role: "CEO da TechBrasil",
      text: "A proteção da nossa marca é fundamental. Com o monitoramento adequado, evitamos vários problemas legais.",
      initials: "RS",
    },
    {
      name: "Ana Oliveira",
      role: "Diretora Jurídica",
      text: "Excelente serviço! Nos ajudou a proteger nossa marca de forma proativa e eficiente.",
      initials: "AO",
    },
    {
      name: "Carlos Silva",
      role: "Fundador da InovaTech",
      text: "Depois que começamos a monitorar nossa marca, identificamos e evitamos várias tentativas de uso indevido.",
      initials: "CS",
    },
    {
      name: "Marina Costa",
      role: "COO da Digital Solutions",
      text: "Indispensável para qualquer empresa que valoriza sua propriedade intelectual. Recomendo fortemente!",
      initials: "MC",
    },
    {
      name: "Paulo Mendes",
      role: "Diretor de Marketing",
      text: "A facilidade de monitoramento e os alertas em tempo real são fundamentais para nossa estratégia.",
      initials: "PM",
    },
    {
      name: "Lucia Ferreira",
      role: "Advogada Empresarial",
      text: "Uma ferramenta essencial para proteger os ativos intangíveis das empresas. Muito satisfeita!",
      initials: "LF",
    },
    {
      name: "Roberto Almeida",
      role: "Empresário",
      text: "Investimento que vale cada centavo. A segurança que precisávamos para nossa marca.",
      initials: "RA",
    },
    {
      name: "Beatriz Lima",
      role: "Gerente de Compliance",
      text: "O monitoramento constante nos dá tranquilidade e segurança na gestão da marca.",
      initials: "BL",
    },
  ].flatMap((t) => [t, { ...t, key: `${t.name}-2` }])

  return (
    <>
      <style jsx>{`
        .hide-scrollbar {
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: smooth;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
      <section className="w-full py-6 md:py-12 bg-white overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="text-center mb-6 md:mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">O que nossos clientes dizem</h2>
            <p className="text-[#666666] max-w-2xl mx-auto">
              Não acredite apenas em nossa palavra. Veja o que <span className="font-medium">empresas reais</span> estão
              dizendo sobre nossa solução de monitoramento de marcas.
            </p>
          </div>

          <div className="testimonial-container">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div
                className="flex animate-scroll"
                style={{ animationDuration: "30s", animationIterationCount: "infinite", width: "200%" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow w-[300px] flex-shrink-0 mx-3"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#2563eb] text-white">{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="testimonial-container mt-6">
            <div className="flex overflow-x-auto hide-scrollbar">
              <div
                className="flex animate-scroll-reverse"
                style={{ animationDuration: "30s", animationIterationCount: "infinite", width: "200%" }}
              >
                {testimonials.map((testimonial, index) => (
                  <div
                    key={index}
                    className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow w-[300px] flex-shrink-0 mx-3"
                  >
                    <div className="flex items-start gap-4 mb-4">
                      <Avatar className="h-10 w-10">
                        <AvatarFallback className="bg-[#2563eb] text-white">{testimonial.initials}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="font-semibold text-gray-900">{testimonial.name}</h3>
                        <p className="text-sm text-gray-600">{testimonial.role}</p>
                      </div>
                    </div>
                    <p className="text-gray-700">{testimonial.text}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
