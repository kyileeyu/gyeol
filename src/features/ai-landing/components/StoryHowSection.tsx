"use client";

import { motion } from "framer-motion";

const STEPS = [
  {
    num: "01",
    name: "결을 잡다 (Aligning)",
    body: "첫 자리. 30분 1:1 콜에서 결정 구조를 정렬합니다.",
  },
  {
    num: "02",
    name: "결을 그리다 (Designing)",
    body: "2시간 체험 세션에서 본인 작업의 결을 함께 그립니다.",
  },
  {
    num: "03",
    name: "결을 새기다 (Building)",
    body: "본 작업. 산출물이 있는 경우 회차 단위로 새깁니다.",
  },
  {
    num: "04",
    name: "결을 잇다 (Caring)",
    body: "본 작업. 산출물이 시간 단위인 경우 정기적으로 잇습니다.",
  },
] as const;

export function StoryHowSection() {
  return (
    <section id="story-how" aria-labelledby="story-title">
      <div
        className="mx-auto"
        style={{
          maxWidth: "820px",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
        }}
      >
        <motion.h2
          id="story-title"
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
            maxWidth: "22ch",
          }}
        >
          강의가 아닙니다.
        </motion.h2>

        <motion.div
          className="font-kr"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0, 0, 0.2, 1] }}
          style={{
            marginTop: "clamp(2rem, 3.5vw, 2.75rem)",
            maxWidth: "62ch",
            fontSize: "1.0625rem",
            fontWeight: 500,
            lineHeight: 1.85,
            color: "var(--gy-ink)",
            letterSpacing: "-0.005em",
            wordBreak: "keep-all",
          }}
        >
          <p>
            도구를 가르치지 않습니다. 판단은 본인 안에 그대로 두고, 실행을
            본인 손에 맞는 AI 에이전트 팀 구조로 옮깁니다.
          </p>
          <p style={{ marginTop: "1.25rem" }}>
            이 자리에서 우리가 같이 만드는 것은 본인 손에 맞는 작업 구조 —
            다시 만들 필요 없는 결.
          </p>
        </motion.div>

        <motion.figure
          className="font-kr"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0, 0, 0.2, 1] }}
          style={{
            margin: "clamp(2.75rem, 5vw, 3.75rem) 0 0",
            paddingLeft: "clamp(1.25rem, 2vw, 1.75rem)",
            borderLeft: "2px solid var(--gy-sky)",
            maxWidth: "56ch",
          }}
        >
          <blockquote
            style={{
              fontSize: "clamp(1.125rem, 1.9vw, 1.375rem)",
              fontWeight: 500,
              lineHeight: 1.6,
              letterSpacing: "-0.015em",
              color: "var(--gy-deep)",
              wordBreak: "keep-all",
              margin: 0,
            }}
          >
            &ldquo;활용은 보이는데, 구조로 묶이지 않을 때 외부에 묻기조차
            어려운 자리가 있다.&rdquo;
          </blockquote>
          <figcaption
            style={{
              marginTop: "0.875rem",
              fontSize: "0.8125rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--gy-ink-muted)",
            }}
          >
            — 전문직 1:1에서 가장 자주 나오는 문장
          </figcaption>
        </motion.figure>

        <ol
          style={{
            marginTop: "clamp(2.75rem, 5vw, 4rem)",
            display: "grid",
            gap: "clamp(1.25rem, 2vw, 1.75rem)",
            listStyle: "none",
            padding: 0,
          }}
        >
          {STEPS.map((s, idx) => (
            <motion.li
              key={s.num}
              initial={{ opacity: 0, y: 14 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{
                duration: 0.55,
                delay: idx * 0.07,
                ease: [0, 0, 0.2, 1],
              }}
              style={{
                display: "grid",
                gridTemplateColumns: "auto 1fr",
                columnGap: "clamp(1rem, 2vw, 1.5rem)",
                paddingBottom: "clamp(1.25rem, 2vw, 1.5rem)",
                borderBottom: "1px solid var(--gy-hairline-soft)",
              }}
            >
              <span
                className="font-en"
                aria-hidden="true"
                style={{
                  fontSize: "12px",
                  fontWeight: 700,
                  letterSpacing: "0.15em",
                  color: "var(--gy-steel)",
                  paddingTop: "0.45rem",
                }}
              >
                {s.num}
              </span>
              <div>
                <h3
                  className="font-kr"
                  style={{
                    fontSize: "clamp(1.125rem, 1.7vw, 1.25rem)",
                    fontWeight: 700,
                    lineHeight: 1.35,
                    letterSpacing: "-0.015em",
                    color: "var(--gy-deep)",
                    wordBreak: "keep-all",
                  }}
                >
                  {s.name}
                </h3>
                <p
                  className="font-kr"
                  style={{
                    marginTop: "0.5rem",
                    fontSize: "1rem",
                    fontWeight: 500,
                    lineHeight: 1.75,
                    color: "var(--gy-ink-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  {s.body}
                </p>
              </div>
            </motion.li>
          ))}
        </ol>
      </div>
    </section>
  );
}
