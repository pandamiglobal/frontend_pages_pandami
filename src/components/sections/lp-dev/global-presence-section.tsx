import GlobalPresenceMap from "@/components/svg/global-presence-map"
import { Container } from "@/components/ui/container"
import { Globe, Check } from "lucide-react"
import Image from "next/image"

export default function GlobalPresenceSection() {
  return (
    <section className="snap-start  min-h-screen bg-white" id="presenca-global">
      <Container section={true}>
        <h2 className="text-4xl md:text-5xl font-bold mb-16 text-center">Presença Global, Proteção Local</h2>

        {/* Card do Mapa */}
        <div className="bg-white rounded-xl shadow-md p-6 mb-16">
          <div className="flex flex-col sm:flex-row items-center gap-3 mb-6">
            <div className="flex items-center gap-2">
              <Globe className="w-6 h-6 text-[#0038ff]" />
              <h3 className="text-xl font-semibold">Rede Global de Proteção</h3>
            </div>
            
            <div className="sm:ml-auto flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                <span className="text-sm text-gray-700">Órgãos reguladores</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-[#0038ff]"></div>
                <span className="text-sm text-gray-700">Presença local</span>
              </div>
            </div>
          </div>

          {/* Placeholder para o mapa */}
          <div className="w-full p-3 bg-gray-100 rounded-lg flex items-center justify-center">
            <GlobalPresenceMap />
          </div>
        </div>

        {/* Cards de Parceiros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: WIPO */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-solid">
            <div className="p-6 border-b">
              {/* Placeholder para o logo */}
              <div className="w-full border border-solid border-[#ddd] rounded-lg p-5 flex items-center justify-center">
                <Image src="/partners/wipo-logo.png" alt="Wipo" width={130} height={130} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">WIPO (OMPI)</h3>
              <p className="text-gray-600 mb-6">Organização Mundial da Propriedade Intelectual</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0038ff]" />
                  </div>
                  <span className="text-gray-700">Parceiro tecnológico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 2: EUIPO */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-solid">
            <div className="p-6 border-b">
              {/* Placeholder para o logo */}
              <div className="w-full border border-solid border-[#ddd] rounded-lg p-5 flex items-center justify-center">
                <Image src="/partners/euipo-logo.png" alt="EUIPO" width={130} height={130} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">EUIPO</h3>
              <p className="text-gray-600 mb-6">Escritório de Propriedade Intelectual da União Europeia</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0038ff]" />
                  </div>
                  <span className="text-gray-700">Colaborador estratégico</span>
                </div>
              </div>
            </div>
          </div>

          {/* Card 3: Microsoft */}
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-solid">
            <div className="p-6 border-b">
              {/* Placeholder para o logo */}
              <div className="w-full border border-solid border-[#ddd] rounded-lg p-5 flex items-center justify-center">
                <Image src="/partners/microsoft-logo.png" alt="Microsoft" width={130} height={130} />
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold mb-2">MICROSOFT</h3>
              <p className="text-gray-600 mb-6">Gigante global de tecnologia e infraestrutura para internet</p>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 rounded-full bg-blue-100 flex items-center justify-center">
                    <Check className="w-3 h-3 text-[#0038ff]" />
                  </div>
                  <span className="text-gray-700">Parceiro operacional</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
