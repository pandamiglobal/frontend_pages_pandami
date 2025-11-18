# Código Fonte Extraído do Módulo SaaS

**Fonte**: `pandamiglobal/frontend_pandami-saas` via MCP GitHub  
**Data**: 2025-11-17  
**Propósito**: Referência para implementação do perfil público

## 1. Hook Principal - my-site-page.model.ts

```typescript
'use client'

import { useMemo, useState, useCallback, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useMySiteProfile } from '@/hooks/my-site/use-my-site-profile'
import { useMySiteServices } from '@/hooks/my-site/use-my-site-services'
import { useMySitePaymentMethods } from '@/hooks/my-site/use-my-site-payment-methods'
import { useMySiteGallery } from '@/hooks/my-site/use-my-site-gallery'
import { useMySiteBusinessHours } from '@/hooks/my-site/use-my-site-business-hours'
import { useMySiteSocialMedia } from '@/hooks/my-site/use-my-site-social-media'
import { useMySiteCustomLinks } from '@/hooks/my-site/use-my-site-custom-links'
import { useMySitePhone } from '@/hooks/my-site/use-my-site-phone'
import { useModalState } from '@/hooks/my-site/use-modal-state'
import { UpdatePublicProfileAction } from '@/server/actions/my-site-public-profile/update-public-profile.action'
import { CreateFileAction } from '@/server/actions/create-file.action'
import { AttachAvatarAction } from '@/server/actions/my-site-public-profile/avatar.action'
import { buildProfileUpdatePayload } from '@/lib/utils/transform-profile-data'
import { validateAndSanitizeSlug } from '@/lib/utils/validate-slug'
import { useSWRConfig } from 'swr'
import { MY_SITE_KEYS } from '@/lib/constants/swr-keys'
import type { IBusinessHours, IMySitePageModel, MySiteTab } from '@/types/IMySite'
import { toast } from 'react-hot-toast'
import logger from '@/lib/utils/logger'

/**
 * GenerateGoogleMapsLink
 * Builds a Google Maps search URL from address parts provided by SWR profile data
 * Example format: https://www.google.com/maps/search/?api=1&query=01001-000,+São+Paulo,+SP
 */
function GenerateGoogleMapsLink(address?: {
  street?: string
  number?: string
  city?: string
  state?: string
  zipCode?: string
  country?: string
}): string {
  if (!address) return ''

  const parts: string[] = []

  // Prefer more specific street+number first if available
  const streetLine = [address.street, address.number].filter(Boolean).join(' ')
  if (streetLine) parts.push(streetLine)

  // Core query parts per requested structure
  if (address.zipCode) parts.push(address.zipCode)
  if (address.city) parts.push(address.city)
  if (address.state) parts.push(address.state)

  // Country is optional; include if present
  if (address.country) parts.push(address.country)

  const query = encodeURIComponent(parts.join(', '))
  return `https://www.google.com/maps/search/?api=1&query=${query}`
}

/**
 * My Site Page Model Hook
 * Manages state and business logic for the my-site page
 * Uses dedicated SWR hooks for each data entity with optimized caching
 * 
 * @param slug - Optional slug for public profile access
 * @returns Complete page model with data and handlers
 */
