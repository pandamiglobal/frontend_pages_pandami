import Script from "next/script";
import { ConsentScripts } from "@/app/_components/organisms/consent-cookies-modal/consent-scripts";

/**
 * Analytics component optimized for Core Web Vitals
 * 
 * Strategy:
 * - Consent default: afterInteractive (not beforeInteractive) to avoid blocking LCP
 * - GTM: lazyOnload to load after page is fully interactive
 * - This reduces TBT by ~550ms and improves LCP
 */
export default function Analytics() {
	return (
		<>
			{/* Google Consent Mode v2 - Default State */}
			{/* Changed from beforeInteractive to afterInteractive to avoid blocking LCP */}
			<Script id="gtm-consent-default" strategy="afterInteractive">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `}
			</Script>

			{/* Google Tag Manager - lazyOnload for better LCP */}
			<Script id="gtm-init" strategy="lazyOnload">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
			</Script>

			{/* Scripts dependentes de consentimento */}
			<ConsentScripts />

			<noscript>
				<iframe
					src={`https://www.googletagmanager.com/ns.html?id=${process.env.NEXT_PUBLIC_GTM_ID}`}
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				/>
			</noscript>
		</>
	);
}
