// /me 소개 허브 S1 — Hero / 정체성
"use client";

import Image from "next/image";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { PROFILE } from "@/features/card/lib/profile";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  },
};

export function S1Hero() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="hero" threshold={0.2}>
      <section className="relative w-full min-h-[80svh] flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 lg:px-[120px] py-24 lg:py-32 bg-bg">
        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="flex flex-col items-start gap-6 max-w-2xl"
        >
          {/* 프로필 사진 */}
          <motion.div variants={itemVariants}>
            <div className="relative w-24 h-24 md:w-32 md:h-32 rounded-full overflow-hidden ring-1 ring-ink/10">
              <Image
                src={PROFILE.profile_image}
                alt="유승현 프로필 사진"
                fill
                sizes="(max-width: 768px) 96px, 128px"
                className="object-cover"
                priority
                placeholder="blur"
                blurDataURL="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTI4IiBoZWlnaHQ9IjEyOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjBmNGY4Ii8+PC9zdmc+"
                onError={(e) => {
                  const img = e.currentTarget as HTMLImageElement;
                  img.src = PROFILE.profile_placeholder;
                }}
              />
            </div>
          </motion.div>

          {/* 헤드라인 */}
          <motion.h1
            variants={itemVariants}
            className="font-kr-serif text-[clamp(2.25rem,6vw,4.5rem)] font-medium tracking-[-0.04em] leading-[1.1] text-ink"
          >
            유승현입니다
          </motion.h1>

          {/* 서브텍스트 */}
          <motion.p
            variants={itemVariants}
            className="max-w-[480px] text-[0.9375rem] text-muted leading-[1.8]"
          >
            FE 개발자 출신으로 AI 강의, 인터랙티브 웹 제작,
            기업 AI 전환까지 함께 봅니다.
          </motion.p>

          {/* 스크롤 유도 */}
          <motion.div
            variants={itemVariants}
            aria-hidden="true"
            className="mt-8"
          >
            <span
              className="block h-10 w-px bg-muted/40"
              style={{
                transformOrigin: "top",
                animation: "wave-pulse 2.4s ease-in-out infinite",
              }}
            />
          </motion.div>
        </motion.div>
      </section>
    </SectionView>
  );
}
