export function QuizSkeleton() {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12 overflow-hidden">
      {/* Question Skeleton */}
      <div className="mb-8">
        <div className="relative h-8 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg mb-4 w-3/4 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
        </div>
        <div className="relative h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-1/2 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
        </div>
      </div>

      {/* Options Skeleton */}
      <div className="space-y-4 mb-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="flex items-center p-4 border-2 border-gray-200 rounded-xl relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-50/50 to-transparent animate-shimmer"></div>
            <div className="relative w-5 h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-full mr-4 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
            </div>
            <div className="relative w-6 h-6 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded mr-3 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
            </div>
            <div className="relative h-5 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded flex-1 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
            </div>
          </div>
        ))}
      </div>

      {/* Button Skeleton */}
      <div className="flex justify-end">
        <div className="relative h-12 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 rounded-lg w-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/60 to-transparent animate-shimmer"></div>
        </div>
      </div>
    </div>
  )
}
