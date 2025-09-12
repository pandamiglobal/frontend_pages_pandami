import * as React from "react"
import { cn } from "@/common/lib/utils"
import InputMask from "react-input-mask"
import { Controller, UseFormRegister } from "react-hook-form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputMask?: string;
  register?: UseFormRegister<any>;
  name?: string;
  control?: any;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, inputMask, register, ...props }, ref) => {
    const inputProps = {
      type,
      className: cn(
        "w-full px-4 py-3 bg-[#F5F5F5] rounded-lg focus:ring-2 focus:ring-[#0047FF] focus:outline-hidden",
        "border border-transparent focus:border-[#0047FF] transition-colors",
        className,
      ),
      ...props,
    };

    if (inputMask) {
      return (
        <Controller
          control={props.control}
          name={props.name as string}
          render={({ field: { ref, ...rest } }) => (
            <InputMask
              inputRef={ref}
              mask={inputMask}
              maskChar={null}
              {...inputProps}
              {...rest}
            />
          )}
        />
      )
    }

    const registerProps = register ? register(props.name as string) : {};
    return <input {...registerProps} {...inputProps} />;
  }
);
Input.displayName = "Input"

export { Input }

