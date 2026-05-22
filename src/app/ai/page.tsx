// /ai 강의 랜딩 페이지 — 서버 컴포넌트 + metadata export (v2)
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import {
  ClassS1Hero,
  ClassS2Audience,
  ClassS3PainPoints,
  ClassS4Ladder,
  ClassS5Differentiators,
  ClassS6HowItWorks,
  ClassS7Contact,
} from "@/features/class-landing";
import Footer from "@/components/sections/Footer";

const AI_TITLE = "AI 컨설팅·과외 — 용어 입문부터 기업 AI 전환까지";
const AI_DESC =
  "목표에 맞게, 매번 새로 설계합니다. 용어 입문부터 업무 자동화, AI 에이전트 설계, 나만의 서비스(MVP), 기업 AI 전환(AX)까지 직무에 맞는 1:1 AI 컨설팅·과외.";
const AI_OG = `${SITE_URL}/og/class.png`;

export const metadata: Metadata = {
  title: AI_TITLE,
  description: AI_DESC,
  alternates: { canonical: `${SITE_URL}/ai` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/ai`,
    title: AI_TITLE,
    description: AI_DESC,
    images: [
      {
        url: AI_OG,
        width: 1200,
        height: 630,
        alt: "AI 컨설팅·과외 — 목표에 맞게, 매번 새로 설계합니다.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: AI_TITLE,
    description: AI_DESC,
    images: [AI_OG],
  },
  robots: { index: true, follow: true },
};

export default function AiPage() {
  return (
    <main>
      <ClassS1Hero />
      <ClassS2Audience />
      <ClassS3PainPoints />
      <ClassS4Ladder />
      <ClassS5Differentiators />
      <ClassS6HowItWorks />
      <ClassS7Contact />
      <Footer />
    </main>
  );
}
