"use client";

import { motion } from "framer-motion";

const PAINS = [
  {
    quote:
      "좋다는 AI 툴은 많은데, 막상 일하려니 뭐부터 켜야 할지 모르겠습니다.",
    note: "새로운 툴을 배우는 피로감을 끝내고, 내 업무 동선에 꼭 필요한 핵심 도구 위주로 매끄러운 흐름을 설계합니다.",
  },
  {
    quote: "어떻게 만들긴 했는데, 다시 만들거나 자동화하려면 막막합니다.",
    note: "매번 처음부터 다시 시작하는 비효율을 멈추고, 언제든 똑같은 퀄리티로 작동하는 지속 가능한 시스템을 구축합니다.",
  },
  {
    quote:
      "유튜브나 강의엔 안 나오는 '내 실무, 내 데이터'에 맞추려니 답이 안 나옵니다.",
    note: "보안 때문에 외부에 묻기 어려운 진짜 내 업무 고민을 철저한 NDA 기반의 1:1 맞춤형 솔루션으로 안전하게 해결합니다.",
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
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <style>{`
        .gy-pain-card {
          transition:
            background var(--gy-duration-moderate) var(--gy-easing-out),
            border-color var(--gy-duration-moderate) var(--gy-easing-out);
        }
        .gy-pain-card:hover {
          background: color-mix(in srgb, var(--gy-on-inverse) 6%, transparent);
          border-color: var(--gy-sky);
        }
      `}</style>

      <div
        className="mx-auto"
        style={{
          maxWidth: "1200px",
          padding: "clamp(3rem, 9vw, 7rem) clamp(1.25rem, 5vw, 4rem)",
        }}
      >
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
            className="gy-mobile-card-track"
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
                  border: "1px solid color-mix(in srgb, var(--gy-on-inverse) 8%, transparent)",
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
    </section>
  );
}
