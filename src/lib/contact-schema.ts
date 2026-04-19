import { z } from "zod";

export const projectTypes = ["Brand Site", "Portfolio", "Landing", "기타"] as const;
export type ProjectType = (typeof projectTypes)[number];

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, "이름 또는 브랜드명을 입력해주세요")
    .max(50, "50자 이내로 입력해주세요"),
  email: z
    .string()
    .trim()
    .min(1, "이메일을 입력해주세요")
    .email("이메일 형식이 올바르지 않습니다"),
  projectType: z.enum(projectTypes, {
    errorMap: () => ({ message: "프로젝트 종류를 선택해주세요" }),
  }),
  message: z
    .string()
    .trim()
    .min(5, "조금만 더 들려주세요 (5자 이상)")
    .max(1000, "1000자 이내로 입력해주세요"),
  referenceUrl: z
    .string()
    .trim()
    .url("URL 형식이 올바르지 않습니다")
    .optional()
    .or(z.literal("")),
  // honeypot — must remain empty
  company: z.string().max(0).optional().or(z.literal("")),
});

export type ContactInput = z.infer<typeof contactSchema>;
