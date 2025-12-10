"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface ButtonGroupProps {
	value: string;
	onValueChange: (value: string) => void;
	children: React.ReactNode;
	className?: string;
	"aria-label"?: string;
}

interface ButtonGroupItemProps {
	value: string;
	children: React.ReactNode;
	className?: string;
}

const ButtonGroupContext = React.createContext<{
	value: string;
	onValueChange: (value: string) => void;
} | null>(null);

function ButtonGroup({
	value,
	onValueChange,
	children,
	className,
	"aria-label": ariaLabel,
}: ButtonGroupProps) {
	return (
		<ButtonGroupContext.Provider value={{ value, onValueChange }}>
			<div
				role="group"
				aria-label={ariaLabel}
				className={cn(
					"inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
					className
				)}
			>
				{children}
			</div>
		</ButtonGroupContext.Provider>
	);
}

function ButtonGroupItem({ value, children, className }: ButtonGroupItemProps) {
	const context = React.useContext(ButtonGroupContext);
	if (!context) {
		throw new Error("ButtonGroupItem must be used within ButtonGroup");
	}

	const isActive = context.value === value;

	return (
		<button
			type="button"
			onClick={() => context.onValueChange(value)}
			aria-pressed={isActive}
			className={cn(
				"inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 text-neutral-700 dark:text-neutral-300",
				isActive && "bg-background text-foreground shadow-sm",
				className
			)}
		>
			{children}
		</button>
	);
}

export { ButtonGroup, ButtonGroupItem };
