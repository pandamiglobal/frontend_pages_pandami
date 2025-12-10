export const DEFAULT_SEO = {
	title: "Visagismo com IA | Descubra o melhor visual | PandaMi",
	blog_title: "Blog | PandaMi",
	description:
		"Descubra o melhor visual com visagismo inteligente! Análise em 30 segundos, teste de 7 dias!",
	keywords: "visagismo com IA, Pandami, IA Pandami",
	openGraph: {
		type: "website" as const,
		locale: "pt_BR",
		url: process.env.NEXT_PUBLIC_SITE_URL,
		title: "Visagismo com IA | Descubra o melhor visual | PandaMi",
		description:
			"Descubra o melhor visual com visagismo inteligente! Análise em 30 segundos, teste de 7 dias!",
		siteName: "PandaMi",
		images: [
			{
				url: `${process.env.NEXT_PUBLIC_SITE_URL}/lp/images/hero/hero-main.png`,
				width: 1200,
				height: 630,
				alt: "Visagismo com IA - Descubra o melhor visual com PandaMi",
			},
		],
	},
	twitter: {
		card: "summary_large_image" as const,
		title: "PandaMi | Visagismo com IA",
		description:
			"Descubra o melhor visual com visagismo inteligente! Análise em 30 segundos, teste de 7 dias!",
		images: [
			`${process.env.NEXT_PUBLIC_SITE_URL}/lp/images/hero/hero-main.png`,
		],
	},
	alternates: {
		canonical: process.env.NEXT_PUBLIC_SITE_URL,
	},
}
