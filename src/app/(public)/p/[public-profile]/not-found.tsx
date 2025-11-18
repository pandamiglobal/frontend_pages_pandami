import Link from 'next/link'
import { Search } from 'lucide-react'
import { PrimaryButton } from '@/app/_components/molecules/primary-button'

/**
 * Custom not-found page for public profiles
 * Friendly message when profile is not found
 */
export default function PublicProfileNotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
      <div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm">
        <div className="mx-auto w-12 h-12 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
          <Search className="w-6 h-6 text-neutral-600" />
        </div>
        
        <h2 className="text-xl font-bold text-neutral-900 mb-2">
          Perfil não encontrado
        </h2>
        
        <p className="text-neutral-600 mb-6">
          O perfil que você está procurando não existe ou foi removido. Verifique o endereço digitado.
        </p>

        <div className="space-y-3">
          <Link href="/" className="w-full block">
            <PrimaryButton className="w-full justify-center">
              Voltar para o início
            </PrimaryButton>
          </Link>
          
          <p className="text-xs text-neutral-500">
            Ou procure por outros profissionais na Pandami
          </p>
        </div>
      </div>
    </div>
  )
}
