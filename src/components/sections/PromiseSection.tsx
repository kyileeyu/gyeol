"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.22, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function PromiseSection() {
  const reduce = useReducedMotion();

  return (
    <section
      id="promise"
      className="relative w-full bg-bg px-6 py-32 sm:py-48"
    >
      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.4 }}
        className="mx-auto flex max-w-3xl flex-col items-start gap-10"
      >
        <motion.span
          variants={item}
          aria-hidden
          className="block h-px w-16 bg-wave"
        />
        <motion.p
          variants={item}
          className="font-en italic text-xs tracking-[0.3em] text-muted uppercase"
        >
          Promise
        </motion.p>
        <motion.h2
          variants={item}
          className="font-kr-serif text-[clamp(2.25rem,5.5vw,4.25rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink"
        >
          보이는 것만큼,
          <br />
          보이게도 만듭니다.
        </motion.h2>
        <motion.p
          variants={item}
          className="max-w-xl text-base sm:text-lg leading-[1.9] text-muted"
        >
          결이 맞는 인터랙션과 검색에 잡히는 구조를 함께 설계합니다.
          표면의 아름다움과 구조의 정확함 — 두 결이 같은 방향으로 흐를 때,
          페이지는 오래 쓰입니다.
        </motion.p>
      </motion.div>
    </section>
  );
}
