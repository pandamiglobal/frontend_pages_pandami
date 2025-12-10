"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import {
  type UseComparisonSliderProps,
  type UseComparisonSliderReturn,
} from "../types/about-visagism-comparison-slider.type";

/**
 * Hook para gerenciar o estado e comportamento do comparison slider
 * Segue o padrão de injeção de dependências do projeto
 */
export function useComparisonSlider({
  initialPosition = 50,
  onInteraction,
  handleRef: externalHandleRef,
}: UseComparisonSliderProps = {}): UseComparisonSliderReturn {
  // Refs
  const containerRef = useRef<HTMLDivElement | null>(null);
  const internalHandleRef = useRef<HTMLButtonElement | null>(null);
  const handleRef = externalHandleRef ?? internalHandleRef;
  const isDraggingRef = useRef(false);
  const isFinePointerRef = useRef<boolean>(true);
  const rafMoveRef = useRef<number | null>(null);

  // State
  const [position, setPosition] = useState(initialPosition);
  const [isHovered, setIsHovered] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  // Utilitário para atualizar posição baseado em clientX
  const updatePositionFromClientX = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.min(Math.max(clientX - rect.left, 0), rect.width);
    setPosition((x / rect.width) * 100);
  }, []);

  // Marca interação e notifica callback
  const markInteraction = useCallback(() => {
    if (!hasInteracted) {
      setHasInteracted(true);
      onInteraction?.();
    }
  }, [hasInteracted, onInteraction]);

  // Detecta se o dispositivo tem ponteiro "fino" (desktop / mouse)
  useEffect(() => {
    if (typeof window !== "undefined" && "matchMedia" in window) {
      isFinePointerRef.current = window.matchMedia("(pointer: fine)").matches;
    }
  }, []);

  // Pulse animation is now handled by framer-motion in the component

  // Event listeners globais para drag
  useEffect(() => {
    const handleMove = (e: MouseEvent | TouchEvent) => {
      if (!isDraggingRef.current) return;
      const clientX = (e as TouchEvent).touches
        ? (e as TouchEvent).touches[0].clientX
        : (e as MouseEvent).clientX;
      updatePositionFromClientX(clientX);
      markInteraction();
    };

    const stop = () => {
      isDraggingRef.current = false;
    };

    window.addEventListener("mousemove", handleMove);
    window.addEventListener("mouseup", stop);
    window.addEventListener("touchmove", handleMove, { passive: true });
    window.addEventListener("touchend", stop, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("mouseup", stop);
      window.removeEventListener("touchmove", handleMove);
      window.removeEventListener("touchend", stop);
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
    };
  }, [updatePositionFromClientX, markInteraction]);

  // Handlers do container
  const handleContainerMouseDown = useCallback(
    (e: React.MouseEvent) => {
      isDraggingRef.current = true;
      updatePositionFromClientX(e.clientX);
      markInteraction();
    },
    [updatePositionFromClientX, markInteraction]
  );

  const handleContainerTouchStart = useCallback(
    (e: React.TouchEvent) => {
      isDraggingRef.current = true;
      updatePositionFromClientX(e.touches[0].clientX);
      markInteraction();
    },
    [updatePositionFromClientX, markInteraction]
  );

  const handleContainerMouseEnter = useCallback(() => {
    setIsHovered(true);
    markInteraction();
  }, [markInteraction]);

  const handleContainerMouseLeave = useCallback(() => {
    setIsHovered(false);
  }, []);

  const handleContainerMouseMove = useCallback(
    (e: React.MouseEvent) => {
      if (!isFinePointerRef.current) return;
      if (rafMoveRef.current) cancelAnimationFrame(rafMoveRef.current);
      rafMoveRef.current = requestAnimationFrame(() => {
        updatePositionFromClientX(e.clientX);
      });
    },
    [updatePositionFromClientX]
  );

  // Handlers do botão handle
  const handleButtonMouseDown = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      isDraggingRef.current = true;
      markInteraction();
    },
    [markInteraction]
  );

  const handleButtonTouchStart = useCallback(
    (_e: React.TouchEvent) => {
      isDraggingRef.current = true;
      markInteraction();
    },
    [markInteraction]
  );

  return {
    // Refs
    containerRef,
    handleRef,

    // State
    position,
    isHovered,
    hasInteracted,

    // Handlers
    handleContainerMouseDown,
    handleContainerTouchStart,
    handleContainerMouseEnter,
    handleContainerMouseLeave,
    handleContainerMouseMove,
    handleButtonMouseDown,
    handleButtonTouchStart,
  };
}
