// /me 소개 허브 — SNS 링크·서비스 카드 정적 데이터 (profile.ts와 의존성 격리)
import { PROFILE } from "@/features/card/lib/profile";

export type SocialPlatform = "youtube" | "instagram" | "threads" | "soomgo";

export interface SocialLink {
  platform: SocialPlatform;
  label: string;
  /** 실제 URL을 수집하면 교체. placeholder "#"은 aria-disabled 처리됨 */
  href: string;
  description: string;
}

export interface ServiceCardData {
  tag: string;
  title: string;
  description: string;
  cta: {
    label: string;
    href: string;
    /** true이면 같은 페이지 내 앵커 smooth scroll */
    scroll?: boolean;
  };
  variant: "primary" | "signal";
}

// SNS 링크 — href를 실제 URL로 교체해야 함 (현재 placeholder)
export const SOCIAL_LINKS: SocialLink[] = [
  {
    platform: "youtube",
    label: "YouTube",
    href: "#", // TODO: 실제 유튜브 채널 URL
    description: "AI 도구·개발 흐름 실습",
  },
  {
    platform: "instagram",
    label: "Instagram",
    href: "#", // TODO: 실제 인스타그램 URL
    description: "일상·작업 단편",
  },
  {
    platform: "threads",
    label: "Threads",
    href: "#", // TODO: 실제 스레드 URL
    description: "기술·제작 단상",
  },
  {
    platform: "soomgo",
    label: "숨고",
    href: "#", // TODO: 실제 숨고 AI 강의 프로필 URL
    description: "AI 강의 프로필 직링크",
  },
];

// 서비스 라우팅 카드 데이터
export const SERVICE_CARDS: ServiceCardData[] = [
  {
    tag: "AI Class",
    title: "AI, 나도 쓸 수 있을까요",
    description: "비개발자를 위한 1:1 AI 코딩 강의. 막히는 지점부터.",
    cta: { label: "강의 살펴보기 →", href: "/ai" },
    variant: "primary",
  },
  {
    tag: "Web Studio",
    title: "브랜드에 맞는 페이지가 필요하다면",
    description: "결이 맞는 인터랙티브 웹.",
    cta: { label: "결 스튜디오 보기 →", href: "https://gyeol.page" },
    variant: "primary",
  },
  {
    tag: "AX",
    title: "팀의 AI 전환까지 함께 본다면",
    description:
      "기업 AI 전환(AX) 컨설팅 — 방향과 맥락을 함께 설계합니다.",
    cta: { label: "이야기 나눠보기", href: "/ai#class-contact" },
    variant: "signal",
  },
];

export const HUB_CONFIG = {
  socialLinks: SOCIAL_LINKS,
  serviceCards: SERVICE_CARDS,
  /** S5 신뢰 섹션 표시 여부 (MVP: true = 익명 카피로 노출) */
  showTrustSection: true,
  /** PROFILE에서 이름·사진 등 공유 */
  profile: PROFILE,
} as const;
