// /ai 강의 랜딩 — 상담 신청 폼 Zod 스키마 (기존 contactSchema와 독립)
// v2: track enum 5종으로 확장 (영상 자동화·디자인→코드 제거, AI 에이전트·MVP·AX 추가)
import { z } from "zod";

export const classTrackOptions = [
  "업무 자동화 (문서·데이터·반복 업무)",
  "AI 에이전트 설계",
  "나만의 서비스 만들기 (MVP)",
  "기업 AI 전환 (AX)",
  "아직 모르겠어요",
] as const;

export type ClassTrack = (typeof classTrackOptions)[number];

export const classContactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름을 입력해주세요")
    .max(50, "50자 이내로 입력해주세요"),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요")
    .email("이메일 형식이 올바르지 않습니다"),
  track: z.enum(classTrackOptions, {
    errorMap: () => ({ message: "관심 주제를 선택해주세요" }),
  }),
  message: z
    .string()
    .trim()
    .min(5, "조금만 더 들려주세요 (5자 이상)")
    .max(800, "800자 이내로 입력해주세요"),
  // honeypot
  _trap: z.string().max(0).optional().or(z.literal("")),
});

export type ClassContactInput = z.infer<typeof classContactSchema>;
