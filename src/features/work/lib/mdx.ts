import { cache } from "react";
import fs from "node:fs/promises";
import path from "node:path";
import matter from "gray-matter";
import { caseCovers } from "../cases/manifest";
import { caseFrontmatterSchema } from "./schema";
import type { CaseMeta } from "./types";
import { estimateReadingMinutes } from "./reading-time";

const CASES_DIR = path.join(process.cwd(), "src/features/work/cases");

async function readCaseFile(slug: string) {
  const filePath = path.join(CASES_DIR, slug, "index.mdx");
  const raw = await fs.readFile(filePath, "utf8");
  return matter(raw);
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
  const entries = await fs.readdir(CASES_DIR, { withFileTypes: true });
  const slugs = entries
    .filter((e) => e.isDirectory() && !e.name.startsWith("_"))
    .map((e) => e.name);

  const cases = await Promise.all(
    slugs.map(async (slug) => {
      const { data, content } = await readCaseFile(slug);
      return buildMeta(slug, data, content);
    }),
  );

  return cases
    .filter((c) => process.env.NODE_ENV === "development" || !c.draft)
    .sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
});

export const readCase = cache(
  async (slug: string): Promise<{ meta: CaseMeta; content: string } | null> => {
    if (slug.startsWith("_")) return null;
    let raw: { data: unknown; content: string };
    try {
      raw = await readCaseFile(slug);
    } catch {
      return null;
    }
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
