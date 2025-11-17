'use client'

import { IPublicProfileOpeningHour, Weekday } from '@/common/types/types/IPublicProfile'
import { Clock } from 'lucide-react'

interface BusinessHoursProps {
  hours: IPublicProfileOpeningHour[]
}

/**
 * Business hours component for public view
 * Reuses SaaS layout to display operating hours
 * Shows days of week with opening/closing times
 */
export function BusinessHours({ hours }: BusinessHoursProps) {
  if (!hours || hours.length === 0) {
    return (
      <div className="text-center py-4 text-gray-500">
        <p>Horários não disponíveis.</p>
      </div>
    )
  }

  const dayNames: Record<Weekday, string> = {
    [Weekday.MONDAY]: 'Segunda-feira',
    [Weekday.TUESDAY]: 'Terça-feira',
    [Weekday.WEDNESDAY]: 'Quarta-feira',
    [Weekday.THURSDAY]: 'Quinta-feira',
    [Weekday.FRIDAY]: 'Sexta-feira',
    [Weekday.SATURDAY]: 'Sábado',
    [Weekday.SUNDAY]: 'Domingo',
  }

  const dayOrder: Weekday[] = [
    Weekday.MONDAY,
    Weekday.TUESDAY,
    Weekday.WEDNESDAY,
    Weekday.THURSDAY,
    Weekday.FRIDAY,
    Weekday.SATURDAY,
    Weekday.SUNDAY,
  ]

  // Sort hours by day of week
  const sortedHours = [...hours].sort((a, b) => {
    return dayOrder.indexOf(a.weekday) - dayOrder.indexOf(b.weekday)
  })

  // Get current day for highlighting
  const currentDay = dayOrder[new Date().getDay() === 0 ? 6 : new Date().getDay() - 1]

  return (
    <div className="space-y-2">
      {sortedHours.map((hour) => {
        const isToday = hour.weekday === currentDay
        const isActive = hour.active

        return (
          <div
            key={hour.id}
            className={`flex items-center justify-between py-3 px-4 rounded-lg ${
              isToday ? 'bg-blue-50 border border-blue-200' : 'bg-gray-50'
            }`}
          >
            <div className="flex items-center gap-2">
              {isToday && <Clock className="w-4 h-4 text-blue-600" />}
              <span className={`font-medium ${isToday ? 'text-blue-900' : 'text-gray-900'}`}>
                {dayNames[hour.weekday]}
              </span>
            </div>

            <span className={`text-sm ${
              isActive 
                ? isToday ? 'text-blue-700 font-medium' : 'text-gray-700'
                : 'text-red-600'
            }`}>
              {isActive ? `${hour.start_time} - ${hour.end_time}` : 'Fechado'}
            </span>
          </div>
        )
      })}
    </div>
  )
}
