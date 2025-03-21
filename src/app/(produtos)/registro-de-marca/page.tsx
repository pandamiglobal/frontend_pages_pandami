"use client"

import BenefitsSection from "@/components/(lp)/benefits-section"
import BrandHero from "@/components/(lp)/brand-hero"
import BusinessTypesSection from "@/components/(lp)/business-types-section"
import CompaniesSectionBrand from "@/components/(lp)/companies-section-brand"
import FAQSection from "@/components/(lp)/faq-section"
import Footer from "@/components/(lp)/footer"
import { TestimonialsSliderSection } from "@/components/(lp)/testimonials-slider-section"
import TrademarkRegistration from "@/components/(lp)/trademark-registration"
import TrademarkRegistrationTable from "@/components/table/trademark-registration-table"

export default function RegistroMarcaPage() {
  const benefitsData = {
    heading: "Por que escolher a 3Pi para seguir com seu registro?",
    benefits: [
      {
        title: "Seu pedido pronto em 24h",
        subtitle: "Somos a maior empresa de registro de marcas do Brasil",
        description:
          "<p>Com nosso ecossistema inteligente, você garante que sua marca esteja em conformidade legal evitando futuros problemas legais e aumentando a credibilidade da sua marca.</p>",
        imagePosition: "right" as const,
        image: {
          src: '/lp/images/thumb1.svg',
          alt: 'Seu pedido pronto em 24h'
        }
      },
      {
        title: "Não fazemos só o registro",
        description:
          "<p>Antes de registrar sua marca, nossa equipe disponibiliza um consultor especializado para tirar todas as suas dúvidas.<br><br> Realizamos uma análise detalhada da sua logo, nome da marca e fornecemos orientações personalizadas para adaptar o nome às diretrizes e normas ISO, garantindo que sua marca esteja totalmente em conformidade com os requisitos legais e pronta para ser registrada com segurança.</p>",
        imagePosition: "left" as const,
        image: {
          src: '/lp/images/thumb2.svg',
          alt: 'Não fazemos só o registro'
        }
      },
      {
        title: "Evite surpresas inesperadas",
        description:
          "<p>Somos a <strong>ÚNICA EMPRESA DO BRASIL</strong> que além do registro de marcas oferece o serviço de monitoria de marcas.<br><br> Na prática, registrar sua marca é apenas o pontapé inicial. <br><br>Nossa tecnologia acompanha cada ação dentro do INPI, protegendo seu pedido contra ataques de piratas digitais e <b>Brand Hijacking</b>, evitando dores de cabeça futuras.</p>",
        imagePosition: "right" as const,
        image: {
          src: '/lp/images/thumb3.svg',
          alt: 'Evite surpresas inesperadas'
        }
      },
      {
        title: "Receba um certificado de registro",
        description:
          "<p>Com a emissão desse certificado, comprovamos legalmente o uso exclusivo da sua marca, garantindo que ninguém poderá utilizá-la durante o período de proteção, assegurando seus direitos de forma formal e irrestrita.</p>",
        imagePosition: "left" as const,
        image: {
          src: '/lp/images/receba-um-certificado-de-registro.png',
          alt: 'Receba um certificado de registro'
        }
      },
    ],
    ctaText: "QUERO REGISTRAR MINHA MARCA",
    ctaAction: () => console.log("CTA clicked"),
  }

  return (
    <>
      <main className="min-h-screen bg-white">
        <BrandHero />
        <BenefitsSection
          heading={benefitsData.heading}
          benefits={benefitsData.benefits}
          ctaText={benefitsData.ctaText}
          ctaAction={benefitsData.ctaAction}
        />
        <BusinessTypesSection />
        <TestimonialsSliderSection />
        <CompaniesSectionBrand />
        <TrademarkRegistrationTable />
        <FAQSection />
      </main>
    </>
  )
}
