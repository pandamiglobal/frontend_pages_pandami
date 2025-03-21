"use client"

import Image from "next/image"
import { useEffect, useRef } from "react"

export default function CompaniesSectionBrand() {
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const container = containerRef.current
    if (container) {
      const scrollWidth = container.scrollWidth
      container.style.setProperty("--scroll-width", `${scrollWidth / 3}px`)

      const resetAnimation = () => {
        container.style.animation = "none"
        container.offsetHeight // Trigger reflow
        container.style.animation = ''
      }

      container.addEventListener("animationiteration", resetAnimation)
      return () => container.removeEventListener("animationiteration", resetAnimation)
    }
  }, [])

  return (
    <section className="w-full py-8 md:py-12 bg-white overflow-hidden">
      <style jsx>{`
        .logo-container {
          position: relative;
        }
        .logo-container::before,
        .logo-container::after {
          content: "";
          position: absolute;
          top: 0;
          bottom: 0;
          width: 100px;
          z-index: 2;
          pointer-events: none;
        }
        .logo-container::before {
          left: 0;
          background: linear-gradient(to right, white, transparent);
        }
        .logo-container::after {
          right: 0;
          background: linear-gradient(to left, white, transparent);
        }
        .logo-scroll {
          display: flex;
          animation: scroll 25s linear infinite;
          width: calc(var(--scroll-width) * 2);
        }
        .logo-scroll > div {
          flex-shrink: 0;
        }
      `}</style>
      <div className="container mx-auto px-4">
        <h2 className="text-[#444444] text-2xl md:text-3xl font-medium text-center mb-10">
          Somos parceiros de <b>gigantes</b>
        </h2>

        <div className="logo-container before:w-[50px] after:w-[50px]">
          <div className="overflow-hidden">
            <div className="logo-scroll gap-6 md:gap-12" ref={containerRef}>
              {[...Array(4)].map((_, index) => (
                <div key={index} className="flex items-center justify-center gap-6 md:gap-12">
                  {/* Spotify logo */}
                  <div className="max-w-[150px] min-w-[130px]">
                    <Image src="/lp/images/logos/acate.svg" alt="Logo da Acate" width={120} height={35} className="w-full" />
                  </div>
                  {/* Uber logo */}
                  <div className="max-w-[150px] min-w-[130px]">
                    <Image src="/lp/images/logos/amazon.png" alt="Logo da amazon" width={120} height={30} className="w-full" />
                  </div>

                  {/* Another Uber logo */}
                  <div className="max-w-[150px] min-w-[130px]">
                    <Image src="/lp/images/logos/microsoft.png" alt="Logo da microsoft" width={120} height={35} className="w-full" />
                  </div>

                  <div className="max-w-[150px] min-w-[130px]">
                    <Image src="/lp/images/logos/wipo.png" alt="Logo da wipo" width={180} height={35} className="w-full" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

