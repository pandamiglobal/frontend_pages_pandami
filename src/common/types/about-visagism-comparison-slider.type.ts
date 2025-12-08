import type { ReactNode, RefObject } from "react";

/**
 * Configuração de animação para o handle do slider
 */
export interface HandleAnimationConfig {
  scale: number;
  duration: number;
  ease: string;
}

/**
 * Configuração de duração das animações
 */
export const ANIMATION_DURATION = {
  PULSE: 0.9,
  TRANSITION: 0.2,
} as const;

/**
 * Configuração de easing das animações
 */
export const ANIMATION_EASING = {
  SINE_IN_OUT: "sine.inOut",
} as const;

/**
 * Props do hook useComparisonSlider
 */
export interface UseComparisonSliderProps {
  /** Posição inicial do slider (0-100) */
  initialPosition?: number;
  /** Callback quando o usuário interage com o slider */
  onInteraction?: () => void;
  /** Ref do elemento handle para animações */
  handleRef?: RefObject<HTMLButtonElement | null>;
}

/**
 * Retorno do hook useComparisonSlider
 */
export interface UseComparisonSliderReturn {
  // Refs
  containerRef: RefObject<HTMLDivElement | null>;
  handleRef: RefObject<HTMLButtonElement | null>;
  
  // State
  position: number;
  isHovered: boolean;
  hasInteracted: boolean;
  
  // Handlers
  handleContainerMouseDown: (e: React.MouseEvent) => void;
  handleContainerTouchStart: (e: React.TouchEvent) => void;
  handleContainerMouseEnter: () => void;
  handleContainerMouseLeave: () => void;
  handleContainerMouseMove: (e: React.MouseEvent) => void;
  handleButtonMouseDown: (e: React.MouseEvent) => void;
  handleButtonTouchStart: (e: React.TouchEvent) => void;
}

/**
 * Props do componente AboutVisagismComparisonSlider
 */
export interface AboutVisagismComparisonSliderProps {
  /** URL da imagem "antes" */
  before: string;
  /** URL da imagem "depois" */
  after: string;
  /** Alt text da imagem "antes" */
  beforeAlt: string;
  /** Alt text da imagem "depois" */
  afterAlt: string;
  /** Classes CSS adicionais */
  className?: string;
  /** Label do lado esquerdo (antes) */
  beforeLabel?: string;
  /** Label do lado direito (depois) */
  afterLabel?: string;
  /** Componente de affordance injetado */
  affordanceSlot?: ReactNode;
  /** Posição inicial do slider (0-100) */
  initialPosition?: number;
}
