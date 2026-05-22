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
  | { name: "work_scroll_complete"; params: { cases_seen: number } }
  | { name: "card_view"; params: Record<string, never> }
  | { name: "card_flip"; params: { to: "front" | "back" } }
  | { name: "card_save_contact"; params: Record<string, never> }
  // /me 소개 허브 이벤트
  | { name: "hub_view"; params: Record<string, never> }
  | { name: "hub_to_ai_click"; params: Record<string, never> }
  | { name: "hub_to_work_click"; params: Record<string, never> }
  | { name: "hub_inquiry_submit"; params: Record<string, never> }
  | {
      name: "hub_social_click";
      params: { platform: "youtube" | "instagram" | "threads" | "soomgo" };
    }
  | { name: "hub_outbound_click"; params: { target: "work" | "card" | string } }
  // /ai 강의 랜딩 이벤트
  | { name: "class_cta_click"; params: Record<string, never> }
  | { name: "class_inquiry_submit"; params: Record<string, never> }
  | { name: "class_to_hub_click"; params: Record<string, never> }
  // v2 신규: AI 사다리 단계 뷰 + 관심 주제 집계
  | { name: "class_ladder_step_view"; params: { step: number } }
  | { name: "class_inquiry_topic"; params: { topic: string } };

export function track<E extends AnalyticsEvent>(
  event: E["name"],
  params: E["params"],
): void;
export function track(event: string, params?: Record<string, unknown>): void;
export function track(event: string, params: Record<string, unknown> = {}) {
  if (typeof window === "undefined") return;
  window.gtag?.("event", event, params);
}
