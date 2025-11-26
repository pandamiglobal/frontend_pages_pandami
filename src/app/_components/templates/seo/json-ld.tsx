"use client";

import Script from "next/script";
import { JSON_LD_SEO } from "@/common/constants/json-ld-seo";

interface JsonLdProps {
  data: Record<string, unknown>;
  id?: string;
}

export const JsonLd = ({ data, id = "json-ld" }: JsonLdProps) => {
  return (
    <Script
      id={id}
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
};

// Componente específico para FAQ
interface FAQJsonLdProps {
  faq: ReadonlyArray<{
    question: string;
    answer: string;
  }>;
}

export const FAQJsonLd = ({ faq }: FAQJsonLdProps) => {
  // Validação: só renderiza se houver FAQs
  if (!faq || faq.length === 0) {
    return null;
  }

  // Validação adicional: verificar se todos os itens têm question e answer
  const validFaq = faq.filter(item => 
    item.question && 
    item.answer && 
    item.question.trim() !== '' && 
    item.answer.trim() !== ''
  );

  if (validFaq.length === 0) {
    return null;
  }

  const faqStructuredData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "FAQPage",
    "mainEntity": validFaq.map((item) => ({
      "@type": "Question",
      "name": item.question.trim(),
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer.trim()
      }
    }))
  };

  return <JsonLd data={faqStructuredData} id="faq-json-ld" />;
};

// Componente para dados da organização
export const OrganizationJsonLd = () => {
  const organizationData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "Organization",
    "@id": JSON_LD_SEO.IDS.ORGANIZATION,
    "name": JSON_LD_SEO.ORGANIZATION.NAME,
    "description": JSON_LD_SEO.ORGANIZATION.DESCRIPTION,
    "url": JSON_LD_SEO.SITE_URL,
    "logo": {
      "@type": "ImageObject",
      "@id": JSON_LD_SEO.IDS.PRIMARY_LOGO,
      "url": JSON_LD_SEO.ORGANIZATION.LOGO,
      "contentUrl": JSON_LD_SEO.ORGANIZATION.LOGO,
      "width": "512",
      "height": "512",
      "caption": JSON_LD_SEO.ORGANIZATION.NAME
    },
    "sameAs": JSON_LD_SEO.ORGANIZATION.SAME_AS,
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": JSON_LD_SEO.ORGANIZATION.CONTACT.TYPE,
      "availableLanguage": JSON_LD_SEO.ORGANIZATION.CONTACT.LANGUAGE
    },
    "address": {
      "@type": "PostalAddress",
      "addressCountry": JSON_LD_SEO.ORGANIZATION.CONTACT.ADDRESS.COUNTRY
    }
  };

  return <JsonLd data={organizationData} id="organization-json-ld" />;
};

// Componente para produto/serviço
export const ProductJsonLd = () => {
  const productData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "SoftwareApplication",
    name: JSON_LD_SEO.PRODUCT.NAME,
    description: JSON_LD_SEO.PRODUCT.DESCRIPTION,
    url: JSON_LD_SEO.SITE_URL,
    author: {
      "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
    applicationCategory: JSON_LD_SEO.PRODUCT.CATEGORY,
    operatingSystem: JSON_LD_SEO.PRODUCT.OPERATING_SYSTEM,
    offers: {
      "@type": "Offer",
      price: JSON_LD_SEO.PRODUCT.PRICE.AMOUNT,
      priceCurrency: JSON_LD_SEO.PRODUCT.PRICE.CURRENCY,
      description: JSON_LD_SEO.PRODUCT.PRICE.DESCRIPTION,
      availability: "https://schema.org/InStock",
      seller: {
        "@id": JSON_LD_SEO.IDS.ORGANIZATION
      }
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: JSON_LD_SEO.PRODUCT.RATING.VALUE,
      ratingCount: JSON_LD_SEO.PRODUCT.RATING.COUNT,
      bestRating: JSON_LD_SEO.PRODUCT.RATING.BEST,
      worstRating: JSON_LD_SEO.PRODUCT.RATING.WORST,
    },
    featureList: JSON_LD_SEO.PRODUCT.FEATURES,
  };

  return <JsonLd data={productData} id="product-json-ld" />;
};

// Componente para breadcrumbs
export const BreadcrumbJsonLd = ({ items }: { items: Array<{ name: string; url: string }> }) => {
  const breadcrumbData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "BreadcrumbList",
    "itemListElement": items.map((item, index) => ({
      "@type": "ListItem",
      "position": index + 1,
      "name": item.name,
      "item": item.url
    }))
  };

  return <JsonLd data={breadcrumbData} id="breadcrumb-json-ld" />;
};

// Componente para reviews/testimonials
export const ReviewJsonLd = () => {
  const reviewData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "Product",
    "name": JSON_LD_SEO.PRODUCT.NAME,
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": JSON_LD_SEO.PRODUCT.RATING.VALUE,
      "ratingCount": JSON_LD_SEO.PRODUCT.RATING.COUNT,
      "bestRating": JSON_LD_SEO.PRODUCT.RATING.BEST,
      "worstRating": JSON_LD_SEO.PRODUCT.RATING.WORST,
    },
    "review": JSON_LD_SEO.REVIEWS.map(review => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.AUTHOR
      },
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": review.RATING,
        "bestRating": "5"
      },
      "reviewBody": review.BODY
    }))
  };

  return <JsonLd data={reviewData} id="review-json-ld" />;
};

