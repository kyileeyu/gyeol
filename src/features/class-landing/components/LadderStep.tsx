// /ai 강의 랜딩 — AI 사다리 단계 단위 컴포넌트 (v2 신규)
"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { track } from "@/lib/analytics";
import type { LadderStepData } from "../lib/ladder";

interface LadderStepProps {
  data: LadderStepData;
  animVariants: Variants;
}

export function LadderStep({ data, animVariants }: LadderStepProps) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const firedRef = useRef(false);

  // IntersectionObserver: 단계 뷰 진입 1회 이벤트 발화
  useEffect(() => {
    if (typeof window === "undefined") return;
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !firedRef.current) {
          firedRef.current = true;
          track("class_ladder_step_view", { step: data.step });
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [data.step]);

  const isSignal = data.variant === "signal";
  const borderClass = isSignal
    ? "border-l-2 border-shimmer bg-surface"
    : "border-l-2 border-wave/40 bg-bg hover:border-wave";

  return (
    <motion.div
      ref={ref}
      variants={reduce ? undefined : animVariants}
      aria-label={`${data.step}단계: ${data.title}`}
      className={`pl-6 py-5 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] rounded-sm ${borderClass}`}
    >
      <p className="font-en text-xs tracking-[0.25em] text-muted uppercase">
        {String(data.step).padStart(2, "0")}
      </p>
      <h3 className="font-kr-serif text-xl font-medium text-ink mt-1 leading-[1.35]">
        {data.title}
      </h3>
      <p className="text-sm text-muted leading-[1.7] mt-2">
        {data.description}
      </p>
      {data.examples.length > 0 && (
        <p className="text-xs text-muted italic mt-2 leading-[1.7]">
          {data.examples.join(" ")}
        </p>
      )}
      {isSignal && (
        <p className="text-xs text-muted mt-3">상담으로 시작합니다.</p>
      )}
    </motion.div>
  );
}
