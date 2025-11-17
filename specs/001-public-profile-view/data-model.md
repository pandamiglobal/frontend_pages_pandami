# Data Model: Public Profile View Page

**Date**: 2025-11-17  
**Source**: Aligned with `pandamiglobal/frontend_pandami-saas` IPublicProfile.ts  
**Purpose**: Define data entities for public profile display

## Core Entities

### 1. PublicProfile

Represents the main professional profile entity displayed to users.

```typescript
interface PublicProfile {
  id: number
  user_id: number
  name: string                    // Professional name
  slug: string                    // URL identifier
  phone: string                   // Contact phone
  bio?: string                    // Professional description
  state: string                   // State abbreviation
  city: string                    // City name
  business_name?: string          // Business name (optional)
  show_phone: boolean            // Visibility settings
  show_address: boolean
  show_links: boolean
  created_at: string
  updated_at: string
}
```

### 2. ProfileImage

Represents the professional's profile picture.

```typescript
interface ProfileImage {
  file_name: string               // Image filename
  url?: string                    // Full image URL (constructed)
}
```

### 3. Address

Represents the professional's business address.

```typescript
interface Address {
  street?: string                 // Street name
  address_number?: string         // Street number
  postal_code?: string           // ZIP/CEP code
  city: string                    // City name
  state: string                   // State abbreviation
}
```

### 4. Service

Represents a service offered by the professional.

```typescript
interface Service {
  id: number
  name: string                    // Service name
  description?: string           // Service description
  price_from?: number            // Minimum price
  price_to?: number              // Maximum price
  duration_hours?: number        // Service duration
}
```

### 5. BusinessHours

Represents operating schedule for each day.

```typescript
enum Weekday {
  MONDAY = "MONDAY"
  TUESDAY = "TUESDAY"
  WEDNESDAY = "WEDNESDAY"
  THURSDAY = "THURSDAY"
  FRIDAY = "FRIDAY"
  SATURDAY = "SATURDAY"
  SUNDAY = "SUNDAY"
}

interface BusinessHours {
  id: number
  weekday: Weekday               // Day of week
  start_time: string             // Opening time (HH:MM)
  end_time: string               // Closing time (HH:MM)
  active: boolean                // Is this day active
}
```

### 6. PaymentMethod

Represents accepted payment options.

```typescript
enum PaymentMethodType {
  CASH = "CASH"
  CREDIT_CARD = "CREDIT_CARD"
  DEBIT_CARD = "DEBIT_CARD"
  PIX = "PIX"
  BANK_TRANSFER = "BANK_TRANSFER"
}

interface PaymentMethod {
  id: number
  method: PaymentMethodType       // Payment type
  active: boolean                // Is this method accepted
}
```

### 7. SocialMediaLinks

Represents professional's social media presence.

```typescript
interface SocialMediaLinks {
  instagram_link?: string         // Instagram URL
  whatsapp_link?: string          // WhatsApp URL
  tiktok_link?: string            // TikTok URL
  linkedin_link?: string          // LinkedIn URL
}
```

### 8. CustomLink

Represents additional external links.

```typescript
interface CustomLink {
  id: number
  name: string                    // Display name
  url: string                     // Destination URL
  active: boolean                 // Is link visible
}
```

## Composite Data Structure

### PublicProfileFullResponse

Complete profile data structure returned by API.

```typescript
interface PublicProfileFullResponse {
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
  custom_links: CustomLink[]
  services: Service[]
  opening_hours: BusinessHours[]
  payment_methods: PaymentMethod[]
  
  // Metadata
  created_at: string
  updated_at: string
}
```

## View Models

### PublicProfileViewModel

Data structure optimized for view rendering.

```typescript
interface PublicProfileViewModel {
  // Profile data
  profile: PublicProfileFullResponse | null
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
```

### BusinessHoursDisplay

Formatted business hours for display.

```typescript
interface BusinessHoursDisplay {
  day: string                    // Formatted day name
  hours: string                  // Formatted time range
  isOpen: boolean                // Is currently open
  isActive: boolean              // Is this day configured
}
```

## State Management

### PublicProfileState

React component state for public profile page.

```typescript
interface PublicProfileState {
  profile: PublicProfileFullResponse | null
  isLoading: boolean
  error: string | null
  retryCount: number
}
```

## Validation Rules

### Profile Validation

```typescript
interface ProfileValidationRules {
  name: {
    required: true
    minLength: 2
    maxLength: 100
  }
  slug: {
    required: true
    minLength: 3
    maxLength: 50
    pattern: /^[a-z0-9-]+$/
  }
  phone: {
    required: true
    pattern: /^\+?[1-9]\d{1,14}$/
  }
  bio: {
    maxLength: 500
  }
}
```

### Service Validation

```typescript
interface ServiceValidationRules {
  name: {
    required: true
    minLength: 2
    maxLength: 100
  }
  description: {
    maxLength: 300
  }
  price_from: {
    min: 0
    max: 999999
  }
  price_to: {
    min: 0
    max: 999999
  }
  duration_hours: {
    min: 0.25
    max: 24
  }
}
```

## Error Types

### PublicProfileError

Error types for public profile operations.

```typescript
enum PublicProfileErrorType {
  NOT_FOUND = "NOT_FOUND"
  NETWORK_ERROR = "NETWORK_ERROR"
  VALIDATION_ERROR = "VALIDATION_ERROR"
  SERVER_ERROR = "SERVER_ERROR"
  TIMEOUT = "TIMEOUT"
}

interface PublicProfileError {
  type: PublicProfileErrorType
  message: string
  details?: any
  retryable: boolean
}
```

## API Contracts

### GET /public-profile/{slug}

Request and response contracts for profile fetching.

```typescript
interface GetPublicProfileRequest {
  slug: string
}

interface GetPublicProfileResponse {
  success: boolean
  data: PublicProfileFullResponse
  message?: string
}

interface GetPublicProfileError {
  success: false
  error: PublicProfileError
}
```

## Data Transformations

### Profile Data Transformation

Functions to transform API data for view consumption.

```typescript
interface ProfileTransformers {
  formatPhone: (phone: string) => string
  formatAddress: (address: Address) => string
  formatPriceRange: (from?: number, to?: number) => string
  formatBusinessHours: (hours: BusinessHours[]) => BusinessHoursDisplay[]
  buildWhatsAppUrl: (phone: string, message?: string) => string
  isCurrentlyOpen: (hours: BusinessHours[]) => boolean
}
```

## Type Guards

### Profile Type Guards

Runtime type checking utilities.

```typescript
interface ProfileTypeGuards {
  isPublicProfile: (data: any) => data is PublicProfileFullResponse
  isValidService: (service: any) => service is Service
  isValidBusinessHours: (hours: any) => hours is BusinessHours[]
  hasValidContactInfo: (profile: PublicProfileFullResponse) => boolean
}
```

## Constants

### Display Constants

```typescript
interface DisplayConstants {
  MAX_BIO_LENGTH: 500
  MAX_SERVICE_NAME_LENGTH: 100
  MAX_CUSTOM_LINKS_DISPLAY: 10
  WHATSAPP_BASE_URL: "https://wa.me/"
  DEFAULT_PROFILE_IMAGE: "/images/default-profile.png"
  LOADING_SKELETON_COUNT: 3
}
```
