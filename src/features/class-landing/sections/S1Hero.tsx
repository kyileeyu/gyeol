// /ai 강의 랜딩 S1 — Hero (v2: 헤드라인·서브카피 업데이트)
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { track } from "@/lib/analytics";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.28, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] },
  },
};

export function ClassS1Hero() {
  const reduce = useReducedMotion();

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    track("class_cta_click", {});
    const target = document.querySelector("#class-contact");
    target?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <SectionView name="hero" threshold={0.2}>
      <section className="relative w-full min-h-[80svh] flex flex-col items-start justify-center px-6 sm:px-10 md:px-16 lg:px-[120px] py-24 lg:py-32 bg-bg">
        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          animate="show"
          className="flex flex-col items-start gap-6 max-w-2xl"
        >
          <motion.h1
            variants={itemVariants}
            className="font-kr-serif text-[clamp(2.25rem,6vw,4.25rem)] font-medium tracking-[-0.04em] leading-[1.1] text-ink"
          >
            목표에 맞게,
            <br />
            매번 새로
            <br />
            설계합니다.
          </motion.h1>

          <motion.p
            variants={itemVariants}
            className="max-w-[480px] text-[0.9375rem] sm:text-base text-muted leading-[1.8]"
          >
            AI 컨설팅·과외 — 용어 입문부터 기업 AI 전환까지.
            <br />
            직무와 목표에 맞춰 매번 새로 설계합니다.
          </motion.p>

          <motion.div variants={itemVariants}>
            <a
              href="#class-contact"
              aria-label="상담 신청 폼으로 이동"
              onClick={handleCtaClick}
              className="btn-deep inline-block bg-deep text-bg px-8 py-4 text-sm sm:text-base font-medium tracking-[0.04em] rounded transition-colors duration-300 hover:bg-deep/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave"
            >
              상담 신청하기
            </a>
          </motion.div>
        </motion.div>
      </section>
    </SectionView>
  );
}
