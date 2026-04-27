import {
  SITE_URL,
  SITE_NAME,
  SITE_BRAND,
  SITE_DESCRIPTION,
  SITE_SLOGAN,
  SITE_EMAIL,
  OPERATOR_NAME,
  OPERATOR_JOB_TITLE,
  OPERATOR_SAME_AS,
} from "@/lib/site";

export function JsonLd() {
  const payload = [
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      name: SITE_NAME,
      alternateName: "Gyeol Studio",
      url: SITE_URL,
      description: SITE_DESCRIPTION,
      inLanguage: "ko-KR",
    },
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: SITE_BRAND,
      alternateName: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon.png`,
      email: SITE_EMAIL,
      sameAs: OPERATOR_SAME_AS,
      founder: {
        "@type": "Person",
        name: OPERATOR_NAME,
      },
    },
    {
      "@context": "https://schema.org",
      "@type": "Person",
      name: OPERATOR_NAME,
      jobTitle: OPERATOR_JOB_TITLE,
      worksFor: { "@type": "Organization", name: SITE_BRAND },
      sameAs: OPERATOR_SAME_AS,
      url: SITE_URL,
    },
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
      email: SITE_EMAIL,
      slogan: SITE_SLOGAN,
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

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(payload) }}
    />
  );
}
