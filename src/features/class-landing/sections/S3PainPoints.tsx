// /ai 강의 랜딩 S3 — 왜 막히나, 어떻게 푸나
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";
import { PAIN_POINTS } from "../lib/pain-points";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

export function ClassS3PainPoints() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="painpoints" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <SectionHeading heading="막히는 이유가 있습니다." className="mb-12" />

        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ink/15 rounded-sm overflow-hidden"
        >
          {PAIN_POINTS.map((point) => (
            <motion.article
              key={point.label}
              variants={cardVariants}
              aria-label={`${point.problem} 해결 방법`}
              className="group flex flex-col gap-4 p-8 sm:p-10 bg-bg/60 border-t border-ink/15 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-wave"
            >
              <p className="font-en italic text-[0.65rem] tracking-[0.25em] text-muted uppercase">
                {point.label}
              </p>
              <h3 className="font-kr-serif text-xl font-medium text-ink leading-[1.35]">
                {point.problem}
              </h3>
              <span
                aria-hidden="true"
                className="block h-px bg-wave/40 my-1"
              />
              <p className="text-sm text-muted leading-[1.7]">
                {point.solution}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </section>
    </SectionView>
  );
}
