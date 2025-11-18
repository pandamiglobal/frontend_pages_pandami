'use client'

import { ReactNode } from 'react'

interface SectionCardProps {
  title?: string
  children: ReactNode
  variant?: 'default' | 'service'
  className?: string
}

/**
 * Section card component for public profile
 * Provides consistent styling for different sections
 */
export function SectionCard({ 
  title, 
  children, 
  variant = 'default',
  className = '' 
}: SectionCardProps) {
  return (
    <section 
      className={`rounded-xl border border-neutral-200 bg-white p-6 ${className}`}
      aria-labelledby={title ? `section-${title.toLowerCase().replace(/\s+/g, '-')}` : undefined}
    >
      {title && (
        <h2 
          id={`section-${title.toLowerCase().replace(/\s+/g, '-')}`}
          className="text-lg font-semibold text-neutral-900 mb-4"
        >
          {title}
        </h2>
      )}
      {children}
    </section>
  )
}
