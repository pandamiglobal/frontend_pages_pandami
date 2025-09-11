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

interface PopoverData {
  icon: ComponentType<SVGProps<SVGSVGElement>>
  value: string
  label: string
  bgColor: string
  iconColor: string
  position: "top-left" | "top-right" | "bottom-left" | "bottom-right"
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
    <li className="p-3 sm:p-4 rounded-xl bg-neutral-700/60 outline outline-1 outline-white/50 flex gap-3 sm:gap-4 items-start shadow-md transition-all hover:bg-neutral-700/80">
      <div className="min-w-[2.5rem] w-10 h-10 sm:w-12 sm:h-12 bg-neutral-700 rounded-lg flex items-center justify-center shrink-0">
        <Icon className="text-white w-5 h-5 sm:w-6 sm:h-6" />
      </div>
      <div className="flex-1">
        <div className="text-white text-base sm:text-lg md:text-xl font-medium">{title}</div>
        <div className="text-neutral-400 text-xs sm:text-sm md:text-base leading-tight mt-1">{description}</div>
      </div>
    </li>
  )
}

function Popover({ icon: Icon, value, label, bgColor, iconColor, position }: PopoverData) {
  const positionClasses = {
    "top-left": "top-2 sm:top-4 left-2 sm:left-4",
    "top-right": "top-2 sm:top-4 right-2 sm:right-0",
    "bottom-left": "bottom-2 sm:bottom-4 left-2 sm:left-4",
    "bottom-right": "bottom-2 sm:bottom-4 right-2 sm:right-4"
  }

  return (
    <div className={`absolute ${positionClasses[position]} bg-white/80 backdrop-blur-sm rounded-lg flex items-center gap-1.5 sm:gap-2 p-1.5 sm:p-2 shadow outline outline-1 outline-white/50 max-w-[48%] sm:max-w-none z-10`}>
      <div className="min-w-6 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 bg-${bgColor} rounded flex items-center justify-center shrink-0">
        <Icon className={`text-${iconColor} w-3 h-3 sm:w-4 sm:h-4 md:w-6 md:h-6`} />
      </div>
      <div>
        <div className="text-neutral-800 text-sm sm:text-base md:text-xl font-normal">{value}</div>
        <div className="text-neutral-600 text-[8px] sm:text-[10px] md:text-xs leading-tight">{label}</div>
      </div>
    </div>
  )
}

export function BenefitsSection() {
  return (
    <section id="benefits" className="w-full bg-neutral-800 pt-4 pb-12 sm:pt-2 sm:pb-16 md:pt-2 md:pb-20">
      <Container className="px-4 sm:px-6">
        <h3 className="text-white font-semibold mb-6 md:mb-12 text-center text-xl sm:text-2xl md:text-3xl">Uma Ferramenta, Dois Mundos de Possibilidades</h3>

        {/* Salon Benefits */}
        <div className="flex flex-col-reverse lg:flex-row gap-6 sm:gap-8 lg:gap-16 justify-between items-center">
          <div className="flex-1 flex flex-col gap-2 max-w-xl w-full">
            <h4 className="text-white font-medium mb-2 text-lg sm:text-xl md:text-2xl">Seu Salão no Mais Alto Nível</h4>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full">
              {salonBenefits.map(b => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </ul>
            <PrimaryButton
              className="mt-5 w-full sm:w-auto lg:w-fit"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Transformar o meu salão
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-6 items-center w-full sm:w-auto">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg aspect-square rounded-br-lg overflow-hidden flex items-center justify-center">
              <img
                src="/lp/images/benefits/benefits-section-image-1.png"
                alt="Ambiente de salão"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
              <Popover
                icon={TrendingUp}
                value="+47%"
                label="faturamento médio dos parceiros"
                bgColor="emerald-100"
                iconColor="emerald-600"
                position="top-right"
              />
              <Popover
                icon={Star}
                value="+78%"
                label="Clientes satisfeitos"
                bgColor="amber-100"
                iconColor="amber-400"
                position="bottom-left"
              />
            </div>
          </div>
        </div>

        {/* Client Benefits */}
        <div className="flex flex-col-reverse lg:flex-row-reverse gap-6 sm:gap-8 lg:gap-16 justify-between items-center mt-10 sm:mt-12 md:mt-20">
          <div className="flex-1 flex flex-col gap-2 max-w-xl w-full">
            <h4 className="text-white font-medium mb-2 text-lg sm:text-xl md:text-2xl">Seu Cliente Sempre Satisfeito</h4>
            <ul className="flex flex-col gap-2 sm:gap-3 md:gap-4 w-full">
              {clientBenefits.map(b => (
                <BenefitItem key={b.title} {...b} />
              ))}
            </ul>
            <PrimaryButton
              className="mt-5 w-full sm:w-auto lg:w-fit"
              size="lg"
              icon={<ArrowRight className="h-4 w-4" />}
            >
              Descobrir meu visual
            </PrimaryButton>
          </div>
          <div className="flex flex-col gap-6 items-center w-full sm:w-auto">
            <div className="relative w-full max-w-xs sm:max-w-sm md:max-w-lg aspect-square rounded-br-lg overflow-hidden flex items-center justify-center">
              <img
                src="/lp/images/benefits/benefits-section-image-2.png"
                alt="Atendimento ao cliente"
                className="w-full h-full object-contain p-2"
                loading="lazy"
              />
              <Popover
                icon={CircleCheck}
                value="+94%"
                label="aprovação das transformações"
                bgColor="blue-100"
                iconColor="blue-600"
                position="top-left"
              />
              <Popover
                icon={Crown}
                value="9 em 10"
                label="mulheres se sentem mais confiantes"
                bgColor="pink-100"
                iconColor="pink-600"
                position="bottom-right"
              />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
