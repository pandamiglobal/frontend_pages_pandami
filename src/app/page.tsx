import dynamic from "next/dynamic";
import { HeroSection } from "@/app/_components/organisms/sections/hero-section";
import { WhyVisagismSection } from "@/app/_components/organisms/sections/why-visagism-section";
import { BenefitsSection } from "@/app/_components/organisms/sections/benefits-section";
import { CtaSection } from "@/app/_components/organisms/sections/cta-section";
import { FeaturesPandami } from "@/app/_components/organisms/sections/features-pandami";
import { BarberTestimonialsSection } from "@/app/_components/organisms/sections/barber-testimonials-section";
import { PricingSection } from "@/app/_components/organisms/sections/pricing-section";
import { B2CPricingSection } from "@/app/_components/organisms/sections/b2c-pricing-section";
import FAQSection from "@/app/_components/organisms/sections/faq-section";
import { FAQ_DATA } from "@/common/constants";
import PageLayout from "@/app/_components/templates/page-layout";
import { SectionSkeleton } from "@/app/_components/atoms/ui/section-skeleton";

// ============================================================================
// Dynamic Imports - Only for GSAP-heavy and complex interaction sections
// ============================================================================

// GSAP-heavy carousel with many images
const CarouselSection = dynamic(
	() => import("@/app/_components/organisms/sections/carousel-section"),
	{
		loading: () => <SectionSkeleton variant="carousel" height="h-80" />,
	}
);

// GSAP animations + image comparison slider
const AboutVisagismSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/about-visagism-section").then(
			(mod) => mod.AboutVisagismSection
		),
	{
		loading: () => <SectionSkeleton variant="default" height="h-[600px]" />,
	}
);

// GSAP animations + testimonial carousel
const SocialProofSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/social-proof-section").then(
			(mod) => mod.SocialProofSection
		),
	{
		loading: () => <SectionSkeleton variant="testimonials" height="h-[500px]" />,
	}
);

// External video player (Vturb) - wrapped in client component
const LazyVideoCtaSection = dynamic(
	() => import("@/app/_components/organisms/sections/lazy-video-cta-section"),
	{
		loading: () => <SectionSkeleton variant="video" height="h-[500px]" />,
	}
);

export default function Home() {
	return (
		<PageLayout>
			{/* Above-the-fold: Static imports for fast LCP */}
			<HeroSection />
			<WhyVisagismSection />

			{/* Dynamic: GSAP carousel with many images */}
			<CarouselSection />

			{/* Static: Simple content sections */}
			<BenefitsSection />
			<FeaturesPandami />

			{/* Dynamic: GSAP + image comparison */}
			<AboutVisagismSection />
			<SocialProofSection />

			{/* Static: Text-heavy sections */}
			<BarberTestimonialsSection />
			<PricingSection />
			<B2CPricingSection />

			{/* Dynamic: External video player */}
			<LazyVideoCtaSection />

			{/* Static: FAQ accordion */}
			<FAQSection faq={FAQ_DATA} />
			<CtaSection />
		</PageLayout>
	);
}
