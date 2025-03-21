import { cn } from "@/common/lib/utils"
import React from "react"
import InputMask from "react-input-mask"

interface MaskedInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  mask?: string
  label?: string
  error?: string
  register?: any
}

const MaskedInput = React.forwardRef<HTMLInputElement, MaskedInputProps>(
  ({ className, mask, label, error, register, ...props }, ref) => {
    const inputComponent = mask ? (
      <InputMask
        mask={mask}
        className={cn(
          "w-full p-4 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]",
          error && "border-[#f31260]",
          className
        )}
        {...register}
        {...props}
      />
    ) : (
      <input
        className={cn(
          "w-full p-4 bg-[#f9fafb] rounded-2xl border border-[#e5e7eb]",
          error && "border-[#f31260]",
          className
        )}
        {...register}
        {...props}
      />
    )

    return (
      <div className="space-y-2">
        {label && (
          <label htmlFor={props.id} className="block text-[#4b5563] text-lg font-medium">
            {label}
          </label>
        )}
        {inputComponent}
        {error && <p className="mt-1 text-[#f31260] text-sm">{error}</p>}
      </div>
    )
  }
)

MaskedInput.displayName = "MaskedInput"

export { MaskedInput }