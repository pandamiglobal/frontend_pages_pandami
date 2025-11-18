'use client'

import { IPublicProfileFullResponse } from '@/common/types/IPublicProfile'
import { BusinessHours } from '../business-hours/business-hours'
import { SocialLinks } from '../social-links/social-links'
import { CustomLinks } from '../custom-links/custom-links'
import { PaymentMethods } from '../payment-methods/payment-methods'
import { MapPin, Phone } from 'lucide-react'

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
  const hasContactInfo = profile.show_phone || viewModel.hasAddress
  const hasBusinessHours = viewModel.hasBusinessHours
  const hasSocialLinks = viewModel.hasSocialLinks
  const hasCustomLinks = viewModel.hasCustomLinks && profile.show_links
  const hasPaymentMethods = viewModel.hasPaymentMethods

  return (
    <div className="space-y-6">
      {/* Contact Information */}
      {hasContactInfo && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Contato</h2>
          <div className="space-y-3">
            {profile.show_phone && profile.phone && (
              <div className="flex items-center gap-3 text-gray-700">
                <Phone className="w-5 h-5 text-gray-500" />
                <span>{viewModel.formattedPhone}</span>
              </div>
            )}
            {viewModel.hasAddress && (
              <div className="flex items-start gap-3 text-gray-700">
                <MapPin className="w-5 h-5 text-gray-500 mt-0.5" />
                <span>{viewModel.formattedAddress}</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Business Hours */}
      {hasBusinessHours && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Horário de Funcionamento</h2>
          <BusinessHours hours={profile.opening_hours} />
        </div>
      )}

      {/* Social Media Links */}
      {hasSocialLinks && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Redes Sociais</h2>
          <SocialLinks
            instagram={profile.instagram_link}
            whatsapp={profile.whatsapp_link}
            tiktok={profile.tiktok_link}
            linkedin={profile.linkedin_link}
          />
        </div>
      )}

      {/* Custom Links */}
      {hasCustomLinks && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Links</h2>
          <CustomLinks links={profile.custom_links} />
        </div>
      )}

      {/* Payment Methods */}
      {hasPaymentMethods && (
        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Formas de Pagamento</h2>
          <PaymentMethods methods={profile.payment_methods} />
        </div>
      )}
    </div>
  )
}
