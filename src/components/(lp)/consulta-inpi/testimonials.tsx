import { Container } from "@/components/ui/container"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Maria Silva",
    role: "Empreendedora",
    content:
      "Graças ao Buscador de Marcas, pude verificar rapidamente a disponibilidade do nome da minha empresa. O processo foi simples e me deu confiança para seguir com o registro.",
    rating: 5,
  },
  {
    name: "João Santos",
    role: "Advogado",
    content:
      "Como advogado especializado em propriedade intelectual, recomendo esta ferramenta aos meus clientes. É eficiente e fornece informações valiosas para o processo de registro de marcas.",
    rating: 5,
  },
  {
    name: "Ana Oliveira",
    role: "Designer Gráfica",
    content:
      "Utilizo o Buscador de Marcas regularmente para verificar a viabilidade dos logos que crio para meus clientes. É uma etapa crucial no meu processo criativo.",
    rating: 4,
  },
]

export function Testimonials() {
  return (
    <section className=" bg-gray-900/5">
      <Container section={true} className="flex flex-col gap-8 md:gap-12">
        <h2 className="title-3 text-center">
          O que nossos usuários dizem
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="bg-white p-6 rounded-xl border border-black/10 hover:border-black/20 transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <p className="text-gray-600 mb-4">&quot;{testimonial.content}&quot;</p>
              <div className="text-gray-900">
                <p className="font-semibold">{testimonial.name}</p>
                <p className="text-sm">{testimonial.role}</p>
              </div>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

