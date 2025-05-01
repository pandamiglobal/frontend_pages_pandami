"use client"

import { cn } from "@/common/lib/utils"
import { useEffect, useRef, useState } from "react"

export function GlobeAlternative({
  className,
  position = "below", // "below" ou "side" para controlar o posicionamento
}: {
  className?: string
  position?: "below" | "side"
}) {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 })
  const containerRef = useRef<HTMLDivElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const globeRef = useRef<any>(null)

  // Adicione este useEffect para calcular dimensões responsivas
  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const containerWidth = containerRef.current.clientWidth
        // Mantenha a proporção 1:1 para o globo
        const size = Math.min(containerWidth, 600) // Limite máximo de 600px
        setDimensions({ width: size, height: size })
      }
    }

    // Inicializa as dimensões
    updateDimensions()

    // Atualiza as dimensões quando a janela é redimensionada
    window.addEventListener("resize", updateDimensions)
    return () => window.removeEventListener("resize", updateDimensions)
  }, [])

  // Initialize globe with fixed dimensions
  useEffect(() => {
    console.log("Mounting GlobeAlternative component")

    const initGlobe = async () => {
      try {
        setIsLoading(true)
        setError(null)

        // Clean up previous instance if it exists
        if (globeRef.current) {
          globeRef.current.destroy()
          globeRef.current = null
        }

        console.log("Loading cobe library...")
        // Importar dinamicamente a biblioteca cobe
        const cobeModule = await import("cobe")
        const createGlobe = cobeModule.default

        if (!canvasRef.current) {
          throw new Error("Canvas reference is not available")
        }

        console.log("Setting up canvas with dimensions:", dimensions.width, dimensions.height)
        // Configurar o canvas com dimensões responsivas
        const canvas = canvasRef.current
        canvas.width = dimensions.width * 2
        canvas.height = dimensions.height * 2

        // Criar o globo
        let phi = 0

        console.log("Creating globe...")
        const globe = createGlobe(canvas, {
          devicePixelRatio: 2,
          width: dimensions.width * 2,
          height: dimensions.height * 2,
          phi: 0,
          theta: 0.2,
          dark: 0,
          diffuse: 1.2,
          mapSamples: 16000,
          mapBrightness: 3,
          baseColor: [0.9, 0.9, 0.9],
          markerColor: [251 / 255, 100 / 255, 21 / 255],
          glowColor: [0.8, 0.8, 0.8],
          markers: [
            { location: [14.5995, 120.9842], size: 0.03 },
            { location: [19.076, 72.8777], size: 0.1 },
            { location: [23.8103, 90.4125], size: 0.05 },
            { location: [30.0444, 31.2357], size: 0.07 },
            { location: [39.9042, 116.4074], size: 0.08 },
            { location: [-23.5505, -46.6333], size: 0.1 },
            { location: [19.4326, -99.1332], size: 0.1 },
            { location: [40.7128, -74.006], size: 0.1 },
            { location: [34.6937, 135.5022], size: 0.05 },
            { location: [41.0082, 28.9784], size: 0.06 },
          ],
          onRender: (state: any) => {
            // Rotação automática
            phi += 0.005
            state.phi = phi
          },
        })

        // Store the globe instance for cleanup
        globeRef.current = globe

        console.log("Globe initialized successfully")
        setIsLoading(false)
      } catch (err) {
        console.error("Failed to initialize globe:", err)
        setError(err instanceof Error ? err.message : "Failed to initialize globe")
        setIsLoading(false)
      }
    }

    // Initialize with a delay to ensure DOM is ready
    const timeoutId = setTimeout(() => {
      initGlobe()
    }, 1000)

    return () => {
      console.log("Unmounting GlobeAlternative component")
      clearTimeout(timeoutId)
      if (globeRef.current) {
        globeRef.current.destroy()
        globeRef.current = null
      }
    }
  }, [dimensions])

  return (
    <div
      ref={containerRef}
      className={cn("relative w-full", className)}
      style={{
        maxWidth: "100%",
        margin: "0 auto",
        backgroundColor: "transparent",
      }}
    >
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center bg-blue-50/80 z-10">
          <div className="text-blue-600 flex items-center gap-2">
            <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            Carregando globo...
          </div>
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-red-50/80 z-10">
          <div className="text-red-600 p-4 bg-white rounded-lg shadow-md">
            <p className="font-bold mb-2">Erro ao carregar o globo:</p>
            <p>{error}</p>
          </div>
        </div>
      )}

      <canvas
        ref={canvasRef}
        style={{
          width: `${dimensions.width}px`,
          height: `${dimensions.height}px`,
          position: "relative", // Alterado de absolute para relative
          margin: "0 auto", // Centraliza o canvas
          zIndex: 5,
        }}
      />
    </div>
  )
}
