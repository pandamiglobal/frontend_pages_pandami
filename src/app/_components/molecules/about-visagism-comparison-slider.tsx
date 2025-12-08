"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { useComparisonSlider } from "../../../common/hooks/use-comparison-slider";
import type { AboutVisagismComparisonSliderProps } from "../../../common/types/about-visagism-comparison-slider.type";

/**
 * Comparison Slider para seção About Visagism
 * Segue o padrão de injeção de dependências - affordance é injetado via props
 */
export function AboutVisagismComparisonSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
  beforeLabel = "Sem visagismo",
  afterLabel = "Com visagismo",
  affordanceSlot,
  initialPosition = 50,
}: AboutVisagismComparisonSliderProps) {
  const {
    containerRef,
    handleRef,
    position,
    isHovered,
    hasInteracted,
    handleContainerMouseDown,
    handleContainerTouchStart,
    handleContainerMouseEnter,
    handleContainerMouseLeave,
    handleContainerMouseMove,
    handleButtonMouseDown,
    handleButtonTouchStart,
  } = useComparisonSlider({ initialPosition });

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[480px] rounded-3xl overflow-hidden select-none touch-none bg-neutral-200",
        "md:h-[520px]",
        className
      )}
      onMouseDown={handleContainerMouseDown}
      onTouchStart={handleContainerTouchStart}
      onMouseEnter={handleContainerMouseEnter}
      onMouseLeave={handleContainerMouseLeave}
      onMouseMove={handleContainerMouseMove}
    >
      {/* Imagem "depois" (fundo) */}
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover object-center"
        priority={false}
      />

      {/* Imagem "antes" (clip) */}
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover object-center"
          priority={false}
        />
      </div>

      {/* Divider e Handle */}
      <div>
        {/* Divider */}
        <div
          className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
          style={{ left: `${position}%` }}
        />

        {/* Handle */}
        <button
          ref={handleRef}
          type="button"
          aria-label="Arraste para comparar"
          className="absolute top-1/2 -translate-y-1/2 -ml-4 flex flex-col items-center gap-2"
          style={{ left: `${position}%` }}
          onMouseDown={handleButtonMouseDown}
          onTouchStart={handleButtonTouchStart}
        >
          <span className="h-14 w-8 rounded-full bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm border border-white/60">
            {/* Affordance injetado via props - só exibe se não interagiu */}
            {!hasInteracted && affordanceSlot && (
              <div
                className={cn(
                  "transition-opacity duration-200",
                  isHovered && "opacity-0"
                )}
              >
                {affordanceSlot}
              </div>
            )}
          </span>
        </button>
      </div>

      {/* Labels */}
      <span
        className={cn(
          "absolute top-4 left-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow-sm transition-opacity",
          position < 45 && "opacity-40"
        )}
      >
        {beforeLabel}
      </span>
      <span
        className={cn(
          "absolute top-4 right-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow-sm transition-opacity",
          position > 55 && "opacity-40"
        )}
      >
        {afterLabel}
      </span>
    </div>
  );
}
