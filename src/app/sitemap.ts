import type { MetadataRoute } from "next";
import { getAllCases } from "@/features/work";

const SITE_URL = "https://gyeol.page";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const cases = await getAllCases();
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    ...cases.map((c) => ({
      url: `${SITE_URL}/work/${c.slug}`,
      lastModified: new Date(c.publishedAt),
      changeFrequency: "yearly" as const,
      priority: 0.7,
    })),
  ];
}
