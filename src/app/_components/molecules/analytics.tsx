import Script  from "next/script";
import { ConsentScripts } from "@/app/_components/organisms/consent-cookies-modal/consent-scripts";

export default function Analytics() {
	return (
		<>
			{/* Google Tag Manager */}
			<Script id="gtm-init" strategy="afterInteractive">
				{`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-TWV54TQV');`}
			</Script>
			{/* End Google Tag Manager */}
			<Script id="ga-consent-default" strategy="beforeInteractive">
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
              // Sinais essenciais sem cookies
              gtag('set', 'url_passthrough', true);
              gtag('set', 'ads_data_redaction', true);
            `}
			</Script>
			{/* GA sempre carregado para pings essenciais (consent negado por padrão) */}
			<Script
				src="https://www.googletagmanager.com/gtag/js?id=G-FPJQ0WXH4J"
				strategy="afterInteractive"
			/>
			<Script id="ga-init" strategy="afterInteractive">
				{`
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);} 
              gtag('js', new Date());
              gtag('config', 'G-FPJQ0WXH4J');
            `}
			</Script>
			{/* Scripts dependentes de consentimento */}
			<ConsentScripts />

			<noscript>
				<iframe
					src="https://www.googletagmanager.com/ns.html?id=GTM-TWV54TQV"
					height="0"
					width="0"
					style={{ display: "none", visibility: "hidden" }}
				/>
			</noscript>
		</>
	);
}
