"use client";

import { motion } from "framer-motion";
import { SplitTextReveal } from "./SplitTextReveal";

export function StoryHowSection() {
  return (
    <section
      id="story-how"
      aria-labelledby="story-title"
      style={{
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <div
        className="mx-auto w-full"
        style={{
          maxWidth: "820px",
          padding: "clamp(2.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        }}
      >
        <motion.h2
          id="story-title"
          className="font-kr"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.7, ease: [0, 0, 0.2, 1] }}
          style={{
            fontSize: "clamp(1.875rem, 5vw, 3.5rem)",
            fontWeight: 500,
            lineHeight: 1.1,
            letterSpacing: "-0.028em",
            color: "var(--gy-ink)",
            wordBreak: "keep-all",
            maxWidth: "16ch",
          }}
        >
          단순한 강의가 아닙니다.
        </motion.h2>

        <div
          className="font-kr"
          style={{
            marginTop: "clamp(1.25rem, 3.5vw, 2.75rem)",
            maxWidth: "62ch",
            fontSize: "clamp(0.8125rem, 1.35vw, 1.0625rem)",
            fontWeight: 500,
            lineHeight: 1.75,
            color: "var(--gy-ink)",
            letterSpacing: "-0.005em",
            wordBreak: "keep-all",
          }}
        >
          <SplitTextReveal
            as="p"
            splitType="lines"
            trigger="scroll"
            stagger={0.09}
            duration={0.8}
            y={20}
            blur={6}
          >
            시중의 강의는 툴 사용법을 가르치지만, &lsquo;내 실무&rsquo;는 툴
            하나 배웠다고 풀리지 않습니다. 같은 도구도 비즈니스의 맥락과 판단에
            따라 완전히 다른 시스템이 되기 때문입니다. 기성 커리큘럼이
            해결해주지 못하는 바로 그 지점부터 진짜 고민이 시작됩니다.
          </SplitTextReveal>
          <SplitTextReveal
            as="p"
            splitType="lines"
            trigger="scroll"
            stagger={0.09}
            duration={0.8}
            y={20}
            blur={6}
            style={{ marginTop: "1.25rem" }}
          >
            저는 가르치기만 하고 떠나는 강사가 아니라, 당신의 업무 환경에
            깊숙이 들어가 &lsquo;일의 결&rsquo;을 함께 읽어내는 파트너가
            되고자 합니다. 당신의 소중한 비즈니스 판단 위에서, 최적의 흐름과
            자동화 구조를 함께 디자인합니다.
          </SplitTextReveal>
        </div>

        <motion.figure
          className="font-kr"
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, delay: 0.15, ease: [0, 0, 0.2, 1] }}
          style={{
            margin: "clamp(1.75rem, 5.5vw, 4rem) 0 0",
            padding: "clamp(1rem, 2.2vw, 1.5rem) clamp(1rem, 2.4vw, 1.625rem)",
            background: "color-mix(in srgb, var(--gy-canvas) 50%, transparent)",
            backdropFilter: "blur(12px) saturate(140%)",
            WebkitBackdropFilter: "blur(12px) saturate(140%)",
            border: "1px solid var(--gy-hairline)",
            borderRadius: "var(--gy-rounded-lg)",
            boxShadow: "var(--gy-shadow-md)",
            maxWidth: "min(560px, 100%)",
          }}
        >
          <blockquote
            style={{
              fontSize: "clamp(0.9375rem, 1.35vw, 1.0625rem)",
              fontWeight: 500,
              lineHeight: 1.65,
              letterSpacing: "-0.01em",
              color: "var(--gy-ink)",
              wordBreak: "keep-all",
              margin: 0,
            }}
          >
            &ldquo;따로 만든 예제가 아니라 바로 사용하는 환경에서 진행돼서,
            수업 끝나자마자 혼자 적용할 수 있었습니다.&rdquo;
          </blockquote>
          <figcaption
            className="font-kr"
            style={{
              marginTop: "0.75rem",
              fontSize: "0.8125rem",
              fontWeight: 500,
              letterSpacing: "-0.005em",
              color: "var(--gy-deep)",
              opacity: 0.75,
            }}
          >
            — 1:1 과외 수강 후기
          </figcaption>
        </motion.figure>

        <motion.p
          className="font-kr"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0, 0, 0.2, 1] }}
          style={{
            marginTop: "clamp(1.5rem, 4.5vw, 3.5rem)",
            fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
            fontWeight: 500,
            lineHeight: 1.7,
            letterSpacing: "-0.005em",
            color: "var(--gy-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          그 결을 함께 읽어내는 첫 30분, 미팅에서 시작합니다.
        </motion.p>
      </div>
    </section>
  );
}
