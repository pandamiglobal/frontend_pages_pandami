/**
 * Layout wrapper for /p routes (public profiles)
 * Provides shared header/footer slots for profile pages
 */
export default function ProfileLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-background">
      {/* Simplified header with logo */}
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-center">
            {/* TODO: Add logo component */}
            <div className="h-8 w-32 bg-muted rounded-md flex items-center justify-center text-muted-foreground text-sm">
              Logo
            </div>
          </div>
        </div>
      </header>

      {/* Main content area */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer with WhatsApp button */}
      <footer className="border-t bg-background">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-center">
            {/* TODO: Add WhatsApp button component */}
            <div className="h-12 w-48 bg-green-500 rounded-md flex items-center justify-center text-white text-sm">
              WhatsApp Button
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
