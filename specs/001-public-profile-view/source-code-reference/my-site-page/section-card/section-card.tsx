"use client"

import React, { memo, useCallback, useMemo } from "react"
import { Clock, Pencil, Trash2, Edit2, Eye } from "lucide-react"

import { BrandedSwitch } from '@/app/_components/molecules/branded-switch'
import { cn } from '@/lib/utils'
import { formatServicePrice } from '@/lib/utils/public-profile-helpers'
import { IService } from '@/types/IMySite'

export type SectionCardVariant = 'service' | 'information' | 'visibility'

type ServiceCardProps = {
  variant: 'service'
  service: IService
  onEdit?: (serviceId: string) => void
  onDelete?: (serviceId: string) => void
  actionsSlot?: React.ReactNode
  isEditable?: boolean
  className?: string
}

type InformationCardProps = {
  variant: 'information'
  title: string
  children: React.ReactNode
  onEdit?: () => void
  isEditable?: boolean
  actionsSlot?: React.ReactNode
  className?: string
}

type VisibilityCardProps = {
  variant: 'visibility'
  title: string
  description?: string
  checked: boolean
  onChange: () => void
  disabled?: boolean
  icon?: React.ReactNode
  ariaLabel?: string
  className?: string
}

export type SectionCardProps = ServiceCardProps | InformationCardProps | VisibilityCardProps

/**
 * Main SectionCard component with memoization for performance
 * Supports three variants: service, information, and visibility
 */
export const SectionCard = memo(function SectionCard(props: SectionCardProps) {
  if (props.variant === 'service') {
    return <ServiceCard {...props} />
  }

  if (props.variant === 'information') {
    return <InformationCard {...props} />
  }

  return <VisibilityCard {...props} />
})

/**
 * Service Card Component - Memoized for performance
 * Displays service information with edit/delete actions
 */
const ServiceCard = memo(function ServiceCard({
  service,
  onEdit,
  onDelete,
  actionsSlot,
  isEditable = true,
  className
}: ServiceCardProps) {
  // Memoize handlers to prevent unnecessary re-renders
  const handleEdit = useCallback(() => {
    onEdit?.(service.id)
  }, [onEdit, service.id])

  const handleDelete = useCallback(() => {
    onDelete?.(service.id)
  }, [onDelete, service.id])

  // Memoize formatted price (faixa quando disponível)
  const formattedPrice = useMemo(() => {
    const hasRange = typeof service.price_to === 'number'
      && Number.isFinite(service.price_to)
      && service.price_to > service.price

    if (hasRange) {
      return `${formatServicePrice(service.price)} - ${formatServicePrice(service.price_to as number)}`
    }
    return formatServicePrice(service.price)
  }, [service.price, service.price_to])

  return (
    <article
      className={cn(
        "group flex items-start gap-3 p-3 rounded-lg bg-neutral-50 hover:bg-neutral-100 transition-colors",
        className
      )}
      aria-label={`Serviço: ${service.title}`}
    >
      {/* Status indicator */}
      <div className="w-1.5 h-1.5 rounded-full bg-green-500 mt-2 flex-shrink-0" />
      
      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-3 mb-2">
          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-neutral-900 mb-1">
              {service.title}
            </h3>
            <p className="text-sm text-neutral-600 line-clamp-2">
              {service.description}
            </p>
          </div>

          {isEditable && (
            <menu className="flex items-center gap-2 flex-shrink-0 opacity-0 group-hover:opacity-100 transition-opacity" role="toolbar">
              {actionsSlot || (
                <>
                  {onEdit && (
                    <button
                      onClick={handleEdit}
                      className="border border-neutral-200 rounded p-1.5 hover:bg-white hover:border-neutral-300 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
                      aria-label={`Editar ${service.title}`}
                    >
                      <Pencil className="w-3.5 h-3.5 text-neutral-600" />
                    </button>
                  )}
                  {onDelete && (
                    <button
                      onClick={handleDelete}
                      className="border border-red-200 rounded p-1.5 hover:bg-red-50 hover:border-red-300 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                      aria-label={`Excluir ${service.title}`}
                    >
                      <Trash2 className="w-3.5 h-3.5 text-red-600" />
                    </button>
                  )}
                </>
              )}
            </menu>
          )}
        </div>

        {/* Footer with price and duration */}
        <div className="flex items-center gap-4 mt-3">
          <div className="flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="text-sm font-semibold text-green-700" aria-label="Preço">
              {formattedPrice}
            </span>
          </div>
          
          <div className="flex items-center gap-1.5" aria-label="Duração">
            <Clock className="w-3.5 h-3.5 text-neutral-400" aria-hidden="true" />
            <span className="text-sm text-neutral-600 tabular-nums">{service.duration}</span>
          </div>
        </div>
      </div>
    </article>
  )
})

