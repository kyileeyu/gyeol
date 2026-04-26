import type { StaticImageData } from "next/image";
import dewstoneCover from "./dewstone/cover.webp";
import yoonseulLogCover from "./yoonseul-log/cover.webp";

export const caseCovers: Record<string, StaticImageData> = {
  dewstone: dewstoneCover,
  "yoonseul-log": yoonseulLogCover,
};
