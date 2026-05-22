// /ai 강의 랜딩 S4 — AI 사다리 (v2 신규. S4Curriculum 대체)
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";
import { LadderStep } from "../components/LadderStep";
import { LADDER_STEPS } from "../lib/ladder";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

const connectorVariants: Variants = {
  hidden: { scaleY: 0 },
  show: {
    scaleY: 1,
    transition: { duration: 0.4, ease: [0.65, 0, 0.35, 1] },
  },
};

export function ClassS4Ladder() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="ladder" threshold={0.1}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-surface">
        <SectionHeading
          heading="어디까지 가고 싶으신가요."
          className="mb-3"
        />
        <p className="text-sm text-muted leading-[1.7] mb-12 max-w-[520px]">
          지금 계신 곳에서 시작합니다. 무엇을 만들고 싶은지 이야기해주시면,
          그것부터 함께 설계합니다.
        </p>

        <motion.div
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col max-w-xl"
        >
          {LADDER_STEPS.map((step, i) => (
            <div key={step.step}>
              <LadderStep data={step} animVariants={itemVariants} />
              {i < LADDER_STEPS.length - 1 && (
                <motion.span
                  aria-hidden="true"
                  variants={reduce ? undefined : connectorVariants}
                  style={{ transformOrigin: "top" }}
                  className="block w-px h-8 bg-shimmer ml-[1px]"
                />
              )}
            </div>
          ))}
        </motion.div>
      </section>
    </SectionView>
  );
}
