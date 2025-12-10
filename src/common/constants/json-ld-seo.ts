import { SITE_CONFIG } from "./index";

export const JSON_LD_SEO = {
  CONTEXT: "https://schema.org",
  SITE_URL: SITE_CONFIG.url,
  // IDs Canônicos para linkagem de entidades (Knowledge Graph)
  IDS: {
    ORGANIZATION: `${SITE_CONFIG.url}/#organization`,
    WEBSITE: `${SITE_CONFIG.url}/#website`,
    LOCAL_BUSINESS: `${SITE_CONFIG.url}/#local-business`,
    PRIMARY_LOGO: `${SITE_CONFIG.url}/#logo`,
  },
  ORGANIZATION: {
    NAME: SITE_CONFIG.name,
    ALTERNATE_NAME: "PandaMi Visagismo",
    DESCRIPTION: "Visagismo com IA ",
    LOGO: `${SITE_CONFIG.url}${SITE_CONFIG.logo}`,
    SAME_AS: [
      "https://www.instagram.com/pandami",
      "https://www.facebook.com/pandami",
      "https://www.linkedin.com/company/pandami"
    ],
    CONTACT: {
      TYPE: "customer service",
      TELEPHONE: "+55-11-99999-9999",
      EMAIL: "contato@pandami.com.br",
      LANGUAGE: "Portuguese",
      ADDRESS: {
        COUNTRY: "BR",
        REGION: "São Paulo",
        LOCALITY: "São Paulo"
      },
      GEO: {
        LATITUDE: "-23.5505",
        LONGITUDE: "-46.6333"
      }
    }
  },
  PRODUCT: {
    NAME: "PandaMi | Visagismo com IA",
    DESCRIPTION: "Descubra o melhor visual com visagismo inteligente! Análise em 30 segundos, teste de 7 dias!",
    CATEGORY: "BeautyApplication",
    OPERATING_SYSTEM: "Web Browser",
    PRICE: {
      AMOUNT: "0",
      CURRENCY: "BRL",
      DESCRIPTION: "Teste de 7 dias"
    },
    RATING: {
      VALUE: "4.8",
      COUNT: "2000",
      BEST: "5",
      WORST: "1"
    },
    FEATURES: [
      "Análise de cabelo com IA",
      "Sugestões personalizadas",
      "Compatível com todos os tipos de cabelo",
      "Processamento em 30 segundos",
      "Privacidade garantida"
    ]
  },
  ARTICLE: {
    HEADLINE: "Visagismo com IA: Descubra o melhor visual",
    DESCRIPTION: "Descubra como a inteligência artificial está revolucionando o visagismo. Análise personalizada em 30 segundos, sugestões para todos os tipos de cabelo brasileiro.",
    SECTION: "Beleza e Estilo",
    WORD_COUNT: 1500,
    LANGUAGE: "pt-BR",
    KEYWORDS: [
      "visagismo",
      "inteligência artificial",
      "análise de cabelo",
      "beleza",
      "diversidade brasileira",
      "IA para cabelo",
      "sugestões personalizadas"
    ],
    IMAGES: [
      "/lp/images/hero/hero-main.png",
      "/lp/images/about-visagism/about-visagism-1.png"
    ]
  },
  LOCAL_BUSINESS: {
    OPENING_HOURS: "Mo-Fr 09:00-18:00",
    PRICE_RANGE: "$$",
    PAYMENT_ACCEPTED: "Credit Card, Debit Card, PIX",
    CURRENCIES_ACCEPTED: "BRL",
    SERVICE_AREA: "Brazil"
  },
  REVIEWS: [
    {
      AUTHOR: "Ana Paula",
      RATING: "5",
      BODY: "Revolucionou meu trabalho como visagista. A IA é incrível!"
    },
    {
      AUTHOR: "Carlos Mendes",
      RATING: "5",
      BODY: "Resultados surpreendentes em poucos segundos."
    }
  ]
} as const;
