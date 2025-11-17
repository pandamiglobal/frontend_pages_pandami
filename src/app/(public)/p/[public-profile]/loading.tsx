/**
 * Route-level loading skeleton for public profile
 * Reuses skeleton components from SaaS module adapted to public context
 */
export default function PublicProfileLoading() {
  return (
    <div className="min-h-screen bg-background">
      {/* Simplified header skeleton */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            <div className="h-8 w-32 bg-muted rounded-md animate-pulse" />
          </div>
        </div>
      </header>

      {/* Main content skeleton */}
      <main className="flex-1 pb-20">
        <div className="container mx-auto px-4 py-6 max-w-4xl space-y-6">
          {/* Profile header skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="flex items-center space-x-4">
              {/* Profile image skeleton */}
              <div className="h-20 w-20 bg-muted rounded-full animate-pulse" />
              
              {/* Profile info skeleton */}
              <div className="flex-1 space-y-2">
                <div className="h-6 w-48 bg-muted rounded animate-pulse" />
                <div className="h-4 w-32 bg-muted rounded animate-pulse" />
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
              </div>
            </div>
            
            {/* Bio skeleton */}
            <div className="space-y-2">
              <div className="h-4 w-full bg-muted rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-muted rounded animate-pulse" />
            </div>
          </div>

          {/* Services section skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border rounded-lg p-4 space-y-2">
                  <div className="h-4 w-40 bg-muted rounded animate-pulse" />
                  <div className="h-3 w-full bg-muted rounded animate-pulse" />
                  <div className="flex items-center space-x-4">
                    <div className="h-3 w-20 bg-muted rounded animate-pulse" />
                    <div className="h-3 w-16 bg-muted rounded animate-pulse" />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Business hours skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="space-y-2">
              {['Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira'].map((day) => (
                <div key={day} className="flex justify-between items-center">
                  <div className="h-4 w-24 bg-muted rounded animate-pulse" />
                  <div className="h-4 w-20 bg-muted rounded animate-pulse" />
                </div>
              ))}
            </div>
          </div>

          {/* Contact info skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="space-y-3">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-48 bg-muted rounded animate-pulse" />
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 bg-muted rounded animate-pulse" />
                <div className="h-4 w-64 bg-muted rounded animate-pulse" />
              </div>
            </div>
          </div>

          {/* Social links skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="flex space-x-3">
              {['Instagram', 'WhatsApp', 'TikTok', 'LinkedIn'].map((social) => (
                <div key={social} className="h-10 w-10 bg-muted rounded-full animate-pulse" />
              ))}
            </div>
          </div>

          {/* Payment methods skeleton */}
          <div className="bg-card rounded-lg border p-6 space-y-4">
            <div className="h-5 w-32 bg-muted rounded animate-pulse" />
            <div className="flex space-x-3">
              {['Cash', 'Card', 'PIX', 'Transfer'].map((method) => (
                <div key={method} className="h-12 w-12 bg-muted rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>

      {/* Fixed bottom bar skeleton */}
      <div className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-3">
          <div className="flex items-center justify-center">
            <div className="h-12 w-48 bg-green-500 rounded-md animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  )
}
