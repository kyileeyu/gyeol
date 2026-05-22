// /ai 강의 랜딩 S2 — 누구를 위한 강의인가
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

const CHECKLIST = [
  "AI 도구를 써봤는데, 환경 세팅에서 막혔어요.",
  "어디에, 어떻게 쓰면 되는지 모르겠어요.",
  "코드를 몰라도 자동화·결과물을 만들고 싶어요.",
];

export function ClassS2Audience() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="audience" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-surface">
        <div className="max-w-2xl">
          <SectionHeading heading="이런 분들께 맞습니다." className="mb-10" />

          <motion.div
            variants={containerVariants}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {CHECKLIST.map((item, i) => (
              <motion.div
                key={i}
                variants={itemVariants}
                className="flex items-start gap-4"
              >
                <span aria-hidden="true" className="mt-0.5 flex-shrink-0">
                  <CheckIcon />
                </span>
                <p className="text-[1rem] text-ink leading-[1.7]">{item}</p>
              </motion.div>
            ))}

            <motion.div
              variants={itemVariants}
              className="mt-4 border-l-2 border-wave pl-4"
            >
              <p className="font-kr-serif italic text-[1rem] text-muted leading-[1.7]">
                이 중 하나라도 해당한다면, 이 강의가 맞습니다.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </SectionView>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="var(--color-wave)" strokeWidth="1.5" />
      <path
        d="M5 8l2 2 4-4"
        stroke="var(--color-wave)"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