export function useMySitePage(slug?: string): IMySitePageModel {
  // Determine if page is editable (no slug = authenticated user's page)
  const isEditable = !slug

  // Router for navigation
  const router = useRouter()

  // Tab state
  const [activeTab, setActiveTab] = useState<MySiteTab>('services')

  // Use dedicated SWR hooks for each data entity
  const { profile, isLoading: isLoadingProfile, mutate: mutateProfile } = useMySiteProfile(slug)

  // Redirect if trying to access another user's slug when authenticated
  // This ensures users can only edit their own profile
  useEffect(() => {
    if (!isEditable && profile && slug && profile.slug !== slug) {
      // User is trying to access /my-site/[other-slug] but should be on their own slug
      router.replace(`/my-site`)
    }
  }, [isEditable, profile?.slug, slug, router]) // Dependências específicas e otimizadas
  
  const { services, isLoading: isLoadingServices, deleteService } = useMySiteServices(slug)
  const { paymentMethods, isLoading: isLoadingPaymentMethods } = useMySitePaymentMethods(slug)
  
  // Load gallery only when the page is editable (management view).
  // For public/profile-only views (slug provided), the gallery will not be loaded.
  const shouldLoadGallery = isEditable
  const { images, isLoading: isLoadingGallery, deleteImage } = useMySiteGallery(slug, { enabled: shouldLoadGallery })
  
  const { businessHours, updateBusinessHours } = useMySiteBusinessHours(slug)
  const { socialMedia, updateSocialMedia, deleteSocialMedia } = useMySiteSocialMedia(slug)
  const { customLinks, updateCustomLink, deleteCustomLink } = useMySiteCustomLinks(slug)
  const { phone, updatePhone } = useMySitePhone(slug)

  // SWR global mutate for cache invalidation
  const { mutate } = useSWRConfig()

  // Modal state management with useReducer
  const { modals, setModalState } = useModalState()

  // Memoize profile-derived data com dependências otimizadas
  const profileData = useMemo(() => {
    if (!profile) {
      return {
        name: '',
        slug: '',
        isVerified: false,
        bio: '',
        rating: 0,
        reviewsCount: 0,
        openHours: 'Horários não informados',
        openHoursDetails: undefined,
        isOpen: undefined,
        businessStatus: 'no-hours' as 'no-hours' | 'open' | 'closed',
        location: '',
        locationUrl: '',
        profileImageName: '',
        address: undefined
      }
    }

    // Avatar is served by the /public-profile/avatar endpoint (base64).
    // Do NOT derive avatar from the gallery; keep gallery usage limited to portfolio images.
    const profileImageUrl = ''

    // Get smart opening hours text from transformed business hours
    const todayHour = businessHours.find(h => h.isToday)
    let openHours = 'Horários não informados'
    let openHoursDetails: string | undefined = undefined
    let businessStatus: 'open' | 'closed' | 'no-hours' = 'no-hours'

    if (businessHours.length > 0 && todayHour) {
      openHours = todayHour.day
      if (todayHour.isOpen) {
        openHoursDetails = `${todayHour.openTime} - ${todayHour.closeTime}`
        // Check if currently open based on time
        const now = new Date()
        const currentMinutes = now.getHours() * 60 + now.getMinutes()

        const [startHour, startMinute] = todayHour.openTime.split(':').map(Number)
        const startMinutes = startHour * 60 + startMinute

        const [endHour, endMinute] = todayHour.closeTime.split(':').map(Number)
        const endMinutes = endHour * 60 + endMinute

        businessStatus = (currentMinutes >= startMinutes && currentMinutes <= endMinutes) ? 'open' : 'closed'
      } else {
        openHoursDetails = 'Fechado hoje'
        businessStatus = 'closed'
      }
    } else if (businessHours.length > 0) {
      // Has business hours but today is not configured
      openHours = 'Fechado hoje'
      openHoursDetails = 'Sem horário configurado para hoje'
      businessStatus = 'closed'
    }

    // Build location string with available address parts
    const locationParts = []
    if (profile.street) locationParts.push(profile.street)
    if (profile.city) locationParts.push(profile.city)
    if (profile.state) locationParts.push(profile.state)
    const locationText = locationParts.length > 0 ? locationParts.join(', ') : 'Endereço oculto'

    // Build Google Maps link from SWR-provided address values
    const googleMapsLink = profile.show_address ? GenerateGoogleMapsLink({
      street: profile.street || '',
      number: profile.address_number || '',
      city: profile.city || '',
      state: profile.state || '',
      zipCode: profile.postal_code || '',
      country: 'Brasil'
    }) : ''

    return {
      name: profile.name,
      slug: profile.slug,
      isVerified: false, // TODO: Implement verification
      bio: profile.bio || '',
      rating: 0, // TODO: Implement rating
      reviewsCount: 0, // TODO: Implement reviews
      openHours,
      openHoursDetails,
      businessStatus,
      location: profile.show_address ? locationText : 'Endereço oculto',
      locationUrl: googleMapsLink,
      profileImageName: profile.public_profile_image.file_name || '',
      address: profile.show_address ? {
        street: profile.street || '',
        number: profile.address_number || '',
        complement: '', // Campo não suportado pela API, mas exibido no layout
        neighborhood: '', // Campo não suportado pela API, mas exibido no layout
        city: profile.city,
        state: profile.state,
        cep: profile.postal_code || '',
        country: 'Brasil'
      } : undefined
    }
  }, [profile?.id, profile?.name, profile?.slug, profile?.bio, profile?.street, profile?.city, profile?.state, profile?.address_number, profile?.postal_code, profile?.show_address, businessHours.length]) // Dependências específicas

  // Memoized handlers com dependências otimizadas
  const handleAddService = useCallback(() => {
    setModalState('addService', true)
  }, [setModalState])

  const handleEditService = useCallback((id: string) => {
    setModalState('editService', { isOpen: true, serviceId: id })
  }, [setModalState])

  const handleDeleteService = useCallback(async (id: string) => {
    try {
      await deleteService(id)
    } catch (error) {
      // Error feedback already handled in hook
      throw error
    }
  }, [deleteService])

  const handleEditPaymentMethods = useCallback(() => {
    setModalState('editPaymentMethods', true)
  }, [setModalState])

  const handleAddImage = useCallback(() => {
    setModalState('addImage', true)
  }, [setModalState])

  const handleEditAddress = useCallback(() => {
    setModalState('editAddress', true)
  }, [setModalState])

  const handleEditPhone = useCallback(() => {
    setModalState('editPhone', true)
  }, [setModalState])

  const handleEditSlug = useCallback(() => {
    setModalState('editSlug', true)
  }, [setModalState])

  const handleAddSocialMedia = useCallback(() => {
    setModalState('addSocialMedia', true)
  }, [setModalState])

  const handleEditSocialMedia = useCallback((id: string) => {
    setModalState('editSocialMedia', { isOpen: true, socialId: id })
  }, [setModalState])

  const handleDeleteSocialMedia = useCallback(async (id: string) => {
    if (!isEditable) {
      return
    }

    try {
      // Find the social media item to get the platform
      const socialItem = socialMedia.find(sm => sm.id === id)
      if (!socialItem) {
        toast.error('Rede social não encontrada')
        return
      }

      await deleteSocialMedia(socialItem.platform)
    } catch (error) {
      // Error feedback already handled in hook
      throw error
    }
  }, [isEditable, socialMedia, deleteSocialMedia])

  // Expose a model-level updateSocialMedia that matches IMySitePageModel signature
  const handleUpdateSocialMedia = useCallback(async (socialMediaData: typeof socialMedia[number]) => {
    await updateSocialMedia(socialMediaData)
  }, [updateSocialMedia])

  const handleAddCustomLink = useCallback(() => {
    setModalState('addCustomLink', true)
  }, [setModalState])

  const handleEditCustomLink = useCallback((id: string) => {
    setModalState('editCustomLink', { isOpen: true, linkId: id })
  }, [setModalState])

  const handleDeleteCustomLink = useCallback(async (id: string) => {
    if (!isEditable) {
      return
    }

    try {
      await deleteCustomLink(id)
    } catch (error) {
      // Error feedback already handled in hook
      throw error
    }
  }, [isEditable, deleteCustomLink])

  const handleToggleVisibility = useCallback(async (field: 'showPhone' | 'showAddress' | 'showLinks') => {
    if (!profile) return

    try {
      // Usar a função auxiliar para construir o payload
      const updatedData = buildProfileUpdatePayload(profile, services, {
        showPhone: field === 'showPhone' ? !profile.show_phone : profile.show_phone,
        showAddress: field === 'showAddress' ? !profile.show_address : profile.show_address,
        showLinks: field === 'showLinks' ? !profile.show_links : profile.show_links
      })

      await UpdatePublicProfileAction(updatedData)
      await mutateProfile()
      toast.success('Configurações atualizadas!')
    } catch (error) {
      toast.error('Erro ao atualizar configurações')
    }
  }, [profile, services, mutateProfile])

  const handleEditProfile = useCallback(() => {
    setModalState('editProfile', true)
  }, [setModalState])

  const handleSaveProfileImage = useCallback(async (file: File) => {
    if (!isEditable) return

    // Validar tipo de arquivo (apenas imagens)
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      toast.error('Tipo de arquivo não permitido. Use apenas imagens (JPG, PNG, GIF, WEBP)');
      return;
    }

    // Validar tamanho do arquivo (máximo 5MB)
    const maxSize = 5 * 1024 * 1024; // 5MB em bytes
    if (file.size > maxSize) {
      toast.error('Arquivo muito grande. O tamanho máximo é 5MB');
      return;
    }

    try {
      // Upload conforme documentação: 1) Upload arquivo, 2) Anexar avatar
      // Etapa 1: Upload do arquivo
      const uploadResult = await CreateFileAction(file)

      if ('error' in uploadResult) {
        const errorMessage = uploadResult.message || 'Erro ao fazer upload da imagem'
        logger.error('MySitePage - Erro no upload:', uploadResult)
        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      if (typeof uploadResult.id !== 'number') {
        const errorMessage = 'Erro: ID do arquivo não recebido'
        logger.error('MySitePage - file_id inválido:', uploadResult)
        toast.error(errorMessage)
        throw new Error(errorMessage)
      }

      const fileId = uploadResult.id
      logger.info('MySitePage - Arquivo enviado, file_id:', fileId)

      // Etapa 2: Anexar como avatar (POST /public-profile/avatar com JSON)
      const avatarResult = await AttachAvatarAction({ file_id: fileId })

      if ('gallery_id' in avatarResult && 'file_id' in avatarResult) {
        logger.info('MySitePage - Avatar anexado:', {
          gallery_id: avatarResult.gallery_id,
          file_id: avatarResult.file_id
        })
      } else {
        logger.info('MySitePage - Avatar anexado (sem dados):', avatarResult)
      }

      // Revalidar perfil e galeria para atualizar avatar em todo app
      try {
        await Promise.all([
          mutateProfile(),
          mutate(MY_SITE_KEYS.gallery())
        ])
        logger.info('MySitePage - Cache revalidado')
      } catch (mutateError) {
        logger.error('MySitePage - Erro ao revalidar cache:', mutateError)
      }

      toast.success('Foto de perfil atualizada!')
    } catch (error: any) {
      logger.error('MySitePage - Erro:', error)
      toast.error(error?.message || 'Erro ao atualizar foto de perfil')
      throw error
    }
  }, [isEditable, mutateProfile, mutate])

  const handleSaveProfile = useCallback(async (data: { name: string; bio?: string }) => {
    if (!profile) return

    try {
      // Usar a função auxiliar para construir o payload
      const updatedData = buildProfileUpdatePayload(profile, services, {
        name: data.name,
        bio: data.bio
      })

      await UpdatePublicProfileAction(updatedData)
      await mutateProfile()
      toast.success('Perfil atualizado com sucesso!')
    } catch (error) {
      toast.error('Erro ao atualizar perfil')
      throw error
    }
  }, [profile, services, mutateProfile])

  // Visibility settings
  const visibilitySettings = useMemo(() => ({
    showPhone: profile?.show_phone ?? true,
    showAddress: profile?.show_address ?? true,
    showLinks: profile?.show_links ?? true
  }), [profile])

  // Return complete model
  return {
    // Profile data
    isEditable,
    ...profileData,
    phone,

    // Loading states (following Next.js 15 best practices)
    isLoadingProfile,
    isLoadingServices,
    isLoadingPaymentMethods,
    isLoadingGallery,

    // Tab state
    activeTab,
    setActiveTab,

    // Services
    services,
    handleEditService,
    handleDeleteService,
    handleAddService,

    // Payment methods
    paymentMethods,
    handleEditPaymentMethods,

    // Portfolio
    portfolioImages: images,
    handleDeleteImage,
    handleAddImage,

    // Business Hours
    businessHours,
    handleEditBusinessHours,
    handleSaveBusinessHours,

    // Address
    handleEditAddress,
    handleSaveAddress: async (addressData: {
      street: string
      number: string
      city: string
      state: string
      cep: string
    }) => {
      if (!isEditable || !profile) return

      try {
        // Usar a função auxiliar para construir o payload
        const updatedData = buildProfileUpdatePayload(profile, services, {
          street: addressData.street,
          address_number: addressData.number,
          city: addressData.city,
          state: addressData.state,
          postal_code: addressData.cep.replace(/\D/g, '') // Remove formatação do CEP
        })

        await UpdatePublicProfileAction(updatedData)
        await mutateProfile()
        toast.success('Endereço atualizado com sucesso!')
      } catch (error) {
        toast.error('Erro ao atualizar endereço')
        throw error
      }
    },

    // Phone
    handleEditPhone,
    handleSavePhone: async (newPhone: string) => {
      if (!isEditable) return
      try {
        await updatePhone(newPhone)
      } catch (error) {
        // feedback via hook
        throw error
      }
    },

    // Slug
    handleEditSlug,
    handleSaveSlug: async (newSlug: string) => {
      if (!isEditable || !profile) return

      // Validar e sanitizar o slug
      const { slug: sanitizedSlug, isValid, errorMessage } = validateAndSanitizeSlug(newSlug)

      if (!isValid) {
        toast.error(errorMessage || 'Slug inválido')
        return
      }

      try {
        // Usar a função auxiliar para construir o payload
        const updatedData = buildProfileUpdatePayload(profile, services, {
          slug: sanitizedSlug
        })

        await UpdatePublicProfileAction(updatedData)
        await mutateProfile()
        toast.success('Nome de usuário atualizado com sucesso!')

        // Redirect to new slug URL after success
        router.replace(`/my-site`)
      } catch (error) {
        toast.error('Erro ao atualizar nome de usuário')
        throw error
      }
    },

    // Social Media
    socialMedia,
    handleAddSocialMedia,
    handleEditSocialMedia,
    handleDeleteSocialMedia,
    updateSocialMedia: handleUpdateSocialMedia,

    // Custom Links
    customLinks,
    handleAddCustomLink,
    handleEditCustomLink,
    handleDeleteCustomLink,
    updateCustomLink,

    // Visibility Settings
    visibilitySettings,
    handleToggleVisibility,

    // Modal States
    modals,
    setModalState,

    // Profile edit
    handleEditProfile,
    handleSaveProfile,
    handleSaveProfileImage
  }
}
```

## 2. Wrapper Component - profile-header-wrapper.tsx

```typescript
'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { MySiteProfileHeader } from '@/app/_components/organisms/my-site/my-site-profile-header/my-site-profile-header'
import { MySiteProfileHeaderSkeleton } from '@/app/_components/organisms/my-site/my-site-profile-header/my-site-profile-header-skeleton'

