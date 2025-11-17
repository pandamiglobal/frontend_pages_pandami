'use client'

import { IPublicProfileService } from '@/common/types/types/IPublicProfile'
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
      <div className="text-center py-8 text-gray-500">
        <p>Nenhum serviço disponível no momento.</p>
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
    <div className="grid gap-4 sm:grid-cols-2">
      {services.map((service) => (
        <div
          key={service.id}
          className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
        >
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            {service.name}
          </h3>
          
          {service.description && (
            <p className="text-sm text-gray-600 mb-3 line-clamp-2">
              {service.description}
            </p>
          )}

          <div className="flex flex-wrap gap-3 text-sm">
            <div className="flex items-center gap-1.5 text-gray-700">
              <DollarSign className="w-4 h-4 text-green-600" />
              <span>{formatPrice(service.price_from, service.price_to)}</span>
            </div>

            {service.duration_hours && (
              <div className="flex items-center gap-1.5 text-gray-700">
                <Clock className="w-4 h-4 text-blue-600" />
                <span>{formatDuration(service.duration_hours)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
