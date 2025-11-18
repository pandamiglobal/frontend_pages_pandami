# API Contracts: Public Profile View Page

**Date**: 2025-11-17  
**Source**: Based on `pandamiglobal/frontend_pandami-saas` API patterns  
**Purpose**: Define API contracts for public profile data fetching

## OpenAPI Specification

### GET /public-profile/{slug}

Fetches a public profile by slug identifier.

```yaml
openapi: 3.0.3
info:
  title: Public Profile API
  version: 1.0.0
  description: API for fetching public professional profiles

paths:
  /public-profile/{slug}:
    get:
      summary: Get public profile by slug
      description: Retrieves a complete public profile including services, hours, and contact information
      operationId: getPublicProfileBySlug
      tags:
        - PublicProfile
      parameters:
        - name: slug
          in: path
          required: true
          schema:
            type: string
            minLength: 3
            maxLength: 50
            pattern: '^[a-z0-9-]+$'
          description: Unique profile identifier
          example: "john-doe-barber"
      responses:
        '200':
          description: Public profile retrieved successfully
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/PublicProfileFullResponse'
              examples:
                success:
                  summary: Successful profile retrieval
                  value:
                    $ref: '#/components/examples/ProfileResponse'
        '404':
          description: Profile not found
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                notFound:
                  summary: Profile not found
                  value:
                    error: "PROFILE_NOT_FOUND"
                    message: "Perfil não encontrado"
        '400':
          description: Invalid slug format
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                invalidSlug:
                  summary: Invalid slug format
                  value:
                    error: "VALIDATION_ERROR"
                    message: "Slug inválido"
        '500':
          description: Internal server error
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/ErrorResponse'
              examples:
                serverError:
                  summary: Server error
                  value:
                    error: "SERVER_ERROR"
                    message: "Erro interno do servidor"

components:
  schemas:
    PublicProfileFullResponse:
      type: object
      required:
        - id
        - user_id
        - name
        - slug
        - phone
        - state
        - city
        - show_phone
        - show_address
        - show_links
        - custom_links
        - services
        - opening_hours
        - payment_methods
        - public_profile_image
        - created_at
        - updated_at
      properties:
        id:
          type: integer
          format: int64
          description: Profile unique identifier
          example: 12345
        user_id:
          type: integer
          format: int64
          description: User account identifier
          example: 67890
        name:
          type: string
          minLength: 2
          maxLength: 100
          description: Professional name
          example: "João Silva"
        slug:
          type: string
          minLength: 3
          maxLength: 50
          pattern: '^[a-z0-9-]+$'
          description: URL-friendly identifier
          example: "joao-silva-cabeleireiro"
        phone:
          type: string
          pattern: '^\+?[1-9]\d{1,14}$'
          description: Contact phone number
          example: "+5511999998888"
        bio:
          type: string
          maxLength: 500
          description: Professional description
          example: "Especialista em cortes masculinos e coloração"
        state:
          type: string
          length: 2
          description: State abbreviation
          example: "SP"
        city:
          type: string
          maxLength: 100
          description: City name
          example: "São Paulo"
        business_name:
          type: string
          maxLength: 100
          description: Business name
          example: "Barbearia do João"
        show_phone:
          type: boolean
          description: Whether to display phone number
          example: true
        show_address:
          type: boolean
          description: Whether to display address
          example: true
        show_links:
          type: boolean
          description: Whether to display custom links
          example: true
        public_profile_image:
          $ref: '#/components/schemas/ProfileImage'
        postal_code:
          type: string
          pattern: '^\d{5}-?\d{3}$'
          description: ZIP/CEP code
          example: "01234-567"
        street:
          type: string
          maxLength: 200
          description: Street name
          example: "Rua das Flores"
        address_number:
          type: string
          maxLength: 20
          description: Street number
          example: "123"
        instagram_link:
          type: string
          format: uri
          description: Instagram profile URL
          example: "https://instagram.com/joaosilva"
        whatsapp_link:
          type: string
          format: uri
          description: WhatsApp contact URL
          example: "https://wa.me/5511999998888"
        tiktok_link:
          type: string
          format: uri
          description: TikTok profile URL
          example: "https://tiktok.com/@joaobarbeiro"
        linkedin_link:
          type: string
          format: uri
          description: LinkedIn profile URL
          example: "https://linkedin.com/in/joaosilva"
        custom_links:
          type: array
          items:
            $ref: '#/components/schemas/CustomLink'
          description: Custom external links
        services:
          type: array
          items:
            $ref: '#/components/schemas/Service'
          description: Services offered
        opening_hours:
          type: array
          items:
            $ref: '#/components/schemas/BusinessHours'
          description: Business operating hours
        payment_methods:
          type: array
          items:
            $ref: '#/components/schemas/PaymentMethod'
          description: Accepted payment methods
        created_at:
          type: string
          format: date-time
          description: Profile creation timestamp
          example: "2025-11-17T10:30:00Z"
        updated_at:
          type: string
          format: date-time
          description: Profile last update timestamp
          example: "2025-11-17T15:45:00Z"

    ProfileImage:
      type: object
      required:
        - file_name
      properties:
        file_name:
          type: string
          description: Profile image filename
          example: "profile_12345.jpg"

    Service:
      type: object
      required:
        - id
        - name
      properties:
        id:
          type: integer
          format: int64
          description: Service unique identifier
          example: 1001
        name:
          type: string
          minLength: 2
          maxLength: 100
          description: Service name
          example: "Corte Masculino"
        description:
          type: string
          maxLength: 300
          description: Service description
          example: "Corte masculino com lavagem e finalização"
        price_from:
          type: number
          format: float
          minimum: 0
          maximum: 999999
          description: Minimum price
          example: 50.00
        price_to:
          type: number
          format: float
          minimum: 0
          maximum: 999999
          description: Maximum price
          example: 80.00
        duration_hours:
          type: number
          format: float
          minimum: 0.25
          maximum: 24
          description: Service duration in hours
          example: 1.5

    BusinessHours:
      type: object
      required:
        - id
        - weekday
        - start_time
        - end_time
        - active
      properties:
        id:
          type: integer
          format: int64
          description: Business hours unique identifier
          example: 2001
        weekday:
          $ref: '#/components/schemas/Weekday'
        start_time:
          type: string
          pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
          description: Opening time
          example: "09:00"
        end_time:
          type: string
          pattern: '^([01]?[0-9]|2[0-3]):[0-5][0-9]$'
          description: Closing time
          example: "18:00"
        active:
          type: boolean
          description: Whether this day is active
          example: true

    Weekday:
      type: string
      enum:
        - MONDAY
        - TUESDAY
        - WEDNESDAY
        - THURSDAY
        - FRIDAY
        - SATURDAY
        - SUNDAY
      description: Day of the week

    PaymentMethod:
      type: object
      required:
        - id
        - method
        - active
      properties:
        id:
          type: integer
          format: int64
          description: Payment method unique identifier
          example: 3001
        method:
          $ref: '#/components/schemas/PaymentMethodType'
        active:
          type: boolean
          description: Whether this payment method is accepted
          example: true

    PaymentMethodType:
      type: string
      enum:
        - CASH
        - CREDIT_CARD
        - DEBIT_CARD
        - PIX
        - BANK_TRANSFER
      description: Payment method type

    CustomLink:
      type: object
      required:
        - id
        - name
        - url
        - active
      properties:
        id:
          type: integer
          format: int64
          description: Custom link unique identifier
          example: 4001
        name:
          type: string
          minLength: 2
          maxLength: 100
          description: Link display name
          example: "Agendamento Online"
        url:
          type: string
          format: uri
          description: Link destination URL
          example: "https://agendamento.joaobarbeiro.com"
        active:
          type: boolean
          description: Whether this link is visible
          example: true

    ErrorResponse:
      type: object
      required:
        - error
        - message
      properties:
        error:
          type: string
          enum:
            - PROFILE_NOT_FOUND
            - VALIDATION_ERROR
            - SERVER_ERROR
            - NETWORK_ERROR
            - TIMEOUT
          description: Error type identifier
        message:
          type: string
          description: Human-readable error message
          example: "Perfil não encontrado"

  examples:
    ProfileResponse:
      value:
        id: 12345
        user_id: 67890
        name: "João Silva"
        slug: "joao-silva-cabeleireiro"
        phone: "+5511999998888"
        bio: "Especialista em cortes masculinos e coloração"
        state: "SP"
        city: "São Paulo"
        business_name: "Barbearia do João"
        show_phone: true
        show_address: true
        show_links: true
        public_profile_image:
          file_name: "profile_12345.jpg"
        postal_code: "01234-567"
        street: "Rua das Flores"
        address_number: "123"
        instagram_link: "https://instagram.com/joaosilva"
        whatsapp_link: "https://wa.me/5511999998888"
        custom_links:
          - id: 4001
            name: "Agendamento Online"
            url: "https://agendamento.joaobarbeiro.com"
            active: true
        services:
          - id: 1001
            name: "Corte Masculino"
            description: "Corte masculino com lavagem e finalização"
            price_from: 50.00
            price_to: 80.00
            duration_hours: 1.5
        opening_hours:
          - id: 2001
            weekday: MONDAY
            start_time: "09:00"
            end_time: "18:00"
            active: true
        payment_methods:
          - id: 3001
            method: CASH
            active: true
          - id: 3002
            method: CREDIT_CARD
            active: true
        created_at: "2025-11-17T10:30:00Z"
        updated_at: "2025-11-17T15:45:00Z"
```

