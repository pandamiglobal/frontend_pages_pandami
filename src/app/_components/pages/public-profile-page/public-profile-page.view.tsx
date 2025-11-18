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
import { Phone, AlertCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils";

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
	// Helper to render action buttons (Call & WhatsApp)
	// Used in both Desktop Header and Mobile Footer
	const renderActionButtons = (isDesktop: boolean = false) => {
		if (!profile) return null;

		return (
			<div className={cn("flex items-center gap-2", isDesktop ? "flex-col w-full gap-3" : "justify-center w-full max-w-4xl mx-auto")}>
				{/* Call Button */}
				{profile.phone && (
					<PrimaryButton
						href={`tel:${profile.phone.replace(/\D/g, "")}`}
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
						href={viewModel.whatsappUrl}
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
		return (
			<div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4">
				<div className="max-w-md w-full bg-white border border-neutral-200 rounded-2xl p-8 text-center shadow-sm">
					<div className="mx-auto w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mb-4">
						<AlertCircle className="w-6 h-6 text-red-600" />
					</div>
					<h2 className="text-xl font-bold text-neutral-900 mb-2">
						Perfil indisponível
					</h2>
					<p className="text-neutral-600 mb-6">
						{error?.message || "Não foi possível carregar as informações deste perfil. Tente novamente mais tarde."}
					</p>
					<Link href="/">
						<PrimaryButton variant="outline" className="w-full justify-center">
							Voltar para o início
						</PrimaryButton>
					</Link>
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
								className="w-[120px] lg:w-[160px] h-auto"
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
		</>
	);
}
