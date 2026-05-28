"use client";

import { motion } from "framer-motion";

const PAINS = [
  {
    quote: "활용처는 보이는데, 도구를 4개로 나누면 멈춥니다.",
    note: "가장 흔한 자리. 도구가 4개로 갈리는 순간 판단이 분산됨.",
  },
  {
    quote: "활용은 되는데, 구조로 묶으려 하면 막힙니다.",
    note: "산출물이 보이지만, 다시 만들 때 처음부터 시작해야 하는 자리.",
  },
  {
    quote: "고객 정보·직업윤리 위라 외부에 묻기조차 어렵습니다.",
    note: "가장 외로운 자리. 비공개 1:1에서만 풀 수 있음.",
  },
] as const;

export function PainCards() {
  return (
    <section
      id="pain"
      aria-labelledby="pain-title"
      style={{
        background: "var(--gy-inverse-canvas)",
        color: "var(--gy-on-inverse)",
      }}
    >
      <style>{`
        .gy-pain-card {
          transition:
            background var(--gy-duration-moderate) var(--gy-easing-out),
            border-color var(--gy-duration-moderate) var(--gy-easing-out);
        }
        .gy-pain-card:hover {
          background: rgba(252, 255, 255, 0.06);
          border-color: var(--gy-sky);
        }
      `}</style>

      <div
        className="mx-auto grid lg:grid-cols-[minmax(0,1fr)_240px]"
        style={{
          maxWidth: "1200px",
          padding: "clamp(5rem, 9vw, 7rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div>
          <motion.h2
            id="pain-title"
            className="font-kr"
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
            style={{
              fontSize: "clamp(2.25rem, 5vw, 3.5rem)",
              fontWeight: 500,
              lineHeight: 1.1,
              letterSpacing: "-0.028em",
              color: "var(--gy-on-inverse)",
              wordBreak: "keep-all",
            }}
          >
            막히는 자리는 보통 셋.
          </motion.h2>

          <ol
            style={{
              marginTop: "clamp(2.75rem, 4.5vw, 3.75rem)",
              display: "grid",
              gap: "clamp(1rem, 2vw, 1.25rem)",
              gridTemplateColumns: "1fr",
              listStyle: "none",
              padding: 0,
            }}
          >
            {PAINS.map((p, idx) => (
              <motion.li
                key={idx}
                className="gy-pain-card"
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{
                  duration: 0.55,
                  delay: idx * 0.08,
                  ease: [0, 0, 0.2, 1],
                }}
                style={{
                  background: "var(--gy-inverse-canvas-alt)",
                  border: "1px solid rgba(252, 255, 255, 0.08)",
                  borderRadius: "var(--gy-rounded-lg)",
                  padding: "clamp(1.75rem, 2.5vw, 2rem)",
                }}
              >
                <p
                  className="font-en"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.125em",
                    lineHeight: 1.2,
                    color: "var(--gy-on-inverse-muted)",
                    textTransform: "uppercase",
                    opacity: 0.7,
                  }}
                >
                  0{idx + 1}
                </p>
                <h3
                  className="font-kr"
                  style={{
                    marginTop: "0.75rem",
                    fontSize: "clamp(1.0625rem, 1.7vw, 1.25rem)",
                    fontWeight: 600,
                    lineHeight: 1.45,
                    letterSpacing: "-0.015em",
                    color: "var(--gy-on-inverse)",
                    wordBreak: "keep-all",
                  }}
                >
                  &ldquo;{p.quote}&rdquo;
                </h3>
                <p
                  className="font-kr"
                  style={{
                    marginTop: "0.875rem",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: "var(--gy-on-inverse-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  {p.note}
                </p>
              </motion.li>
            ))}
          </ol>
        </div>

        <motion.aside
          aria-label="비밀유지 안내"
          className="font-kr lg:sticky lg:top-32"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          style={{
            alignSelf: "start",
            background: "var(--gy-inverse-canvas-alt)",
            border: "1px solid rgba(252, 255, 255, 0.08)",
            borderRadius: "var(--gy-rounded-lg)",
            padding: "1.25rem 1.5rem",
            maxWidth: "260px",
          }}
        >
          <p
            className="font-en"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.125em",
              lineHeight: 1.2,
              color: "var(--gy-on-inverse-muted)",
              textTransform: "uppercase",
            }}
          >
            NDA First
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--gy-on-inverse-muted)",
              wordBreak: "keep-all",
            }}
          >
            모든 작업은 NDA 위에서 시작합니다. 케이스 외부 공개는 동의 시에만,
            직업 카테고리만 익명 가공합니다.
          </p>
        </motion.aside>
      </div>
    </section>
  );
}
