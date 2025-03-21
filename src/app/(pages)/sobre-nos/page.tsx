import TabsSection from "@/components/(pages)/sobre-nos/Tabs";
import Statistics from "@/components/(pages)/sobre-nos/Statistics";
import CTASection from "@/components/(pages)/sobre-nos/CTA-section";
import Hero from "@/components/(pages)/sobre-nos/Hero";

export default function SobreNosPage() {
    return (
        <main>
            <Hero />
            <TabsSection />
            <Statistics />
            <CTASection />
        </main>
    )
}