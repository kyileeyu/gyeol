import type { Metadata } from "next";
import localFont from "next/font/local";
import { Inter, Noto_Serif_KR } from "next/font/google";
import "./globals.css";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  variable: "--font-pretendard",
  display: "swap",
  weight: "45 920",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  weight: ["300", "400", "500"],
  display: "swap",
});

const notoSerifKr = Noto_Serif_KR({
  subsets: ["latin"],
  variable: "--font-noto-serif-kr",
  weight: ["200", "300", "400", "500", "600", "700", "900"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "결 (Gyeol) — 결이 맞는 페이지",
  description:
    "브랜드와 개인을 위한 3D 인터랙티브 웹 스튜디오. 보이는 것만큼, 보이게도 만듭니다.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${pretendard.variable} ${inter.variable} ${notoSerifKr.variable}`}
    >
      <body>{children}</body>
    </html>
  );
}
