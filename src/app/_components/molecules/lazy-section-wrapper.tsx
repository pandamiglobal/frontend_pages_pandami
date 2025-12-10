"use client";

import { type ReactNode, type ComponentType } from "react";
import { useLazySection } from "@/common/hooks/use-lazy-section";
import { SectionSkeleton } from "@/app/_components/atoms/ui/section-skeleton";

interface LazySectionWrapperProps {
	/** The component to lazy load */
	children: ReactNode;
	/** Skeleton variant for loading state */
	skeletonVariant?: "default" | "carousel" | "testimonials" | "pricing" | "video" | "faq";
	/** Custom skeleton height */
	skeletonHeight?: string;
	/** Distance before viewport to start loading */
	rootMargin?: string;
	/** Whether to load immediately (skip lazy loading) */
	immediate?: boolean;
	/** Custom skeleton component */
	skeleton?: ReactNode;
	/** Additional className for the wrapper */
	className?: string;
}

/**
 * Wrapper component for lazy loading heavy sections
 * Uses IntersectionObserver to load content only when user scrolls near
 * 
 * @example
 * ```tsx
 * <LazySectionWrapper 
 *   skeletonVariant="video" 
 *   rootMargin="300px"
 * >
 *   <VideoCtaSection />
 * </LazySectionWrapper>
 * ```
 */
export function LazySectionWrapper({
	children,
	skeletonVariant = "default",
	skeletonHeight = "h-96",
	rootMargin = "200px",
	immediate = false,
	skeleton,
	className,
}: LazySectionWrapperProps) {
	const { containerRef, shouldRender } = useLazySection({
		rootMargin,
		immediate,
	});

	return (
		<div ref={containerRef} className={className}>
			{shouldRender ? (
				children
			) : (
				skeleton ?? (
					<SectionSkeleton
						variant={skeletonVariant}
						height={skeletonHeight}
					/>
				)
			)}
		</div>
	);
}
