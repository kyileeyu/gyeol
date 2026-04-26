import { z } from "zod";

const isoDate = z
  .union([z.string(), z.date()])
  .transform((v) => (v instanceof Date ? v.toISOString().slice(0, 10) : v))
  .pipe(z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "YYYY-MM-DD 형식이어야 합니다"));

export const caseFrontmatterSchema = z.object({
  title: z.string().min(1),
  tag: z.string().min(1),
  label: z.string().min(1),
  summary: z.string().min(10).max(200),
  publishedAt: isoDate,
  role: z.string().min(1),
  period: z.string().min(1),
  stack: z.array(z.string()).min(1).max(8),
  liveUrl: z.string().url().optional(),
  draft: z.boolean().optional().default(false),
});

export type CaseFrontmatter = z.infer<typeof caseFrontmatterSchema>;
