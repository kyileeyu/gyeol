// /ai 강의 랜딩 — 페인포인트 정적 데이터 (curriculum.ts에서 분리)
export interface PainPoint {
  label: string;
  problem: string;
  solution: string;
}

export const PAIN_POINTS: PainPoint[] = [
  {
    label: "First Wall",
    problem: "환경 세팅이 첫 번째 벽",
    solution: "Mac·Windows 맞춤 세팅 가이드로 1회 완파",
  },
  {
    label: "Language Barrier",
    problem: "용어를 모르면 질문도 못 한다",
    solution: "용어집 핸드아웃 + 첫 회차에서 정리",
  },
  {
    label: "Prompt Loop",
    problem: "프롬프트를 어떻게 써야 할지 모른다",
    solution: "대화 루프 패턴을 몸에 익힐 때까지 함께",
  },
];
