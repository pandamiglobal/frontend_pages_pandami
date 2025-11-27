import Script  from "next/script";
import { ConsentScripts } from "@/app/_components/organisms/consent-cookies-modal/consent-scripts";

export default function Analytics() {
	return (
		<>
			{/* Google Consent Mode v2 - Default State (Must be before GTM) */}
			<Script id="gtm-consent-default" strategy="beforeInteractive">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              // Padrão: negar até o usuário escolher
              gtag('consent', 'default', {
                'ad_storage': 'denied',
                'ad_user_data': 'denied',
                'ad_personalization': 'denied',
                'analytics_storage': 'denied'
              });
              // Sinais essenciais sem cookies (Advanced Mode)
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `}
			</Script>

			{/* Google Tag Manager */}
			<Script id="gtm-init" strategy="afterInteractive">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${process.env.NEXT_PUBLIC_GTM_ID}');`}
			</Script>
			{/* End Google Tag Manager */}

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
