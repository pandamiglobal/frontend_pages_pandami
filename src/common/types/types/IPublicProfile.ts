/**
 * Public Profile Types
 * Aligned with pandamiglobal/frontend_pandami-saas IPublicProfile.ts
 * Based on data-model.md specification
 */

// Enums
export enum Weekday {
  MONDAY = "MONDAY",
  TUESDAY = "TUESDAY",
  WEDNESDAY = "WEDNESDAY",
  THURSDAY = "THURSDAY",
  FRIDAY = "FRIDAY",
  SATURDAY = "SATURDAY",
  SUNDAY = "SUNDAY"
}

export enum PaymentMethodType {
  CASH = "CASH",
  CREDIT_CARD = "CREDIT_CARD",
  DEBIT_CARD = "DEBIT_CARD",
  PIX = "PIX",
  BANK_TRANSFER = "BANK_TRANSFER"
}

// Core Entities
export interface ICustomLink {
  id: number
  name: string
  url: string
  active: boolean
}

export interface IPublicProfileService {
  id: number
  name: string
  description?: string
  price_from?: number
  price_to?: number
  duration_hours?: number
}

export interface IPublicProfileOpeningHour {
  id: number
  weekday: Weekday
  start_time: string
  end_time: string
  active: boolean
  isToday?: boolean
}

export interface IPublicProfilePaymentMethod {
  id: number
  method: PaymentMethodType
  active: boolean
}

export interface IPublicProfileGallery {
  id: number
  file_name: string
  url?: string
}

// Main Profile Types
export interface ICreatePublicProfileLink {
  instagram_link?: string
  whatsapp_link?: string
  tiktok_link?: string
  linkedin_link?: string
}

export interface ICreatePublicProfileService {
  name: string
  description?: string
  price_from?: number
  price_to?: number
  duration_hours?: number
}

export interface ICreatePublicProfileOpeningHour {
  weekday: Weekday
  start_time: string
  end_time: string
  active: boolean
}

export interface ICreatePublicProfilePaymentMethod {
  method: PaymentMethodType
  active: boolean
}

export interface ICreatePublicProfilePayload {
  name: string
  slug: string
  phone: string
  bio?: string
  state: string
  city: string
  business_name?: string
  show_phone: boolean
  show_address: boolean
  show_links: boolean
  public_profile_image: {
    file_name: string
  }
  postal_code?: string
  street?: string
  address_number?: string
  instagram_link?: string
  whatsapp_link?: string
  tiktok_link?: string
  linkedin_link?: string
  custom_links: ICreatePublicProfileLink[]
  services: ICreatePublicProfileService[]
  opening_hours: ICreatePublicProfileOpeningHour[]
  payment_methods: ICreatePublicProfilePaymentMethod[]
}

// Response Types
export interface IPublicProfileResponse {
  id: number
  user_id: number
  name: string
  slug: string
  phone: string
  bio?: string
  state: string
  city: string
  business_name?: string
  show_phone: boolean
  show_address: boolean
  show_links: boolean
  public_profile_image: {
    file_name: string
  }
  created_at: string
  updated_at: string
}

export interface ICustomLinkFormatted {
  id: number
  name: string
  url: string
  active: boolean
  display_url?: string
  favicon?: string
}

// Full Response (used by public profile view)
export interface IPublicProfileFullResponse {
  // Basic profile info
  id: number
  user_id: number
  name: string
  slug: string
  phone: string
  bio?: string
  state: string
  city: string
  business_name?: string
  
  // Visibility settings
  show_phone: boolean
  show_address: boolean
  show_links: boolean
  
  // Profile image
  public_profile_image: {
    file_name: string
  }
  
  // Address (if visible)
  postal_code?: string
  street?: string
  address_number?: string
  
  // Social media links
  instagram_link?: string
  whatsapp_link?: string
  tiktok_link?: string
  linkedin_link?: string
  
  // Collections
  custom_links: ICustomLink[]
  services: IPublicProfileService[]
  opening_hours: IPublicProfileOpeningHour[]
  payment_methods: IPublicProfilePaymentMethod[]
  
  // Metadata
  created_at: string
  updated_at: string
}

// View Model Types
export interface PublicProfileViewModel {
  // Profile data
  profile: IPublicProfileFullResponse | null
  isLoading: boolean
  error: string | null
  
  // Computed properties
  hasServices: boolean
  hasBusinessHours: boolean
  hasPaymentMethods: boolean
  hasSocialLinks: boolean
  hasCustomLinks: boolean
  hasAddress: boolean
  
  // Display formatting
  formattedPhone: string
  formattedAddress: string
  priceRange: string
  businessHoursDisplay: BusinessHoursDisplay[]
  
  // WhatsApp integration
  whatsappUrl: string
  canContactViaWhatsApp: boolean
}

export interface BusinessHoursDisplay {
  day: string
  hours: string
  isOpen: boolean
  isActive: boolean
}

// Error Types
export enum PublicProfileErrorType {
  NOT_FOUND = "NOT_FOUND",
  NETWORK_ERROR = "NETWORK_ERROR",
  VALIDATION_ERROR = "VALIDATION_ERROR",
  SERVER_ERROR = "SERVER_ERROR",
  TIMEOUT = "TIMEOUT"
}

export class PublicProfileApiError extends Error {
  type: PublicProfileErrorType
  details?: any
  retryable: boolean

  constructor(
    type: PublicProfileErrorType,
    message: string,
    details?: any,
    retryable: boolean = false
  ) {
    super(message)
    this.name = 'PublicProfileApiError'
    this.type = type
    this.details = details
    this.retryable = retryable
  }
}

// API Request/Response Types
export interface GetPublicProfileRequest {
  slug: string
}

export interface GetPublicProfileResponse {
  success: true
  data: IPublicProfileFullResponse
}

export interface GetPublicProfileErrorResponse {
  success: false
  error: PublicProfileApiError
}

export type PublicProfileApiResponse = 
  | GetPublicProfileResponse
  | GetPublicProfileErrorResponse

// SWR Hook Types
export interface UsePublicProfileConfig {
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  refreshInterval?: number
  errorRetryCount?: number
  errorRetryInterval?: number
  dedupingInterval?: number
  fallbackData?: IPublicProfileFullResponse | Promise<IPublicProfileFullResponse>
}

export interface UsePublicProfileReturn {
  data: IPublicProfileFullResponse | null
  error: PublicProfileApiError | null
  isLoading: boolean
  isValidating: boolean
  mutate: (
    data?: IPublicProfileFullResponse | Promise<IPublicProfileFullResponse>,
    shouldRevalidate?: boolean
  ) => Promise<IPublicProfileFullResponse | undefined>
}
