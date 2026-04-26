import type { StaticImageData } from "next/image";
import type { CaseFrontmatter } from "./schema";

export type CaseMeta = CaseFrontmatter & {
  slug: string;
  coverSrc: StaticImageData;
  readingMinutes: number;
};
