'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { BusinessHours } from '../business-hours/business-hours'
import { SocialLinks } from '../social-links/social-links'
import { CustomLinks } from '../custom-links/custom-links'
import { PaymentMethods } from '../payment-methods/payment-methods'
import { SectionCard } from '../section-card/section-card'
import { MapPin, Phone, Home, Building2, Map, Hash, ExternalLink } from 'lucide-react'
import Link from 'next/link'

interface InformationSectionWrapperProps {
  profile: IPublicProfileFullResponse
  viewModel: any
}

/**
 * Wrapper for information section in public view
 * Displays location, phone, business hours, social links, custom links, and payment methods
 * All in read-only mode (no edit buttons)
 */
export function InformationSectionWrapper({ profile, viewModel }: InformationSectionWrapperProps) {
  const hasAddress = viewModel.hasAddress
  const hasPhone = profile.show_phone && profile.phone
  const hasBusinessHours = viewModel.hasBusinessHours
  const hasCustomLinks = viewModel.hasCustomLinks && profile.show_links
  const canViewOnMaps = viewModel.canViewOnMaps
  const hasAddressData = Boolean(
    profile.street || profile.address_number || profile.city || profile.state || profile.postal_code
  )
  const isAddressExplicitlyHidden = profile.show_address === false && hasAddressData

  return (
    <div className="space-y-6">
      {/* Address Section */}
      <SectionCard title="Localização">
        {hasAddress ? (
          <div className="space-y-3">
            <div className="flex items-start gap-3">
              <Home className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
              <div className="flex-1">
                <p className="text-sm text-neutral-900 font-medium">
                  {viewModel.formattedAddress}
                </p>
              </div>
            </div>

            {canViewOnMaps && viewModel.googleMapsUrl && (
              <div className="pt-2">
                <Link
                  href={viewModel.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-xl border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-800 hover:bg-neutral-50 transition-colors w-full sm:w-auto"
                >
                  <span>Como chegar</span>
                  <ExternalLink className="w-4 h-4" />
                </Link>
              </div>
            )}
          </div>
        ) : (
          <p className="text-sm text-neutral-600">
            {isAddressExplicitlyHidden
              ? 'Endereço oculto.'
              : 'Endereço não informado.'}
          </p>
        )}
      </SectionCard>

      {/* Phone Section */}
      {hasPhone && (
        <SectionCard title="Telefone">
          <div className="text-sm text-neutral-800">
            <Link 
              href={`tel:${profile.phone.replace(/\D/g, '')}`} 
              className="text-primary underline hover:text-primary/80 transition-colors"
            >
              {viewModel.formattedPhone}
            </Link>
          </div>
        </SectionCard>
      )}

      {/* Business Hours */}
      {hasBusinessHours && (
        <SectionCard title="Horários de funcionamento">
          <BusinessHours hours={viewModel.businessHoursDisplay} />
        </SectionCard>
      )}

      {/* Social Media Links */}
      <SectionCard title="Redes Sociais">
        <SocialLinks
          instagram={profile.instagram_link}
          whatsapp={profile.whatsapp_link}
          tiktok={profile.tiktok_link}
          linkedin={profile.linkedin_link}
        />
      </SectionCard>

      {/* Custom Links */}
      {hasCustomLinks && (
        <SectionCard title="Links">
          <CustomLinks links={profile.custom_links} />
        </SectionCard>
      )}

      {/* Payment Methods */}
      <SectionCard title="Formas de Pagamento">
        <PaymentMethods methods={profile.payment_methods} />
      </SectionCard>
    </div>
  )
}
