import { HeroSection } from "@/app/_components/organisms/sections/hero-section";
import { WhyVisagismSection } from "@/app/_components/organisms/sections/why-visagism-section";
import { FeaturesPandami } from "@/app/_components/organisms/sections/features-pandami";
import { AboutVisagismSection } from "@/app/_components/organisms/sections/about-visagism-section";
import { SocialProofSection } from "@/app/_components/organisms/sections/social-proof-section";
import FAQSection from "@/app/_components/organisms/sections/faq-section";
import CarouselSection from "@/app/_components/organisms/sections/carousel-section";
import { CtaSection } from "@/app/_components/organisms/sections/cta-section";
import { BenefitsSection } from "@/app/_components/organisms/sections/benefits-section";
import { PricingSection } from "@/app/_components/organisms/sections/pricing-section";
import { BarberTestimonialsSection } from "@/app/_components/organisms/sections/barber-testimonials-section";
import { VideoCtaSection } from "@/app/_components/organisms/sections/video-cta-section";
import { FAQ_DATA } from "@/common/constants";
import PageLayout from "@/app/_components/templates/page-layout";
import { B2CPricingSection } from "./_components/organisms/sections/b2c-pricing-section";

export default function Home() {
	return (
		<>
			{/* JSON-LD Structured Data */}
		

			<PageLayout>
				<HeroSection />
				<WhyVisagismSection />
				<CarouselSection />
				<BenefitsSection />
				<FeaturesPandami />
				<AboutVisagismSection />
				<SocialProofSection />
				<BarberTestimonialsSection />
				<PricingSection />
				<B2CPricingSection />
				<VideoCtaSection />
				<FAQSection faq={FAQ_DATA} />
				<CtaSection />
			</PageLayout>
		</>
	);
}
