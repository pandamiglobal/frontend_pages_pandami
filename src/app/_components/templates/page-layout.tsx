"use client";

import { ThemeProvider } from "@/app/providers";
import { Header } from "@/app/_components/organisms/header";
import { Footer } from "@/app/_components/organisms/footer";
import { Modal } from "@/app/_components/organisms/modal";
import { CookiesModal } from "@/app/_components/organisms/cookies-modal";

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
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<Header variant={headerVariant} />
				{children}
				{!hideFooter && <Footer />}
				<Modal />
				<CookiesModal />
			</ThemeProvider>
		</>
	);
}
