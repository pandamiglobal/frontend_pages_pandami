import { forwardRef } from "react"

interface QuizProgressProps {
  currentQuestion: number
  totalQuestions: number
  progress: number
}

// Função determinística para gerar posições das estrelas
const generateStarPositions = (count: number, seed: number) => {
  const stars = []
  let random = seed
  
  for (let i = 0; i < count; i++) {
    // Simple pseudo-random generator
    random = (random * 9301 + 49297) % 233280
    const left = (random / 233280) * 100
    
    random = (random * 9301 + 49297) % 233280
    const top = (random / 233280) * 100
    
    random = (random * 9301 + 49297) % 233280
    const delay = (random / 233280) * 2
    
    stars.push({ left, top, delay })
  }
  return stars
}

export const QuizProgress = forwardRef<HTMLDivElement, QuizProgressProps>(
  ({ currentQuestion, totalQuestions, progress }, ref) => {
    // Usar currentQuestion como seed para posições determinísticas
    const starPositions = generateStarPositions(20, currentQuestion + 1)
    
    return (
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <span className="text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            Pergunta {currentQuestion + 1} de {totalQuestions}
          </span>
          <span className="text-sm font-medium text-gray-700 bg-white/80 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
            {Math.round(progress)}% concluído
          </span>
        </div>
        
        {/* Container da barra com efeitos galaxy */}
        <div className="relative w-full h-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-full overflow-hidden shadow-2xl animate-cosmic-pulse">
          {/* Background stars */}
          <div className="absolute inset-0 opacity-40">
            {starPositions.map((pos, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
                style={{
                  left: `${pos.left}%`,
                  top: `${pos.top}%`,
                  animationDelay: `${pos.delay}s`,
                }}
              />
            ))}
          </div>
          
          {/* Barra de progresso galaxy */}
          <div 
            ref={ref}
            className="relative h-6 rounded-full transition-all duration-1000 ease-out overflow-hidden"
            style={{ 
              width: `${progress}%`,
              background: `linear-gradient(45deg, 
                #8b5cf6 0%, 
                #a855f7 15%, 
                #c084fc 30%, 
                #3b82f6 45%, 
                #06b6d4 60%, 
                #8b5cf6 75%, 
                #ec4899 90%, 
                #f59e0b 100%)`,
              backgroundSize: '400% 400%',
              animation: 'galaxy-flow 4s ease-in-out infinite'
            }}
          >
            {/* Overlay shimmer galaxy */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
            
            {/* Particles em movimento */}
            <div className="absolute inset-0 overflow-hidden">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute w-2 h-2 bg-white/60 rounded-full animate-star-twinkle"
                  style={{
                    left: `${10 + i * 12}%`,
                    top: `${20 + (i % 3) * 20}%`,
                    animationDelay: `${i * 0.3}s`,
                  }}
                />
              ))}
            </div>
            
            {/* Glow effect na ponta */}
            <div 
              className="absolute right-0 top-0 w-8 h-6 bg-gradient-to-l from-white/40 to-transparent rounded-r-full"
              style={{
                filter: 'blur(2px)',
              }}
            />
          </div>
          
          {/* Border glow */}
          <div className="absolute inset-0 rounded-full border border-purple-400/30 pointer-events-none"></div>
        </div>
      </div>
    )
  }
)

QuizProgress.displayName = "QuizProgress"
