import { cache } from "react";
import { generatedCases } from "./cases.generated";
import { caseCovers } from "../cases/manifest";
import { caseFrontmatterSchema } from "./schema";
import type { CaseMeta } from "./types";
import { estimateReadingMinutes } from "./reading-time";

function findCase(slug: string) {
  return generatedCases.find((c) => c.slug === slug) ?? null;
}

function buildMeta(slug: string, frontmatter: unknown, content: string): CaseMeta {
  const parsed = caseFrontmatterSchema.safeParse(frontmatter);
  if (!parsed.success) {
    throw new Error(
      `[work] frontmatter 검증 실패: ${slug}\n${parsed.error.issues
        .map((i) => `  - ${i.path.join(".")}: ${i.message}`)
        .join("\n")}`,
    );
  }
  const cover = caseCovers[slug];
  if (!cover) {
    throw new Error(
      `[work] cases/manifest.ts 에 ${slug} 의 cover 가 등록되지 않았습니다.`,
    );
  }
  return {
    ...parsed.data,
    slug,
    coverSrc: cover,
    readingMinutes: estimateReadingMinutes(content),
  };
}

export const getAllCases = cache(async (): Promise<CaseMeta[]> => {
  const cases = generatedCases.map(({ slug, data, content }) =>
    buildMeta(slug, data, content),
  );

  return cases
    .filter((c) => process.env.NODE_ENV === "development" || !c.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const readCase = cache(
  async (slug: string): Promise<{ meta: CaseMeta; content: string } | null> => {
    if (slug.startsWith("_")) return null;
    const raw = findCase(slug);
    if (!raw) return null;
    const meta = buildMeta(slug, raw.data, raw.content);
    if (meta.draft && process.env.NODE_ENV === "production") return null;
    return { meta, content: raw.content };
  },
);

export async function getAdjacentCases(slug: string) {
  const all = await getAllCases();
  const idx = all.findIndex((c) => c.slug === slug);
  return {
    prev: idx > 0 ? all[idx - 1] : null,
    next: idx >= 0 && idx < all.length - 1 ? all[idx + 1] : null,
  };
}
