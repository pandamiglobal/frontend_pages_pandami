"use client";

import { cn } from "@/lib/utils";

interface SectionSkeletonProps {
	className?: string;
	height?: string;
	variant?: "default" | "carousel" | "testimonials" | "pricing" | "video" | "faq";
}

/**
 * Skeleton loader for dynamically imported sections
 * Provides visual feedback while heavy components are loading
 */
export function SectionSkeleton({
	className,
	height = "h-96",
	variant = "default",
}: SectionSkeletonProps) {
	const baseClasses = "w-full animate-pulse";

	const variantStyles = {
		default: "bg-neutral-100",
		carousel: "bg-white",
		testimonials: "bg-white",
		pricing: "bg-neutral-50",
		video: "bg-white",
		faq: "bg-white",
	};

	return (
		<section
			className={cn(baseClasses, variantStyles[variant], height, className)}
			aria-label="Carregando conteúdo..."
			role="status"
		>
			<div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center gap-4">
				{/* Title skeleton */}
				<div className="h-8 w-64 bg-neutral-200 rounded-lg" />
				
				{/* Content skeleton based on variant */}
				{variant === "carousel" && (
					<div className="flex gap-4 overflow-hidden w-full justify-center mt-8">
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className="w-64 h-72 bg-neutral-200 rounded-xl shrink-0"
							/>
						))}
					</div>
				)}

				{variant === "testimonials" && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
						{[...Array(3)].map((_, i) => (
							<div key={i} className="flex flex-col gap-4">
								<div className="h-48 bg-neutral-200 rounded-xl" />
								<div className="h-24 bg-neutral-200 rounded-xl" />
							</div>
						))}
					</div>
				)}

				{variant === "pricing" && (
					<div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full mt-8">
						{[...Array(3)].map((_, i) => (
							<div
								key={i}
								className="h-96 bg-neutral-200 rounded-xl"
							/>
						))}
					</div>
				)}

				{variant === "video" && (
					<div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
						<div className="flex-1 space-y-4">
							<div className="h-6 w-48 bg-neutral-200 rounded" />
							<div className="h-12 w-full bg-neutral-200 rounded" />
							<div className="h-24 w-full bg-neutral-200 rounded" />
						</div>
						<div className="w-full lg:w-1/3 aspect-[9/16] bg-neutral-200 rounded-2xl" />
					</div>
				)}

				{variant === "faq" && (
					<div className="flex flex-col lg:flex-row gap-8 w-full mt-8">
						<div className="w-full lg:w-5/12 space-y-4">
							<div className="h-8 w-full bg-neutral-200 rounded" />
							<div className="h-20 w-full bg-neutral-200 rounded" />
						</div>
						<div className="w-full lg:w-7/12 space-y-3">
							{[...Array(5)].map((_, i) => (
								<div key={i} className="h-14 bg-neutral-200 rounded" />
							))}
						</div>
					</div>
				)}

				{variant === "default" && (
					<div className="w-full max-w-4xl space-y-4 mt-8">
						<div className="h-6 w-full bg-neutral-200 rounded" />
						<div className="h-6 w-3/4 bg-neutral-200 rounded" />
						<div className="h-48 w-full bg-neutral-200 rounded-xl mt-4" />
					</div>
				)}
			</div>
		</section>
	);
}
