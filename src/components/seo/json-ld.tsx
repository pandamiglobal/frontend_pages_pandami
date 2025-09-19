"use client";

import Script from "next/script";

interface JsonLdProps {
  data: Record<string, any>;
}

export const JsonLd = ({ data }: JsonLdProps) => {
  return (
    <Script
      id="json-ld"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Componente específico para FAQ
interface FAQJsonLdProps {
  faq: Array<{
    question: string;
    answer: string;
  }>;
}

export const FAQJsonLd = ({ faq }: FAQJsonLdProps) => {
  const faqStructuredData = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faq.map((item) => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return <JsonLd data={faqStructuredData} />;
};

// Componente para dados da organização
export const OrganizationJsonLd = () => {
  const organizationData = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "PandaMi",
    "description": "Visagismo com IA ",
    "url": process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
    "logo": `${process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br"}/logo.svg`,
    "sameAs": [
      "https://www.instagram.com/pandami",
      "https://www.facebook.com/pandami",
      "https://www.linkedin.com/company/pandami"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "availableLanguage": "Portuguese"
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "BR"
    }
  };

  return <JsonLd data={organizationData} />;
};

// Componente para produto/serviço
export const ProductJsonLd = () => {
  const productData = {
		"@context": "https://schema.org",
		"@type": "SoftwareApplication",
		name: "PandaMi | Visagismo com IA",
		description:
			"Descubra sua melhor versão com visagismo inteligente! Análise em 30 segundos, teste grátis por 7 dias!",
		url: process.env.NEXT_PUBLIC_SITE_URL || "https://pandami.com.br",
		applicationCategory: "BeautyApplication",
		operatingSystem: "Web Browser",
		offers: {
			"@type": "Offer",
			price: "0",
			priceCurrency: "BRL",
			description: "Teste grátis de 7 dias",
			availability: "https://schema.org/InStock",
		},
		aggregateRating: {
			"@type": "AggregateRating",
			ratingValue: "4.8",
			ratingCount: "2000",
			bestRating: "5",
			worstRating: "1",
		},
		featureList: [
			"Análise de cabelo com IA",
			"Sugestões personalizadas",
			"Compatível com todos os tipos de cabelo",
			"Processamento em 30 segundos",
			"Privacidade garantida",
		],
	};

  return <JsonLd data={productData} />;
};

// Componente para breadcrumbs
export const BreadcrumbJsonLd = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const breadcrumbData = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={breadcrumbData} />;
};

// Componente para reviews/testimonials
export const ReviewJsonLd = () => {
  const reviewData = {
    "@context": "https://schema.org",
    "@type": "Product",
    "name": "PandaMi - Visagismo com IA",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "ratingCount": "2000",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Ana Paula"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Revolucionou meu trabalho como visagista. A IA é incrível!"
      },
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Carlos Mendes"
        },
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "reviewBody": "Resultados surpreendentes em poucos segundos."
      }
    ]
  };

  return <JsonLd data={reviewData} />;
};
