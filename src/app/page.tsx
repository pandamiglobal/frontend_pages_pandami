import { HeroSection } from "@/app/_components/organisms/sections/hero-section";
import { WhyVisagismSection } from "@/app/_components/organisms/sections/why-visagism-section";
import { AboutVisagismSection } from "@/app/_components/organisms/sections/about-visagism-section";
import { SocialProofSection } from "@/app/_components/organisms/sections/social-proof-section";
import FAQSection from "@/app/_components/organisms/sections/faq-section";
import CarouselSection from "@/app/_components/organisms/sections/carousel-section";
import { CtaSection } from "@/app/_components/organisms/sections/cta-section";
import { BenefitsSection } from "@/app/_components/organisms/sections/benefits-section";
import { PricingSection } from "@/app/_components/organisms/sections/pricing-section";
import { BarberTestimonialsSection } from "@/app/_components/organisms/sections/barber-testimonials-section";

import { 
	FAQJsonLd, 
	OrganizationJsonLd, 
	ProductJsonLd, 
	BreadcrumbJsonLd, 
	ReviewJsonLd 
} from "@/app/_components/templates/seo/json-ld";
import { 
	ArticleJsonLd, 
	LocalBusinessJsonLd, 
	WebSiteJsonLd 
} from "@/app/_components/templates/seo/article-json-ld";
import { FAQ_DATA, SITE_CONFIG } from "@/common/constants";
import PageLayout from "@/app/_components/templates/page-layout";
// Removidos imports específicos da seção de benefícios (agora componentizada)

export default function Home() {
	const breadcrumbItems = [
		{ name: "Início", url: SITE_CONFIG.url },
		{ name: "Visagismo com IA", url: `${SITE_CONFIG.url}/#visagismo` }
	];

	return (
		<>
			{/* JSON-LD Structured Data */}
			<WebSiteJsonLd />
			<OrganizationJsonLd />
			<LocalBusinessJsonLd />
			<ProductJsonLd />
			<ArticleJsonLd />
			<FAQJsonLd faq={FAQ_DATA} />
			<BreadcrumbJsonLd items={breadcrumbItems} />
			<ReviewJsonLd />
			<PageLayout>
				<main>
					<HeroSection />
					<WhyVisagismSection />
					<CarouselSection />
					<BenefitsSection />
					<AboutVisagismSection />
					<SocialProofSection />
					<BarberTestimonialsSection />
					<PricingSection />
					<FAQSection faq={FAQ_DATA} />
					<CtaSection />
				</main>
			</PageLayout>
		</>
	);
}