export function ProfileHeaderWrapper({ model }: { model: IMySitePageModel }) {
  if (model.isLoadingProfile) {
    return <MySiteProfileHeaderSkeleton />
  }

  return (
    <MySiteProfileHeader
      name={model.name}
      isVerified={model.isVerified}
      bio={model.bio}
      rating={model.rating}
      reviewsCount={model.reviewsCount}
      openHours={model.openHours}
      openHoursDetails={model.openHoursDetails}
      businessStatus={model.businessStatus}
      location={model.location}
      locationUrl={model.locationUrl}
      profileImageName={model.profileImageName}
      onEditProfile={model.handleEditProfile}
      isEditable={model.isEditable}
      onOpenProfileImageModal={() => model.setModalState('editProfileImage', true)}
    />
  )
}
```

## 3. View Component - my-site-page.view.tsx (Resumo Estrutural)

```typescript
'use client'

import { Plus } from 'lucide-react'
import { IMySitePageModel } from '@/types/IMySite'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import SubpageLayout from '@/app/_components/templates/subpage-layout'

// Organisms
import { MySiteTabNavigation } from '@/app/_components/organisms/my-site/my-site-tab-navigation/my-site-tab-navigation'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'

// Wrappers with Loading States (Next.js 15 best practice)
import { ProfileHeaderWrapper } from './wrappers/profile-header-wrapper'
import { 
  ServicesListWrapper, 
  PaymentMethodsWrapper, 
  PortfolioGalleryWrapper 
} from './wrappers/services-section-wrapper'
import {
  LocationSectionWrapper,
  PhoneSectionWrapper,
  BusinessHoursSectionWrapper,
  SocialMediaSectionWrapper,
  CustomLinksSectionWrapper,
  SlugSectionWrapper
} from './wrappers/information-section-wrapper'

