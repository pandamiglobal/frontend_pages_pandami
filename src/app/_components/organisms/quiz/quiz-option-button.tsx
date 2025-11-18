import { QuizRadio } from "./quiz-radio"
import { type QuizOption } from "./quiz-questions"
import { memo } from "react"
import { cn } from "@/lib/utils"

interface QuizOptionButtonProps {
  option: QuizOption
  index: number
  isSelected: boolean
  onSelect: (index: number) => void
}

export const QuizOptionButton = memo(function QuizOptionButton({ option, index, isSelected, onSelect }: QuizOptionButtonProps) {
  const buttonId = `option-${index}`
  
  // Extract color for radio fill (convert text-green-600 to fill-green-600)
  const fillColor = option.color.includes('text-') ? option.color.replace('text-', 'fill-') : `fill-${option.color}`
  
  return (
    <div
      onClick={() => onSelect(index)}
      className={cn(
        "w-full text-left p-4 rounded-xl border-2 transition-all duration-200 cursor-pointer relative overflow-hidden group",
        isSelected 
          ? cn("border-neutral-900 bg-neutral-50 shadow-sm", option.bgColor) 
          : "border-neutral-200 hover:border-neutral-300 hover:bg-neutral-50"
      )}
    >
      <div className="flex items-center relative z-10">
        <QuizRadio
          value={buttonId}
          checked={isSelected}
          onChange={() => onSelect(index)}
          fillColor={fillColor}
          className="mr-4 shrink-0"
        />
        <div className="flex items-center min-w-0">
          <div className={cn(
            "mr-3 shrink-0 transition-colors duration-200",
            isSelected ? option.color : "text-neutral-500 group-hover:text-neutral-600"
          )}>
            {option.icon}
          </div>
          <span className={cn(
            "text-base font-medium transition-colors duration-200 truncate",
            isSelected ? "text-neutral-900" : "text-neutral-700 group-hover:text-neutral-900"
          )}>
            {option.text}
          </span>
        </div>
      </div>
    </div>
  )
})
