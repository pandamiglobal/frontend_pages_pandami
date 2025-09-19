import type React from "react"
import "./globals.css"
import { Ubuntu, Fahkwang } from "next/font/google"
import { ThemeProvider } from "@/app/providers"
import Footer from "@/components/footer"
import { Header } from "@/components/header"
import Script from "next/script"
import { Metadata } from "next"
import defaultSeo from "@/common/config/default-seo"
import { Modal } from "@/components/ui/modal/modal"

const ubuntu = Ubuntu({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-ubuntu",
  display: "swap",
})

const fahkwang = Fahkwang({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-fahkwang",
  display: "swap",
})

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : '') ||
  'http://localhost:3000'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultSeo.title,
  description: defaultSeo.description,
  keywords: defaultSeo.keywords,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large' as const,
      'max-snippet': -1,
    },
  },
  openGraph: defaultSeo.openGraph,
  twitter: defaultSeo.twitter,
  alternates: defaultSeo.alternates,
  authors: [{ name: 'PandaMi' }],
  creator: 'PandaMi',
  publisher: 'PandaMi',
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
  children: React.ReactNode
}) {
  return (
		<html
			lang="pt-BR"
			suppressHydrationWarning
			className={`${ubuntu.variable} ${fahkwang.variable}`}
		>
			<head>
				<Script id="microsoft-clarity">
					{`
            (function(c,l,a,r,i,t,y){
              c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
              t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
              y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "tctj766hfq");
          `}
				</Script>
			</head>
			<body className={`font-sans`}>
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
				</ThemeProvider>
			</body>
		</html>
	);
}
