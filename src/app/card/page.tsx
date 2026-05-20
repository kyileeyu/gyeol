// 결 스튜디오 온라인 명함 페이지 — /card 라우트
import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";
import { BusinessCard, CardViewTracker } from "@/features/card";

export const metadata: Metadata = {
  title: "명함 — 유승현 · 결 스튜디오",
  description:
    "결이 맞는 페이지를 만듭니다. 유승현, 결 Gyeol Studio 대표.",
  alternates: { canonical: `${SITE_URL}/card` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/card`,
    title: "유승현 — 결 Gyeol Studio",
    description: "결이 맞는 페이지를 만듭니다.",
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "결 명함 — 유승현",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "유승현 — 결 Gyeol Studio",
    description: "결이 맞는 페이지를 만듭니다.",
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: { index: true, follow: true },
};

export default function CardPage() {
  return (
    <main className="min-h-[100svh] flex flex-col items-center justify-center px-6 py-12 bg-bg relative overflow-hidden">
      {/* 배경 노이즈 레이어 */}
      <svg
        aria-hidden
        className="pointer-events-none absolute inset-0 w-full h-full opacity-[0.025]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <filter id="card-grain">
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.9"
            numOctaves="4"
            stitchTiles="stitch"
          />
          <feColorMatrix type="saturate" values="0" />
        </filter>
        <rect width="100%" height="100%" filter="url(#card-grain)" />
      </svg>

      <BusinessCard />
      <CardViewTracker />
    </main>
  );
}
