export type ConsentChoice = "accepted" | "essentials_only" | "denied";

export interface WindowWithGtag extends Window {
  gtag?: (...args: any[]) => void;
  clarity?: (command: string, value: boolean) => void;
}