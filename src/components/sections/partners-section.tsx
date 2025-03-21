"use client"

import { Container } from "@/components/ui/container"
import Image from "next/image"

export function PartnersSection() {
  const partners = [
    {
      name: "Airbnb",
      image: '/partners/airbnb.svg'
    },
    {
      name: "Netflix",
      image: '/partners/netflix.svg'
    },
    {
      name: "Coinbase",
      image: '/partners/coinbase.svg'
    },
    {
      name: "Spotify",
      image: '/partners/spotify.svg'
    },
    {
      name: "Evernote",
      image: '/partners/evernote.svg'
    },
    {
      name: "Uber",
      image: '/partners/uber.svg'
    },
  ]

  return (
    <section className="py-12 bg-white relative overflow-hidden">
      <Container>
        <h2 className="text-2xl md:text-3xl font-bold text-center text-[#111827] mb-10">
          Empresas que também investem em suas marcas
        </h2>

        <div className="relative">
          {/* Gradientes de desfoque nas bordas */}
          <div className="absolute left-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-r from-white to-transparent pointer-events-none"></div>
          <div className="absolute right-0 top-0 bottom-0 w-16 z-10 bg-gradient-to-l from-white to-transparent pointer-events-none"></div>

          {/* Container da animação */}
          <div className="overflow-hidden relative w-full">
            <div className="flex animate-scroll whitespace-nowrap">
              {/* Primeiro conjunto de logos */}
              {partners.map((partner) => (
                <div key={`first-${partner.name}`} className="flex items-center justify-center mx-8">
                   <Image
                    src={partner.image}
                    alt={`Logo da ${partner.name}`}
                    className="object-contain block max-w-[140px]"
                    aria-label={`Logo da ${partner.name}`}
                    width={140}
                    height={80}
                  />
                </div>
              ))}

              {/* Segundo conjunto de logos (duplicado para animação contínua) */}
              {partners.map((partner) => (
                <div key={`second-${partner.name}`} className="flex items-center justify-center mx-8">
                  <Image
                    src={partner.image}
                    alt={`Logo da ${partner.name}`}
                    className=" object-contain block max-w-[140px]"
                    width={140}
                    height={80}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>

      {/* Estilos para a animação */}
      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        
        .animate-scroll {
          animation: scroll 30s linear infinite;
        }
      `}</style>
    </section>
  )
}

