import { SITE_EMAIL, SITE_URL } from "@/lib/site";
import type { LinksBlock, SocialItem } from "./types";

export const LINKS_PROFILE = {
  name: "결 (Gyeol)",
  englishName: "Gyeol Studio",
  tagline: "당신의 결을 읽고, 일의 결을 바꿉니다.",
  avatarSrc: "/links/avatar.png",
} as const;

export const LINKS_BLOCKS: LinksBlock[] = [
  {
    kind: "link",
    item: {
      id: "studio-main",
      kind: "internal",
      label: "결 스튜디오",
      sublabel: "포트폴리오 확인하러 가기",
      eyebrow: "인터렉티브한 웹사이트를 만들고 싶다면",
      href: "/",
      icon: "globe",
      highlight: true,
    },
  },
  {
    kind: "link",
    item: {
      id: "ai-consulting",
      kind: "internal",
      label: "결 AI 1:1 컨설팅",
      sublabel: "내 문제도 해결할 수 있는지 물어보기",
      eyebrow: "AI 자동화 · 바이브 코딩이 궁금하다면",
      href: "/ai",
      icon: "spark",
      highlight: true,
    },
  },
  {
    kind: "link",
    item: {
      id: "inquiry",
      kind: "mail",
      label: "협업 문의하기",
      href: `mailto:${SITE_EMAIL}`,
      icon: "message",
      highlight: true,
    },
  },
];

export const LINKS_SOCIAL: SocialItem[] = [
  {
    platform: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/gyeolpage/",
  },
  {
    platform: "threads",
    label: "Threads",
    href: "https://www.threads.com/@gyeolpage",
  },
  {
    platform: "youtube",
    label: "YouTube",
    href: "https://www.youtube.com/channel/UCKggIwxWo7Jz6vJc4n2v2xQ",
  },
  {
    platform: "github",
    label: "GitHub",
    href: "https://github.com/kyileeyu",
  },
];

export const LINKS_PAGE_URL = `${SITE_URL}/links`;

export const KAKAO_OPENCHAT_URL = "https://open.kakao.com/o/sxkzGYwi";
