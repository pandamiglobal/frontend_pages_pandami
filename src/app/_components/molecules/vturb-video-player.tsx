"use client";

import { useEffect, useState } from "react";
import Script from "next/script";

interface VturbVideoPlayerProps {
	videoId: string;
	accountId: string;
	m3u8Id?: string;
	className?: string;
}

export function VturbVideoPlayer({
	videoId,
	accountId,
	className
}: VturbVideoPlayerProps) {
	const [iframeSrc, setIframeSrc] = useState<string>("about:blank");

	useEffect(() => {
		// Construct URL on client side to access window.location
		const baseUrl = `https://scripts.converteai.net/${accountId}/players/${videoId}/v4/embed.html`;
		const search = window.location.search || "?";
		const vl = encodeURIComponent(window.location.href);
		setIframeSrc(`${baseUrl}${search}&vl=${vl}`);
	}, [accountId, videoId]);

	const iframeId = `ifr_${videoId}`;
	const wrapperId = `${iframeId}_wrapper`;
	const aspectId = `${iframeId}_aspect`;

	return (
		<div className={className}>
			<Script
				src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
				strategy="afterInteractive"
			/>

			<div
				id={wrapperId}
				style={{ margin: "0 auto", width: "100%" }}
			>
				<div
					id={aspectId}
					style={{ position: "relative", padding: "177.77777777777777% 0 0 0" }}
				>
					<iframe
						frameBorder="0"
						allowFullScreen
						id={iframeId}
						src={iframeSrc}
						style={{
							position: "absolute",
							top: 0,
							left: 0,
							width: "100%",
							height: "100%"
						}}
						referrerPolicy="origin"
					/>
				</div>
			</div>
		</div>
	);
}
