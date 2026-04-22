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
  title: "스튜디오 결",
  description: "결이 다른 웹사이트. 보이지 않는 가치까지 새깁니다.",
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
