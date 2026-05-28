"use client";

import { motion } from "framer-motion";

const CARDS = [
  {
    body: "도메인 안에서는 가장 깊은 판단을 내리지만, 도구 4구분에서 멈춰 있는 분.",
    role: "임원·본부장·1인 대표",
  },
  {
    body: "고객 정보를 다루기에 외부에 묻기 어려운 작업이 쌓이는 분.",
    role: "변호사·의사·세무사·회계사",
  },
  {
    body: "혼자의 시간이 곧 자산인데, 실행 부분에서 매일 빠져나가는 분.",
    role: "교수·작가·전문 프리랜서",
  },
] as const;

export function WhoCards() {
  return (
    <section
      id="who"
      aria-labelledby="who-title"
      className="mx-auto"
      style={{
        maxWidth: "1200px",
        padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
      }}
    >
      <style>{`
        .gy-who-card {
          transition:
            transform var(--gy-duration-moderate) var(--gy-easing-out),
            box-shadow var(--gy-duration-moderate) var(--gy-easing-out),
            background var(--gy-duration-moderate) var(--gy-easing-out);
        }
        .gy-who-card:hover {
          transform: translateY(-4px);
          box-shadow: var(--gy-shadow-md);
          background: var(--gy-soft);
        }
        @media (prefers-reduced-motion: reduce) {
          .gy-who-card:hover { transform: none; }
        }
      `}</style>

      <motion.h2
        id="who-title"
        className="font-kr"
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6, ease: [0, 0, 0.2, 1] }}
        style={{
          fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
          fontWeight: 600,
          lineHeight: 1.15,
          letterSpacing: "-0.025em",
          color: "var(--gy-ink)",
          wordBreak: "keep-all",
          maxWidth: "20ch",
        }}
      >
        이런 분께 닿기를.
      </motion.h2>

      <ul
        className="grid lg:grid-cols-3"
        style={{
          marginTop: "clamp(2.5rem, 4vw, 3.5rem)",
          gap: "clamp(1rem, 2vw, 1.5rem)",
          gridTemplateColumns: "1fr",
        }}
      >
        {CARDS.map((card, idx) => (
          <motion.li
            key={idx}
            style={{ listStyle: "none" }}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{
              duration: 0.55,
              delay: idx * 0.08,
              ease: [0, 0, 0.2, 1],
            }}
          >
            <article
              className="font-kr gy-who-card"
              style={{
                background: "var(--gy-soft)",
                borderRadius: "var(--gy-rounded-xl)",
                padding: "clamp(1.5rem, 3vw, 2rem)",
                color: "var(--gy-deep)",
                height: "100%",
              }}
            >
              <p
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  lineHeight: 1.2,
                  textTransform: "uppercase",
                  color: "var(--gy-deep)",
                  opacity: 0.65,
                }}
              >
                0{idx + 1}
              </p>
              <h3
                style={{
                  marginTop: "0.75rem",
                  fontSize: "clamp(1.0625rem, 1.6vw, 1.25rem)",
                  fontWeight: 600,
                  lineHeight: 1.5,
                  letterSpacing: "-0.01em",
                  color: "var(--gy-ink)",
                  wordBreak: "keep-all",
                }}
              >
                {card.body}
              </h3>
              <p
                style={{
                  marginTop: "1rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: "var(--gy-deep)",
                }}
              >
                — {card.role}
              </p>
            </article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
