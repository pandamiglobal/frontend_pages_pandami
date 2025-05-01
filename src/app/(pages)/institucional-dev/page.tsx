import BenefitsSection from "@/components/sections/lp-dev/benefits-section";
import ComparisonSection from "@/components/sections/lp-dev/comparison-section";
import CTASection from "@/components/sections/lp-dev/cta-section";
import HeroSection from "@/components/sections/lp-dev/hero-section";
import ImpactSection from "@/components/sections/lp-dev/impact-section";
import RisksSection from "@/components/sections/lp-dev/risks-section";
import SolutionsSection from "@/components/sections/lp-dev/solutions-section";
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
            <SolutionsSection />
            <ComparisonSection />
            <ImpactSection />
        </main>
    );
}