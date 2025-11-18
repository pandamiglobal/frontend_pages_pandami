/**
 * My Site Profile Header Skeleton
 * Loading skeleton for profile header following Next.js 15 best practices
 * @see https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming
 */
export function MySiteProfileHeaderSkeleton() {
	return (
		<header className="bg-neutral-950 px-6 pt-20 pb-6" role="status" aria-label="Carregando perfil...">
			<div className="flex flex-col items-center text-center">
				{/* Avatar skeleton */}
				<div className="relative w-24 h-24 mb-4 rounded-full bg-neutral-800 overflow-hidden">
					<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
				</div>

				{/* Name skeleton */}
				<div className="flex items-center gap-2 mb-1">
					<div className="relative h-7 w-40 bg-neutral-800 rounded overflow-hidden">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
					</div>
				</div>

				{/* Bio skeleton */}
				<div className="space-y-2 mb-4 w-full max-w-[320px]">
					<div className="relative h-4 bg-neutral-800 rounded overflow-hidden">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
					</div>
					<div className="relative h-4 bg-neutral-800 rounded w-3/4 mx-auto overflow-hidden">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
					</div>
				</div>

				{/* Open hours skeleton */}
				<div className="flex items-center gap-2 mb-2">
					<div className="w-4 h-4 bg-neutral-800 rounded" />
					<div className="relative h-4 w-32 bg-neutral-800 rounded overflow-hidden">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
					</div>
				</div>

				{/* Location skeleton */}
				<div className="flex items-center gap-2 mb-6">
					<div className="w-4 h-4 bg-neutral-800 rounded" />
					<div className="relative h-4 w-40 bg-neutral-800 rounded overflow-hidden">
						<div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-neutral-700/40 to-transparent" />
					</div>
				</div>
			</div>
		</header>
	)
}

