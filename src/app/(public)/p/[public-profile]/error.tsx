'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'

/**
 * Error boundary for public profile page
 * Shows error UI with retry functionality for API failures
 */
export default function PublicProfileError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const router = useRouter()

  useEffect(() => {
    // Log error to monitoring service in production
    console.error('Public profile error:', error)
  }, [error])

  const handleRetry = () => {
    // Reset the error boundary
    reset()
    // Also clear SWR cache and retry
    router.refresh()
  }

  const handleGoHome = () => {
    router.push('/')
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center px-4">
      <div className="text-center space-y-6 max-w-md">
        {/* Error Icon */}
        <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center">
          <svg 
            className="w-8 h-8 text-destructive" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.732-.833-2.502 0L4.268 18.5c-.77.833.192 2.5 1.732 2.5z" 
            />
          </svg>
        </div>

        {/* Error Message */}
        <div className="space-y-2">
          <h1 className="text-2xl font-bold text-foreground">Erro ao carregar perfil</h1>
          <p className="text-muted-foreground">
            Não foi possível carregar o perfil no momento.
          </p>
          <p className="text-sm text-muted-foreground">
            {error.message || 'Ocorreu um erro inesperado. Tente novamente.'}
          </p>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <button
            onClick={handleRetry}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors font-medium"
          >
            Tentar novamente
          </button>
          <button
            onClick={handleGoHome}
            className="w-full inline-flex items-center justify-center px-6 py-3 bg-muted text-muted-foreground rounded-md hover:bg-muted/80 transition-colors font-medium"
          >
            Voltar para a página inicial
          </button>
        </div>

        {/* Help Text */}
        <p className="text-xs text-muted-foreground">
          Se o problema persistir, entre em contato com nosso suporte.
        </p>
      </div>
    </div>
  )
}
