"use client";

import { motion } from "framer-motion";
import { IntakeForm } from "./IntakeForm";
import { SplitTextReveal } from "./SplitTextReveal";

export function IntakeFormShell() {
  return (
    <section
      id="intake"
      aria-labelledby="intake-title"
      style={{
        background: "var(--gy-canvas)",
      }}
    >
      <div
        className="mx-auto grid lg:grid-cols-[minmax(0,1fr)_240px]"
        style={{
          maxWidth: "1200px",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div style={{ maxWidth: "560px" }}>
          <SplitTextReveal
            id="intake-title"
            className="font-kr"
            trigger="scroll"
            stagger={0.03}
            duration={0.6}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              color: "var(--gy-ink)",
            }}
          >
            사전 문의.
          </SplitTextReveal>
          <motion.p
            className="font-kr"
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: [0, 0, 0.2, 1] }}
            style={{
              marginTop: "clamp(1.25rem, 2vw, 1.75rem)",
              fontSize: "1rem",
              fontWeight: 500,
              lineHeight: 1.75,
              color: "var(--gy-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            지금은 정식 오픈 전 단계입니다. 문의를 받으면 48시간 안에
            답신드리고, 30분 1:1 콜 일정을 잡습니다. 콜 형식(대면·온라인)은
            회신할 때 함께 정해드립니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
            style={{ marginTop: "clamp(2rem, 3.5vw, 2.75rem)" }}
          >
            <IntakeForm />
          </motion.div>
        </div>

        <motion.aside
          aria-label="진단 리포트 안내"
          className="font-kr lg:sticky lg:top-32"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          style={{
            alignSelf: "start",
            background: "var(--gy-soft)",
            borderRadius: "var(--gy-rounded-lg)",
            padding: "1.25rem 1.5rem",
            maxWidth: "260px",
          }}
        >
          <p
            className="font-en"
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.125em",
              color: "var(--gy-deep)",
              textTransform: "uppercase",
            }}
          >
            For You
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.75,
              color: "var(--gy-deep)",
              wordBreak: "keep-all",
            }}
          >
            체험 후 받는 1페이지 진단 리포트는 의뢰와 별개로 드리는 자료입니다.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
