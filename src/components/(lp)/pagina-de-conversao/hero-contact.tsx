"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Shield, Clock, PowerCircle } from "lucide-react";
import { BackgroundBeams } from "@/components/(lp)/ui/background-beams";

import Image from "next/image";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import useCreateLead from "@/common/hooks/use-create-lead";
import { EOriginLead } from "@/@types/@lead";
import toast from "react-hot-toast";
import Link from "next/link";

const formSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  phone: z.string({
    message: 'Telefone é obrigatório'
  })
    .min(14, "Telefone inválido")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
  message: z.string().min(3, "Setor deve ter pelo menos 3 caracteres"),
});

type FormData = z.infer<typeof formSchema>;

export function HeroContact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { execCreateLead } = useCreateLead();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    control,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    try {
      setIsSubmitting(true);
      await execCreateLead({
        name: 'Nome não informado',
        phone_number: data.phone,
        description: data.message,
        brand: data.name,
        origin: EOriginLead.page,
      }, 'Sucesso! em breve um de nossos consultores logo entrará em contato.')
      reset({
        name: "",
        phone: "",
        message: "",
      }, {
        keepDefaultValues: false
      });
      setIsSubmitting(false);
    } catch (error) {
      toast.error("Erro ao enviar mensagem. Tente novamente.")
    }

    setIsSubmitting(false);
  };

  return (
    <section className="relative py-12 md:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-[#001E63] via-[#0055FF] to-[#0066CC] z-0">
        <div
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
            backgroundSize: "30px 30px",
          }}
        ></div>
        <div className="absolute right-0 top-0 w-1/3 h-1/2 bg-white opacity-10 rounded-bl-full blur-3xl"></div>
        <div className="absolute left-0 bottom-0 w-1/2 h-1/3 bg-black opacity-15 rounded-tr-full blur-3xl"></div>
      </div>

      <div className="container relative mx-auto px-4 md:px-6 z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-20 items-center">
          {/* Coluna de conteúdo */}
          <div className="relative">
            <div className="absolute -top-10 -left-10 w-20 h-20 bg-blue-300 opacity-20 rounded-full blur-xl"></div>

            <div className="mb-8 flex items-center justify-center md:justify-start">
              <div>
                <Image
                  src="/logo-white.png"
                  alt="3PI Logo"
                  width={200}
                  height={200}
                  className="w-[150px] md:w-[180px]"
                  style={{ filter: "contrast(1.1) saturate(1.2)" }}
                  priority
                />
              </div>
            </div>

            <h1 className="title-1 tracking-tight mb-6 !text-white text-center md:text-start">
              Registre sua{" "}
              <span className="relative inline-block text-white">
                Marca
                <span className="absolute bottom-1 left-0 w-full h-2 bg-orange-400 -z-10 rounded-full"></span>
              </span>
            </h1>

            <p className="text-1 leading-relaxed text-center md:text-start !text-blue-50 md:max-w-xl w-full mb-4 md:mb-8">
              Garanta a Exclusividade do sua marca para fins jurídicos e comerciais no Brasil
            </p>

            <div className="md:flex flex-col gap-4 min-xl:max-w-[450px] items-start xl:gap-0 xl:flex-row xl:items-center hidden px-8 justify-between gap-x-8 text-blue-100 backdrop-blur-sm bg-white/10 md:p-4 rounded-xl border border-white/10">
              <div className="flex items-center whitespace-nowrap max-xl:bg-black/10 max-xl:p-3 max-xl:w-full rounded-lg">
                <Shield className="h-5 w-5 mr-2 text-blue-200" />
                <span>+7 mil registros</span>
              </div>
              <div className="flex items-center whitespace-nowrap max-xl:bg-black/10 max-xl:p-3 max-xl:w-full rounded-lg">
                <Clock className="h-5 w-5 mr-2 text-blue-200" />
                <span>99% de aprovação</span>
              </div>
              <div className="flex items-center whitespace-nowrap max-xl:bg-black/10 max-xl:p-3 max-xl:w-full rounded-lg">
                <PowerCircle className="h-5 w-5 mr-2 text-blue-200" />
                <span>Zero burocracia</span>
              </div>
            </div>
          </div>

          {/* Coluna do formulário */}
          <div className="relative" id="form-section">
            <div className="absolute -z-10 -top-5 -right-5 w-40 h-40 bg-blue-400 opacity-20 rounded-full blur-xl"></div>

            <Card className="border-0 shadow-2xl bg-white backdrop-blur-md text-slate-900 rounded-2xl p-2 md:p-8 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-400 to-indigo-500"></div>
              <CardContent className="p-3 md:p-8">
                <h2 className="title-4 mb-6 text-center bg-[#171342] bg-clip-text text-transparent">
                  Consulte se o nome da sua marca está disponível para registro
                </h2>

                <p className="max-w-[400px] mx-auto text-4 !text-gray-400 text-center !font-medium">Resgate abaixo a sua consultoria gratuita com um dos nossos especialistas</p>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-sm font-medium text-slate-700">
                      Nome da marca
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Digite o nome da sua marca"
                      register={register}
                      className={errors.name ? "border-red-500" : ""}
                    />
                    {errors.name && (
                      <p className="text-sm text-red-500">{errors.name.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-sm font-medium text-slate-700">
                      Telefone
                    </Label>
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
                      <p className="text-sm text-red-500">{errors.phone.message}</p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-slate-700">
                      Setor de atuação
                    </Label>
                    <Textarea
                      {...register("message")}
                      placeholder="Setor de atuação da sua marca"
                      rows={3}
                    />
                    {errors.message && (
                      <p className="text-sm text-red-500">{errors.message.message}</p>
                    )}
                  </div>

                  <Button
                    type="submit"
                    className="w-full py-6 bg-gradient-to-r from-[#0057FF] to-[#007BFF] hover:from-[#0044CC] hover:to-[#0066CC] text-white transition-all duration-300 shadow-lg hover:shadow-xl rounded-xl text-lg"
                    disabled={isSubmitting}
                  >
                    RESGATAR AGORA
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>

                  <div className="mt-5 text-center text-sm text-gray-400">
                    <span>
                      Ao submeter esse formulário, você autoriza que a 3PI.
                      entrar em contato e declara estar ciente da <Link href={'/politica-de-privacidade'}>Política de
                        Privacidade.</Link>
                    </span>
                  </div>

                  <div className="flex items-center justify-center space-x-4 text-xs text-slate-500 mt-2">
                    <div className="flex items-center">
                      <Shield className="h-3 w-3 mr-1 text-blue-500" />
                      <span>Seus dados estão protegidos</span>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