export function MySitePageView(model: IMySitePageModel) {
  return (
    <SubpageLayout
      navbar={true}
      isSubPage={true}
    >
      <div className="flex flex-col min-h-screen bg-background">
        {/* Profile Header with Loading State */}
        <ProfileHeaderWrapper model={model} />

        {/* Tab Navigation + Content */}
        <div className="px-4 py-6 flex flex-col gap-6">
          <MySiteTabNavigation
            activeTab={model.activeTab}
            onTabChange={model.setActiveTab}
          />

          {model.activeTab === 'services' && <ServicesTab model={model} />}
          {model.activeTab === 'information' && <InformationsTab model={model} />}
          {model.activeTab === 'settings' && <SettingsTab model={model} />}
        </div>

        {/* Modals - REMOVER PARA VERSÃO PÚBLICA */}
      </div>
    </SubpageLayout>
  )
}

// Services Tab Component
function ServicesTab({ model }: { model: IMySitePageModel }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Services Section */}
      <div className="flex flex-col gap-4">
        <SectionHeader
          title="Serviços"
          buttonText="Adicionar"
          buttonIcon={<Plus className="w-4 h-4" />}
          onButtonClick={model.handleAddService}
        />

        <div className="flex flex-col gap-4">
          <ServicesListWrapper model={model} />
        </div>
      </div>

      {/* Payment Methods Section */}
      <PaymentMethodsWrapper model={model} />

      {/* Portfolio Section - REMOVER PARA VERSÃO PÚBLICA */}
      <PortfolioGalleryWrapper model={model} />
    </div>
  )
}

