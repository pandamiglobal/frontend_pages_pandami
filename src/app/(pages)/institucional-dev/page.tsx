import BenefitsSection from "@/components/sections/lp-dev/benefits-section";
import CTASection from "@/components/sections/lp-dev/cta-section";
import HeroSection from "@/components/sections/lp-dev/hero-section";
import RisksSection from "@/components/sections/lp-dev/risks-section";
import StoriesSection from "@/components/sections/lp-dev/stories-section";

export default function InstitucionalPage() {
    return (
        <main
            data-no-header
            data-no-footer
            className="h-screen overflow-y-auto snap-y snap-mandatory"
        >
            <HeroSection />
            <RisksSection />
            <BenefitsSection />
            <StoriesSection />
            <CTASection />
        </main>
    );
}