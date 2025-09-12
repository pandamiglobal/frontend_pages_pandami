import { Play } from "lucide-react"
import { Button } from "./button"

export default function TrademarkRegistration() {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 text-center">
      <p className="text-[#747474] text-base md:text-lg md:mb-4 mb-2">Estão escondendo isso de você: descubra antes que seja tarde</p>

      <h1 className="text-[#000000] text-2xl md:text-4xl font-bold md:mb-8 mb-4 max-w-3xl mx-auto">
        Se você tem uma marca e não possui monitoria, está correndo <span className="text-[#ff6b6b]">vários riscos</span>.
      </h1>

      <div className="relative aspect-video w-full mb-8 rounded-xl border-2 border-[#2563eb] bg-black overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center">
          <Button
            variant="ghost"
            size="lg"
            className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-xs hover:bg-white/30"
            aria-label="Play video"
          >
            <Play className="w-8 h-8 text-white fill-white" />
          </Button>
        </div>
      </div>

      <Button size="lg" className="bg-[#2563eb] hover:bg-[#2563eb]/90 text-white rounded-full max-md:w-full">
        Quero fazer parte da 3PI
      </Button>
    </div>
  )
}

