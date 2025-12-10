"use client";

import dynamic from "next/dynamic";
import { SectionSkeleton } from "@/app/_components/atoms/ui/section-skeleton";

// Dynamic import with ssr: false - allowed in Client Components
const VideoCtaSection = dynamic(
	() =>
		import("@/app/_components/organisms/sections/video-cta-section").then(
			(mod) => mod.VideoCtaSection
		),
	{
		loading: () => <SectionSkeleton variant="video" height="h-[500px]" />,
		ssr: false, // No SSR - external video player scripts
	}
);

export default function LazyVideoCtaSection() {
	return <VideoCtaSection />;
}
