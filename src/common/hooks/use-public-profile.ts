'use client'

import useSWR from 'swr'
import { GetPublicProfileBySlugAction } from '@/server/actions/get-public-profile.action'
import {
  IPublicProfileFullResponse,
  PublicProfileApiError,
  PublicProfileErrorType,
  UsePublicProfileConfig,
  UsePublicProfileReturn
} from '@/common/types/IPublicProfile'

/**
 * Default SWR configuration for public profile fetching
 */
const defaultConfig: UsePublicProfileConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Manual revalidation only
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 60000, // 1 minute
}

/**
 * Fetcher function for SWR
 */
async function fetchPublicProfile(slug: string): Promise<IPublicProfileFullResponse> {
  try {
    return await GetPublicProfileBySlugAction(slug)
  } catch (error: any) {
    // Transform server action errors to SWR-compatible errors
    if (error.message.includes('PROFILE_NOT_FOUND')) {
      throw new PublicProfileApiError(
        PublicProfileErrorType.NOT_FOUND,
        'Perfil não encontrado',
        { slug },
        false
      )
    } else if (error.message.includes('VALIDATION_ERROR')) {
      throw new PublicProfileApiError(
        PublicProfileErrorType.VALIDATION_ERROR,
        'Slug inválido',
        { slug },
        false
      )
    } else if (error.message.includes('SERVER_ERROR')) {
      throw new PublicProfileApiError(
        PublicProfileErrorType.SERVER_ERROR,
        'Erro interno do servidor',
        { slug },
        true
      )
    } else if (error.message.includes('TIMEOUT')) {
      throw new PublicProfileApiError(
        PublicProfileErrorType.TIMEOUT,
        'Tempo de solicitação esgotado',
        { slug },
        true
      )
    } else {
      throw new PublicProfileApiError(
        PublicProfileErrorType.NETWORK_ERROR,
        'Erro de rede ao carregar o perfil',
        { slug },
        true
      )
    }
  }
}

/**
 * SWR hook for fetching public profile data
 * 
 * @param slug - Profile slug identifier
 * @param config - Optional SWR configuration overrides
 * @returns SWR return object with profile data, loading state, and error handling
 */
export function usePublicProfile(
  slug: string,
  config: UsePublicProfileConfig = {}
): UsePublicProfileReturn {
  const mergedConfig = { ...defaultConfig, ...config }

  const {
    data,
    error,
    isLoading,
    isValidating,
    mutate
  } = useSWR<IPublicProfileFullResponse, PublicProfileApiError>(
    slug ? `/public-profile/${slug}` : null,
    () => fetchPublicProfile(slug),
    mergedConfig
  )

  return {
    data: data || null,
    error: error || null,
    isLoading,
    isValidating,
    mutate
  }
}

/**
 * Extended hook with computed properties for view components
 */
export function usePublicProfileViewModel(
  slug: string,
  config: UsePublicProfileConfig = {}
) {
  const { data: profile, error, isLoading, isValidating, mutate } = usePublicProfile(slug, config)

  // Computed properties
  const hasServices = profile?.services ? profile.services.length > 0 : false
  const hasBusinessHours = profile?.opening_hours ? profile.opening_hours.length > 0 : false
  const hasPaymentMethods = profile?.payment_methods ? profile.payment_methods.length > 0 : false
  const hasSocialLinks = Boolean(
    profile?.instagram_link || 
    profile?.whatsapp_link || 
    profile?.tiktok_link || 
    profile?.linkedin_link
  )
  const hasCustomLinks = profile?.custom_links ? profile.custom_links.length > 0 : false
  const hasAddress = Boolean(
    profile?.show_address && 
    profile?.street && 
    profile?.city && 
    profile?.state
  )

  // Display formatting
  const formattedPhone = profile?.phone ? formatPhoneNumber(profile.phone) : ''
  const formattedAddress = profile && profile.show_address ? formatAddress(profile) : ''
  const priceRange = profile?.services ? calculatePriceRange(profile.services) : ''
  const businessHoursDisplay = profile?.opening_hours ? formatBusinessHours(profile.opening_hours) : []

  // WhatsApp integration
  const whatsappUrl = profile?.phone ? buildWhatsAppUrl(profile.phone) : ''
  const canContactViaWhatsApp = Boolean(profile?.phone && profile?.show_phone)

  return {
    // Profile data
    profile,
    isLoading,
    error,
    
    // Computed properties
    hasServices,
    hasBusinessHours,
    hasPaymentMethods,
    hasSocialLinks,
    hasCustomLinks,
    hasAddress,
    
    // Display formatting
    formattedPhone,
    formattedAddress,
    priceRange,
    businessHoursDisplay,
    
    // WhatsApp integration
    whatsappUrl,
    canContactViaWhatsApp,
    
    // SWR utilities
    isValidating,
    mutate
  }
}

// Helper functions
function formatPhoneNumber(phone: string): string {
  // Remove non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format for Brazilian numbers: +55 (XX) XXXXX-XXXX
  if (cleaned.length === 13 && cleaned.startsWith('55')) {
    return `+55 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`
  }
  
  // Return original if can't format
  return phone
}

function formatAddress(profile: IPublicProfileFullResponse): string {
  const parts = [
    profile.street,
    profile.address_number,
    profile.city,
    profile.state,
    profile.postal_code
  ].filter(Boolean)
  
  return parts.join(', ')
}

function calculatePriceRange(services: any[]): string {
  const activeServices = services.filter(s => s.price_from || s.price_to)
  
  if (activeServices.length === 0) return ''
  
  const prices = activeServices.flatMap(s => [
    s.price_from || Infinity,
    s.price_to || Infinity
  ]).filter(p => p !== Infinity)
  
  if (prices.length === 0) return ''
  
  const min = Math.min(...prices)
  const max = Math.max(...prices)
  
  if (min === max) {
    return `R$ ${min.toFixed(2)}`
  }
  
  return `R$ ${min.toFixed(2)} - ${max.toFixed(2)}`
}

function formatBusinessHours(hours: any[]): any[] {
  const dayNames = {
    MONDAY: 'Segunda-feira',
    TUESDAY: 'Terça-feira',
    WEDNESDAY: 'Quarta-feira',
    THURSDAY: 'Quinta-feira',
    FRIDAY: 'Sexta-feira',
    SATURDAY: 'Sábado',
    SUNDAY: 'Domingo'
  }

  return hours.map(hour => ({
    day: dayNames[hour.weekday as keyof typeof dayNames] || hour.weekday,
    hours: hour.active ? `${hour.start_time} - ${hour.end_time}` : 'Fechado',
    isOpen: hour.active && isCurrentlyOpen(hour.start_time, hour.end_time),
    isActive: hour.active
  }))
}

function isCurrentlyOpen(startTime: string, endTime: string): boolean {
  const now = new Date()
  const currentMinutes = now.getHours() * 60 + now.getMinutes()
  
  const [startHour, startMinute] = startTime.split(':').map(Number)
  const [endHour, endMinute] = endTime.split(':').map(Number)
  
  const startMinutes = startHour * 60 + startMinute
  const endMinutes = endHour * 60 + endMinute
  
  return currentMinutes >= startMinutes && currentMinutes <= endMinutes
}

function buildWhatsAppUrl(phone: string, message?: string): string {
  const cleanedPhone = phone.replace(/\D/g, '')
  const encodedMessage = message ? encodeURIComponent(message) : ''
  
  return `https://wa.me/${cleanedPhone}${encodedMessage ? `?text=${encodedMessage}` : ''}`
}
