"use client";

import { useEffect, useState, useRef } from "react";
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
	className,
}: VturbVideoPlayerProps) {
	const [iframeSrc, setIframeSrc] = useState<string>("about:blank");
	const [isVisible, setIsVisible] = useState(false);
	const containerRef = useRef<HTMLDivElement>(null);

	// Lazy load iframe only when component is visible
	useEffect(() => {
		const element = containerRef.current;
		if (!element) return;

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setIsVisible(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px", threshold: 0.1 }
		);

		observer.observe(element);
		return () => observer.disconnect();
	}, []);

	// Only construct iframe URL when visible
	useEffect(() => {
		if (!isVisible) return;

		const baseUrl = `https://scripts.converteai.net/${accountId}/players/${videoId}/v4/embed.html`;
		const search = window.location.search || "?";
		const vl = encodeURIComponent(window.location.href);
		setIframeSrc(`${baseUrl}${search}&vl=${vl}`);
	}, [accountId, videoId, isVisible]);

	const iframeId = `ifr_${videoId}`;
	const wrapperId = `${iframeId}_wrapper`;
	const aspectId = `${iframeId}_aspect`;

	return (
		<div className={className} ref={containerRef}>
			{/* Load script only when video is visible - lazyOnload for lowest priority */}
			{isVisible && (
				<Script
					src="https://scripts.converteai.net/lib/js/smartplayer-wc/v4/sdk.js"
					strategy="lazyOnload"
				/>
			)}

			<div id={wrapperId} style={{ margin: "0 auto", width: "100%" }}>
				<div
					id={aspectId}
					style={{ position: "relative", padding: "177.77777777777777% 0 0 0" }}
				>
					{isVisible ? (
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
								height: "100%",
							}}
							referrerPolicy="origin"
							loading="lazy"
						/>
					) : (
						// Placeholder while not visible
						<div
							className="absolute inset-0 bg-neutral-200 animate-pulse rounded-lg flex items-center justify-center"
							aria-label="Carregando vídeo..."
						>
							<div className="w-16 h-16 rounded-full bg-neutral-300" />
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
