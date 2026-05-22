// /me 소개 허브 — 가벼운 문의 폼 Zod 스키마 (기존 contactSchema와 독립)
import { z } from "zod";

export const hubContactSchema = z.object({
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
  message: z
    .string()
    .trim()
    .min(5, "조금만 더 들려주세요 (5자 이상)")
    .max(800, "800자 이내로 입력해주세요"),
  // honeypot — 채워지면 봇으로 판단
  _trap: z.string().max(0).optional().or(z.literal("")),
});

export type HubContactInput = z.infer<typeof hubContactSchema>;
