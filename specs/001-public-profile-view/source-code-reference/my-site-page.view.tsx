'use client'

import { Plus } from 'lucide-react'

import { IAddress, IMySitePageModel } from '@/types/IMySite'
import { BrandedButton } from '@/app/_components/molecules/branded-button'
import SubpageLayout from '@/app/_components/templates/subpage-layout'

// Organisms
import { MySiteTabNavigation } from '@/app/_components/organisms/my-site/my-site-tab-navigation/my-site-tab-navigation'
import { SectionCard } from '@/app/_components/organisms/my-site/my-site-page/section-card/section-card'

// Wrappers with Loading States (Next.js 15 best practice)
// @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
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

// Modals
import { AddEditServiceModal } from '@/app/_components/organisms/my-site/modals/add-edit-service-modal/add-edit-service-modal'
import { EditPaymentMethodsModal } from '@/app/_components/organisms/my-site/modals/edit-payment-methods-modal/edit-payment-methods-modal'
import { AddPortfolioImageModal } from '@/app/_components/organisms/my-site/modals/add-portfolio-image-modal/add-portfolio-image-modal'
import { EditBusinessHoursModal } from '@/app/_components/organisms/my-site/modals/edit-business-hours-modal/edit-business-hours-modal'
import { EditAddressModal } from '@/app/_components/organisms/my-site/modals/edit-address-modal/edit-address-modal'
import { AddEditSocialMediaModal } from '@/app/_components/organisms/my-site/modals/add-edit-social-media-modal/add-edit-social-media-modal'
import { AddEditCustomLinkModal } from '@/app/_components/organisms/my-site/modals/add-edit-custom-link-modal/add-edit-custom-link-modal'
import { EditProfileModal } from '@/app/_components/organisms/my-site/modals/edit-profile-modal/edit-profile-modal'
import { EditProfileImageModal } from '@/app/_components/organisms/my-site/modals/edit-profile-image-modal/edit-profile-image-modal'
import { EditPhoneModal } from '@/app/_components/organisms/my-site/modals/edit-phone-modal/edit-phone-modal'
import { EditSlugModal } from '@/app/_components/organisms/my-site/modals/edit-slug-modal/edit-slug-modal'

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

				{/* Modals */}
				<ModalsSection model={model} />
			</div>
		</SubpageLayout>
	)
}

// Modals Section Component
function ModalsSection({ model }: { model: IMySitePageModel }) {
	// Verificação de segurança para garantir que modals existe
	if (!model.modals) {
		return null
	}

	return (
		<>
			<AddEditServiceModal
				isOpen={model.modals.addService}
				onClose={() => model.setModalState('addService', false)}
				onSave={(_service) => {
					// TODO: Implementar save service
					model.setModalState('addService', false)
				}}
			/>

			<AddEditServiceModal
				isOpen={model.modals.editService.isOpen}
				onClose={() => model.setModalState('editService', { isOpen: false, id: null })}
				onSave={(_service) => {
					// TODO: Implementar save service
					model.setModalState('editService', { isOpen: false, id: null })
				}}
				service={model.services.find(s => s.id === model.modals.editService.serviceId)}
			/>

			<EditPaymentMethodsModal
				isOpen={model.modals.editPaymentMethods}
				onClose={() => model.setModalState('editPaymentMethods', false)}
				onSave={(_methods) => {
					// Payment methods are saved via server action and SWR mutation
					model.setModalState('editPaymentMethods', false)
				}}
			/>

			<AddPortfolioImageModal
				isOpen={model.modals.addImage}
				onClose={() => model.setModalState('addImage', false)}
				onSave={(_image) => {
					// TODO: Implementar save image
					model.setModalState('addImage', false)
				}}
			/>

			<EditBusinessHoursModal
				isOpen={model.modals.editBusinessHours}
				onClose={() => model.setModalState('editBusinessHours', false)}
				businessHours={model.businessHours}
				onSave={model.handleSaveBusinessHours}
			/>

			<EditAddressModal
				isOpen={model.modals.editAddress}
				onClose={() => model.setModalState('editAddress', false)}
				onSave={async (address) => {
					try {
						await model.handleSaveAddress(address)
						model.setModalState('editAddress', false)
					} catch (error) {
						// feedback tratado no model
					}
				}}
				address={model.address as unknown as IAddress}
			/>

			<EditPhoneModal
				isOpen={model.modals.editPhone}
				onClose={() => model.setModalState('editPhone', false)}
				onSave={async (phone) => {
					try {
						await model.handleSavePhone(phone)
						model.setModalState('editPhone', false)
					} catch (error) {
						// feedback tratado no model
					}
				}}
				initialPhone={model.phone}
			/>

			<EditSlugModal
				isOpen={model.modals.editSlug}
				onClose={() => model.setModalState('editSlug', false)}
				onSave={async (slug) => {
					try {
						await model.handleSaveSlug(slug)
						model.setModalState('editSlug', false)
					} catch (error) {
						// feedback tratado no model
					}
				}}
				initialSlug={model.slug}
			/>

			<AddEditSocialMediaModal
				isOpen={model.modals.addSocialMedia}
				onClose={() => model.setModalState('addSocialMedia', false)}
				onSave={async (social) => {
					try {
						await model.updateSocialMedia(social)
						model.setModalState('addSocialMedia', false)
					} catch (error) {
						// Error feedback already handled in hook
					}
				}}
			/>

			<AddEditSocialMediaModal
				isOpen={model.modals.editSocialMedia.isOpen}
				onClose={() => model.setModalState('editSocialMedia', { isOpen: false, id: null })}
				onSave={async (social) => {
					try {
						await model.updateSocialMedia(social)
					model.setModalState('editSocialMedia', { isOpen: false, id: null })
					} catch (error) {
						// Error feedback already handled in hook
					}
				}}
				social={model.socialMedia.find(s => s.id === model.modals.editSocialMedia.socialId)}
			/>

			<AddEditCustomLinkModal
				isOpen={model.modals.addCustomLink}
				onClose={() => model.setModalState('addCustomLink', false)}
				onSave={async (link) => {
					try {
						await model.updateCustomLink(link)
						model.setModalState('addCustomLink', false)
					} catch (error) {
						// Error feedback already handled in hook
					}
				}}
			/>

			<EditProfileModal
				isOpen={model.modals.editProfile}
				onClose={() => model.setModalState('editProfile', false)}
				onSave={model.handleSaveProfile}
				initialData={{
					name: model.name,
					bio: model.bio
				}}
			/>

			<EditProfileImageModal
				isOpen={model.modals.editProfileImage}
				onClose={() => model.setModalState('editProfileImage', false)}
			/>

		</>
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

// Services Tab Component
// Using wrapper components for streaming loading states (Next.js 15 best practice)
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

			{/* Portfolio Section */}
			<PortfolioGalleryWrapper model={model} />
		</div>
	)
}

// Informations Tab Component
// Using wrapper components for streaming loading states (Next.js 15 best practice)
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

// Settings Tab Component
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