import { Container } from "@/components/ui/container"
import Image from "next/image"

interface Testimonial {
  name: string
  role: string
  company: string
  image: string
  quote: string
}

export function TestimonialsSection() {
  const testimonials: Testimonial[] = [
    {
      name: "Maria Silva",
      role: "Proprietária",
      company: "Café & Companhia",
      image: "/testimonials/home/maria-silva.jpg",
      quote:
        "Sempre pensei que registrar minha marca seria um processo burocrático e demorado, até conhecer a 3pi. Fiquei impressionada com a simplicidade do processo! Em menos de uma semana já tinha todo o encaminhamento do registro da minha cafeteria. A equipe me explicou cada etapa com clareza e me manteve informada sobre tudo. Hoje tenho minha marca protegida e muita tranquilidade para expandir meu negócio.",
    },
    {
      name: "Carlos Mendes",
      role: "Fundador",
      company: "Startup TechNow",
      image: "/testimonials/home/carlos-men.jpg",
      quote:
        "Como empreendedor de tecnologia, eu sabia da importância de proteger minha marca, mas não tinha ideia por onde começar. A 3pi tornou tudo incrivelmente prático. O que mais me surpreendeu foi a rapidez e o atendimento personalizado. Recebi orientação sobre classes de registro e estratégias de proteção que nem imaginava existir. Consegui registrar minha marca em tempo recorde e com um custo muito mais acessível do que esperava.",
    },
    {
      name: "Ana Paula Ferreira",
      role: "Designer de moda",
      company: "Stud. Ana Paula Ferreira",
      image: "/testimonials/home/ana-paula.jpg",
      quote:
        "Minha coleção estava crescendo e precisava urgentemente proteger minha marca antes de lançar em lojas parceiras. Um amigo me indicou a 3pi e foi a melhor recomendação que recebi! O processo foi totalmente digital, sem burocracia e com acompanhamento constante. O que mais valorizei foi a transparência sobre prazos e custos - sem surpresas desagradáveis. ",
    },
    {
      name: "Jorge Santana",
      role: "Dono",
      company: "Imobiliária Santana",
      image: "/testimonials/home/jorge-santana.jpg",
      quote:
        "Depois de gastar tempo e dinheiro com um escritório de advocacia sem resultados, estava totalmente cético quando me indicaram a 3pi. Pensei: 'é só mais uma empresa fazendo promessas vazias'. Os prazos pareciam irreais e o custo era muito baixo para ser verdade. Nunca fiquei tão feliz em estar enganado! A 3pi não só cumpriu todos os prazos como me manteve informado de cada etapa, sem complicações ou linguagem jurídica confusa. O que parecia bom demais para ser verdade era exatamente o que eu precisava. Já registrei três marcas com eles e recomendo sem hesitar.",
    },
  ]

  return (
    <section className="py-16 bg-white">
      <Container>
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-[#111827] mb-4">
            Vejam o que vários empresários falam sobre nós
          </h2>
          <p className="text-lg text-[#4B5563]">Os recados de quem mais entende de marca e confia na PPPI</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="flex flex-col">
              <div className="aspect-square relative overflow-hidden rounded-2xl mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={`Foto de ${testimonial.name}`}
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-bold text-[#111827]">{testimonial.name}</h3>
              <p className="text-sm text-[#4B5563] mb-3">
                {testimonial.role}, {testimonial.company}
              </p>
              <p className="text-[#374151]" title={testimonial.quote}>
                "{
                  testimonial.quote.length > 200 ?
                    testimonial.quote.slice(0, 230) + "..." :
                    testimonial.quote
                }"
              </p>
            </div>
          ))}
        </div>
      </Container>
    </section>
  )
}

