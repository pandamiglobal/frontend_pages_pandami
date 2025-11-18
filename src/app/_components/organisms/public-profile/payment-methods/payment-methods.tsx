'use client'

import { IPublicProfilePaymentMethod } from '@/common/types/IPublicProfile'
import { transformPaymentMethods, getPaymentMethodIcon } from '@/lib/utils/public-profile-helpers'
import Image from 'next/image'
import { Banknote, CreditCard, Building2 } from 'lucide-react'

interface PaymentMethodsProps {
  methods: IPublicProfilePaymentMethod[]
}

/**
 * Render payment method icon based on SSOT configuration
 */
function PaymentIcon({ iconType }: { iconType: string }) {
  const iconConfig = getPaymentMethodIcon(iconType)
  
  if (!iconConfig) return null

  if (iconConfig.type === 'svg') {
    return (
      <Image
        src={iconConfig.src}
        alt={iconConfig.alt}
        width={16}
        height={16}
        className="size-4"
      />
    )
  }

  // Render Lucide icon with default green color
  const iconProps = { className: 'size-4 text-green-600' }
  
  switch (iconConfig.name) {
    case 'Banknote':
      return <Banknote {...iconProps} />
    case 'CreditCard':
      return <CreditCard {...iconProps} />
    case 'Building2':
      return <Building2 {...iconProps} />
    default:
      return null
  }
}

/**
 * Payment methods component for public view
 * Uses my-site-helpers as SSOT for all payment method data
 */
export function PaymentMethods({ methods }: PaymentMethodsProps) {
  // Transform using official helper (SSOT)
  const transformedMethods = transformPaymentMethods({ 
    payment_methods: methods.filter(m => m.active) 
  } as any)

  if (transformedMethods.length === 0) {
    return (
      <p className="text-sm text-neutral-600">Nenhuma forma de pagamento configurada.</p>
    )
  }

  return (
    <div className="flex flex-wrap gap-2">
      {transformedMethods.map((method) => (
        <div
          key={method.id}
          className="inline-flex items-center gap-2 rounded border border-neutral-200 px-3 py-1.5 bg-neutral-50"
        >
          <PaymentIcon iconType={method.icon} />
          <span className="text-sm font-medium text-neutral-900">
            {method.label}
          </span>
        </div>
      ))}
    </div>
  )
}
