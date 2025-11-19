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
  if (!checked) return "border-neutral-200 hover:border-neutral-300 shadow-sm hover:shadow-md"
  
  // Default to primary/green if standard
  if (fillColor.includes('green')) return "border-green-500 bg-green-500 shadow-md shadow-green-100"
  if (fillColor.includes('blue')) return "border-blue-500 bg-blue-500 shadow-md shadow-blue-100"
  if (fillColor.includes('amber')) return "border-amber-500 bg-amber-500 shadow-md shadow-amber-100"
  if (fillColor.includes('red')) return "border-red-500 bg-red-500 shadow-md shadow-red-100"
  
  return "border-neutral-600 bg-neutral-600 shadow-md shadow-neutral-100"
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
            "flex items-center justify-center w-5 h-5 rounded-full border-2 transition-all duration-300 ease-in-out",
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
