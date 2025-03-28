import { Button } from "@/components/ui/button"
import { CheckCircle2, Calendar, Gift } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/header"
import Footer from "@/components/footer"

interface ThankYouPageProps {
  email: string
}

export function ThankYouPage({ email }: ThankYouPageProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-grow flex items-center justify-center bg-gradient-to-b from-blue-50 to-indigo-50 py-16">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-2xl mx-auto text-center">
            <div className="mb-8 flex justify-center">
              <div className="bg-primary/10 p-6 rounded-full">
                <CheckCircle2 className="h-24 w-24 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 mb-6">
              Solicitação recebida com sucesso!
            </h1>

            <p className="text-xl text-slate-600 mb-8">
              Obrigado por solicitar nossa análise gratuita. Enviaremos um e-mail para <strong>{email}</strong> com os
              próximos passos e informações sobre seu bônus surpresa!
            </p>

            <div className="bg-white p-8 rounded-lg shadow-md mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Calendar className="h-10 w-10 text-primary" />
                <h2 className="text-2xl font-bold text-slate-900">O que acontece agora?</h2>
              </div>

              <ol className="text-left space-y-4 text-slate-700">
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    1
                  </span>
                  <span>Nossa equipe entrará em contato em até 24 horas para confirmar sua consulta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    2
                  </span>
                  <span>Realizaremos uma análise preliminar da sua marca antes da consulta</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="bg-primary text-white rounded-full w-6 h-6 flex items-center justify-center flex-shrink-0 mt-0.5">
                    3
                  </span>
                  <span>Durante a consulta, apresentaremos nossa análise e recomendações personalizadas</span>
                </li>
              </ol>
            </div>

            <div className="bg-gradient-to-r from-purple-100 to-indigo-100 p-8 rounded-lg shadow-md mb-8">
              <div className="flex items-center gap-4 mb-6">
                <Gift className="h-10 w-10 text-purple-600" />
                <h2 className="text-2xl font-bold text-slate-900">Seu bônus surpresa está a caminho!</h2>
              </div>

              <p className="text-slate-700 mb-4">
                Após a conclusão da sua análise de marca, você receberá um bônus exclusivo que preparamos especialmente
                para novos clientes.
              </p>

              <p className="text-slate-700 font-medium">
                Fique atento ao seu e-mail para não perder esta oportunidade!
              </p>
            </div>

            <Link href="/">
              <Button size="lg" className="text-lg py-6">
                VOLTAR PARA A PÁGINA INICIAL
              </Button>
            </Link>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}

