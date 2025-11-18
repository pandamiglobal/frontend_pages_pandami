import { Skeleton } from "@/app/_components/atoms/ui/skeleton"

/**
 * Route-level loading skeleton for public profile
 * Reuses skeleton components from SaaS module adapted to public context
 */
export default function PublicProfileLoading() {
  return (
    <>
      {/* Simplified header skeleton */}
      <header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <Skeleton className="h-6 w-32" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="container mx-auto px-4 py-20 pb-32 md:pb-20">
        <div className="max-w-4xl mx-auto space-y-6">
          {/* Profile header skeleton */}
          <div className="bg-neutral-950 rounded-xl p-6 space-y-4">
            <div className="flex flex-col items-center space-y-4">
              {/* Avatar */}
              <Skeleton className="h-24 w-24 rounded-full bg-neutral-800 border-4 border-neutral-800" />
              
              {/* Name & Bio */}
              <div className="space-y-2 w-full max-w-xs flex flex-col items-center">
                <Skeleton className="h-6 w-48 bg-neutral-800" />
                <Skeleton className="h-4 w-32 bg-neutral-800" />
                <Skeleton className="h-12 w-full bg-neutral-800 mt-2" />
              </div>

              {/* Status & Location */}
              <div className="space-y-2 flex flex-col items-center w-full">
                <Skeleton className="h-4 w-40 bg-neutral-800" />
                <Skeleton className="h-4 w-56 bg-neutral-800" />
              </div>
            </div>
          </div>

          {/* Services section skeleton */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
            <Skeleton className="h-6 w-32 bg-neutral-100" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border border-neutral-100 rounded-xl p-4 space-y-3">
                  <Skeleton className="h-5 w-40 bg-neutral-100" />
                  <Skeleton className="h-4 w-full bg-neutral-100" />
                  <div className="flex items-center justify-between pt-2">
                    <Skeleton className="h-4 w-24 bg-neutral-100" />
                    <Skeleton className="h-4 w-16 bg-neutral-100" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Info section skeleton */}
          <div className="bg-white rounded-xl border border-neutral-200 p-6 space-y-4">
            <Skeleton className="h-6 w-48 bg-neutral-100" />
            <div className="space-y-6">
              {/* Address */}
              <div className="space-y-2">
                <Skeleton className="h-4 w-24 bg-neutral-100" />
                <Skeleton className="h-4 w-full bg-neutral-100" />
              </div>
              {/* Hours */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <Skeleton key={i} className="h-10 bg-neutral-50" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom bar skeleton (Mobile Only) */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:hidden">
        <div className="mx-auto py-4">
          <div className="flex gap-2">
            <Skeleton className="h-12 w-full rounded-xl" />
            <Skeleton className="h-12 w-full rounded-xl" />
          </div>
        </div>
      </div>
    </>
  )
}
