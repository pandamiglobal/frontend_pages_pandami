'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import { Plus, Pencil, Trash2, Globe, MapPin, Home, Hash, Building2, Map } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

export function LocationSectionWrapper({ model }: { model: IMySitePageModel }) {
  const address = model.address
  const hasAddress = !!address

  return (
    <SectionCard
      variant="information"
      title="Endereço"
      onEdit={model.handleEditAddress}
      isEditable={model.isEditable}
    >
      {hasAddress ? (
        <div className="space-y-3">
          {/* Rua e Número */}
          <div className="flex items-start gap-3">
            <Home className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm font-medium text-neutral-900">
                {[address!.street, address!.number].filter(Boolean).join(', ') || 'Endereço não informado'}
              </p>
            </div>
          </div>

          {/* Complemento */}
          <div className="flex items-start gap-3">
            <Building2 className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-neutral-600">{address!.complement || 'Sem complemento'}</p>
            </div>
          </div>

          {/* Bairro */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-neutral-600">{address!.neighborhood || 'Sem bairro'}</p>
            </div>
          </div>

          {/* Cidade e Estado */}
          <div className="flex items-start gap-3">
            <Map className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-neutral-600">
                {[address!.city, address!.state].filter(Boolean).join(', ') || 'Cidade/Estado não informados'}
              </p>
            </div>
          </div>

          {/* CEP */}
          <div className="flex items-start gap-3">
            <Hash className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
            <div className="flex-1">
              <p className="text-sm text-neutral-600">CEP: {address!.cep || 'Não informado'}</p>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-3">
          <MapPin className="w-4 h-4 text-neutral-400" />
          <p className="text-sm text-neutral-600">Endereço oculto</p>
        </div>
      )}
    </SectionCard>
  )
}

export function PhoneSectionWrapper({ model }: { model: IMySitePageModel }) {
  const isVisible = model.visibilitySettings.showPhone
  const hasPhone = !!model.phone

  const displayPhone = () => {
    const digits = (model.phone || '').replace(/\D/g, '')
    if (digits.length >= 11) {
      return `(${digits.slice(0,2)}) ${digits.slice(2,7)}-${digits.slice(7,11)}`
    }
    if (digits.length >= 10) {
      return `(${digits.slice(0,2)}) ${digits.slice(2,6)}-${digits.slice(6,10)}`
    }
    return model.phone || ''
  }

  return (
    <SectionCard
      variant="information"
      title="Telefone"
      onEdit={model.handleEditPhone}
      isEditable={model.isEditable}
    >
      {isVisible && hasPhone ? (
        <div className="text-sm text-neutral-800">
          <Link href={`tel:${(model.phone || '').replace(/\D/g, '')}`} className="text-primary underline">
            {displayPhone()}
          </Link>
        </div>
      ) : (
        <p className="text-sm text-neutral-600">Telefone oculto</p>
      )}
    </SectionCard>
  )
}

export function BusinessHoursSectionWrapper({ model }: { model: IMySitePageModel }) {
  return (
    <SectionCard
      variant="information"
      title="Horários de funcionamento"
      onEdit={model.handleEditBusinessHours}
      isEditable={model.isEditable}
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {model.businessHours.map((h) => (
          <div
            key={h.id}
            className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2"
          >
            <div className="flex items-center gap-2">
              <span className={`text-sm font-medium ${h.isToday ? 'text-primary' : 'text-neutral-800'}`}>{h.day}</span>
              {h.isToday && <span className="rounded bg-primary/10 text-primary text-[10px] px-2 py-0.5">Hoje</span>}
            </div>
            <div className="text-sm text-neutral-700">
              {h.isOpen ? (
                <span>
                  {h.openTime} — {h.closeTime}
                </span>
              ) : (
                <span className="text-neutral-500">Fechado</span>
              )}
            </div>
          </div>
        ))}
        {model.businessHours.length === 0 && (
          <p className="text-sm text-neutral-600">Horários não informados.</p>
        )}
      </div>
    </SectionCard>
  )
}

export function SocialMediaSectionWrapper({ model }: { model: IMySitePageModel }) {
  const getPlatformIcon = (platform: 'instagram' | 'linkedin' | 'tiktok' | 'whatsapp') => {
    switch (platform) {
      case 'instagram':
        return '/images/svg/social-media/social-media-instagram.svg'
      case 'linkedin':
        return '/images/svg/social-media/social-media-linkedin.svg'
      case 'tiktok':
        return '/images/svg/social-media/social-media-tiktok.svg'
      case 'whatsapp':
        return '/images/svg/social-media/social-media-whatsapp.svg'
      default:
        return '/images/svg/social-media/social-media-instagram.svg'
    }
  }

  const formatPlatformLabel = (platform: string) => {
    if (platform === 'linkedin') return 'LinkedIn'
    return platform.charAt(0).toUpperCase() + platform.slice(1)
  }

  return (
    <SectionCard
      variant="information"
      title="Redes sociais"
      isEditable={model.isEditable}
      actionsSlot={
        model.isEditable ? (
          <BrandedButton
            variant="outline"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={model.handleAddSocialMedia}
          >
            Adicionar
          </BrandedButton>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-2">
        {model.socialMedia.map(sm => (
          <div key={sm.id} className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5">
                <Image
                  src={getPlatformIcon(sm.platform)}
                  alt={formatPlatformLabel(sm.platform)}
                  width={20}
                  height={20}
                  className="w-5 h-5"
                />
              </div>
              <span className="text-sm font-medium">{formatPlatformLabel(sm.platform)}</span>
              <span className="text-sm text-neutral-600">{sm.handle}</span>
            </div>
            {model.isEditable && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => model.handleEditSocialMedia(sm.id)}
                  className="border border-neutral-200 rounded p-1.5 hover:bg-neutral-50"
                  aria-label={`Editar ${sm.platform}`}
                >
                  <Pencil className="w-3.5 h-3.5 text-neutral-600" />
                </button>
                <button
                  onClick={() => model.handleDeleteSocialMedia(sm.id)}
                  className="border border-red-200 rounded p-1.5 hover:bg-red-50"
                  aria-label={`Excluir ${sm.platform}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            )}
          </div>
        ))}
        {model.socialMedia.length === 0 && (
          <p className="text-sm text-neutral-600">Nenhuma rede social adicionada.</p>
        )}
      </div>
    </SectionCard>
  )
}

export function SlugSectionWrapper({ model }: { model: IMySitePageModel }) {
  return (
    <SectionCard
      variant="information"
      title="Nome de usuário"
      onEdit={model.handleEditSlug}
      isEditable={model.isEditable}
    >
      <div className="text-sm text-neutral-800">
        <p className="font-mono bg-neutral-50 px-3 py-2 rounded border border-neutral-200 inline-block">
          pandami.com.br/p/<span className="font-semibold text-primary">{model.slug || 'seu-nome'}</span>
        </p>
        <p className="text-xs text-neutral-500 mt-2">
          Este é o endereço único da sua página no Pandami
        </p>
      </div>
    </SectionCard>
  )
}

export function CustomLinksSectionWrapper({ model }: { model: IMySitePageModel }) {
  const formatUrlDisplay = (url: string) => {
    try {
      const clean = url
        .replace(/^https?:\/\//, '')
        .replace(/^www\./, '')
        .replace(/\/$/, '')
      return clean
    } catch {
      return url
    }
  }

  return (
    <SectionCard
      variant="information"
      title="Meus links"
      isEditable={model.isEditable}
      actionsSlot={
        model.isEditable ? (
          <BrandedButton
            variant="outline"
            size="sm"
            icon={<Plus className="w-4 h-4" />}
            iconPosition="left"
            onClick={model.handleAddCustomLink}
          >
            Adicionar
          </BrandedButton>
        ) : undefined
      }
    >
      <div className="flex flex-col gap-2">
        {model.customLinks.map(link => (
          <div key={link.id} className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2">
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-5 h-5">
                <Globe className="w-5 h-5 text-neutral-700" aria-hidden="true" />
              </div>
              <span className="text-sm font-medium">{link.name}</span>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary underline"
                aria-label={`Abrir ${link.name} em nova aba`}
              >
                {formatUrlDisplay(link.url)}
              </a>
            </div>
            {model.isEditable && (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => model.handleDeleteCustomLink(link.id)}
                  className="border border-red-200 rounded p-1.5 hover:bg-red-50"
                  aria-label={`Excluir link ${link.name}`}
                >
                  <Trash2 className="w-3.5 h-3.5 text-red-600" />
                </button>
              </div>
            )}
          </div>
        ))}
        {model.customLinks.length === 0 && (
          <p className="text-sm text-neutral-600">Nenhum link adicionado.</p>
        )}
      </div>
    </SectionCard>
  )
}