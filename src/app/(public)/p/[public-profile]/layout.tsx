
/**
 * Public profile page layout
 * Plugs in simplified header + footer with WhatsApp CTA + fixed bar container
 */
export default function PublicProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Simplified header with logo */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* TODO: Add actual logo component */}
            <div className="h-8 w-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm font-medium">
              Pandami
            </div>
          </div>
        </div>
      </header>

      {/* Main content area with proper spacing */}
      <main className="flex-1">
        <div className="container mx-auto px-4 py-6 max-w-4xl">
          {children}
        </div>
      </main>
    </div>
  )
}
