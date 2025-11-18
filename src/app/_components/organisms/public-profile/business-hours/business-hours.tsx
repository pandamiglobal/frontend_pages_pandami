'use client'

interface IBusinessHours {
  id: string
  day: string
  isOpen: boolean
  openTime: string
  closeTime: string
  isToday: boolean
}

interface BusinessHoursProps {
  hours: IBusinessHours[]
}

/**
 * Business hours component for public view
 * Displays formatted business hours using my-site helpers
 */
export function BusinessHours({ hours }: BusinessHoursProps) {
  if (!hours || hours.length === 0) {
    return (
      <p className="text-sm text-neutral-600">Horários não informados.</p>
    )
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
      {hours.map((h) => (
        <div
          key={h.id}
          className="flex items-center justify-between rounded border border-neutral-200 px-3 py-2"
        >
          <div className="flex items-center gap-2">
            <span className={`text-sm font-medium ${h.isToday ? 'text-primary' : 'text-neutral-800'}`}>
              {h.day}
            </span>
            {h.isToday && (
              <span className="rounded bg-primary/10 text-primary text-[10px] px-2 py-0.5">
                Hoje
              </span>
            )}
          </div>
          <div className="text-sm text-neutral-700">
            {h.isOpen ? (
              <span>{h.openTime} — {h.closeTime}</span>
            ) : (
              <span className="text-neutral-500">Fechado</span>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
