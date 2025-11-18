"use client";

import { useCallback } from "react";
import { ConsentChoice, WindowWithGtag } from "@/common/types/IConsentCookies";

export const useConsentAnalytics = () => {
  const applyConsent = useCallback((choice: ConsentChoice) => {
    // Configurações padrão - tudo negado
    const consentConfig = {
      adStorage: "denied",
      adUserData: "denied",
      adPersonalization: "denied",
      analyticsStorage: "denied",
    } as const;

    // Atualiza configurações apenas quando o usuário aceitou todos os cookies
    if (choice === "accepted") {
      (consentConfig as any).adStorage = "granted";
      (consentConfig as any).adUserData = "granted";
      (consentConfig as any).adPersonalization = "granted";
      (consentConfig as any).analyticsStorage = "granted";
    }

    try {
      const win = window as WindowWithGtag;

      // Google Analytics consent
      if (win.gtag) {
        win.gtag("consent", "update", consentConfig);
      }

      // Microsoft Clarity consent - apenas quando explicitamente aceito tudo
      if (win.clarity) {
        win.clarity("consent", choice === "accepted");
      }

      // Dispatch custom event for other components
      window.dispatchEvent(
        new CustomEvent("pdmi:consent", {
          detail: { choice },
        })
      );
    } catch (error) {
      console.warn("Failed to apply consent:", error);
    }
  }, []);

  return { applyConsent };
};
