'use client'

import { ThemeProvider } from "@/app/(public)/providers";
import { Header } from "@/app/_components/organisms/header";
import { Footer } from "@/app/_components/organisms/footer";
import { Modal } from "@/app/_components/organisms/modal";
import { CookiesModal } from "@/app/_components/organisms/cookies-modal";

export default function PageLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<>
			<ThemeProvider
				attribute="class"
				defaultTheme="light"
				enableSystem
				disableTransitionOnChange
			>
				<Header />
				{children}
				<Footer />
				<Modal />
				<CookiesModal />
			</ThemeProvider>
		</>
	);
}
