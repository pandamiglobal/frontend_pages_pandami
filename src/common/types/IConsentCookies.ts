/**
 * Consent types for cookie preferences
 */

// Possible consent choices
export type ConsentChoice = "accepted" | "essentials_only" | "denied";

// Extended Window interface with analytics properties
export interface WindowWithGtag {
  gtag?: (command: string, action: string, params: any) => void;
  clarity?: (command: string, value: boolean) => void;
}
