import { HeroSection } from "@/app/_components/organisms/sections/hero-section";
import { WhyVisagismSection } from "@/app/_components/organisms/sections/why-visagism-section";
import dynamic from "next/dynamic";

const AboutVisagismSection = dynamic(() => import("@/app/_components/organisms/sections/about-visagism-section").then(mod => mod.AboutVisagismSection));
const SocialProofSection = dynamic(() => import("@/app/_components/organisms/sections/social-proof-section").then(mod => mod.SocialProofSection));
const FAQSection = dynamic(() => import("@/app/_components/organisms/sections/faq-section"));
const CarouselSection = dynamic(() => import("@/app/_components/organisms/sections/carousel-section"));
const CtaSection = dynamic(() => import("@/app/_components/organisms/sections/cta-section").then(mod => mod.CtaSection));
const BenefitsSection = dynamic(() => import("@/app/_components/organisms/sections/benefits-section").then(mod => mod.BenefitsSection));
const PricingSection = dynamic(() => import("@/app/_components/organisms/sections/pricing-section").then(mod => mod.PricingSection));
const BarberTestimonialsSection = dynamic(() => import("@/app/_components/organisms/sections/barber-testimonials-section").then(mod => mod.BarberTestimonialsSection));

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
