"use client";

import { useEffect, useState, useCallback } from "react";
import { CONSENT_STORAGE_KEY } from "@/common/constants";
import { ConsentChoice } from "@/common/types/IConsentCookies";

interface ConsentState {
  choice: ConsentChoice | null;
  hasResponded: boolean;
  isLoading: boolean;
}

export const useConsent = () => {
  const [state, setState] = useState<ConsentState>({
    choice: null,
    hasResponded: false,
    isLoading: true,
  });

  useEffect(() => {
    // Aguarda hidratação completa para evitar mismatch
    if (typeof window === "undefined") return;

    const checkConsent = () => {
      try {
        const saved = window.localStorage.getItem(CONSENT_STORAGE_KEY) as ConsentChoice | null;
        const hasResponded = saved === "accepted" || saved === "essentials_only" || saved === "denied";
        
        setState({
          choice: saved,
          hasResponded,
          isLoading: false,
        });
      } catch {
        setState(prev => ({ ...prev, isLoading: false }));
      }
    };

    // Defer modal display until after LCP to avoid competing with critical resources
    // Use requestIdleCallback for better timing, with fallback to setTimeout
    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let idleId: number | undefined;
    let loadHandler: (() => void) | undefined;
    
    const scheduleCheck = () => {
      if ('requestIdleCallback' in window) {
        idleId = window.requestIdleCallback(checkConsent, { timeout: 2000 });
      } else {
        // Fallback for Safari - call immediately after load
        checkConsent();
      }
    };

    if (document.readyState === 'complete') {
      scheduleCheck();
    } else {
      loadHandler = () => scheduleCheck();
      window.addEventListener('load', loadHandler);
    }

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
      if (idleId) window.cancelIdleCallback(idleId);
      if (loadHandler) window.removeEventListener('load', loadHandler);
    };
  }, []);

  const setConsent = useCallback((choice: ConsentChoice) => {
    try {
      window.localStorage.setItem(CONSENT_STORAGE_KEY, choice);
      setState(prev => ({ ...prev, choice, hasResponded: true }));
    } catch {
      // Silently fail if localStorage is not available
    }
  }, []);

  const shouldShowModal = !state.isLoading && !state.hasResponded;
  
  return {
    ...state,
    setConsent,
    shouldShowModal,
  };
};
