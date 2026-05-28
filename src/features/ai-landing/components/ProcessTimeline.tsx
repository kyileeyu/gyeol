"use client";

import { Fragment, useRef } from "react";
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

// 색상 — globals.css 토큰 hex 그대로 (framer-motion이 hex만 interpolate)
const INDICATOR_OFF_BG = "#DCE5F0"; // var(--gy-hairline)
const INDICATOR_ON_BG = "#005187"; // var(--gy-deep)
const INDICATOR_OFF_FG = "#8A9BA8"; // var(--gy-ink-subtle)
const INDICATOR_ON_FG = "#FCFFFF"; // var(--gy-on-primary)

function StepIndicator({
  progress,
  num,
}: {
  progress: MotionValue<number>;
  num: number;
}) {
  const background = useTransform(
    progress,
    [0, 1],
    [INDICATOR_OFF_BG, INDICATOR_ON_BG],
  );
  const color = useTransform(
    progress,
    [0, 1],
    [INDICATOR_OFF_FG, INDICATOR_ON_FG],
  );
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
            style={{ marginTop: "clamp(2.5rem, 4.5vw, 3.5rem)" }}
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
            style={{ marginTop: "clamp(2.5rem, 4.5vw, 3.5rem)" }}
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
