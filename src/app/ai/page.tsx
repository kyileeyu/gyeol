import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { AiLandingPage, buildFaqJsonLd } from "@/features/ai-landing";

const TITLE = "결 컨설팅 (Gyeol Consulting) · 1:1 사전 문의";
const DESCRIPTION =
  "전문직의 실행 부분을 본인 손에 맞는 AI 에이전트 팀 구조로 옮겨주는 비공개 1:1 라인. 결 스튜디오 산하 결 컨설팅.";

export const metadata: Metadata = {
  title: TITLE,
  description: DESCRIPTION,
  alternates: { canonical: `${SITE_URL}/ai` },
  openGraph: {
    type: "website",
    url: `${SITE_URL}/ai`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "결 컨설팅 (Gyeol Consulting) · 1:1 사전 문의",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: TITLE,
    description: DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export default function AiPage() {
  const faqJsonLd = buildFaqJsonLd();
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <AiLandingPage />
    </>
  );
}
