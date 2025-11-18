'use client'

import { IPublicProfilePaymentMethod, PaymentMethodType } from '@/common/types/IPublicProfile'
import { Banknote, CreditCard, Smartphone, Building2, DollarSign } from 'lucide-react'

interface PaymentMethodsProps {
  methods: IPublicProfilePaymentMethod[]
}

/**
 * Payment methods component for public view
 * Reuses SaaS PaymentMethodsList layout but read-only
 * Displays accepted payment methods with icons
 */
export function PaymentMethods({ methods }: PaymentMethodsProps) {
  // Filter only active payment methods
  const activeMethods = methods.filter(method => method.active)

  if (activeMethods.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Nenhuma forma de pagamento disponível.</p>
      </div>
    )
  }

  const paymentMethodConfig: Record<PaymentMethodType, { name: string; icon: any; color: string }> = {
    [PaymentMethodType.CASH]: {
      name: 'Dinheiro',
      icon: Banknote,
      color: 'text-green-600',
    },
    [PaymentMethodType.CREDIT_CARD]: {
      name: 'Cartão de Crédito',
      icon: CreditCard,
      color: 'text-blue-600',
    },
    [PaymentMethodType.DEBIT_CARD]: {
      name: 'Cartão de Débito',
      icon: CreditCard,
      color: 'text-purple-600',
    },
    [PaymentMethodType.PIX]: {
      name: 'PIX',
      icon: Smartphone,
      color: 'text-teal-600',
    },
    [PaymentMethodType.BANK_TRANSFER]: {
      name: 'Transferência Bancária',
      icon: Building2,
      color: 'text-orange-600',
    },
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
      {activeMethods.map((method) => {
        const config = paymentMethodConfig[method.method] || {
          name: method.method,
          icon: DollarSign,
          color: 'text-gray-600',
        }
        const Icon = config.icon

        return (
          <div
            key={method.id}
            className="flex flex-col items-center justify-center p-4 border border-gray-200 rounded-lg bg-gray-50"
          >
            <Icon className={`w-6 h-6 mb-2 ${config.color}`} />
            <span className="text-sm font-medium text-gray-900 text-center">
              {config.name}
            </span>
          </div>
        )
      })}
    </div>
  )
}
