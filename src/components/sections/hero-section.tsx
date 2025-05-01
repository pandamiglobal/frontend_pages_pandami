"use client"

import { Container } from "@/components/ui/container"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { RotatingBadge } from "@/components/ui/rotating-badge"
import { StatsCard } from "@/components/ui/stats-card"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Star } from "lucide-react"
import Link from "next/link"
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { toast } from "sonner"
import useCreateLead from "@/common/hooks/use-create-lead"
import { EOriginLead } from "@/@types/@lead"

const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string({
    message: 'Telefone é obrigatório'
  })
    .min(14, "Telefone inválido")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
  message: z.string().min(5, "Mensagem deve ter no mínimo 5 caracteres"),
})

type FormValues = z.infer<typeof formSchema>

export function HeroSection() {
  const { execCreateLead } = useCreateLead();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
  })

  const nameValue = watch("name");

  const onSubmit = async (data: FormValues) => {
    try {
      await execCreateLead({
        data: {
          name: data.name,
          phone_number: data.phone,
          description: data.message,
          brand: '',
          origin: EOriginLead.page,
        },
        show_modal: true
      })
      reset({
        name: "",
        phone: "",
        message: ""
      }, {
        keepDefaultValues: false
      })
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.")
    }
  }

  return (
    <section className="py-10 md:py-16 bg-[#F5F5F5]">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[minmax(400px,1fr)_1fr] gap-8">
          <div className="flex flex-col gap-8">
            {/* Content Card */}
            <div className="bg-white rounded-3xl p-4 md:p-8 border border-[#E5E7EB] border-solid">
              <h1 className="text-[36px] font-bold text-[#111827] leading-tight md:text-left text-center">
                Empresa séria, <span className="text-[#0047FF]">registra</span>{" "}
                <span className="text-[#0047FF]">e protege</span> sua marca
              </h1>

              <p className="mt-6 text-base md:text-lg text-[#374151] md:text-left text-center">
                Somos referências em proteção e registro de marcas no Brasil. Com um processo ágil e sem burocracia,
                ajudamos você a transformar sua marca em um ativo valioso e protegido.
              </p>

              <div className="mt-12 flex items-center">
                <div className="flex gap-1 justify-center items-center max-md:flex-col max-md:items-start">
                  <div className="flex -space-x-3">
                    {["jonas", "jonas32", "jonas2"].map((name, i) => (
                      <Avatar key={name} className="border-2 border-white w-12 h-12">
                        <AvatarImage src={`https://i.pravatar.cc/100?u=${name}`} alt={`${name}'s avatar`} />
                        <AvatarFallback>{name.substring(0, 2).toUpperCase()}</AvatarFallback>
                      </Avatar>
                    ))}
                  </div>

                  <div className="ml-4 flex flex-col max-md:ml-0">
                    <span className="text-sm font-medium text-[#374151]">+500 recomendações</span>
                    <div className="flex">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-4 h-4 fill-[#FFC107] text-[#FFC107]" />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="ml-auto">
                  <RotatingBadge text="SÉRIA • REGISTRA • EMPRESA " className="w-20 h-20" />
                </div>
              </div>
            </div>

            {/* Stats Card */}
            <StatsCard />
          </div>

          {/* Form Card */}
          <div className="bg-white rounded-3xl p-4 md:p-8 border border-[#E5E7EB] border-solid">
            <h2 className="text-xl font-bold text-center text-[#111827]">
              Resgate agora uma consultoria <span className="text-[#0047FF]">GRATUITA</span> em propriedade intelectual, vagas limitadas.
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-[#374151] mb-2">
                  Nome completo
                </label>
                <Input
                  id="name"
                  name="name"
                  placeholder="Digite seu nome completo"
                  register={register}
                  className={errors.name ? "border-red-500" : ""}
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-500">{errors.name.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-[#374151] mb-2">
                  Seu número de telefone
                </label>
                <Input
                  id="phone"
                  control={control}
                  name="phone"
                  placeholder="(00) 00000-0000"
                  inputMask="(99) 99999-9999"
                  register={register}
                  className={errors.phone ? "border-red-500" : ""}
                />
                {errors.phone && (
                  <p className="mt-1 text-sm text-red-500">{errors.phone.message}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-[#374151] mb-2">
                  Fale sobre sua marca
                </label>
                <Textarea
                  id="message"
                  rows={2}
                  placeholder="Conte-nos sobre sua marca"
                  {...register("message")}
                  className={errors.message ? "border-red-500" : ""}
                />
                {errors.message && (
                  <p className="mt-1 text-sm text-red-500">{errors.message.message}</p>
                )}
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-[#0047FF] via-[#0037C3] to-[#002B99] hover:opacity-90 text-white font-medium py-4 px-2 md:px-6 rounded-full flex items-center justify-start relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="ml-4 relative z-10">
                  {isSubmitting ? "ENVIANDO..." : "QUERO UMA CONSULTORIA GRATUITA"}
                </span>
                <span className="ml-auto bg-white rounded-full p-1 text-[#0047FF] relative z-10">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
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
              </button>

              <p className="text-center text-sm text-[#4B5563]">
                Ao continuar você concorda com nossos{" "}
                <Link href="/termos-de-uso" className="text-[#0047FF]">
                  termos de uso
                </Link>{" "}
                e{" "}
                <Link href="/politica-de-privacidade" className="text-[#0047FF]">
                  política de privacidade
                </Link>
              </p>
            </form>
          </div>
        </div>
      </Container>
    </section>
  )
}

