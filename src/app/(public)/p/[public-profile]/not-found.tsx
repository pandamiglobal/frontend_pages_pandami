import Link from 'next/link'

/**
 * Custom not-found page for public profiles
 * Friendly message when profile is not found
 */
export default function PublicProfileNotFound() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Icon */}
        <div className="mx-auto w-16 h-16 bg-muted rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-muted-foreground" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" 
            />
          </svg>
        </div>

        {/* Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Perfil não encontrado</h1>
          <p className="text-muted-foreground">
            O perfil que você está procurando não existe ou foi removido.
          </p>
          <p className="text-sm text-muted-foreground">
            Verifique se o URL está correto ou entre em contato com o profissional.
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <Link 
            href="/"
            className="inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Voltar para a página inicial
          </Link>
          <p className="text-xs text-muted-foreground">
            Ou procure por outros profissionais na Pandami
          </p>
        </div>
      </div>
    </div>
  )
}
