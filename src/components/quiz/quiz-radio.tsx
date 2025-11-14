"use client"

import React, { forwardRef, useState } from "react"
import { cn } from "@/lib/utils"

interface QuizRadioProps {
  value: string
  checked?: boolean
  onChange?: (value: string) => void
  fillColor?: string
  className?: string
  children?: React.ReactNode
}

// Helper function to get border color class from fill color
function getBorderColorClass(fillColor: string): string {
  if (fillColor.includes('green')) return 'border-green-600'
  if (fillColor.includes('blue')) return 'border-blue-600'
  if (fillColor.includes('amber')) return 'border-amber-600'
  if (fillColor.includes('red')) return 'border-red-600'
  if (fillColor.includes('gray')) return 'border-gray-600'
  return 'border-green-600' // Default
}

// Helper function to convert fill color to background color
function convertFillToBg(fillColor: string): string {
  return fillColor.replace('fill-', 'bg-')
}

// Helper function to get background color for checked state
function getBackgroundColor(fillColor: string): string {
  if (fillColor.includes('green')) return 'bg-green-50'
  if (fillColor.includes('blue')) return 'bg-blue-50'
  if (fillColor.includes('amber')) return 'bg-amber-50'
  if (fillColor.includes('red')) return 'bg-red-50'
  if (fillColor.includes('gray')) return 'bg-gray-50'
  return 'bg-green-50' // Default
}

export const QuizRadio = forwardRef<HTMLInputElement, QuizRadioProps>(
  function QuizRadio({ value, checked = false, onChange, fillColor = "fill-green-600", className, children }, ref) {
    const handleChange = () => {
      if (onChange) onChange(value)
    }
    
    // Get the appropriate color classes
    const borderColorClass = getBorderColorClass(fillColor)
    const bgColorClass = getBackgroundColor(fillColor)
    
    return (
      <div className="relative flex items-center">
        <input
          type="radio"
          id={value}
          value={value}
          checked={checked}
          onChange={handleChange}
          className="sr-only" // Hide the default radio input
          ref={ref}
        />
        <label 
          htmlFor={value}
          className={cn(
            "relative flex items-center justify-center w-5 h-5 rounded-full border transition-all duration-300",
            checked 
              ? `${borderColorClass} ${bgColorClass}`
              : "border-gray-300 hover:border-gray-400",
            className
          )}
        >
          {checked && (
            <span 
              className={cn("absolute block size-3 rounded-full", convertFillToBg(fillColor))}
              style={{ transform: 'translate(-50%, -50%)', left: '50%', top: '50%' }}
            />
          )}
        </label>
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
    // Instead of cloning, we'll render our own children
    return (
      <div ref={ref} className={cn("space-y-4", className)}>
        {children}
      </div>
    )
  }
)
