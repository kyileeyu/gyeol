export const faqEntries = [
  {
    q: "결 컨설팅은 GPT 강의와 무엇이 다른가요?",
    a: "강의가 아니라 하네스 엔지니어링입니다. 도구를 분류해 가르치지 않고, 본인 손에 맞는 AI 에이전트 팀 구조를 함께 설계해 실행 부분을 옮겨 둡니다.",
  },
  {
    q: "비밀유지는 어떻게 다루나요?",
    a: "NDA를 먼저 체결합니다. 고객 정보·직업윤리를 다루는 분들의 작업이므로, 외부 노출 케이스는 동의 시에만 직업 카테고리만 익명 가공해 다룹니다.",
  },
  {
    q: "어떻게 진행되나요?",
    a: "30분 1:1 콜로 자리를 정렬한 뒤, 2시간 체험 세션을 거쳐 한 페이지 진단 리포트를 보내드립니다. 의뢰 여부와 무관합니다. 본 작업 합의 시 운영방식을 함께 결정합니다.",
  },
  {
    q: "어떤 분야의 전문직을 다루나요?",
    a: "변호사·의사·세무사·회계사·교수·작가·전문 프리랜서·1인 대표 — 도메인이 아니라 의사결정 구조가 본인 안에 있는 분.",
  },
] as const;

export function buildFaqJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqEntries.map(({ q, a }) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: {
        "@type": "Answer",
        text: a,
      },
    })),
  };
}
