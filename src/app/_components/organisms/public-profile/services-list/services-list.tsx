'use client'

import { IPublicProfileService } from '@/common/types/IPublicProfile'
import { Clock, DollarSign } from 'lucide-react'

interface ServicesListProps {
  services: IPublicProfileService[]
}

/**
 * Services list component for public view
 * Based on SaaS SectionCard service variant, without management actions
 * Displays services with pricing and duration in read-only mode
 */
export function ServicesList({ services }: ServicesListProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-8 text-neutral-500">
        <p>Esse perfil não possui serviços cadastrados.</p>
      </div>
    )
  }

  const formatPrice = (from?: number, to?: number): string => {
    if (!from && !to) return 'Preço sob consulta'
    
    if (from && to && from !== to) {
      return `R$ ${from.toFixed(2)} - R$ ${to.toFixed(2)}`
    }
    
    const price = from || to || 0
    return `R$ ${price.toFixed(2)}`
  }

  const formatDuration = (hours?: number): string => {
    if (!hours) return ''
    
    if (hours < 1) {
      const minutes = Math.round(hours * 60)
      return `${minutes} min`
    }
    
    if (hours === 1) return '1 hora'
    
    const wholeHours = Math.floor(hours)
    const minutes = Math.round((hours - wholeHours) * 60)
    
    if (minutes === 0) {
      return `${wholeHours} horas`
    }
    
    return `${wholeHours}h ${minutes}min`
  }

  return (
    <div className="space-y-3">
      {services.map((service) => (
        <div
          key={service.id}
          className="rounded-xl border border-neutral-200 bg-white px-4 py-3 shadow-sm hover:shadow-md transition-shadow"
        >
          <h3 className="text-sm font-semibold text-neutral-900 mb-1">
            {service.name}
          </h3>
          
          {service.description && (
            <p className="text-xs text-neutral-600 mb-2 line-clamp-2">
              {service.description}
            </p>
          )}

          <div className="mt-1 flex items-center justify-between text-sm">
            <div className="flex items-center gap-1.5 text-emerald-600 font-semibold">
              <DollarSign className="w-4 h-4" />
              <span>{formatPrice(service.price_from, service.price_to)}</span>
            </div>

            {service.duration_hours && (
              <div className="flex items-center gap-1.5 text-xs text-neutral-600">
                <Clock className="w-4 h-4" />
                <span>{formatDuration(service.duration_hours)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
