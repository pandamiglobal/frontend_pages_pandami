import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Análise de Marcas INPI | Proteja sua marca com facilidade",
	description:
		"Ferramenta gratuita para buscar e analisar disponibilidade de marcas no INPI. Proteja sua propriedade intelectual e evite conflitos de marca.",
	openGraph: {
		title: "Análise de Marcas INPI | Proteja sua marca com facilidade",
		description:
			"Ferramenta gratuita para buscar e analisar disponibilidade de marcas no INPI. Proteja sua propriedade intelectual e evite conflitos de marca.",
		images: [{ url: "/images/og-image.jpg" }],
	},
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return <>
    {children}
  </>;
}
