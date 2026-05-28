import type { Metadata } from "next";
import { OPERATOR_SAME_AS, SITE_EMAIL, SITE_URL } from "@/lib/site";
import { LinksHero } from "@/features/links/LinksHero";
import { LinksAbout } from "@/features/links/LinksAbout";
import { SocialIconRow } from "@/features/links/SocialIconRow";
import { LinkList } from "@/features/links/LinkList";
import { ShareTrigger } from "@/features/links/ShareTrigger";
import { KakaoFloatingButton } from "@/features/links/KakaoFloatingButton";
import { LinksViewTracker } from "@/features/links/LinksViewTracker";

const LINKS_TITLE = "Links — 결 (Gyeol Studio)";
const LINKS_DESC =
  "결 스튜디오의 모든 입구 — 메인 사이트, AI 컨설팅, 자기소개, 포트폴리오, 문의, SNS.";
const LINKS_URL = `${SITE_URL}/links`;
const LINKS_OG = `${SITE_URL}/og-image.png`;

export const metadata: Metadata = {
  title: LINKS_TITLE,
  description: LINKS_DESC,
  alternates: { canonical: LINKS_URL },
  openGraph: {
    type: "profile",
    url: LINKS_URL,
    title: LINKS_TITLE,
    description: LINKS_DESC,
    images: [
      {
        url: LINKS_OG,
        width: 1200,
        height: 630,
        alt: "결 스튜디오 Links",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: LINKS_TITLE,
    description: LINKS_DESC,
    images: [LINKS_OG],
  },
  robots: { index: true, follow: true },
};

const linksJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "결 (Gyeol Studio)",
  url: SITE_URL,
  email: SITE_EMAIL,
  sameAs: OPERATOR_SAME_AS,
};

export default function LinksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: JSON.stringify(linksJsonLd) }}
      />
      <LinksViewTracker />
      <ShareTrigger />
      <LinksHero />
      <LinksAbout />
      <LinkList />
      <SocialIconRow />
      <footer className="mt-10 text-center text-[11px] font-medium tracking-[0.4px] text-ink-subtle">
        © {new Date().getFullYear()} 결 Gyeol Studio
      </footer>
      <KakaoFloatingButton />
    </>
  );
}
