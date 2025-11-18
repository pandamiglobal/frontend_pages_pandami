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

		console.log(profile.public_profile_image)

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
			// Error handling is already done in the hook
		}
	}, [deleteService])

	const handleEditPaymentMethods = useCallback(() => {
		setModalState('editPaymentMethods', true)
	}, [setModalState])

	const handleAddImage = useCallback(() => {
		setModalState('addImage', true)
	}, [setModalState])

	const handleDeleteImage = useCallback(async (id: string) => {
		try {
			await deleteImage(id)
		} catch (error) {
			// Error handling is already done in the hook
		}
	}, [deleteImage])

	const handleEditBusinessHours = useCallback(() => {
		setModalState('editBusinessHours', true)
	}, [setModalState])

	const handleSaveBusinessHours = useCallback(async (hours: IBusinessHours[]) => {
		if (!isEditable) {
			return
		}

		try {
			await updateBusinessHours(hours)
		} catch (error) {
			// Feedback already handled in hook
			throw error
		}
	}, [isEditable, updateBusinessHours])

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
