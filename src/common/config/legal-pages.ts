import { FileText, Shield } from "lucide-react";
import { LegalPageConfig } from "@/@types/legal-metadata";

export const legalPagesConfig: Record<string, LegalPageConfig> = {
  "termos-de-uso": {
    title: "Termos de Uso",
    description: "Termos e condições de uso da plataforma Pandami. Sistema de gestão de clientes para barbearias com análise de visagismo assistida por IA.",
    lastUpdated: "19 de setembro de 2024",
    icon: "FileText",
    metadata: {
      title: "Termos de Uso | Pandami - Sistema de Gestão para Barbearias",
      description: "Termos e condições de uso da plataforma Pandami. Sistema de gestão de clientes para barbearias com análise de visagismo assistida por Inteligência Artificial.",
      keywords: [
        "termos de uso",
        "pandami",
        "barbearia",
        "visagismo",
        "inteligência artificial",
        "gestão de clientes",
        "sistema de barbearia",
        "análise facial",
        "LGPD"
      ],
      lastUpdated: "19 de setembro de 2024",
      canonical: "https://pandami.com.br/termos-de-uso"
    }
  },
  "politica-de-privacidade": {
    title: "Política de Privacidade",
    description: "Esta política descreve como coletamos, usamos, armazenamos e protegemos suas informações pessoais na plataforma Pandami de acordo com a LGPD.",
    lastUpdated: "19 de setembro de 2024",
    icon: "Shield",
    metadata: {
      title: "Política de Privacidade | Pandami - Proteção de Dados LGPD",
      description: "Política de privacidade da Pandami em conformidade com a LGPD. Saiba como coletamos, usamos e protegemos dados pessoais e biométricos em nosso sistema de gestão para barbearias.",
      keywords: [
        "política de privacidade",
        "LGPD",
        "proteção de dados",
        "pandami",
        "privacidade",
        "dados pessoais",
        "dados biométricos",
        "barbearia",
        "visagismo",
        "GDPR",
        "compliance"
      ],
      lastUpdated: "19 de setembro de 2024",
      canonical: "https://pandami.com.br/politica-de-privacidade"
    }
  }
};