// Informations Tab Component
function InformationsTab({ model }: { model: IMySitePageModel }) {
  return (
    <div className="flex flex-col gap-6">
      {/* Slug Section */}
      <SlugSectionWrapper model={model} />

      {/* Location Section */}
      <LocationSectionWrapper model={model} />

      {/* Phone Section */}
      <PhoneSectionWrapper model={model} />

      {/* Business Hours Section */}
      <BusinessHoursSectionWrapper model={model} />

      {/* Social Media Section */}
      <SocialMediaSectionWrapper model={model} />

      {/* Custom Links Section */}
      <CustomLinksSectionWrapper model={model} />
    </div>
  )
}

// Settings Tab Component - REMOVER PARA VERSÃO PÚBLICA
function SettingsTab({ model }: { model: IMySitePageModel }) {
  return (
    <div className="flex flex-col gap-6">
      <SectionCard
        variant="visibility"
        title="Mostrar telefone"
        description="Exibir seu número de telefone no perfil"
        checked={model.visibilitySettings.showPhone}
        onChange={() => model.handleToggleVisibility('showPhone')}
      />

      <SectionCard
        variant="visibility"
        title="Mostrar endereço"
        description="Exibir seu endereço no perfil"
        checked={model.visibilitySettings.showAddress}
        onChange={() => model.handleToggleVisibility('showAddress')}
      />

      <SectionCard
        variant="visibility"
        title="Mostrar meus links"
        description="Exibir seus links personalizados no perfil"
        checked={model.visibilitySettings.showLinks}
        onChange={() => model.handleToggleVisibility('showLinks')}
      />
    </div>
  )
}

