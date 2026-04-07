export type EventName =
  | "product_view"
  | "whatsapp_click"
  | "quote_request"
  | "contact_form_submit"
  | "add_to_cart"
  | "promotion_view";

export interface EventData {
  productId?: number;
  productName?: string;
  categorySlug?: string;
  price?: number;
  variantId?: number;
  source?: string;
  [key: string]: unknown;
}

export function trackEvent(name: EventName, data?: EventData): void {
  if (typeof window === "undefined") return;

  if (typeof (window as unknown as { va?: (cmd: string, ...args: unknown[]) => void }).va === "function") {
    (window as unknown as { va: (cmd: string, ...args: unknown[]) => void }).va("event", { name, ...data });
  }

  if (process.env.NODE_ENV === "development") {
    console.debug(`[Analytics] ${name}`, data);
  }
}