## TypeScript Interfaces

### API Request/Response Types

```typescript
// Request types
interface GetPublicProfileRequest {
  slug: string
}

// Response types
interface GetPublicProfileResponse {
  success: true
  data: IPublicProfileFullResponse
}

interface GetPublicProfileErrorResponse {
  success: false
  error: {
    type: PublicProfileErrorType
    message: string
    details?: any
  }
}

// Union type for all possible responses
type PublicProfileApiResponse = 
  | GetPublicProfileResponse
  | GetPublicProfileErrorResponse
```

### Error Types

```typescript
enum PublicProfileErrorType {
  NOT_FOUND = "NOT_FOUND"
  VALIDATION_ERROR = "VALIDATION_ERROR"
  SERVER_ERROR = "SERVER_ERROR"
  NETWORK_ERROR = "NETWORK_ERROR"
  TIMEOUT = "TIMEOUT"
}

interface PublicProfileApiError {
  type: PublicProfileErrorType
  message: string
  details?: any
  retryable: boolean
}
```

## SWR Configuration

### Hook Configuration

```typescript
interface UsePublicProfileConfig {
  revalidateOnFocus?: boolean
  revalidateOnReconnect?: boolean
  refreshInterval?: number
  errorRetryCount?: number
  errorRetryInterval?: number
  dedupingInterval?: number
}

const defaultConfig: UsePublicProfileConfig = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0, // Manual revalidation only
  errorRetryCount: 3,
  errorRetryInterval: 5000,
  dedupingInterval: 60000, // 1 minute
}
```