// Reusable Section Header Component
function SectionHeader({
  title,
  buttonText,
  buttonIcon,
  onButtonClick
}: {
  title: string
  buttonText: string
  buttonIcon: React.ReactNode
  onButtonClick: () => void
}) {
  return (
    <div className="flex items-center justify-between">
      <h2 className="text-lg font-semibold text-black">{title}</h2>
      <BrandedButton
        variant="outline"
        size="sm"
        icon={buttonIcon}
        iconPosition="left"
        onClick={onButtonClick}
      >
        {buttonText}
      </BrandedButton>
    </div>
  )
}
```

## 4. Tipos - IMySite.ts (Relevantes)

```typescript
export interface IMySitePageModel {
  // Profile data
  isEditable: boolean
  name: string
  slug: string
  isVerified: boolean
  bio: string
  rating: number
  reviewsCount: number
  openHours: string
  openHoursDetails?: string
  businessStatus: 'open' | 'closed' | 'no-hours'
  location: string
  locationUrl: string
  profileImageName: string
  address?: {
    street: string
    number: string
    complement: string
    neighborhood: string
    city: string
    state: string
    cep: string
    country: string
  }
  phone?: string

  // Loading states
  isLoadingProfile: boolean
  isLoadingServices: boolean
  isLoadingPaymentMethods: boolean
  isLoadingGallery: boolean

  // Tab state
  activeTab: MySiteTab
  setActiveTab: (tab: MySiteTab) => void

  // Services
  services: IPublicProfileService[]
  handleEditService: (id: string) => void
  handleDeleteService: (id: string) => Promise<void>
  handleAddService: () => void

  // Payment methods
  paymentMethods: IPublicProfilePaymentMethod[]
  handleEditPaymentMethods: () => void

  // Portfolio
  portfolioImages: IPublicProfileGallery[]
  handleDeleteImage: (id: string) => Promise<void>
  handleAddImage: () => void

  // Business Hours
  businessHours: IBusinessHours[]
  handleEditBusinessHours: () => void
  handleSaveBusinessHours: (hours: IBusinessHours[]) => Promise<void>

