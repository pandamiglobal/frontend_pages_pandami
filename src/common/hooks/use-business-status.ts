import { useState, useEffect } from 'react';
import { IBusinessHours } from '@/common/types/IPublicProfile';

interface UseBusinessStatusReturn {
  businessStatus: 'open' | 'closed' | 'no-hours';
  openHours: string;
  openHoursDetails: string | undefined;
  currentDayHours: IBusinessHours | undefined;
  currentDayIndex: number;
}

/**
 * Hook to determine business status (open/closed) based on current time
 * Handles hydration safely by only calculating on client
 */
export function useBusinessStatus(businessHours: IBusinessHours[]): UseBusinessStatusReturn {
  const [status, setStatus] = useState<UseBusinessStatusReturn>({
    businessStatus: 'no-hours',
    openHours: 'Horários não informados',
    openHoursDetails: undefined,
    currentDayHours: undefined,
    currentDayIndex: -1
  });

  useEffect(() => {
    if (!businessHours || businessHours.length === 0) {
      setStatus({
        businessStatus: 'no-hours',
        openHours: 'Horários não informados',
        openHoursDetails: undefined,
        currentDayHours: undefined,
        currentDayIndex: -1
      });
      return;
    }

    const now = new Date();
    const currentDay = now.getDay(); // 0-6
    
    // Find today's hours based on current client day
    // Note: transformBusinessHours returns an array ordered by week (Sun-Sat)
    // We need to match the current day index
    const todayHours = businessHours[currentDay];
    
    if (!todayHours) {
       setStatus({
        businessStatus: 'closed',
        openHours: 'Fechado hoje',
        openHoursDetails: 'Sem horário configurado',
        currentDayHours: undefined,
        currentDayIndex: currentDay
      });
      return;
    }

    let businessStatus: 'open' | 'closed' | 'no-hours' = 'closed';
    let openHours = todayHours.day;
    let openHoursDetails = 'Fechado hoje';

    if (todayHours.isOpen) {
      openHoursDetails = `${todayHours.openTime} - ${todayHours.closeTime}`;
      
      // Check if currently open
      const currentMinutes = now.getHours() * 60 + now.getMinutes();
      
      const [startHour, startMinute] = todayHours.openTime.split(':').map(Number);
      const startMinutes = startHour * 60 + startMinute;
      
      const [endHour, endMinute] = todayHours.closeTime.split(':').map(Number);
      const endMinutes = endHour * 60 + endMinute;

      if (currentMinutes >= startMinutes && currentMinutes <= endMinutes) {
        businessStatus = 'open';
      } else {
        businessStatus = 'closed';
      }
    }

    setStatus({
      businessStatus,
      openHours,
      openHoursDetails,
      currentDayHours: { ...todayHours, isToday: true },
      currentDayIndex: currentDay
    });
  }, [businessHours]);

  return status;
}
