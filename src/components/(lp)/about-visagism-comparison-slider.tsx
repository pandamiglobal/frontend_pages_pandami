"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { cn } from "@/common/lib/utils";

interface AboutVisagismComparisonSliderProps {
  before: string;
  after: string;
  beforeAlt: string;
  afterAlt: string;
  className?: string;
}

// Slider mais simples e controlado por drag do usuário – independente do já existente para evitar efeitos colaterais
export function AboutVisagismComparisonSlider({
  before,
  after,
  beforeAlt,
  afterAlt,
  className,
}: AboutVisagismComparisonSliderProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [position, setPosition] = useState(50); // porcentagem
  const isDraggingRef = useRef(false);
  const isFinePointer = useRef<boolean>(true);
  const rafMoveRef = useRef<number | null>(null);

  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  // Detecta se o dispositivo tem ponteiro "fino" (desktop / mouse)
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      isFinePointer.current = window.matchMedia("(pointer: fine)").matches;
    }
  }, []);

  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
      updatePositionFromClientX(clientX);
    };
    const stop = () => (isDraggingRef.current = false);
    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleMove);
    window.addEventListener("touchend", stop);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stop);
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
    };
  }, [updatePositionFromClientX]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative w-full h-[480px] rounded-3xl overflow-hidden select-none touch-none bg-neutral-200", // base
        "md:h-[520px]",
        className
      )}
      onMouseDown={(e) => {
        isDraggingRef.current = true;
        updatePositionFromClientX(e.clientX);
      }}
      onTouchStart={(e) => {
        isDraggingRef.current = true;
        updatePositionFromClientX(e.touches[0].clientX);
      }}
      // Move conforme mouse em desktop (sem necessidade de clicar)
      onMouseMove={(e) => {
        if (!isFinePointer.current) return; // evita em touch devices híbridos
        if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
        rafMoveRef.current = requestAnimationFrame(() => {
          updatePositionFromClientX(e.clientX);
        });
      }}
    >
      <Image
        src={after}
        alt={afterAlt}
        fill
        sizes="(max-width:768px) 100vw, 50vw"
        className="object-cover"
        priority={false}
      />
      <div
        className="absolute inset-0"
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        <Image
          src={before}
          alt={beforeAlt}
          fill
          sizes="(max-width:768px) 100vw, 50vw"
          className="object-cover"
          priority={false}
        />
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-px bg-white shadow-[0_0_0_1px_rgba(0,0,0,0.15)]"
        style={{ left: `${position}%` }}
      />

      {/* Handle */}
      <button
        type="button"
        aria-label="Arraste para comparar"
        className="absolute top-1/2 -translate-y-1/2 -ml-4 flex flex-col items-center gap-2"
        style={{ left: `${position}%` }}
        onMouseDown={(e) => {
          e.preventDefault();
          isDraggingRef.current = true;
        }}
        onTouchStart={(e) => {
          e.preventDefault();
          isDraggingRef.current = true;
        }}
      >
        <span className="h-14 w-8 rounded-full bg-white/90 backdrop-blur flex items-center justify-center shadow border border-white/60"/>
      </button>

      {/* Labels */}
      <span
        className={cn(
          "absolute top-4 left-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow transition-opacity",
          position < 45 && "opacity-40"
        )}
      >
        Sem visagismo
      </span>
      <span
        className={cn(
          "absolute top-4 right-4 px-4 py-1 rounded-md bg-white text-stone-900 text-sm font-medium shadow transition-opacity",
          position > 55 && "opacity-40"
        )}
      >
        Com visagismo
      </span>
    </div>
  );
}
