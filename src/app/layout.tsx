import type React from "react";
import "./globals.css";
import { Ubuntu, Fahkwang } from "next/font/google";

import { Metadata } from "next";

import { DEFAULT_SEO } from "@/common/constants/default-seo";
import Analytics from "@/app/_components/molecules/analytics";


const ubuntu = Ubuntu({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-ubuntu",
	display: "swap",
});

const fahkwang = Fahkwang({
	subsets: ["latin"],
	weight: ["300", "400", "500", "700"],
	variable: "--font-fahkwang",
	display: "swap",
});

const siteUrl =
	process.env.NEXT_PUBLIC_SITE_URL ||
	process.env.SITE_URL ||
	(process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "") ||
	"http://localhost:3000";

export const metadata: Metadata = {
	metadataBase: new URL(siteUrl),
	title: DEFAULT_SEO.title,
	description: DEFAULT_SEO.description,
	keywords: DEFAULT_SEO.keywords,
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large" as const,
			"max-snippet": -1,
		},
	},
	openGraph: DEFAULT_SEO.openGraph,
	twitter: DEFAULT_SEO.twitter,
	alternates: DEFAULT_SEO.alternates,
	authors: [{ name: "PandaMi" }],
	creator: "PandaMi",
	publisher: "PandaMi",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	verification: {
		google: process.env.GOOGLE_SITE_VERIFICATION,
	},
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html
			lang="pt-BR"
			suppressHydrationWarning
			className={`${ubuntu.variable} ${fahkwang.variable}`}
		>
			<head>
				{/* Bing Webmaster Tool */}
				<meta name="msvalidate.01" content="8A95AB149BD17EA6C91FC94BE3387B48" />
			</head>
			<body className={`font-sans`}>
				<Analytics />
			
				{children}
			</body>
		</html>
	);
}
