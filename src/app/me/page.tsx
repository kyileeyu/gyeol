// /me 소개·권위 허브 페이지 — 서버 컴포넌트 + metadata export
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  S1Hero,
  S2Story,
  S3Services,
  S4Social,
  S5Trust,
  S6Contact,
} from "@/features/intro-hub";
import Footer from "@/components/sections/Footer";
import { HUB_CONFIG } from "@/features/intro-hub/lib/hub-config";

const ME_TITLE = "유승현 — AI 강의 · 인터랙티브 웹 스튜디오 결";
const ME_DESC =
  "FE 개발자 출신으로 AI 강의, 인터랙티브 웹 제작, 기업 AI 전환까지 함께 봅니다. gyeol.page를 만드는 유승현입니다.";
const ME_OG = `${SITE_URL}/og/me.png`;

export const metadata: Metadata = {
  title: ME_TITLE,
  description: ME_DESC,
  alternates: { canonical: `${SITE_URL}/me` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/me`,
    title: ME_TITLE,
    description: ME_DESC,
    images: [
      {
        url: ME_OG,
        width: 1200,
        height: 630,
        alt: "유승현 — AI 강의 · 인터랙티브 웹 스튜디오 결",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: ME_TITLE,
    description: ME_DESC,
    images: [ME_OG],
  },
  robots: { index: true, follow: true },
};

export default function MePage() {
  return (
    <main>
      <S1Hero />
      <S2Story />
      <S3Services />
      <S4Social />
      {HUB_CONFIG.showTrustSection && <S5Trust />}
      <S6Contact />
      <Footer />
    </main>
  );
}
