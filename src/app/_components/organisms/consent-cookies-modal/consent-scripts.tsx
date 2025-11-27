"use client";

import { useEffect, useState } from "react";
import Script from "next/script";
import { useConsent } from "@/common/hooks/use-consent";
import { ConsentChoice } from "@/common/types/IConsentCookies";

export function ConsentScripts() {
	const { choice } = useConsent();
	const [hasConsent, setHasConsent] = useState(false);

	useEffect(() => {
		const isAccepted = (c: ConsentChoice | null) => c === "accepted";

		setHasConsent(isAccepted(choice));

		const handleConsentUpdate = (ev: Event) => {
			const customEvent = ev as CustomEvent<{ choice: ConsentChoice }>;
			if (customEvent.detail?.choice) {
				setHasConsent(isAccepted(customEvent.detail.choice));
			}
		};

		window.addEventListener("pdmi:consent", handleConsentUpdate);
		return () =>
			window.removeEventListener("pdmi:consent", handleConsentUpdate);
	}, [choice]);

	if (!hasConsent) return null;

	return (
		<Script id="gtm-consent-accept" strategy="afterInteractive">
			{`
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);} 
        gtag('consent', 'update', {
          'ad_storage': 'granted',
          'ad_user_data': 'granted',
          'ad_personalization': 'granted',
          'analytics_storage': 'granted'
        });
      `}
		</Script>
	);
}
