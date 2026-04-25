"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.28, delayChildren: 0.3 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 36 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.6, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative h-[100svh] w-full">
      <motion.div
        variants={containerVariants}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="pointer-events-none relative z-10 flex h-full w-full flex-col items-start justify-center px-6 sm:pl-10 md:pl-16 lg:pl-[120px] lg:pr-6 text-left"
      >
        <motion.h1
          variants={itemVariants}
          className="mt-6 font-kr-serif text-[clamp(2.75rem,7vw,5.75rem)] font-medium tracking-[-0.04em] leading-[1.05] text-ink"
        >
          결이 맞는 페이지
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-16 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          브랜드와 개인을 위한
          <br className="sm:hidden" /> 3D 인터랙티브 웹 스튜디오
        </motion.p>
        <motion.p
          variants={itemVariants}
          className="mt-4 font-en italic text-muted text-sm tracking-[0.2em] sm:text-base"
        >
          A web studio for those with their own gyeol
        </motion.p>

        <motion.div
          variants={itemVariants}
          aria-hidden
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
  );
}