  // Address
  handleEditAddress: () => void
  handleSaveAddress: (address: {
    street: string
    number: string
    city: string
    state: string
    cep: string
  }) => Promise<void>

  // Phone
  handleEditPhone: () => void
  handleSavePhone: (newPhone: string) => Promise<void>

  // Slug
  handleEditSlug: () => void
  handleSaveSlug: (newSlug: string) => Promise<void>

  // Social Media
  socialMedia: ISocialMedia[]
  handleAddSocialMedia: () => void
  handleEditSocialMedia: (id: string) => void
  handleDeleteSocialMedia: (id: string) => Promise<void>
  updateSocialMedia: (socialMedia: ISocialMedia) => Promise<void>

  // Custom Links
  customLinks: ICustomLink[]
  handleAddCustomLink: () => void
  handleEditCustomLink: (id: string) => void
  handleDeleteCustomLink: (id: string) => Promise<void>
  updateCustomLink: (link: ICustomLink) => Promise<void>

  // Visibility Settings
  visibilitySettings: {
    showPhone: boolean
    showAddress: boolean
    showLinks: boolean
  }
  handleToggleVisibility: (field: 'showPhone' | 'showAddress' | 'showLinks') => Promise<void>

  // Modal States
  modals: any
  setModalState: (key: string, value: any) => void

  // Profile edit
  handleEditProfile: () => void
  handleSaveProfile: (data: { name: string; bio?: string }) => Promise<void>
  handleSaveProfileImage: (file: File) => Promise<void>
}

export type MySiteTab = 'services' | 'information' | 'settings'
```

## 5. Estrutura de Pastas para Implementação

```
src/app/_components/pages/public-profile/
├── public-profile-page/
│   ├── public-profile-page.view.tsx    # Adaptado do SaaS
│   ├── public-profile-page.model.ts   # Adaptado do SaaS
│   └── wrappers/
│       ├── profile-header-wrapper.tsx
│       ├── services-section-wrapper.tsx
│       └── information-section-wrapper.tsx
└── components/
    ├── profile-header/
    ├── services-list/
    ├── contact-section/
    └── whatsapp-button/
```

## 6. Wrapper Components - Serviços

```typescript
'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
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
```

## 7. Wrapper Components - Informações

```typescript
'use client'

import { IMySitePageModel } from '@/types/IMySite'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import { Plus, Pencil, Trash2, Globe, MapPin, Home, Hash, Building2, Map } from 'lucide-react'
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
```

## 8. Profile Header Component

```typescript
'use client'

import { useRef } from 'react'
import Link from 'next/link'
import { Clock, MapPin, Star, ExternalLink, Pencil, BadgeCheck } from 'lucide-react'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import { MySiteProfileHeaderProps } from './my-site-profile-header.types'
import { UserProfileAvatar } from '@/app/_components/molecules/user-profile-avatar'

