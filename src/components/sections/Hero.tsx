"use client";

import dynamic from "next/dynamic";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";

const LiquidCanvas = dynamic(() => import("@/components/hero/LiquidCanvas"), {
  ssr: false,
});

const containerVariants: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.2 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function Hero() {
  const reduce = useReducedMotion();
  const ctaRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollToPlugin);
  }, []);

  function handleCtaClick(e: React.MouseEvent<HTMLAnchorElement>) {
    e.preventDefault();
    gsap.to(window, {
      duration: reduce ? 0 : 1.0,
      scrollTo: { y: "#contact", offsetY: 0 },
      ease: "power3.inOut",
    });
  }

  return (
    <section className="relative h-[100svh] w-full overflow-hidden bg-bg">
      {reduce ? (
        <div
          aria-hidden
          className="absolute inset-0 z-0"
          style={{
            background:
              "radial-gradient(120% 80% at 30% 20%, var(--color-bingcheong) 0%, var(--color-eunbak) 35%, var(--color-seolbaek) 70%)",
          }}
        />
      ) : (
        <LiquidCanvas />
      )}

      <motion.div
        variants={containerVariants}
        initial={reduce ? "show" : "hidden"}
        animate="show"
        className="pointer-events-none relative z-10 flex h-full w-full flex-col items-center justify-center px-6 text-center"
      >
        <motion.p
          variants={itemVariants}
          className="font-en-serif italic text-muted text-sm tracking-[0.2em] sm:text-base"
        >
          A web studio for those with their own gyeol
        </motion.p>

        <motion.h1
          variants={itemVariants}
          className="mt-6 font-kr-serif text-[clamp(2.75rem,7vw,5.75rem)] font-medium tracking-[-0.04em] leading-[1.05] text-ink"
        >
          결이 맞는 페이지
        </motion.h1>

        <motion.p
          variants={itemVariants}
          className="mt-6 max-w-xl text-base sm:text-lg text-muted leading-relaxed"
        >
          브랜드와 개인을 위한
          <br className="sm:hidden" />
          {" "}3D 인터랙티브 웹 스튜디오
        </motion.p>

        <motion.a
          ref={ctaRef}
          variants={itemVariants}
          href="#contact"
          onClick={handleCtaClick}
          className="btn-deep pointer-events-auto mt-12 inline-flex items-center justify-center rounded-full bg-deep px-8 py-4 text-bg text-sm sm:text-base tracking-[0.04em] transition-transform duration-500 ease-out hover:-translate-y-0.5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
        >
          결을 맞춰보기
        </motion.a>

        <motion.div
          variants={itemVariants}
          aria-hidden
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
        >
          <span className="block h-10 w-px bg-muted/40" style={{ transformOrigin: "top", animation: "wave-pulse 2.4s ease-in-out infinite" }} />
        </motion.div>
      </motion.div>
    </section>
  );
}
