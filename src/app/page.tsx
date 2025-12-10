import dynamic from "next/dynamic";
import { HeroSection } from "@/app/_components/organisms/sections/hero-section";
import { WhyVisagismSection } from "@/app/_components/organisms/sections/why-visagism-section";
import { CtaSection } from "@/app/_components/organisms/sections/cta-section";
import FAQSection from "@/app/_components/organisms/sections/faq-section";
import { FAQ_DATA } from "@/common/constants";
import PageLayout from "@/app/_components/templates/page-layout";
import { SectionSkeleton } from "@/app/_components/atoms/ui/section-skeleton";

// ============================================================================
// Dynamic Imports - Defer below-the-fold sections to reduce initial JS
// ============================================================================

// Framer-motion carousel with many images
const CarouselSection = dynamic(
	() => import("@/app/_components/organisms/sections/carousel-section"),
	{
		loading: () => <SectionSkeleton variant="carousel" height="h-80" />,
	}
);

// Benefits section - below fold
const BenefitsSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/benefits-section").then(
			(mod) => mod.BenefitsSection
		),
	{
		loading: () => <SectionSkeleton variant="default" height="h-[600px]" />,
	}
);

// Features section - below fold
const FeaturesPandami = dynamic(
	() =>
		import("@/app/_components/organisms/sections/features-pandami").then(
			(mod) => mod.FeaturesPandami
		),
	{
		loading: () => <SectionSkeleton variant="default" height="h-[500px]" />,
	}
);

// Framer-motion animations + image comparison slider
const AboutVisagismSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/about-visagism-section").then(
			(mod) => mod.AboutVisagismSection
		),
	{
		loading: () => <SectionSkeleton variant="default" height="h-[600px]" />,
	}
);

// Framer-motion animations + testimonial carousel
const SocialProofSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/social-proof-section").then(
			(mod) => mod.SocialProofSection
		),
	{
		loading: () => <SectionSkeleton variant="testimonials" height="h-[500px]" />,
	}
);

// Testimonials section - below fold
const BarberTestimonialsSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/barber-testimonials-section").then(
			(mod) => mod.BarberTestimonialsSection
		),
	{
		loading: () => <SectionSkeleton variant="testimonials" height="h-[500px]" />,
	}
);

// Pricing sections - below fold
const PricingSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/pricing-section").then(
			(mod) => mod.PricingSection
		),
	{
		loading: () => <SectionSkeleton variant="pricing" height="h-[600px]" />,
	}
);

const B2CPricingSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/b2c-pricing-section").then(
			(mod) => mod.B2CPricingSection
		),
	{
		loading: () => <SectionSkeleton variant="pricing" height="h-[600px]" />,
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

			{/* Below-the-fold: All dynamic imports to reduce initial JS */}
			<CarouselSection />
			<BenefitsSection />
			<FeaturesPandami />
			<AboutVisagismSection />
			<SocialProofSection />
			<BarberTestimonialsSection />
			<PricingSection />
			<B2CPricingSection />
			<LazyVideoCtaSection />

			{/* Static: FAQ and CTA - lightweight */}
			<FAQSection faq={FAQ_DATA} />
			<CtaSection />
		</PageLayout>
	);
}
