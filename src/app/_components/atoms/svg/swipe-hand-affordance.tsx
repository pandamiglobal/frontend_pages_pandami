'use client'

import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'
import Image from 'next/image'

interface SwipeHandAffordanceProps {
  className?: string
}

export function SwipeHandAffordance({ className }: SwipeHandAffordanceProps) {
  return (
		<motion.div
			animate={{
				rotate: [0, 15, -15, 0],
			}}
			transition={{
				duration: 0.9,
				ease: "easeInOut",
				repeat: Infinity,
			}}
			style={{ transformOrigin: 'center bottom' }}
			className={cn(
				"relative flex flex-col items-center justify-center gap-[0px] mb-1",
				className
			)}
		>
			{/* Container da Mão */}
			<div className="relative flex-shrink-0 w-[14px] h-[14px]">
				<Image
					src="/svg/FingerSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					className="opacity-inherit"
				/>
			</div>

			{/* Container da Seta */}
			<div className={cn("relative flex-shrink-0 w-6 h-6")}>
				<Image
					src="/svg/ArrowSwipeHand.svg"
					alt="Deslize para ver"
					fill
					sizes="100%"
					className="opacity-inherit"
				/>
			</div>
		</motion.div>
	);
}
