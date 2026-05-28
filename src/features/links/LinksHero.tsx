"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { LINKS_PROFILE } from "./data";

const easingFlow = [0.65, 0, 0.35, 1] as const;

export function LinksHero() {
  return (
    <motion.header
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: easingFlow }}
      className="flex flex-col items-center gap-3 pt-2 text-center"
    >
      <div className="relative h-24 w-24 overflow-hidden rounded-full ring-1 ring-hairline bg-canvas shadow-[var(--gy-shadow-sm)]">
        <Image
          src={LINKS_PROFILE.avatarSrc}
          alt={`${LINKS_PROFILE.name} 프로필 사진`}
          fill
          sizes="96px"
          priority
          className="object-cover object-[50%_22%]"
        />
      </div>
      <div className="flex flex-col gap-1.5">
        <h1 className="text-[24px] font-bold tracking-[-0.5px] leading-[1.25] text-ink">
          {LINKS_PROFILE.name}
        </h1>
        <p className="font-en text-[12px] font-semibold tracking-[0.2px] text-ink-muted uppercase">
          {LINKS_PROFILE.englishName}
        </p>
        <p className="text-[14px] font-medium leading-[1.6] text-ink-muted [word-break:keep-all]">
          {LINKS_PROFILE.tagline}
        </p>
      </div>
    </motion.header>
  );
}
