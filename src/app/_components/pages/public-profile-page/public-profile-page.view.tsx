"use client";

import { useState } from "react";
import {
	IPublicProfileFullResponse,
	PublicProfileApiError,
	UsePublicProfileViewModelReturn,
} from "@/common/types/IPublicProfile";
import { ProfileHeaderWrapper } from "../../organisms/public-profile/wrappers/profile-header-wrapper";
import { PrimaryButton } from "../../molecules/branded-button";
import { Phone, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { PublicProfileErrorState } from "./public-profile-error-state";
import { ServicesSectionWrapper } from "../../organisms/public-profile/wrappers/services-section-wrapper";
import { InformationSectionWrapper } from "../../organisms/public-profile/wrappers/information-section-wrapper";
import { WhatsAppScheduleModal } from "../../organisms/public-profile/whatsapp-schedule-modal/whatsapp-schedule-modal";

interface PublicProfilePageViewProps {
	profile: IPublicProfileFullResponse | null;
	isLoading: boolean;
	error: PublicProfileApiError | Error | null;
	viewModel: UsePublicProfileViewModelReturn;
}

/**
 * Main client view component for public profile page
 * Reuses SaaS MySitePageView card layout patterns but rendered as single-page layout
 * No tab navigation, all sections/cards stacked on same page, no editing/settings UI
 */
export function PublicProfilePageView({
	profile,
	error,
	viewModel,
}: PublicProfilePageViewProps) {
	const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);

	// Helper to render action buttons (Call & WhatsApp)
	// Used in both Desktop Header and Mobile Footer
	const renderActionButtons = (isDesktop: boolean = false) => {
		if (!profile) return null;

		return (
			<div className={cn("flex items-center gap-2", isDesktop ? "flex-col w-full gap-3" : "justify-center w-full max-w-4xl mx-auto")}>
				{/* Call Button */}
				{profile.phone && (
					<PrimaryButton
						href={`tel:${profile.phone}`}
						variant="custom"
						className={cn(
							"h-12 px-4 md:px-6 bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl flex items-center gap-2 transition-colors",
							isDesktop ? "w-full justify-center" : ""
						)}
					>
						<Phone className="size-4 md:size-5" />
						<span className="font-medium">Ligar</span>
					</PrimaryButton>
				)}

				{/* WhatsApp Button */}
				{viewModel.whatsappUrl && (
					<PrimaryButton
						onClick={() => setIsWhatsAppModalOpen(true)}
						variant="custom"
						className={cn(
							"h-12 px-2 md:px-6 bg-green-600 hover:bg-green-500 text-white rounded-xl flex items-center gap-2 transition-colors",
							isDesktop ? "w-full justify-center" : "w-full"
						)}
					>
						<Image
							src="/svg/whatsapp-icon.svg"
							alt="WhatsApp"
							width={20}
							height={20}
							className="size-4 md:size-5"
						/>
						<span className="font-medium">Falar no WhatsApp</span>
					</PrimaryButton>
				)}
			</div>
		);
	};

	// Handle error states
	if (error) {
		const isNotFound = (error instanceof PublicProfileApiError && error.type === "NOT_FOUND") ||
			(error instanceof Error && (error.message.includes('NOT_FOUND') || error.message === 'Perfil não encontrado'));

		return (
			<PublicProfileErrorState
				type={isNotFound ? "not_found" : "generic_error"}
				message={isNotFound ? undefined : error.message}
			/>
		);
	}

	return (
		<>
			{/* Simplified header with logo */}
			<header className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
				<div className="mx-auto px-4 py-4">
					<div className="flex items-center justify-center">
						<Link href="/" className="flex items-center">
							<Image
								src="/logo.svg"
								alt="Pandami Logo"
								width={160}
								height={24}
								className="w-[120px] lg:w-[160px] h-auto"
								style={{ height: 'auto' }}
								priority
							/>
						</Link>
					</div>
				</div>
			</header>

			<main className="container mx-auto px-4 py-20 pb-32 md:pb-20">
				<div className="max-w-4xl mx-auto space-y-6">
					{/* Profile Header Section */}
					{profile && (
						<ProfileHeaderWrapper
							profile={profile}
							viewModel={viewModel}
							actions={renderActionButtons(true)}
						/>
					)}

					{/* Services Section */}
					{profile && (
						<ServicesSectionWrapper profile={profile} viewModel={viewModel} />
					)}

					{/* Information Section (Business Hours, Contact, Address, Payment Methods) */}
					{profile && (
						<InformationSectionWrapper
							profile={profile}
							viewModel={viewModel}
						/>
					)}

					{/* Branding Footer */}
					<div className="pt-8 pb-4 flex flex-col items-center justify-center text-center space-y-4">
						<div className="flex flex-col items-center gap-2">
							<span className="text-sm text-neutral-500">feito com</span>
							<Link href="/" className="hover:opacity-80 transition-opacity">
								<Image
									src="/logo.svg"
									alt="Pandami"
									width={120}
									height={32}
									className="h-8 w-auto text-neutral-900"
									style={{ width: 'auto' }}
								/>
							</Link>
						</div>

						<div className="w-full max-w-sm space-y-4 pt-2">
							<PrimaryButton 
									href="/" 
									className="w-full justify-center bg-neutral-900 hover:bg-neutral-800 text-white h-12 text-base"
								>
									Descobrir cortes de cabelo agora
								</PrimaryButton>

							<Link
								href="/ferramenta-que-aumenta-o-faturamento-dos-saloes"
								className="block text-sm font-medium text-neutral-600 hover:text-neutral-900 underline underline-offset-4 transition-colors"
							>
								Torne-se um profissional Pandami
							</Link>
						</div>
					</div>
				</div>
			</main>

			{/*  Buttons Footer - Mobile Only */}
			{profile && (
				<footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 px-4 md:hidden">
					<div className="mx-auto py-4">
						{renderActionButtons(false)}
					</div>
				</footer>
			)}

			{/* WhatsApp Schedule Modal */}
			{profile && viewModel.whatsappUrl && (
				<WhatsAppScheduleModal
					isOpen={isWhatsAppModalOpen}
					onClose={() => setIsWhatsAppModalOpen(false)}
					whatsappLink={profile.whatsapp_link || ""}
					profileName={profile.name}
				/>
			)}
		</>
	);
}
