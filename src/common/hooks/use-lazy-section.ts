"use client";

import { useState, useEffect, useRef, type RefObject } from "react";

interface UseLazySectionOptions {
	/** Distance in pixels before the element enters viewport to trigger loading */
	rootMargin?: string;
	/** Intersection threshold (0-1) */
	threshold?: number;
	/** Whether to start loading immediately (skip intersection observer) */
	immediate?: boolean;
}

interface UseLazySectionReturn {
	/** Ref to attach to the container element */
	containerRef: RefObject<HTMLDivElement | null>;
	/** Whether the section should be rendered */
	shouldRender: boolean;
	/** Whether the section has been triggered (for one-time loading) */
	hasTriggered: boolean;
}

/**
 * Hook for lazy loading sections based on scroll position
 * Uses IntersectionObserver to detect when user is approaching a section
 * 
 * @example
 * ```tsx
 * const { containerRef, shouldRender } = useLazySection({ rootMargin: "200px" });
 * 
 * return (
 *   <div ref={containerRef}>
 *     {shouldRender ? <HeavyComponent /> : <Skeleton />}
 *   </div>
 * );
 * ```
 */
export function useLazySection(
	options: UseLazySectionOptions = {}
): UseLazySectionReturn {
	const { rootMargin = "200px", threshold = 0.1, immediate = false } = options;

	const containerRef = useRef<HTMLDivElement | null>(null);
	const [shouldRender, setShouldRender] = useState(immediate);
	const [hasTriggered, setHasTriggered] = useState(immediate);

	useEffect(() => {
		// Skip if already triggered or immediate mode
		if (hasTriggered || immediate) return;

		const element = containerRef.current;
		if (!element) return;

		// Check if IntersectionObserver is available
		if (typeof IntersectionObserver === "undefined") {
			setShouldRender(true);
			setHasTriggered(true);
			return;
		}

		const observer = new IntersectionObserver(
			(entries) => {
				const [entry] = entries;
				if (entry.isIntersecting) {
					setShouldRender(true);
					setHasTriggered(true);
					// Disconnect after triggering - we only need to load once
					observer.disconnect();
				}
			},
			{
				rootMargin,
				threshold,
			}
		);

		observer.observe(element);

		return () => {
			observer.disconnect();
		};
	}, [hasTriggered, immediate, rootMargin, threshold]);

	return {
		containerRef,
		shouldRender,
		hasTriggered,
	};
}
