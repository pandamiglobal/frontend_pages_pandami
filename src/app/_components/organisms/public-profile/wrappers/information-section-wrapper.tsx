'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { BusinessHours } from '../business-hours/business-hours'
import { SocialLinks } from '../social-links/social-links'
import { CustomLinks } from '../custom-links/custom-links'
import { PaymentMethods } from '../payment-methods/payment-methods'
import { SectionCard } from '../section-card/section-card'
import { MapPin, Phone, Home, Building2, Map, Hash } from 'lucide-react'
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
  const hasSocialLinks = viewModel.hasSocialLinks
  const hasCustomLinks = viewModel.hasCustomLinks && profile.show_links
  const hasPaymentMethods = viewModel.hasPaymentMethods

  return (
    <div className="space-y-6">
      {/* Address Section */}
      {hasAddress && (
        <SectionCard title="Endereço">
          <div className="space-y-3">
            {/* Street and Number */}
            {(profile.street || profile.address_number) && (
              <div className="flex items-start gap-3">
                <Home className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-neutral-900">
                    {[profile.street, profile.address_number].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* City and State */}
            {(profile.city || profile.state) && (
              <div className="flex items-start gap-3">
                <Map className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-neutral-600">
                    {[profile.city, profile.state].filter(Boolean).join(', ')}
                  </p>
                </div>
              </div>
            )}

            {/* Postal Code */}
            {profile.postal_code && (
              <div className="flex items-start gap-3">
                <Hash className="w-4 h-4 text-neutral-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <p className="text-sm text-neutral-600">CEP: {profile.postal_code}</p>
                </div>
              </div>
            )}
          </div>
        </SectionCard>
      )}

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
      {hasSocialLinks && (
        <SectionCard title="Redes Sociais">
          <SocialLinks
            instagram={profile.instagram_link}
            whatsapp={profile.whatsapp_link}
            tiktok={profile.tiktok_link}
            linkedin={profile.linkedin_link}
          />
        </SectionCard>
      )}

      {/* Custom Links */}
      {hasCustomLinks && (
        <SectionCard title="Links">
          <CustomLinks links={profile.custom_links} />
        </SectionCard>
      )}

      {/* Payment Methods */}
      {hasPaymentMethods && (
        <SectionCard title="Formas de Pagamento">
          <PaymentMethods methods={profile.payment_methods} />
        </SectionCard>
      )}
    </div>
  )
}
