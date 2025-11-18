'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AlertCircle } from 'lucide-react'
import { PrimaryButton } from '@/app/_components/molecules/primary-button'

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
          <AlertCircle className="w-6 h-6 text-red-600" />
        </div>
        
        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Erro ao carregar perfil
        </h2>
        
        <p className="text-neutral-600 mb-6">
          {error.message || 'Ocorreu um erro inesperado. Tente novamente.'}
        </p>

        <div className="space-y-3">
          <PrimaryButton 
            onClick={handleRetry}
            className="w-full justify-center"
          >
            Tentar novamente
          </PrimaryButton>
          
          <PrimaryButton 
            onClick={handleGoHome}
            variant="outline" 
            className="w-full justify-center"
          >
            Voltar para o início
          </PrimaryButton>
        </div>
      </div>
    </div>
  )
}
