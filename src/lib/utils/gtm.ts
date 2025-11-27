export const sendGTMEvent = ({ event , category , action , label }: { event: string; category: string; action: string; label: string }) => {
  if (typeof window !== 'undefined') {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({
      event,
      category,
      action,
      label,
    })
  }
}