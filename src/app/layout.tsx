import type React from "react"
import "./globals.css"
import { Space_Grotesk } from "next/font/google"
import { ThemeProvider } from "@/app/providers"
import Footer from "@/components/footer"
import { Header } from "@/components/header"

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
})

export const metadata = {
  title: "PPPI",
  description: "PPPI - Plataforma de Produtos e Ferramentas",
  generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} font-sans`}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem disableTransitionOnChange>
          <Header />
          {children}
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
