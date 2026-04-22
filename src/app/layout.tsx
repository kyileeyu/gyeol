import type { Metadata, Viewport } from "next";
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

const SITE_URL = "https://gyeol.page";
const SITE_NAME = "결 (Gyeol)";
const SITE_DESCRIPTION =
  "결이 맞는 페이지를 만드는 웹 스튜디오. 브랜드와 개인을 위한 3D 인터랙티브 웹 스튜디오 — 보이는 것만큼, 보이게도 만듭니다.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — 결이 맞는 페이지`,
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  keywords: [
    "웹 스튜디오",
    "인터랙티브 웹",
    "3D 웹사이트",
    "브랜드 웹사이트",
    "포트폴리오 웹사이트",
    "Next.js",
    "Three.js",
    "SEO",
    "AEO",
    "결",
    "Gyeol",
  ],
  authors: [{ name: SITE_NAME }],
  creator: SITE_NAME,
  publisher: SITE_NAME,
  alternates: {
    canonical: SITE_URL,
    languages: {
      "ko-KR": SITE_URL,
    },
  },
  openGraph: {
    type: "website",
    locale: "ko_KR",
    url: SITE_URL,
    siteName: SITE_NAME,
    title: `${SITE_NAME} — 결이 맞는 페이지`,
    description: SITE_DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "결 — 결이 맞는 페이지",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${SITE_NAME} — 결이 맞는 페이지`,
    description: SITE_DESCRIPTION,
    images: [`${SITE_URL}/og-image.png`],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-snippet": -1,
      "max-image-preview": "large",
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#FAFBFC",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    name: SITE_NAME,
    alternateName: "Gyeol Studio",
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    areaServed: "KR",
    serviceType: [
      "Web Design",
      "Web Development",
      "Interactive Web",
      "SEO",
      "AEO",
    ],
    email: "hello@gyeol.page",
    slogan: "보이는 것만큼, 보이게도 만듭니다",
  },
  {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "결 스튜디오는 어떤 작업을 하나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "자신만의 스토리·관점·세계관을 가진 브랜드와 개인을 위해 3D 인터랙티브 웹사이트를 설계·개발합니다. Three.js와 GLSL 셰이더 기반의 인터랙션과 SEO·AEO 최적화를 함께 설계합니다.",
        },
      },
      {
        "@type": "Question",
        name: "작업 프로세스는 어떻게 되나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "결을 잡다(Aligning) → 결을 그리다(Designing) → 결을 새기다(Building) → 결을 잇다(Caring) 4단계로 진행합니다. 각 단계마다 작동하는 결과물을 공유합니다.",
        },
      },
      {
        "@type": "Question",
        name: "출시 이후에도 함께 관리할 수 있나요?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "네, 배포 후 일정 기간 함께 모니터링하며 검색 노출과 사용자 흐름을 다듬습니다. 이후의 운영도 리테이너 형태로 이어갈 수 있습니다.",
        },
      },
    ],
  },
];

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
      <body>
        {children}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
