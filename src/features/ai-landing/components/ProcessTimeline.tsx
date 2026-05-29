"use client";

import { Fragment, useEffect, useRef, useState } from "react";
import {
  motion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";

const STEPS = [
  {
    title: "생각의 결을 읽고 정렬합니다",
    description: "05분 · 서로의 결에 대한 인사와 이해",
  },
  {
    title: "일의 결을 읽고 진단합니다",
    description: "15분 · 작업 구조와 흐름을 잇는 지점",
  },
  {
    title: "미래의 결을 함께 디자인합니다",
    description: "10분 · 지속 가능한 자동화·구축 방식 결정",
  },
] as const;

// framer-motion useTransform은 var()를 보간 못 하므로(실제 hex 필요),
// globals.css --gy-* 토큰을 런타임에 hex로 resolve해서 쓴다. fallback = DESIGN.md 값.
const INDICATOR_FALLBACK = {
  offBg: "#DCE2F8", // --gy-hairline
  onBg: "#0142A0", // --gy-deep
  offFg: "#8A90A6", // --gy-ink-subtle
  onFg: "#FCFDFF", // --gy-on-primary
};

function useIndicatorColors() {
  const [c, setC] = useState(INDICATOR_FALLBACK);
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const get = (name: string, fallback: string) =>
      cs.getPropertyValue(name).trim() || fallback;
    setC({
      offBg: get("--gy-hairline", INDICATOR_FALLBACK.offBg),
      onBg: get("--gy-deep", INDICATOR_FALLBACK.onBg),
      offFg: get("--gy-ink-subtle", INDICATOR_FALLBACK.offFg),
      onFg: get("--gy-on-primary", INDICATOR_FALLBACK.onFg),
    });
  }, []);
  return c;
}

function StepIndicator({
  progress,
  num,
}: {
  progress: MotionValue<number>;
  num: number;
}) {
  const c = useIndicatorColors();
  const background = useTransform(progress, [0, 1], [c.offBg, c.onBg]);
  const color = useTransform(progress, [0, 1], [c.offFg, c.onFg]);
  return (
    <motion.div
      className="gy-stepper-indicator font-en"
      style={{ background, color }}
    >
      {num}
    </motion.div>
  );
}

function StepSeparator({ progress }: { progress: MotionValue<number> }) {
  return (
    <div className="gy-stepper-separator">
      <motion.div
        className="gy-stepper-separator-fill"
        style={{ scaleX: progress, scaleY: progress }}
      />
    </div>
  );
}

export function ProcessTimeline() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end end"],
  });

  // 매핑 — sticky 구간 전체에 균등 분포 (1번 → 1-2선 → 2번 → 2-3선 → 3번)
  const step1 = useTransform(scrollYProgress, [0.05, 0.18], [0, 1]);
  const sep1 = useTransform(scrollYProgress, [0.22, 0.42], [0, 1]);
  const step2 = useTransform(scrollYProgress, [0.45, 0.55], [0, 1]);
  const sep2 = useTransform(scrollYProgress, [0.58, 0.78], [0, 1]);
  const step3 = useTransform(scrollYProgress, [0.82, 0.92], [0, 1]);

  const indicators: MotionValue<number>[] = [step1, step2, step3];
  const separators: MotionValue<number>[] = [sep1, sep2];

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-title"
      style={{
        background: "var(--gy-surface-2)",
        minHeight: "300svh",
      }}
    >
      {/* section 300svh 안에서 100svh 콘텐츠를 sticky로 viewport에 고정.
         나머지 200svh 스크롤 거리 동안 step 점화 progress가 진행된다. */}
      <div
        style={{
          position: "sticky",
          top: 0,
          height: "100svh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        <div
          className="mx-auto w-full"
          style={{
            maxWidth: "1100px",
            padding: "clamp(3rem, 6vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          }}
        >
          <motion.p
            className="font-en"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: [0, 0, 0.2, 1] }}
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.125em",
              lineHeight: 1.2,
              textTransform: "uppercase",
              color: "var(--gy-deep)",
            }}
          >
            Process · 30 min
          </motion.p>

          <motion.h2
            id="process-title"
            className="font-kr"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            style={{
              marginTop: "0.75rem",
              fontSize: "clamp(2rem, 4.5vw, 3rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              color: "var(--gy-ink)",
              wordBreak: "keep-all",
            }}
          >
            결을 맞추는 시간.
          </motion.h2>

          <motion.div
            className="gy-stepper"
            role="list"
            aria-label="결을 맞추는 30분의 흐름"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.15, ease: [0, 0, 0.2, 1] }}
            style={{ marginTop: "clamp(6rem, 10vw, 9rem)" }}
          >
            {STEPS.map((s, i) => (
              <Fragment key={i}>
                <div className="gy-stepper-item" role="listitem">
                  <StepIndicator progress={indicators[i]} num={i + 1} />
                  <div className="gy-stepper-text">
                    <p className="font-kr gy-stepper-title">{s.title}</p>
                    <p className="font-kr gy-stepper-desc">{s.description}</p>
                  </div>
                </div>
                {i < STEPS.length - 1 && (
                  <StepSeparator progress={separators[i]} />
                )}
              </Fragment>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.3 }}
            style={{ marginTop: "clamp(9rem, 15vw, 14rem)" }}
          >
            <a href="#intake" className="btn-primary">
              <span>30분 미팅 예약</span>
              <span aria-hidden="true">→</span>
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
