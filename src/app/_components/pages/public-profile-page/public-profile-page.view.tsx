"use client";

import {
	IPublicProfileFullResponse,
	PublicProfileApiError,
	UsePublicProfileViewModelReturn,
} from "@/common/types/IPublicProfile";
import { ProfileHeaderWrapper } from "../../organisms/public-profile/wrappers/profile-header-wrapper";
import { ServicesSectionWrapper } from "../../organisms/public-profile/wrappers/services-section-wrapper";
import { InformationSectionWrapper } from "../../organisms/public-profile/wrappers/information-section-wrapper";
import { PrimaryButton } from "../../molecules/primary-button";
import { Phone } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

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
	isLoading,
	error,
	viewModel,
}: PublicProfilePageViewProps) {
	// Handle error states
	if (error) {
		return (
			<div className="container mx-auto px-4 py-8">
				<div className="max-w-4xl mx-auto">
					<div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
						<h2 className="text-xl font-semibold text-red-800 mb-2">
							Erro ao carregar perfil
						</h2>
						<p className="text-red-600">
							{error?.message || "Ocorreu um erro ao carregar o perfil."}
						</p>
					</div>
				</div>
			</div>
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
								className="h-6 lg:h-8 w-auto"
							/>
						</Link>
					</div>
				</div>
			</header>
			<main className="container mx-auto px-4 py-20 pb-32">
				<div className="max-w-4xl mx-auto space-y-6">
					{/* Profile Header Section */}
					{profile && (
						<ProfileHeaderWrapper profile={profile} viewModel={viewModel} />
					)}

					{/* Services Section */}
					{profile && viewModel.hasServices && (
						<ServicesSectionWrapper profile={profile} viewModel={viewModel} />
					)}

					{/* Information Section (Business Hours, Contact, Address, Payment Methods) */}
					{profile && (
						<InformationSectionWrapper
							profile={profile}
							viewModel={viewModel}
						/>
					)}
				</div>
			</main>
			{/* Action Buttons Footer */}
			{profile && (
				<footer className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
					<div className="container mx-auto py-4">
						<div className="max-w-4xl mx-auto flex items-center justify-center gap-3">
							{/* Call Button */}
							{profile.show_phone && profile.phone && (
								<PrimaryButton
									href={`tel:${profile.phone.replace(/\D/g, '')}`}
									className="h-12 px-6 bg-neutral-800 hover:bg-neutral-900 text-white rounded-xl flex items-center gap-2 transition-colors"
								>
									<Phone className="w-5 h-5" />
									<span className="font-medium">Ligar</span>
								</PrimaryButton>
							)}

							{/* WhatsApp Button */}
							{viewModel.canContactViaWhatsApp && (
								<PrimaryButton
									href={viewModel.whatsappUrl}
									className="h-12 px-6 bg-green-500 hover:bg-green-600 text-white rounded-xl flex items-center gap-2 transition-colors"
								>
									<Image
										src="/svg/whatsapp-icon.svg"
										alt="WhatsApp"
										width={20}
										height={20}
										className="w-5 h-5"
									/>
									<span className="font-medium">
										<span className="hidden sm:inline">Agendar no </span>WhatsApp
									</span>
								</PrimaryButton>
							)}
						</div>
					</div>
				</footer>
			)}
		</>
	);
}
