import { z } from "zod";

export const blockerOptions = [
  { value: "tool-start", label: "어떤 AI 도구부터 시작해야 할지 막막함" },
  { value: "not-reusable", label: "다시 만들거나 자동화하려면 매번 처음부터" },
  { value: "private-data", label: "내 실무·데이터에 맞추기엔 외부에 묻기 어려움" },
  { value: "unsure", label: "위 셋 중 정확히 모르겠음" },
] as const;

export const callFormatOptions = [
  { value: "phone", label: "통화 선호" },
  { value: "video", label: "화상 회의 선호" },
  { value: "any", label: "상관없음" },
] as const;

export const callFormatValues = callFormatOptions.map((o) => o.value) as [
  string,
  ...string[],
];

export const blockerValues = blockerOptions.map((o) => o.value) as [
  string,
  ...string[],
];

export const blockerLabel: Record<string, string> = Object.fromEntries(
  blockerOptions.map((o) => [o.value, o.label]),
);

export const intakeSchema = z.object({
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
  role: z
    .string()
    .trim()
    .min(1, "직무·업종을 입력해주세요")
    .max(100, "100자 이내로 입력해주세요"),
  blocker: z.enum(blockerValues, {
    errorMap: () => ({ message: "가장 가까운 자리를 골라주세요" }),
  }),
  decision: z
    .string()
    .trim()
    .min(5, "조금만 더 들려주세요 (5자 이상)")
    .max(800, "800자 이내로 입력해주세요"),
  callFormat: z.enum(callFormatValues).optional(),
  _trap: z.string().max(0).optional().or(z.literal("")),
});

export type IntakeInput = z.infer<typeof intakeSchema>;
