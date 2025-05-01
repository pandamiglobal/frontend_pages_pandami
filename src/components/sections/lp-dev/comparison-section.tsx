import PPPILogo from "@/components/svg/pppi-logo"
import { Container } from "@/components/ui/container"
import { Clock, Shield, Globe, Zap, ShieldCheck, FolderLockIcon, FileClock } from "lucide-react"

export default function ComparisonSection() {
  return (
    <section className="snap-start min-h-screen flex items-center bg-white" id="comparativo">
      <Container section={true}>
        <div className="bg-white rounded-3xl mt-[80px] border-t shadow-md mb-16">
          <div className="grid grid-cols-3">
            <div className="p-6 flex items-center gap-4 relative">
              <Clock className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-900 uppercase text-sm">Tempo de registro de marca</span>

              <div className="absolute bottom-[101%] right-0 w-full h-[80px] flex items-center justify-start pl-8 ">
                <h2 className="title-3 text-gray-900">Comparativo</h2>
              </div>
            </div>

            <div className="relative p-6 flex items-center justify-start border-x bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-base text-green-600 font-medium">6-8 meses</span>
              </div>

              <div className="absolute border-l border-t border-r rounded-t-xl border-solid bottom-[100%] right-0 w-full h-[80px] flex items-center justify-center bg-gray-50">
                <PPPILogo />
              </div>
            </div>

            <div className="relative p-6 flex items-center justify-start">
              <span className="text-base text-gray-600">12-18 meses</span>
              <div className="absolute bottom-[101%] right-0 w-full h-[80px] flex items-center justify-center">
                <p className="text-sm font-bold text-gray-600">SOLUÇÕES TRADICIONAIS</p>
              </div>
            </div>
          </div>

          <div className="relative grid grid-cols-3 border-t">
            <div className="p-6 flex items-center gap-4">
              <Shield className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-900 uppercase text-sm">Taxa de detecção de ameaças</span>
            </div>
            <div className="p-6 flex items-center justify-start border-x bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-base text-green-600 font-medium">99.7%</span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-start">
              <span className="text-base text-gray-600">65%</span>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t">
            <div className="p-6 flex items-center gap-4">
              <Globe className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-900 uppercase text-sm">Cobertura de proteção</span>
            </div>
            <div className="p-6 flex items-center justify-start border-x bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-base text-green-600 font-medium">197 países</span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-start">
              <span className="text-base text-gray-600">País de origem</span>
            </div>
          </div>

          <div className="grid grid-cols-3 border-t">
            <div className="p-6 flex items-center gap-4">
              <Zap className="w-6 h-6 text-gray-700" />
              <span className="font-medium text-gray-900 uppercase text-sm">Prevenção de fraudes digitais</span>
            </div>
            <div className="p-6 flex items-center justify-start border-x bg-gray-50">
              <div className="flex items-center gap-2">
                <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="12"
                    height="12"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-white"
                  >
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <span className="text-base text-green-600 font-medium">Automatizado por IA</span>
              </div>
            </div>
            <div className="p-6 flex items-center justify-start">
              <span className="text-base text-gray-600">Manual</span>
            </div>
          </div>
        </div>

        {/* Cards de estatísticas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Card 1: Marcas protegidas */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 py-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShieldCheck className="w-10 h-10 text-[#0038ff]" />
            </div>
            <h3 className="title-3 text-gray-900 mb-2">+5000</h3>
            <p className="text-4 !text-gray-600">Marcas protegidas</p>
          </div>

          {/* Card 2: Ameaças derrubadas */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 py-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <FolderLockIcon className="w-10 h-10 text-[#0038ff]" />
            </div>
            <h3 className="title-3 text-gray-900 mb-2">+25k</h3>
            <p className="text-4 !text-gray-600">Ameaças derrubadas por dia</p>
          </div>

          {/* Card 3: Cobertura internacional */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 py-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Globe className="w-10 h-10 text-[#0038ff]" />
            </div>
            <h3 className="title-3 text-gray-900 mb-2">197 países</h3>
            <p className="text-4 !text-gray-600">Cobertura internacional</p>
          </div>

          {/* Card 4: Tempo de protocolo */}
          <div className="bg-white rounded-lg shadow-md border border-gray-200 p-4 py-6 text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <FileClock className="w-10 h-10 text-[#0038ff]" />
            </div>
            <h3 className="title-3 text-gray-900 mb-2">Até 48h</h3>
            <p className="text-4 !text-gray-600">Para protocolarmos seu pedido de registro de marca</p>
          </div>
        </div>
      </Container>
    </section>
  )
}
