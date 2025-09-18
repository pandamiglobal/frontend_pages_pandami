import * as React from "react"
import { cn } from "@/common/lib/utils"
import { Controller, UseFormRegister } from "react-hook-form"

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  inputMask?: string;
  register?: UseFormRegister<any>;
  name?: string;
  control?: any;
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

// Função auxiliar para aplicar máscara aos inputs
const applyMask = (value: string, mask: string): string => {
  let maskedValue = '';
  let valueIndex = 0;
  
  for (let i = 0; i < mask.length && valueIndex < value.length; i++) {
    const maskChar = mask[i];
    
    if (maskChar === '9') { // Dígito
      if (/\d/.test(value[valueIndex])) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else if (maskChar === 'a') { // Letra
      if (/[a-zA-Z]/.test(value[valueIndex])) {
        maskedValue += value[valueIndex];
        valueIndex++;
      } else {
        valueIndex++;
        i--;
      }
    } else if (maskChar === '*') { // Qualquer caractere
      maskedValue += value[valueIndex];
      valueIndex++;
    } else { // Caracteres fixos da máscara
      maskedValue += maskChar;
      if (value[valueIndex] === maskChar) {
        valueIndex++;
      }
    }
  }
  
  return maskedValue;
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
          render={({ field }) => {
            // Função para manipular o onChange com a máscara
            const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
              const rawValue = e.target.value.replace(/[^a-zA-Z0-9]/g, ''); // Remove caracteres não alfanuméricos
              const maskedValue = applyMask(rawValue, inputMask);
              
              // Cria um novo evento para manter a compatibilidade
              const syntheticEvent = {
                ...e,
                target: {
                  ...e.target,
                  value: maskedValue
                }
              };
              
              field.onChange(syntheticEvent);
            };

            return (
              <input
                {...inputProps}
                ref={(el) => {
                  if (el && field.ref) {
                    field.ref(el);
                  }
                  if (ref) {
                    if (typeof ref === 'function') {
                      ref(el);
                    } else {
                      ref.current = el;
                    }
                  }
                }}
                value={field.value || ''}
                onChange={handleChange}
                onBlur={field.onBlur}
              />
            );
          }}
        />
      )
    }

    const registerProps = register ? register(props.name as string) : {};
    return <input ref={ref} {...registerProps} {...inputProps} />;
  }
);
Input.displayName = "Input"

export { Input }

