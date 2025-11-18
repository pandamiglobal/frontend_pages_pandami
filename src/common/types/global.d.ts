import { WindowWithGtag } from "@/common/types/IConsentCookies";

declare global {
  // Estende o tipo Window com as definições de WindowWithGtag
  interface Window extends WindowWithGtag {
    dataLayer?: any[];
  }
}

export {};

