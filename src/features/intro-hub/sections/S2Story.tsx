// /me 소개 허브 S2 — 스토리·관점
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "../components/SectionHeading";

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

export function S2Story() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="story" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <div className="max-w-[640px]">
          <SectionHeading heading="왜 이 일을 하는가." className="mb-10" />

          <motion.div
            variants={containerVariants}
            initial={reduce ? "show" : "hidden"}
            whileInView="show"
            viewport={{ once: true, amount: 0.2 }}
            className="flex flex-col gap-5"
          >
            {/* 빙청 구분선 */}
            <motion.span
              variants={itemVariants}
              aria-hidden="true"
              className="block h-px w-4 bg-wave"
            />

            <motion.p
              variants={itemVariants}
              className="text-[1rem] text-muted leading-[1.8]"
            >
              FE 개발을 시작하면서 &ldquo;눈에 보이는 것이 즉각 바뀐다&rdquo;는 데 매력을
              느꼈습니다. 그러다 일하면서 AI 도구를 직접 붙여보니,{" "}
              <span className="text-ink">막히는 지점이 분명히 있다</span>는 걸
              알게 됐습니다. 처음엔 환경 세팅, 그다음엔 &ldquo;어디에 쓰지?&rdquo;였습니다.
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-[1rem] text-muted leading-[1.8]"
            >
              그 막힘을 풀어주는 강의를 시작했고, 동시에 브랜드와 개인을 위한
              인터랙티브 웹을 만드는 스튜디오도 이어왔습니다. 기업이 AI를
              제대로 쓰는 방향을 함께 설계하는 일까지 자연스럽게 이어졌습니다.
            </motion.p>

            {/* 핵심 관점 인용 */}
            <motion.blockquote
              variants={itemVariants}
              className="border-l-2 border-wave pl-4 mt-2"
            >
              <p className="font-kr-serif text-[1.125rem] text-ink leading-[1.7]">
                기술은 결국 사람이 쓰는 것.
                <br />
                막히지 않게 설계하는 것이 내 일입니다.
              </p>
            </motion.blockquote>
          </motion.div>
        </div>
      </section>
    </SectionView>
  );
}
