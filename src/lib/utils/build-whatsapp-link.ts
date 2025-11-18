/**
 * Helper utility to generate WhatsApp URL from phone numbers
 * Supports E.164 format and Brazilian local phone numbers
 * Ensures WhatsApp Web fallback works on desktop browsers
 */

/**
 * Generates a WhatsApp URL from a phone number
 * @param phone - Phone number in E.164 format or Brazilian local format
 * @param message - Optional pre-filled message (will be URL encoded)
 * @returns Complete WhatsApp URL that works on both mobile and desktop
 */
export function buildWhatsAppLink(phone: string, message?: string): string {
  if (!phone) {
    return ''
  }

  // Clean phone number - remove all non-numeric characters
  const cleanedPhone = phone.replace(/\D/g, '')
  
  // Validate phone number
  if (!cleanedPhone || cleanedPhone.length < 10) {
    return ''
  }

  // Convert to international format if needed
  let internationalPhone = cleanedPhone
  
  // If it doesn't start with country code, assume Brazil (+55)
  if (!cleanedPhone.startsWith('55') && cleanedPhone.length <= 11) {
    // Brazilian phone numbers: 10-11 digits (2 area + 8-9 number)
    if (cleanedPhone.length === 10) {
      // Landline: 2 area + 8 number
      internationalPhone = `55${cleanedPhone}`
    } else if (cleanedPhone.length === 11) {
      // Mobile: 2 area + 9 number
      internationalPhone = `55${cleanedPhone}`
    }
  }

  // Build base WhatsApp URL
  let whatsappUrl = `https://wa.me/${internationalPhone}`
  
  // Add message if provided
  if (message && message.trim()) {
    const encodedMessage = encodeURIComponent(message.trim())
    whatsappUrl += `?text=${encodedMessage}`
  }

  return whatsappUrl
}

/**
 * Validates if a phone number can be used for WhatsApp
 * @param phone - Phone number to validate
 * @returns true if phone is valid for WhatsApp
 */
export function isValidWhatsAppPhone(phone: string): boolean {
  if (!phone) return false
  
  const cleaned = phone.replace(/\D/g, '')
  
  // Basic validation: 10-15 digits, starts with country code or is Brazilian format
  if (cleaned.length < 10 || cleaned.length > 15) {
    return false
  }
  
  // Check if it's a valid Brazilian number or international format
  const brazilianPattern = /^55\d{10,11}$/
  const internationalPattern = /^\d{10,15}$/
  
  return brazilianPattern.test(cleaned) || internationalPattern.test(cleaned)
}

/**
 * Formats a phone number for display while preserving WhatsApp compatibility
 * @param phone - Phone number in any format
 * @returns Formatted phone number for display
 */
export function formatPhoneForDisplay(phone: string): string {
  if (!phone) return ''
  
  const cleaned = phone.replace(/\D/g, '')
  
  // Format Brazilian numbers
  if (cleaned.startsWith('55') && cleaned.length === 13) {
    // +55 (XX) XXXXX-XXXX
    return `+55 (${cleaned.slice(2, 4)}) ${cleaned.slice(4, 9)}-${cleaned.slice(9)}`
  }
  
  if (cleaned.length === 11 && !cleaned.startsWith('55')) {
    // (XX) XXXXX-XXXX (Brazilian mobile without country code)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 7)}-${cleaned.slice(7)}`
  }
  
  if (cleaned.length === 10 && !cleaned.startsWith('55')) {
    // (XX) XXXX-XXXX (Brazilian landline without country code)
    return `(${cleaned.slice(0, 2)}) ${cleaned.slice(2, 6)}-${cleaned.slice(6)}`
  }
  
  // Return original if can't format
  return phone
}
