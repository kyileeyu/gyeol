type GtagFn = (...args: unknown[]) => void;

declare global {
  interface Window {
    gtag?: GtagFn;
  }
}

export type AnalyticsEvent =
  | { name: "cta_form_click"; params: { form: string } }
  | { name: "cta_external_click"; params: { target: string } }
  | {
      name: "social_click";
      params: { channel: string; where: "header" | "footer" | "about" };
    }
  | { name: "mailto_click"; params: { where: string } }
  | { name: "scroll_depth"; params: { percent: 25 | 50 | 75 | 100 } }
  | { name: "section_view"; params: { section: string } }
  | { name: "hero_interact"; params: { duration_ms: number } }
  | { name: "work_scroll_complete"; params: { cases_seen: number } };

export function track<E extends AnalyticsEvent>(
  event: E["name"],
  params: E["params"],
): void;
export function track(event: string, params?: Record<string, unknown>): void;
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
