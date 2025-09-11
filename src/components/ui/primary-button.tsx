import { cn } from "@/common/lib/utils"
import { type ButtonHTMLAttributes, forwardRef, ReactNode } from "react"

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "white"
  size?: "default" | "sm" | "lg"
  icon?: ReactNode
  iconPosition?: "left" | "right"
}

const PrimaryButton = forwardRef<HTMLButtonElement, PrimaryButtonProps>(
  ({ 
    className, 
    variant = "default", 
    size = "default", 
    icon, 
    iconPosition = "right", 
    children, 
    ...props 
  }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-full",
          {
            "bg-gradient-to-r from-[hsl(var(--primary-gradient-from))] to-[hsl(var(--primary-gradient-to))] text-primary-foreground hover:from-[hsl(var(--primary-gradient-hover-from))] hover:to-[hsl(var(--primary-gradient-hover-to))]":
              variant === "default",
            "border-2 border-primary text-primary bg-transparent hover:bg-primary/10 dark:border-primary dark:text-primary":
              variant === "outline",
            "bg-background text-primary border border-input hover:bg-accent dark:bg-background dark:text-primary":
              variant === "white",
            "h-10 px-4 py-2 text-sm": size === "default",
            "h-9 px-3 py-2 text-xs": size === "sm",
            "h-11 px-8  py-4 text-base": size === "lg",
          },
          className,
        )}
        {...props}
      >
        {icon && iconPosition === "left" && (
          <span className="mr-2">{icon}</span>
        )}
        {children}
        {icon && iconPosition === "right" && (
          <span className="ml-2">{icon}</span>
        )}
      </button>
    )
  },
)

PrimaryButton.displayName = "PrimaryButton"

export { PrimaryButton }

