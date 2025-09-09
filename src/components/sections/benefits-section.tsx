import { Container } from "@/components/ui/container"
import { PrimaryButton } from "@/components/ui/primary-button"
import {
  Target,
  Crown,
  Trophy,
  TrendingUp,
  Star,
  UserCheck,
  Sparkles,
  Heart,
  CircleCheck,
  ArrowRight
} from "lucide-react"
import type { ComponentType, SVGProps } from "react"

interface BenefitItemData {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  title: string
  description: string
}

const salonBenefits: BenefitItemData[] = [
  {
    icon: Target,
    title: "Consultas mais assertivas",
    description: "Mostre visualmente o resultado antes de começar, eliminando incertezas"
  },
  {
    icon: Crown,
    title: "Clientes mais confiantes",
    description: "Decidem com mais segurança, sabendo exatamente o que esperar do resultado."
  },
  {
    icon: Trophy,
    title: "Diferencial competitivo",
    description: "Tecnologia que seus concorrentes ainda não têm"
  }
]

const clientBenefits: BenefitItemData[] = [
  {
    icon: UserCheck,
    title: "Zero arrependimentos",
    description: "Veja como ficará antes de cortar ou pintar o cabelo"
  },
  {
    icon: Sparkles,
    title: "Sugestões personalizadas",
    description: "Baseadas nas características únicas, rosto e preferências do cliente"
  },
  {
    icon: Heart,
    title: "Confiança total",
    description: "Seu cliente sai do salão exatamente como sonhava"
  }
]

function BenefitItem({ icon: Icon, title, description }: BenefitItemData) {
  return (
    <li className="p-4 rounded-xl bg-neutral-700/60 outline outline-1 outline-white/50 flex gap-4 items-start shadow-md">
      <div className="w-12 h-12 bg-neutral-700 rounded-lg flex items-center justify-center">
        <Icon className="text-white w-6 h-6" />
      </div>
      <div>
        <div className="text-white text-xl font-medium">{title}</div>
        <div className="text-neutral-400 text-base leading-tight">{description}</div>
      </div>
    </li>
  )
}

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full bg-neutral-800 pt-2 pb-16 md:pt-2 md:pb-20">
      <Container>
        <h2 className="text-white text-3xl md:text-4xl font-semibold mb-8 md:mb-12 text-center">Uma Ferramenta, Dois Mundos de Possibilidades</h2>
        {/* Linha 1 */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 justify-between items-center">
          <div className="flex-1 flex flex-col gap-2 md:gap-4 max-w-xl w-full">
            <h3 className="text-white text-2xl md:text-3xl font-medium mb-1 md:mb-2">Seu Salão no Mais Alto Nível</h3>
            <ul className="flex flex-col gap-3 md:gap-4">
              {salonBenefits.map(b => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </ul>
            <PrimaryButton
              className="mt-4 w-fit"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}>
              Transformar o meu salão
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="relative w-full max-w-sm aspect-square  rounded-br-lg overflow-hidden flex items-center justify-center">
              <img
                src="/lp/images/benefits/benefits-section-image-1.png"
                alt="Ambiente de salão"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
              {/* Popover superior esquerdo */}
              <div className="absolute top-4 right-0 bg-white/80 rounded-lg flex items-center gap-2 p-2 shadow outline outline-1 outline-white/50">
                <div className="w-10 h-10 bg-emerald-100 rounded flex items-center justify-center">
                  <TrendingUp className="text-emerald-600 w-6 h-6" />
                </div>
                <div>
                  <div className="text-neutral-800 text-xl font-normal">+47%</div>
                  <div className="text-neutral-600 text-xs">faturamento médio dos parceiros</div>
                </div>
              </div>
              {/* Popover inferior direito reposicionado */}
              <div className="absolute bottom-4 left-4 bg-white/80 rounded-lg flex items-center gap-2 p-2 shadow outline outline-1 outline-white/40">
                <div className="w-10 h-10 bg-amber-100 rounded flex items-center justify-center">
                  <Star className="text-amber-400 w-6 h-6" />
                </div>
                <div>
                  <div className="text-neutral-800 text-xl font-normal">+78%</div>
                  <div className="text-neutral-600 text-xs">Clientes satisfeitos</div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Linha 2 */}
        <div className="flex flex-col lg:flex-row-reverse gap-10 lg:gap-16 justify-between items-center mt-14 md:mt-20">
          <div className="flex-1 flex flex-col gap-2 md:gap-4 max-w-xl w-full">
            <h3 className="text-white text-2xl md:text-3xl font-medium mb-1 md:mb-2">Seu Cliente Sempre Satisfeito</h3>
            <ul className="flex flex-col gap-3 md:gap-4">
              {clientBenefits.map(b => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </ul>
            <PrimaryButton
              className="mt-4 w-fit"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}>
              Descobrir meu visual
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-6 items-center">
            <div className="relative w-full max-w-sm aspect-square rounded-br-lg overflow-hidden flex items-center justify-center">
              <img
                src="/lp/images/benefits/benefits-section-image-2.png"
                alt="Atendimento ao cliente"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
              {/* Popover superior esquerdo */}
              <div className="absolute top-4 left-4 bg-white/80 rounded-lg flex items-center gap-2 p-2 shadow outline outline-1 outline-white/50">
                <div className="w-10 h-10 bg-blue-100 rounded flex items-center justify-center">
                  <CircleCheck className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <div className="text-neutral-800 text-xl font-normal">+94%</div>
                  <div className="text-neutral-600 text-xs">aprovação das transformações</div>
                </div>
              </div>
              {/* Popover inferior direito reposicionado */}
              <div className="absolute bottom-4 right-4 bg-white/80 rounded-lg flex items-center gap-2 p-2 shadow outline outline-1 outline-white/40">
                <div className="w-10 h-10 bg-pink-100 rounded flex items-center justify-center">
                  <Crown className="text-pink-600 w-6 h-6" />
                </div>
                <div>
                  <div className="text-neutral-800 text-xl font-normal">9 em 10</div>
                  <div className="text-neutral-600 text-xs">mulheres se sentem mais confiantes</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
