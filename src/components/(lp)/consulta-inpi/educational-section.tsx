"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Download } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { EbookFormModal } from "./ebook-form-modal"
import { Container } from "@/components/ui/container"

export function EducationalSection() {
  const [isModalOpen, setIsModalOpen] = useState(false)

  return (
    <section>
      <Container section={true}>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col gap-4">
            <h2 className="title-3">
              Por que buscar sua marca é crucial?
            </h2>
            <div className="space-y-4 text-gray-600">
              <p>
                Antes de iniciar o processo de registro de uma marca, é fundamental realizar uma busca prévia. Esta
                etapa pode economizar tempo, dinheiro e evitar problemas legais futuros. Aqui estão algumas razões
                importantes:
              </p>
              <ul className="list-disc pl-5 space-y-2">
                <li>Evita conflitos com marcas existentes</li>
                <li>Reduz o risco de indeferimento do pedido de registro</li>
                <li>Ajuda a identificar possíveis infrações à sua marca</li>
                <li>Fornece insights para estratégias de branding</li>
                <li>Economiza recursos ao prevenir processos legais</li>
              </ul>
              <p>
                Lembre-se: uma marca bem pesquisada é o primeiro passo para construir uma identidade forte e protegida
                no mercado.
              </p>
            </div>
          </div>
          <div className="bg-[#2845EF] p-8 rounded-xl border border-blue-500/20 backdrop-blur-sm">
            <h3 className="text-2xl font-semibold mb-4 text-white">Baixe nosso Ebook Gratuito</h3>
            <p className="text-white mb-6">
              "Guia Completo: Como Proteger Sua Marca no Brasil" - Aprenda tudo sobre busca e registro de marcas,
              estratégias de proteção e como evitar armadilhas comuns.
            </p>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger asChild>
                <Button className="cta-button bg-green-600 hover:bg-green-700 text-lg w-full">
                  <Download className="mr-2 h-5 w-5" /> Baixar Ebook Grátis
                </Button>
              </DialogTrigger>

              <DialogContent className="bg-blue-950/95 border border-blue-500/20 backdrop-blur-sm">
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-blue-100">Baixe o Ebook Gratuito</DialogTitle>
                </DialogHeader>
                <EbookFormModal onClose={() => setIsModalOpen(false)} />
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </Container>
    </section>
  )
}

