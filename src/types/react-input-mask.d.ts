declare module 'react-input-mask' {
  import { ComponentType, InputHTMLAttributes } from 'react';

  interface InputMaskProps extends InputHTMLAttributes<HTMLInputElement> {
    mask: string;
    maskChar?: string | null;
    formatChars?: { [key: string]: string };
    alwaysShowMask?: boolean;
    inputRef?: (ref: HTMLInputElement | null) => void;
  }

  const InputMask: ComponentType<InputMaskProps>;
  export default InputMask;
} 