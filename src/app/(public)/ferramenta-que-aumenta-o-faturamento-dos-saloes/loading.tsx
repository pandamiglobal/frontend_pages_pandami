import { QuizSkeleton } from "@/app/_components/organisms/quiz/quiz-skeleton"
import { Container } from "@/app/_components/atoms/ui/container"

export default function Loading() {
  return (
    <section className="relative bg-[#f7f7f7] min-h-screen flex flex-col" data-no-header data-no-footer>
      {/* Background Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-70"></div>

      <Container className="flex-1 flex flex-col justify-center">
        <div className="relative py-16 max-w-4xl mx-auto w-full">
          {/* Progress Skeleton */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-4">
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-32 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
              <div className="h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full w-24 overflow-hidden relative">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
              </div>
            </div>
            
            {/* Progress Bar Skeleton */}
            <div className="relative w-full h-6 bg-gradient-to-r from-slate-900 via-purple-900 to-slate-900 rounded-full overflow-hidden shadow-2xl">
              <div className="absolute inset-0 opacity-40">
                {[...Array(10)].map((_, i) => (
                  <div
                    key={i}
                    className="absolute w-1 h-1 bg-white rounded-full animate-star-twinkle"
                    style={{
                      left: `${10 + i * 8}%`,
                      top: `${30 + (i % 2) * 40}%`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                ))}
              </div>
              <div className="relative h-6 rounded-full bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 w-1/3 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer"></div>
              </div>
            </div>
          </div>

          <QuizSkeleton />
        </div>
      </Container>
    </section>
  )
}
