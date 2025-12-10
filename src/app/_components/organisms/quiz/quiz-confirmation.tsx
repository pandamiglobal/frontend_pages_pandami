"use client"

import { useEffect } from "react"
import { CheckCircle } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"

interface QuizConfirmationProps {
  isVisible: boolean
  onComplete?: () => void
  color?: 'green' | 'blue' | 'amber' | 'red' | 'gray'
}

// Helper functions for color mapping
function getGradientClass(color: string): string {
  switch (color) {
    case 'blue':
      return 'from-blue-400 to-blue-600'
    case 'amber':
      return 'from-amber-400 to-amber-600'
    case 'red':
      return 'from-red-400 to-red-600'
    case 'gray':
      return 'from-gray-400 to-gray-600'
    case 'green':
    default:
      return 'from-green-400 to-green-600'
  }
}

function getShadowColor(color: string): string {
  switch (color) {
    case 'blue':
      return 'rgba(59, 130, 246, 0.3)'
    case 'amber':
      return 'rgba(245, 158, 11, 0.3)'
    case 'red':
      return 'rgba(239, 68, 68, 0.3)'
    case 'gray':
      return 'rgba(107, 114, 128, 0.3)'
    case 'green':
    default:
      return 'rgba(34, 197, 94, 0.3)'
  }
}

export function QuizConfirmation({ isVisible, onComplete, color = 'green' }: QuizConfirmationProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onComplete?.()
      }, 1500)
      return () => clearTimeout(timer)
    }
  }, [isVisible, onComplete])

  return (
    <AnimatePresence>
      {isVisible && (
        <div className="fixed inset-0 z-50 flex items-center justify-center pointer-events-none">
          <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            transition={{ 
              type: "spring",
              stiffness: 300,
              damping: 20
            }}
            className="flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{
                type: "spring",
                stiffness: 200,
                damping: 15,
                delay: 0.1
              }}
              className={`w-20 h-20 bg-gradient-to-br rounded-full flex items-center justify-center shadow-2xl border-4 border-white ${getGradientClass(color)}`}
              style={{
                filter: `drop-shadow(0 10px 20px ${getShadowColor(color)})`
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ delay: 0.5, duration: 0.3 }}
              >
                <CheckCircle className="w-10 h-10 text-white" />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  )
}
