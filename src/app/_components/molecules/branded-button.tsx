"use client"

import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, type ReactNode, type AnchorHTMLAttributes, type Ref, type MouseEvent, type MouseEventHandler } from "react"
import Link from "next/link"
import { sendGTMEvent } from "@/lib/utils/gtm"

type GTMData = {
  event: string
  category: string
  action: string
  label: string
}

type BaseProps = {
  variant?: "default" | "outline" | "outline-solid" | "white" | "custom"
  size?: "default" | "sm" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
  gtmData?: GTMData
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
}

type LinkProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
}

export type BrandedButtonProps = ButtonProps | LinkProps

// Constantes para melhor manutenibilidade
const BASE_CLASSES = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl"

const VARIANT_CLASSES = {
  default: "bg-linear-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] text-primary-foreground hover:from-[hsl(var(--primary-gradient-hover-from))] hover:to-[hsl(var(--primary-gradient-hover-to))]",
  outline: "border-2 border-primary text-neutral-800 bg-transparent hover:bg-primary/10 dark:border-primary dark:text-neutral-200",
  // Alias de compatibilidade: "outline-solid" usa o mesmo estilo de outline
  "outline-solid": "border-2 border-primary text-neutral-800 bg-transparent hover:bg-primary/10 dark:border-primary dark:text-neutral-200",
  white: "bg-background text-neutral-800 border border-neutral-300 hover:bg-accent dark:bg-background dark:text-neutral-200",
  custom: "text-primary"
} as const

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 py-2 text-xs",
  lg: "h-11 px-8 py-4 text-base"
} as const

export function BrandedButton({ 
  className, 
  variant = "default", 
  size = "default", 
  icon, 
  iconPosition = "right", 
  children, 
  ref,
  gtmData,
  onClick,
  ...props 
}: BrandedButtonProps & { ref?: Ref<HTMLButtonElement | HTMLAnchorElement> }) {
  const iconElement = icon && (
    <span className={iconPosition === "left" ? "mr-2" : "ml-2"}>
      {icon}
    </span>
  )

  const baseClassName = cn(
    BASE_CLASSES,
    VARIANT_CLASSES[variant],
    SIZE_CLASSES[size],
    className,
    "cursor-pointer"
  )

  const content = (
    <>
      {iconPosition === "left" && iconElement}
      {children}
      {iconPosition === "right" && iconElement}
    </>
  )

  const handleClick = (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => {
    if (gtmData) {
      sendGTMEvent(gtmData)
    }
    
    if (onClick) {
      (onClick as MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>)(e)
    }
  }

  const href = (props as any).href;

  // Se tem href, renderiza como Link
  if (href) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { href: _href, ...linkProps } = props as any
    return (
      <Link
        href={href}
        ref={ref as Ref<HTMLAnchorElement>}
        className={baseClassName}
        onClick={handleClick}
        {...linkProps}
      >
        {content}
      </Link>
    )
  }

  // Senão, renderiza como button
  return (
    <button
      ref={ref as Ref<HTMLButtonElement>}
      className={baseClassName}
      onClick={handleClick}
      {...props as ButtonHTMLAttributes<HTMLButtonElement>}
    >
      {content}
    </button>
  )
}