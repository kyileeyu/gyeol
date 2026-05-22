// /me 소개 허브 S5 — 신뢰·실적 (MVP: 익명 카피)
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { track } from "@/lib/analytics";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

export function S5Trust() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="trust" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-xl flex flex-col gap-8"
        >
          <motion.p
            variants={itemVariants}
            className="text-[clamp(1.25rem,2.5vw,1.75rem)] font-kr-serif font-medium text-ink leading-[1.5]"
          >
            검증된 커리큘럼.
          </motion.p>

          <motion.p
            variants={itemVariants}
            className="text-[1rem] text-muted leading-[1.8]"
          >
            업종이 제각각인 비개발 직장인들이 똑같이 막힌 지점을 직접 확인하고
            다듬은 커리큘럼입니다. 환경 세팅부터 실무 적용까지, 막힘을 알아야
            풀 수 있습니다.
          </motion.p>

          <motion.div variants={itemVariants}>
            <Link
              href="https://gyeol.page/#work"
              className="inline-block text-sm font-medium text-deep transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave rounded"
              onClick={() => track("hub_outbound_click", { target: "work" })}
            >
              포트폴리오 보기 →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </SectionView>
  );
}
