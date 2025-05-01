import { AlertTriangle, DollarSign, TrendingUp, Clock, GlobeLock } from "lucide-react"
import { Container } from "@/components/ui/container"

export default function RisksSection() {
  return (
    <section className="min-h-screen snap-start flex items-center bg-white" id="riscos">
      <Container section={true} >
        <div className="grid min-[1124px]:grid-cols-[750px_1fr] gap-12 items-start">
          <div className="flex flex-col justify-between h-full">
            <div className="space-y-4 md:space-y-6">
              <h3 className="title-5 !text-gray-800">Sua marca está realmente protegida?</h3>
              <h2 className="title-2 !text-[#f47834]">
                73% dos empresários descobrem tarde demais que não...
              </h2>
              <p className="text-3 !text-gray-700">
                Uma marca sem registro e sem cibersegurança é um convite para imitadores, concorrentes e oportunistas.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg border border-gray-100 mt-8">
              <div className="flex items-start gap-4">
                <div className="bg-[#fff2ee] p-3 rounded-full shrink-0">
                  <Clock className="w-6 h-6 text-[#f47834]" />
                </div>
                <div>
                  <p className="text-3 !text-gray-700">
                    A cada dia, <span className="font-semibold">centenas de empresários</span> têm sua{" "}
                    <span className="font-semibold">marca copiada, falsificada</span> e{" "}
                    <span className="font-semibold">perdem o direito</span> de usar sua própria marca. Sem o registro e
                    a cibersegurança adequada, <span className="font-semibold">perdem todo o investimento</span>.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Coluna da Direita */}
          <div className="grid grid-rows-[fit_1fr] gap-6 h-full">
            <h3 className="text-xl md:text-2xl font-semibold !text-gray-800">
              Veja o que pode acontecer com sua marca:
            </h3>

            <div className="flex flex-col justify-between gap-4">
              {/* Card 1 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#fef2f2] p-3 rounded-full shrink-0">
                    <AlertTriangle className="w-6 h-6 text-[#d56463]" />
                  </div>

                  <p className="text-lg font-medium text-gray-800">Sua marca pode ser roubada</p>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#fef2f2] p-3 rounded-full shrink-0">
                    <DollarSign className="w-6 h-6 text-[#d56463]" />
                  </div>

                  <p className="text-lg font-medium text-gray-800">Perda de dinheiro garantida</p>
                </div>
              </div>

              {/* Card 3 */}
              <div className="bg-gray-50 p-6 rounded-lg border border-gray-100">
                <div className="flex items-center gap-4">
                  <div className="bg-[#fef2f2] p-3 rounded-full shrink-0">
                    <GlobeLock className="w-6 h-6 text-[#d56463]" />
                  </div>

                  <p className="text-lg font-medium text-gray-800">Negócio travado sem expansão</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="text-center mt-16">
          <p className="text-2 text-gray-900">Não seja mais um nessa estatística!</p>
        </div>
      </Container>
    </section>
  )
}