export function MySiteProfileHeader({
  name,
  isVerified,
  bio,
  rating,
  reviewsCount,
  openHours,
  openHoursDetails,
  businessStatus,
  location,
  locationUrl,
  profileImageName,
  onEditProfile,
  isEditable = true,
  onChangeProfileImage,
  onOpenProfileImageModal
}: MySiteProfileHeaderProps) {
  const fileInputRef = useRef<HTMLInputElement | null>(null)

  return (
    <header className="bg-neutral-950 px-6 pt-20 pb-6">
      <div className="flex flex-col items-center text-center">
        {/* Avatar with edit overlay */}
        <div className="relative group mb-4">
          <UserProfileAvatar name={name} profileImageName={profileImageName} className="w-24 h-24" />
          {isEditable && (
            <div
              className="absolute inset-0 bg-black/50 rounded-full opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center cursor-pointer"
              onClick={() => onOpenProfileImageModal?.()}
              aria-label="Editar foto de perfil"
            >
              <Pencil className="w-5 h-5 text-white" />
            </div>
          )}
        </div>

        {/* Name with edit button */}
        <div className="flex items-center gap-2 mb-1">
          <h1 className="text-xl font-semibold text-white">{name}</h1>
          {isEditable && (
            <button
              onClick={onEditProfile}
              className="p-1 text-neutral-400 hover:text-white transition-colors"
              aria-label="Editar perfil"
            >
              <Pencil className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Verified badge */}
        {isVerified && (
          <div className="flex items-center gap-1 mb-3">
            <span className="text-sm text-neutral-300">Profissional Verificado</span>
            <BadgeCheck className="w-5 h-5 text-green-500" />
          </div>
        )}

        {/* Bio */}
        {bio && (
          <p className="text-sm text-neutral-300 mb-4 leading-relaxed max-w-[320px]">
            {bio}
          </p>
        )}

        {/* Smart Opening Hours */}
        <div className="flex flex-col items-center gap-1 mb-2">
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-neutral-400" aria-hidden="true" />
            <div className="flex items-center gap-2">
              <span 
                className={`text-sm font-medium ${
                  businessStatus === 'open' 
                    ? 'text-green-400' 
                    : businessStatus === 'closed' 
                    ? 'text-yellow-400'
                    : 'text-red-400'
                }`}
              >
                {openHours}
              </span>
              <div 
                className={`w-2 h-2 rounded-full ${
                  businessStatus === 'open' 
                    ? 'bg-green-500' 
                    : businessStatus === 'closed' 
                    ? 'bg-yellow-500'
                    : 'bg-red-500'
                }`}
                aria-label={
                  businessStatus === 'open' 
                    ? 'Aberto agora' 
                    : businessStatus === 'closed' 
                    ? 'Fechado' 
                    : 'Horários não informados'
                }
              />
            </div>
          </div>
          {openHoursDetails && (
            <time className="text-xs text-neutral-400">
              {openHoursDetails}
            </time>
          )}
        </div>

        {/* Location */}
        <address className="flex items-center gap-2 text-sm text-neutral-300 mb-6 not-italic">
          <MapPin className="w-4 h-4 text-neutral-400" aria-hidden="true" />
          <span>{location}</span>
          {locationUrl && (() => {
            const googleMapsLink = locationUrl
            return (
              <Link 
                href={googleMapsLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-neutral-400 hover:text-neutral-200 transition-colors"
                aria-label="Ver localização no mapa"
              >
                <ExternalLink className="w-4 h-4 text-neutral-400" />
              </Link>
            )
          })()}
        </address>

      </div>
    </header>
  )
}
```

## 9. Profile Header Skeleton (Next.js 15 Loading State)

```typescript
/**
 * My Site Profile Header Skeleton
 * Loading skeleton for profile header following Next.js 15 best practices
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */
export function MySiteProfileHeaderSkeleton() {
  return (
    <header className="bg-neutral-950 px-6 pt-20 pb-6" role="status" aria-label="Carregando perfil...">
      <div className="flex flex-col items-center text-center">
        {/* Avatar skeleton */}
        <div className="relative w-24 h-24 mb-4 rounded-full bg-neutral-800 overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
        </div>

        {/* Name skeleton */}
        <div className="flex items-center gap-2 mb-1">
          <div className="relative h-7 w-40 bg-neutral-800 rounded overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
          </div>
        </div>

        {/* Bio skeleton */}
        <div className="space-y-2 mb-4 w-full max-w-[320px]">
          <div className="relative h-4 bg-neutral-800 rounded overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
          </div>
          <div className="relative h-4 bg-neutral-800 rounded w-3/4 mx-auto overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
          </div>
        </div>

        {/* Open hours skeleton */}
        <div className="flex items-center gap-2 mb-2">
          <div className="w-4 h-4 bg-neutral-800 rounded" />
          <div className="relative h-4 w-32 bg-neutral-800 rounded overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
          </div>
        </div>

        {/* Location skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="w-4 h-4 bg-neutral-800 rounded" />
          <div className="relative h-4 w-40 bg-neutral-800 rounded overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
          </div>
        </div>
      </div>
    </header>
  )
}
```

## 10. Padrões para Adaptar

### Para Hook Público:
- Remover funcionalidades de edição (`isEditable = false`)
- Remover modais e handlers de edição
- Manter apenas data fetching com SWR
- Simplificar para leitura apenas

### Para View Pública:
- Remover botões de edição
- Remover tab de "settings"
- Remover seção de portfolio/gallery
- Manter apenas visualização de dados

### Para Wrapper Components:
- Manter loading states para UX
- Remover handlers de edição
- Simplificar props para apenas exibição

### Para Skeleton Components:
- Manter exatamente como estão (Next.js 15 best practice)
- Usar para loading.tsx da rota pública
- Manter animação shimmer e acessibilidade
