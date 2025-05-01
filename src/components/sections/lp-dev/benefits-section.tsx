import DottedWorldMap from "@/components/svg/dotted-world-map";
import MarketplaceRadarMonitoring from "@/components/svg/marketplace-radar-monitoring";
import RRadial from "@/components/svg/r-radial";
import ValuationChart from "@/components/svg/valuation-chart";
import { Container } from "@/components/ui/container";

export default function BenefitsSection() {
  return (
    <section className="snap-start min-h-screen flex items-center bg-gray-50" id="beneficios">
      <Container section={true} >
        {/* Cabeçalho centralizado */}
        <div className="text-center mb-8 md:mb-16">
          <h2 className="title-2 max-w-[900px] mx-auto !text-[#0038ff] mb-4 md:mb-6">
            Sua marca é seu ativo mais valioso e sua proteção é obrigatória
          </h2>
          <p className="text-3 !text-gray-700 max-w-4xl mx-auto">
            O <span className="font-semibold">registro de marca</span> é muito mais que burocracia: é a única forma
            legal de <span className="font-semibold">garantir exclusividade</span> sobre o uso do seu{" "}
            <span className="font-semibold">nome, logo e identidade visual</span> por uma década (renováveis
            indefinidamente). É isso que transforma o seu branding de um custo em um ativo valioso para o seu negócio.
          </p>
        </div>

        {/* Grid de benefícios */}
        <div className="grid md:grid-cols-1 gap-8">
          {/* Card 1 */}
          <div className="grid md:grid-cols-[680px_1fr] gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-4 items-center">
              <div>
                <h3 className="title-4 mb-3 md:mb-4">Exclusividade garantida por lei</h3>
                <p className="text-4 !text-gray-600">
                  Com o registro, você adquire o direito legal de impedir que terceiros utilizem marcas idênticas ou semelhantes no mesmo segmento.
                </p>
              </div>

              <RRadial />
            </div>

            {/* Card 2 */}
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-4 items-center">
              <div>
                <h3 className="title-4 mb-3 md:mb-4">Valorização Patrimonial</h3>
                <p className="text-4 !text-gray-600">
                  Uma marca registrada pode ser licenciada, vendida ou usada como garantia em operações financeiras.
                </p>
              </div>

              <ValuationChart />
            </div>
          </div>

          <div className="grid md:grid-cols-[1fr_550px] gap-8">
            {/* Card 3 */}
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-4 items-center">
              <div>
                <h3 className="title-4 mb-3 md:mb-4">Segurança para Expandir</h3>
                <p className="text-4 !text-gray-600">
                  O registro dá a segurança jurídica necessária para expandir geograficamente, abrir franquias, exportar
                  produtos e entrar em novos mercados sem o risco de contestações futuras.
                </p>
              </div>
              <DottedWorldMap />
            </div>

            {/* Card 4 */}
            <div className="bg-white p-8 rounded-lg shadow-sm flex flex-col gap-4 items-center">
              <div>
                <h3 className="title-4 mb-3 md:mb-4">Proteção em Marketplaces</h3>
                <p className="text-4 !text-gray-600">
                  Plataformas como Amazon, Mercado Livre e até mesmo redes sociais exigem comprovação de registro para
                  derrubar produtos falsificados ou perfis que violam sua marca.
                </p>
              </div>

              <MarketplaceRadarMonitoring />
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