### SWR Hook Signature

```typescript
interface UsePublicProfileReturn {
  data: IPublicProfileFullResponse | null
  error: PublicProfileApiError | null
  isLoading: boolean
  isValidating: boolean
  mutate: (
    data?: IPublicProfileFullResponse | Promise<IPublicProfileFullResponse>,
    shouldRevalidate?: boolean
  ) => Promise<IPublicProfileFullResponse | undefined>
}

function usePublicProfile(
  slug: string,
  config?: UsePublicProfileConfig
): UsePublicProfileReturn
```

## Data Transformation Contracts

### Response Transformers

```typescript
interface ProfileDataTransformer {
  transformApiResponse: (
    response: IPublicProfileFullResponse
  ) => PublicProfileViewModel
  
  formatPhone: (phone: string) => string
  formatAddress: (address: Partial<Address>) => string
  formatPriceRange: (from?: number, to?: number) => string
  formatBusinessHours: (hours: IBusinessHours[]) => BusinessHoursDisplay[]
  buildWhatsAppUrl: (phone: string, message?: string) => string
}
```

### Validation Contracts

```typescript
interface ProfileValidation {
  validateSlug: (slug: string) => boolean
  validatePhone: (phone: string) => boolean
  validateApiResponse: (data: any) => data is IPublicProfileFullResponse
}
```

## Integration Contracts

### Server Action Contract

```typescript
// Server action signature (from SaaS module)
interface GetPublicProfileBySlugAction {
  (slug: string): Promise<IPublicProfileFullResponse>
}

// Error handling contract
interface ServerActionError extends Error {
  response?: {
    status: number
    data: any
  }
}
```

### Client-Server Communication

```typescript
interface ApiClient {
  get: <T>(url: string, config?: RequestConfig) => Promise<T>
  post: <T>(url: string, data?: any, config?: RequestConfig) => Promise<T>
  put: <T>(url: string, data?: any, config?: RequestConfig) => Promise<T>
  delete: <T>(url: string, config?: RequestConfig) => Promise<T>
}

interface RequestConfig {
  timeout?: number
  retries?: number
  headers?: Record<string, string>
}
```

## Testing Contracts

### Mock Data Contracts

```typescript
interface MockProfileData {
  validProfile: IPublicProfileFullResponse
  profileWithoutServices: IPublicProfileFullResponse
  profileWithoutHours: IPublicProfileFullResponse
  profileWithInactiveLinks: IPublicProfileFullResponse
}

interface MockApiResponses {
  success200: GetPublicProfileResponse
  notFound404: GetPublicProfileErrorResponse
  validationError400: GetPublicProfileErrorResponse
  serverError500: GetPublicProfileErrorResponse
}
```

### Test Helper Contracts

```typescript
interface ProfileTestHelpers {
  createMockProfile: (overrides?: Partial<IPublicProfileFullResponse>) => IPublicProfileFullResponse
  createMockError: (type: PublicProfileErrorType, message: string) => PublicProfileApiError
  waitForDataLoad: () => Promise<void>
  simulateNetworkError: () => void
}
```

## Performance Contracts

### Caching Strategy

```typescript
interface CacheConfig {
  strategy: 'swr' | 'memory' | 'local'
  ttl: number // Time to live in milliseconds
  maxSize: number // Maximum number of cached profiles
  evictionPolicy: 'lru' | 'fifo' | 'lfu'
}

const profileCacheConfig: CacheConfig = {
  strategy: 'swr',
  ttl: 300000, // 5 minutes
  maxSize: 100,
  evictionPolicy: 'lru',
}
```

### Performance Monitoring

```typescript
interface PerformanceMetrics {
  loadTime: number
  renderTime: number
  apiResponseTime: number
  cacheHitRate: number
  errorRate: number
}

interface PerformanceMonitor {
  trackLoadTime: (startTime: number) => void
  trackApiResponse: (url: string, responseTime: number) => void
  trackCacheHit: (key: string) => void
  trackError: (error: PublicProfileApiError) => void
  getMetrics: () => PerformanceMetrics
}
```
