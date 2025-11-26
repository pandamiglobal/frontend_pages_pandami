"use client";

import { ThemeProvider } from "@/app/providers";
import { Header } from "@/app/_components/organisms/navigations-bars/header";
import { Footer } from "@/app/_components/organisms/navigations-bars/footer";
import { Modal } from "@/app/_components/molecules/modal";
import { CookiesModal } from "@/app/_components/organisms/consent-cookies-modal/cookies-modal";
import { SeoConfig } from "@/app/_components/templates/seo/json-ld";

interface PageLayoutProps {
	children: React.ReactNode;
	headerVariant?: "default" | "logo-only" | "hidden";
	hideFooter?: boolean;
}

export default function PageLayout({
	children,
	headerVariant = "default",
	hideFooter = false,
}: PageLayoutProps) {
	
	return (
		<>
			<SeoConfig />
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<Header variant={headerVariant} />
				<main role="main">{children}</main>
				{!hideFooter && <Footer />}
				<Modal />
				<CookiesModal />
			</ThemeProvider>
		</>
	);
}
