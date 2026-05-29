"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import { AgentGraph } from "./AgentGraph";
import { SplitTextReveal } from "./SplitTextReveal";

const HeroShader = dynamic(
  () => import("./HeroShader").then((m) => m.HeroShader),
  { ssr: false },
);

const HERO = {
  eyebrow: "결 1:1·그룹 컨설팅 (Gyeol Consulting) ",
  h1: ["지금 그 업무,", "사람이 해야 하는 일이 맞습니까."],
  p1: ["Claude Code 과외가 아닙니다.", "당신의 판단만 가져오세요."],
  p2: [""],
  cta: "30분 미팅 예약",
} as const;

export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        aria-hidden="true"
        className="bg-mesh-hero absolute inset-0 -z-10"
        style={{ opacity: 0.4 }}
      />
      <HeroShader />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, color-mix(in srgb, var(--gy-canvas) 0%, transparent) 0%, color-mix(in srgb, var(--gy-canvas) 55%, transparent) 78%, var(--gy-canvas) 100%)",
        }}
      />

      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "1400px",
          padding:
            "clamp(2.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 4rem) clamp(2rem, 5vw, 4.5rem)",
        }}
      >
        <div
          className="grid grid-cols-1 lg:grid-cols-2 items-center"
          style={{
            gap: "clamp(1.5rem, 6vw, 5rem)",
          }}
        >
          <div>
            <motion.p
              className="font-en"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.125em",
                lineHeight: 1.2,
                textTransform: "uppercase",
                color: "var(--gy-deep)",
              }}
            >
              {HERO.eyebrow}
            </motion.p>

            <SplitTextReveal
              as="h1"
              id="hero-title"
              className="font-kr"
              trigger="load"
              delay={0.2}
              stagger={0.022}
              duration={0.6}
              style={{
                marginTop: "clamp(1rem, 2vw, 2rem)",
                fontSize: "clamp(2rem, 5.5vw, 4rem)",
                fontWeight: 600,
                lineHeight: 1.06,
                letterSpacing: "-0.035em",
                color: "var(--gy-ink)",
                wordBreak: "keep-all",
                maxWidth: "16ch",
              }}
            >
              {HERO.h1.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </SplitTextReveal>

            <motion.p
              className="font-kr"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              style={{
                marginTop: "clamp(1.25rem, 3vw, 2.5rem)",
                maxWidth: "32ch",
                fontSize: "clamp(0.9375rem, 1.5vw, 1.25rem)",
                fontWeight: 500,
                lineHeight: 1.6,
                letterSpacing: "-0.005em",
                color: "var(--gy-ink)",
                wordBreak: "keep-all",
              }}
            >
              {HERO.p1.map((line, i) => (
                <span key={i} className="block">
                  {line}
                </span>
              ))}
            </motion.p>

            <motion.p
              className="font-kr"
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              style={{
                marginTop: "clamp(1.5rem, 4vw, 3.5rem)",
                maxWidth: "38ch",
                fontSize: "0.9375rem",
                fontWeight: 500,
                lineHeight: 1.7,
                color: "var(--gy-ink-muted)",
                wordBreak: "keep-all",
              }}
            >
              {HERO.p2.map((line, i) => (
                <span key={i} style={{ display: "block" }}>
                  {line}
                </span>
              ))}
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              style={{ marginTop: "clamp(1.5rem, 3vw, 2.75rem)" }}
            >
              <a href="#intake" className="btn-primary">
                <span>{HERO.cta}</span>
                <span aria-hidden="true">→</span>
              </a>
            </motion.div>
          </div>

          <motion.div
            className="gy-hero-graph-wrap"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.9, ease: [0, 0, 0.2, 1] }}
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <AgentGraph />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
