"use client"

import React, { forwardRef } from "react"
import { cn } from "@/lib/utils"

interface QuizRadioProps {
  value: string
  checked?: boolean
  onChange?: (value: string) => void
  fillColor?: string
  className?: string
  children?: React.ReactNode
}

// Helper to map fill colors to ring/bg colors
function getColorClasses(fillColor: string, checked: boolean) {
  if (!checked) return "border-neutral-300 hover:border-neutral-400"
  
  // Default to primary/green if standard
  if (fillColor.includes('green')) return "border-green-600 bg-green-600"
  if (fillColor.includes('blue')) return "border-blue-600 bg-blue-600"
  if (fillColor.includes('amber')) return "border-amber-600 bg-amber-600"
  if (fillColor.includes('red')) return "border-red-600 bg-red-600"
  
  return "border-neutral-900 bg-neutral-900"
}

export const QuizRadio = forwardRef<HTMLInputElement, QuizRadioProps>(
  function QuizRadio({ value, checked = false, onChange, fillColor = "fill-neutral-900", className, children }, ref) {
    const handleChange = () => {
      if (onChange) onChange(value)
    }
    
    return (
      <div className="relative flex items-center">
        <input
          type="radio"
          id={value}
          value={value}
          checked={checked}
          onChange={handleChange}
          className="sr-only" 
          ref={ref}
        />
        <div 
          className={cn(
            "flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-200",
            getColorClasses(fillColor, checked),
            className
          )}
        >
          {checked && (
            <div className="w-2 h-2 bg-white rounded-full shadow-sm" />
          )}
        </div>
        {children && <div className="ml-4">{children}</div>}
      </div>
    )
  }
)

interface QuizRadioGroupProps {
  value?: string
  onValueChange: (value: string) => void
  className?: string
  children: React.ReactNode
}

export const QuizRadioGroup = forwardRef<HTMLDivElement, QuizRadioGroupProps>(
  function QuizRadioGroup({ value, onValueChange, className, children }, ref) {
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {children}
      </div>
    )
  }
)
