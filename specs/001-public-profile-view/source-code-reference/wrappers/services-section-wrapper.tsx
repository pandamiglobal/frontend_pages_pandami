'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import Image from 'next/image'
import { BrandedChip } from '@/app/_components/molecules/branded-chip'
import { PaymentMethodsList } from '@/app/_components/molecules/my-site/payment-methods-list/payment-methods-list'
import { Plus } from 'lucide-react'

export function ServicesListWrapper({ model }: { model: IMySitePageModel }) {
  if (model.isLoadingServices) {
    // Simple loading placeholder; can be replaced by a skeleton component later
    return (
      <div className="flex flex-col gap-3" aria-busy="true" aria-label="Carregando serviços...">
        <div className="h-16 rounded-lg bg-neutral-100" />
        <div className="h-16 rounded-lg bg-neutral-100" />
        <div className="h-16 rounded-lg bg-neutral-100" />
      </div>
    )
  }

  // Flags para exibir status de preços dos cards
  const hasRange = model.services.some(s => typeof s.price_to === 'number' && Number.isFinite(s.price_to) && s.price_to > s.price)
  const hasFixed = model.services.some(s => !(typeof s.price_to === 'number' && Number.isFinite(s.price_to) && s.price_to > s.price))

  return (
    <div className="flex flex-col gap-3">
      {/* Chips de contexto sobre preços dos serviços */}
      {model.services.length > 0 && (
        <div className="flex items-center gap-2 mb-1" aria-label="Contexto de preços dos serviços">
          {hasRange && (
            <BrandedChip variant="success" size="sm">Com faixa de preço</BrandedChip>
          )}
          {hasFixed && (
            <BrandedChip variant="outline" size="sm">Preço fixo</BrandedChip>
          )}
        </div>
      )}
      {model.services.map(service => (
        <SectionCard
          key={service.id}
          variant="service"
          service={service}
          onEdit={model.handleEditService}
          onDelete={model.handleDeleteService}
          isEditable={model.isEditable}
        />
      ))}
      {model.services.length === 0 && (
        <div className="rounded-lg border border-neutral-200 p-4 text-sm text-neutral-600">
          Nenhum serviço cadastrado.
        </div>
      )}
    </div>
  )
}

export function PaymentMethodsWrapper({ model }: { model: IMySitePageModel }) {
  return (
    <SectionCard
      variant="information"
      title="Formas de pagamento"
      onEdit={model.handleEditPaymentMethods}
      isEditable={model.isEditable}
    >
      <PaymentMethodsList
        paymentMethods={model.paymentMethods}
        emptyMessage="Nenhuma forma de pagamento configurada."
      />
    </SectionCard>
  )
}

export function PortfolioGalleryWrapper({ model }: { model: IMySitePageModel }) {
  return (
    <SectionCard
      variant="information"
      title="Portfólio"
      isEditable={model.isEditable}
      actionsSlot={
        model.isEditable ? (
          <BrandedButton
            variant="outline"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={model.handleAddImage}
          >
            Adicionar
          </BrandedButton>
        ) : undefined
      }
    >
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
        {model.portfolioImages.map(img => (
          <figure key={img.id} className="relative group overflow-hidden rounded-lg border border-neutral-200">
            <div className="relative w-full h-24">
              {img.url ? (
                <Image
                  src={img.url}
                  alt={img.alt}
                  fill
                  sizes="(min-width: 768px) 25vw, 50vw"
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-neutral-100" aria-hidden="true" />
              )}
            </div>
            <figcaption className="sr-only">{img.alt}</figcaption>
          </figure>
        ))}
      </div>
      {model.portfolioImages.length === 0 && (
        <p className="text-sm text-neutral-600">Nenhuma imagem no portfólio.</p>
      )}
    </SectionCard>
  )
}