"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import toast from "react-hot-toast"
import useCreateLead from "@/common/hooks/use-create-lead"
import { EOriginLead } from "@/@types/@lead"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

// Definindo o esquema de validação com Zod
const formSchema = z.object({
  name: z.string().min(1, "Nome é obrigatório"),
  phone: z.string({
    message: 'Telefone é obrigatório'
  })
    .min(14, "Telefone inválido")
    .regex(/^\(\d{2}\) \d{5}-\d{4}$/, "Telefone inválido")
    .transform((val) => val.replace(/[^\d]/g, "")),
})

// Tipagem inferida do esquema
type FormValues = z.infer<typeof formSchema>

interface EbookFormModalProps {
  onClose: () => void
}

export function EbookFormModal({ onClose }: EbookFormModalProps) {
  // Usando React Hook Form com resolver do Zod
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting }
  } = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: ""
    }
  })

  const { execCreateLead } = useCreateLead()

  const onSubmit = async (data: FormValues) => {
    await execCreateLead({
      name: data.name,
      phone_number: data.phone,
      brand: "",
      description: "usuário fazendo download do ebook",
      origin: EOriginLead.seo_tool,
      origin_font: "ebook-form-modal"
    }, 'Ebook baixado com sucesso!')

    try {
      const response = await fetch('/ebooks/como-Criar-um-Nome-de-Marca-Forte-e-Registravel.pdf')
      if (!response.ok) throw new Error('Arquivo não encontrado')

      // Cria o blob do arquivo
      const blob = await response.blob()
      const url = window.URL.createObjectURL(blob)

      // Cria e dispara o link de download
      const a = document.createElement('a')
      a.href = url
      a.download = 'guia-completo-como-proteger-sua-marca-no-brasil.pdf'
      a.style.display = 'none'

      document.body.appendChild(a)
      a.click()

      setTimeout(() => {
        document.body.removeChild(a)
        window.URL.revokeObjectURL(url)
      }, 100)

      onClose()
    } catch (error) {
      // toast.error("Não foi possível baixar o seu ebook. Por favor, tente novamente.")
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="space-y-2">
        <Label htmlFor="name" className="text-blue-200">
          Nome
        </Label>
        <Input
          id="name"
          name="name"
          placeholder="Digite seu nome completo"
          register={register}
          className="bg-blue-900/50 border-blue-500/30 text-blue-100 placeholder-blue-400/50 focus:border-blue-400 focus:ring-blue-400"
        />
        {errors.name && <p className="text-red-400 text-xs mt-1">{errors.name.message}</p>}
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone_number" className="text-blue-200">
          Telefone
        </Label>
        <Input
          id="phone_number"
          control={control}
          name="phone"
          placeholder="(00) 00000-0000"
          inputMask="(99) 99999-9999"
          register={register}
          className="bg-blue-900/50 border-blue-500/30 text-blue-100 placeholder-blue-400/50 focus:border-blue-400 focus:ring-blue-400"
        />
        {errors.phone && <p className="text-red-400 text-xs mt-1">{errors.phone.message}</p>}
      </div>
      <Button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-blue-600 to-cyan-500 hover:from-blue-700 hover:to-cyan-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300 ease-in-out transform hover:scale-105"
      >
        {isSubmitting ? "Enviando..." : "Enviar e Baixar Ebook"}
      </Button>
      <p className="text-blue-300 text-sm text-center mt-4">
        Ao se inscrever, você concorda em receber atualizações sobre proteção de marcas e propriedade intelectual.
      </p>
    </form>
  )
}

