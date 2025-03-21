'use client'

import BentoGrid from "@/components/(lp)/bento-grid"
import CompaniesSection from "@/components/(lp)/companies-section"
import FAQSection from "@/components/(lp)/faq-section"
import Footer from "@/components/(lp)/footer"
import PricingSection from "@/components/(lp)/pricing-section"
import RandomToast from "@/components/(lp)/random-toast"
import RisksSection from "@/components/(lp)/risks-section"
import TestimonialsSection from "@/components/(lp)/testimonials-section"
import TrademarkRegistration from "@/components/(lp)/trademark-registration"

export default function Page() {
  return (
    <main className="min-h-screen bg-white flex flex-col">
      <div className="flex-grow">
        <TrademarkRegistration />
        <CompaniesSection />
        <RisksSection />
        <TestimonialsSection />
        <BentoGrid />
        <PricingSection />
        <FAQSection />
      </div>
      <Footer />
      <RandomToast />
    </main>
  )
}

