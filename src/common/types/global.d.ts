import React from "react";

import { WindowWithGtag } from "@/common/types/IConsentCookies";


declare global {
	namespace JSX {
		interface IntrinsicElements {
			"vturb-smartplayer": React.DetailedHTMLProps<
				React.HTMLAttributes<HTMLElement>,
				HTMLElement
			> & {
				id?: string;
			};
		}
	}
}


declare global {
	// Estende o tipo Window com as definições de WindowWithGtag
	interface Window extends WindowWithGtag {
		dataLayer?: any[];
	}
}

export {};