/**
 * Information Card Component - Memoized for performance
 * Generic card for displaying information sections
 */
const InformationCard = memo(function InformationCard({
  title,
  children,
  onEdit,
  isEditable = true,
  actionsSlot,
  className
}: InformationCardProps) {
  const handleEdit = useCallback(() => {
    onEdit?.()
  }, [onEdit])

  return (
    <section
      className={cn(
        "bg-white border border-neutral-200 rounded-2xl p-4",
        className
      )}
      aria-labelledby={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}
    >
      <header className="flex items-center justify-between mb-4">
        <h2 
          id={`${title.toLowerCase().replace(/\s+/g, '-')}-title`}
          className="text-lg font-semibold text-neutral-900"
        >
          {title}
        </h2>
        {(actionsSlot || (isEditable && onEdit)) && (
          <div className="flex items-center gap-2">
            {actionsSlot}
            {isEditable && onEdit && (
              <button
                onClick={handleEdit}
                className="border border-neutral-200 rounded p-2 hover:bg-neutral-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2"
                aria-label={`Editar ${title.toLowerCase()}`}
              >
                <Edit2 className="w-4 h-4 text-neutral-500" />
              </button>
            )}
          </div>
        )}
      </header>
      <div className="flex flex-col gap-3">
        {children}
      </div>
    </section>
  )
})

/**
 * Visibility Card Component - Memoized for performance
 * Toggle visibility settings with visual feedback
 */
const VisibilityCard = memo(function VisibilityCard({
  title,
  description,
  checked,
  onChange,
  disabled,
  icon,
  ariaLabel,
  className
}: VisibilityCardProps) {
  const handleChange = useCallback(() => {
    onChange()
  }, [onChange])

  const cardId = `visibility-${title.toLowerCase().replace(/\s+/g, '-')}`
  const switchLabel = ariaLabel ?? `${checked ? 'Ocultar' : 'Mostrar'} ${title.toLowerCase()}`

  return (
    <section
      className={cn(
        "bg-white rounded-2xl border-2 p-4 transition-all duration-200",
        checked ? "border-green-500 shadow-sm" : "border-transparent hover:border-neutral-200",
        className
      )}
      aria-labelledby={cardId}
    >
      <div className="flex items-center gap-4">
        <div
          className={cn(
            "w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200",
            checked ? "bg-green-100" : "bg-neutral-100"
          )}
          aria-hidden="true"
        >
          {icon || (
            <Eye
              className={cn(
                "w-6 h-6 transition-colors duration-200",
                checked ? "text-green-600" : "text-neutral-500"
              )}
              aria-hidden="true"
            />
          )}
        </div>
        <div className="flex-1">
          <h3 id={cardId} className="text-base font-semibold text-neutral-900">{title}</h3>
          {description && (
            <p className="text-sm text-neutral-600">{description}</p>
          )}
        </div>
        <BrandedSwitch
          checked={checked}
          onCheckedChange={handleChange}
          disabled={disabled}
          aria-label={switchLabel}
        />
      </div>
    </section>
  )
})

export default SectionCard