export const ArticleJsonLd = () => {
  const articleData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "Article",
    "headline": JSON_LD_SEO.ARTICLE.HEADLINE,
    "description": JSON_LD_SEO.ARTICLE.DESCRIPTION,
    "image": JSON_LD_SEO.ARTICLE.IMAGES.map(img => `${JSON_LD_SEO.SITE_URL}${img}`),
    "author": {
      "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
    "publisher": {
      "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
    "datePublished": "2024-01-01",
    "dateModified": new Date().toISOString().split('T')[0],
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": JSON_LD_SEO.SITE_URL
    },
    "keywords": JSON_LD_SEO.ARTICLE.KEYWORDS,
    "articleSection": JSON_LD_SEO.ARTICLE.SECTION,
    "wordCount": JSON_LD_SEO.ARTICLE.WORD_COUNT,
    "inLanguage": JSON_LD_SEO.ARTICLE.LANGUAGE
  };

  return <JsonLd data={articleData} id="article-json-ld" />;
};

// Componente para dados estruturados de serviço local
export const LocalBusinessJsonLd = () => {
  const localBusinessData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "LocalBusiness",
    "@id": JSON_LD_SEO.IDS.LOCAL_BUSINESS,
    name: JSON_LD_SEO.ORGANIZATION.NAME,
    description: JSON_LD_SEO.PRODUCT.DESCRIPTION,
    url: JSON_LD_SEO.SITE_URL,
    // Linkando com a Organização principal
    "parentOrganization": {
        "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
    telephone: JSON_LD_SEO.ORGANIZATION.CONTACT.TELEPHONE,
    email: JSON_LD_SEO.ORGANIZATION.CONTACT.EMAIL,
    address: {
      "@type": "PostalAddress",
      "addressCountry": JSON_LD_SEO.ORGANIZATION.CONTACT.ADDRESS.COUNTRY,
      "addressRegion": JSON_LD_SEO.ORGANIZATION.CONTACT.ADDRESS.REGION,
      "addressLocality": JSON_LD_SEO.ORGANIZATION.CONTACT.ADDRESS.LOCALITY,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: JSON_LD_SEO.ORGANIZATION.CONTACT.GEO.LATITUDE,
      longitude: JSON_LD_SEO.ORGANIZATION.CONTACT.GEO.LONGITUDE,
    },
    openingHours: JSON_LD_SEO.LOCAL_BUSINESS.OPENING_HOURS,
    priceRange: JSON_LD_SEO.LOCAL_BUSINESS.PRICE_RANGE,
    paymentAccepted: JSON_LD_SEO.LOCAL_BUSINESS.PAYMENT_ACCEPTED,
    currenciesAccepted: JSON_LD_SEO.LOCAL_BUSINESS.CURRENCIES_ACCEPTED,
    serviceArea: {
      "@type": "Country",
      name: JSON_LD_SEO.LOCAL_BUSINESS.SERVICE_AREA,
    },
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Serviços de Visagismo",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Análise de Visagismo com IA",
            description:
              "Análise personalizada de cabelo usando inteligência artificial",
          },
        },
      ],
    },
  };

  return <JsonLd data={localBusinessData} id="local-business-json-ld" />;
};

// Componente para dados estruturados de WebSite
export const WebSiteJsonLd = () => {
  const webSiteData = {
    "@context": JSON_LD_SEO.CONTEXT,
    "@type": "Website",
    "@id": JSON_LD_SEO.IDS.WEBSITE,
    name: JSON_LD_SEO.ORGANIZATION.NAME,
    alternateName: JSON_LD_SEO.ORGANIZATION.ALTERNATE_NAME,
    url: JSON_LD_SEO.SITE_URL,
    description: JSON_LD_SEO.PRODUCT.DESCRIPTION,
    inLanguage: JSON_LD_SEO.ARTICLE.LANGUAGE,
    copyrightYear: new Date().getFullYear(),
    copyrightHolder: {
      "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${JSON_LD_SEO.SITE_URL}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
    publisher: {
      "@id": JSON_LD_SEO.IDS.ORGANIZATION
    },
  };
  return <JsonLd data={webSiteData} id="website-json-ld" />;
};


interface SeoConfigProps {
  breadcrumbItems?: Array<{ name: string; url: string }>;
}

export const SeoConfig = ({ breadcrumbItems }: SeoConfigProps) => {
  return (
    <>
      <OrganizationJsonLd />
      <ProductJsonLd />
      {breadcrumbItems && <BreadcrumbJsonLd items={breadcrumbItems} />}
      <ReviewJsonLd />
      <ArticleJsonLd />
      <LocalBusinessJsonLd />
      <WebSiteJsonLd />
    </>
  );
};