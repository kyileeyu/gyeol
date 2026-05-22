// /ai 강의 랜딩 — AI 사다리 5단계 정적 데이터 (v2 신규)
export interface LadderStepData {
  step: number;
  title: string;
  description: string;
  examples: string[];
  variant: "default" | "signal";
}

export const LADDER_STEPS: LadderStepData[] = [
  {
    step: 1,
    title: "입문 과외",
    description: "용어·환경 세팅·프롬프트법. 코드 한 줄 안 써도 됩니다.",
    examples: [
      "Mac·Windows 환경 세팅부터 Claude와 첫 대화까지.",
      "프롬프트 패턴을 몸에 익힐 때까지 함께합니다.",
    ],
    variant: "default",
  },
  {
    step: 2,
    title: "업무 자동화",
    description: "문서·PPT·데이터·리서치. 반복 업무를 AI가 대신합니다.",
    examples: [
      "보고서·요약·번역·스프레드시트 자동화.",
      "n8n으로 알림·정리·발송 파이프라인 구성.",
    ],
    variant: "default",
  },
  {
    step: 3,
    title: "AI 에이전트 설계",
    description: "내 일을 대신하는 팀. 스킬과 서브에이전트로 파이프라인 설계.",
    examples: [
      "Claude Code로 개인 워크플로우 자동화.",
      "멀티에이전트 구조로 복잡한 작업을 분산 처리.",
    ],
    variant: "default",
  },
  {
    step: 4,
    title: "나만의 서비스 (MVP)",
    description: "아이디어를 작동하는 웹·앱으로. 코드 없이도 출시까지.",
    examples: [
      "AI 기반 랜딩 페이지·예약 폼·콘텐츠 생성기.",
      "Vercel 배포까지 — 아이디어에서 링크 공유까지.",
    ],
    variant: "default",
  },
  {
    step: 5,
    title: "기업 AI 전환 (AX)",
    description: "팀·조직 단위 AI 도입 방향 설계.",
    examples: [
      "업무 흐름 진단 → 적용 우선순위 도출.",
      "팀원 온보딩·내재화 플랜 설계.",
    ],
    variant: "signal",
  },
];
