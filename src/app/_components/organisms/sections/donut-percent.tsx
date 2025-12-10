"use client"

import { memo } from "react";

interface DonutPercentProps {
	percent: number;
}

/**
 * Lightweight donut chart using pure SVG - no Recharts dependency
 * Reduces bundle size by ~150KB
 */
export const DonutPercent = memo(({ percent }: DonutPercentProps) => {
	const clamped = Math.max(0, Math.min(100, percent));

	// SVG circle parameters
	const size = 64;
	const strokeWidth = 10;
	const radius = (size - strokeWidth) / 2;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (clamped / 100) * circumference;

	return (
		<div className="w-16 h-16 bg-white rounded-full flex items-center justify-center">
			<svg width={size} height={size} className="transform -rotate-90">
				{/* Background track */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="#e5e7eb"
					strokeWidth={strokeWidth}
				/>
				{/* Progress arc */}
				<circle
					cx={size / 2}
					cy={size / 2}
					r={radius}
					fill="none"
					stroke="#bbf7d0"
					strokeWidth={strokeWidth}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
					strokeLinecap="round"
					className="transition-all duration-500 ease-out"
				/>
			</svg>
			{/* Center text */}
			<div className="absolute flex items-baseline">
				<span className="text-neutral-800 text-xs font-medium">{clamped}</span>
				<span className="text-neutral-800 text-[9.6px] font-medium">%</span>
			</div>
		</div>
	);
});

DonutPercent.displayName = "DonutPercent";