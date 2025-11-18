import { cn } from "@/lib/utils"
import { type ButtonHTMLAttributes, forwardRef, type ReactNode, type AnchorHTMLAttributes } from "react"
import Link from "next/link"

type BaseProps = {
  variant?: "default" | "outline" | "outline-solid" | "white" | "custom"
  size?: "default" | "sm" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

type ButtonProps = BaseProps & ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: never
}

type LinkProps = BaseProps & Omit<AnchorHTMLAttributes<HTMLAnchorElement>, 'href'> & {
  href: string
}

export type PrimaryButtonProps = ButtonProps | LinkProps

// Constantes para melhor manutenibilidade
const BASE_CLASSES = "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-hidden focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-xl"

const VARIANT_CLASSES = {
  default: "bg-linear-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] text-primary-foreground hover:from-[hsl(var(--primary-gradient-hover-from))] hover:to-[hsl(var(--primary-gradient-hover-to))]",
  outline: "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary",
  // Alias de compatibilidade: "outline-solid" usa o mesmo estilo de outline
  "outline-solid": "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary",
  white: "bg-background text-primary border border-input hover:bg-accent dark:bg-background dark:text-primary",
  custom: "text-primary"
} as const

const SIZE_CLASSES = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-9 px-3 py-2 text-xs",
  lg: "h-11 px-8 py-4 text-base"
} as const

const PrimaryButton = forwardRef<HTMLButtonElement | HTMLAnchorElement, PrimaryButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    icon, 
    iconPosition = "right", 
    children, 
    ...props 
  }, ref) => {
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

    // Se tem href, renderiza como Link
    if ('href' in props && props.href) {
      const { href, ...linkProps } = props
      return (
        <Link
          href={href}
          ref={ref as React.Ref<HTMLAnchorElement>}
          className={baseClassName}
          {...linkProps}
        >
          {content}
        </Link>
      )
    }

    // Senão, renderiza como button
    return (
      <button
        ref={ref as React.Ref<HTMLButtonElement>}
        className={baseClassName}
        {...props as ButtonHTMLAttributes<HTMLButtonElement>}
      >
        {content}
      </button>
    )
  }
)

PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }

