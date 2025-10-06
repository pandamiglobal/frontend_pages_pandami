"use client";

import { useEffect, useState } from "react";
import { cn } from "@/common/lib/utils";
import { PrimaryButton } from "@/components/ui/primary-button";

type ConsentChoice = "accepted" | "denied";

const CONSENT_STORAGE_KEY = "pdmi_consent_choice_v2";

export function CookiesModal() {
  const [decision, setDecision] = useState<ConsentChoice | null>(null);

  // Ler decisão previamente salva (persistente até o usuário mudar manualmente via UI futura)
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY);
      if (saved === "accepted" || saved === "denied") {
        setDecision(saved);
      }
    } catch {}
  }, []);

  // Aplica consentimento ao GA4
  const applyGoogleConsent = (choice: ConsentChoice) => {
    const granted = choice === "accepted" ? "granted" : "denied";
    try {
      // Define/atualiza consent mode (GA4)
      // gtag é definido no layout
      // @ts-ignore
      window.gtag && window.gtag("consent", "update", {
        ad_storage: granted,
        ad_user_data: granted,
        ad_personalization: granted,
        analytics_storage: granted,
      });
    } catch {}
  };

  // Aplica consentimento ao Clarity
  const applyClarityConsent = (choice: ConsentChoice) => {
    try {
      const allow = choice === "accepted";
      // API de consentimento do Clarity
      // Alguns projetos usam clarity('consent', boolean)
      // @ts-ignore
      if (typeof window !== "undefined" && window.clarity) {
        // @ts-ignore
        window.clarity("consent", allow);
      }
    } catch {}
  };

  const handleChoice = (choice: ConsentChoice) => {
    setDecision(choice);
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
    } catch {}
    applyGoogleConsent(choice);
    applyClarityConsent(choice);
  };

  // Oculta se já há decisão
  if (decision) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="cookies-title"
      className={cn(
        "fixed left-4 bottom-4 z-[60] w-[min(92vw,520px)]",
        "rounded-xl border border-neutral-200 bg-white shadow-lg",
        "p-4 md:p-5"
      )}
    >
      <div className="space-y-3">
        <p id="cookies-title" className="text-base md:text-lg font-semibold text-neutral-900">
          Preferências de cookies
        </p>
        <p className="text-sm text-neutral-700 leading-relaxed">
           Ao selecionar "Aceitar", autoriza a Pandami a usar cookies, píxeis, tags e tecnologias semelhantes para medir audiência e personalizar sua experiência. Saiba mais sobre como utilizamos seus dados e cookies em nossa nossa
          {" "}
          <a href="/politica-de-privacidade" className="text-primary underline">Política de Privacidade</a>.
          {" "}
          Clique em <strong>Aceitar</strong> para permitir todos os cookies não essenciais ou em <strong>Não aceitar</strong> para usar apenas os estritamente necessários.
        </p>
        <div className="flex items-center gap-3 pt-1">
          <PrimaryButton
            type="button"
            onClick={() => handleChoice("accepted")}
            aria-label="Aceitar todos os cookies"
          >
            Aceitar
          </PrimaryButton>
          <PrimaryButton
            type="button"
            variant="outline"
            onClick={() => handleChoice("denied")}
            aria-label="Não aceitar cookies"
          >
            Não aceitar
          </PrimaryButton>
        </div>
        <p className="text-xs text-neutral-500">
          Você pode alterar sua escolha depois nas preferências do site.
        </p>
      </div>
    </div>
  );
}


