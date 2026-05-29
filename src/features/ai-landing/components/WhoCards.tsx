"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useState } from "react";

// framer-motion whileHover는 var()를 안정적으로 보간 못 하므로,
// globals.css --gy-* 토큰을 런타임에 hex/rgba로 resolve해서 hover 값으로 쓴다.
function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace("#", "").trim();
  const full = h.length === 3 ? h.split("").map((c) => c + c).join("") : h;
  const n = parseInt(full, 16);
  return `rgba(${(n >> 16) & 255}, ${(n >> 8) & 255}, ${n & 255}, ${alpha})`;
}

function useCardHover() {
  const [s, setS] = useState({
    border: "#7B93F4", // --gy-sky fallback (DESIGN.md)
    shadow: "0 18px 40px -16px rgba(1, 66, 160, 0.22)", // --gy-deep fallback
  });
  useEffect(() => {
    const cs = getComputedStyle(document.documentElement);
    const sky = cs.getPropertyValue("--gy-sky").trim() || "#7B93F4";
    const deep = cs.getPropertyValue("--gy-deep").trim() || "#0142A0";
    setS({ border: sky, shadow: `0 18px 40px -16px ${hexToRgba(deep, 0.22)}` });
  }, []);
  return s;
}

const CARDS: {
  quote: string;
  role: string;
  image: string;
}[] = [
  {
    quote:
      "코딩은 한 번도 해본 적이 없어요. 어디서부터 배워야 할지 모르겠어요.",
    role: "IM 실무자 · 금융권",
    image: "/personas/persona-park.webp",
  },
  {
    quote: "판단은 매일 내리는데, 사람 대신 AI가 해결해 줄 수 있을까요?",
    role: "사모펀드 임원 · 본부장",
    image: "/personas/persona-baek.webp",
  },
  {
    quote: "매주 같은 자료를 모으고 정리해요. 이 시간을 줄일 수 있을까요.",
    role: "글로벌 제약사 13년차",
    image: "/personas/persona-jeon.webp",
  },
];

function ProfileImage({ src }: { src: string }) {
  return (
    <div
      aria-hidden
      style={{
        position: "relative",
        width: "clamp(56px, 10vw, 72px)",
        height: "clamp(56px, 10vw, 72px)",
        borderRadius: "9999px",
        background: "var(--gy-surface-0)",
        overflow: "hidden",
        boxShadow: "inset 0 0 0 1px var(--gy-hairline-soft)",
        flexShrink: 0,
      }}
    >
      <Image
        src={src}
        alt=""
        fill
        sizes="(max-width: 768px) 56px, 72px"
        style={{ objectFit: "contain", padding: "6%" }}
      />
    </div>
  );
}

export function WhoCards() {
  const hover = useCardHover();
  return (
    <section
      id="who"
      aria-labelledby="who-title"
      className="mx-auto"
      style={{
        maxWidth: "1200px",
        padding: "clamp(2.5rem, 8vw, 6rem) clamp(1.25rem, 5vw, 4rem)",
        minHeight: "100svh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      <motion.h2
        id="who-title"
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
          color: "var(--gy-ink)",
          wordBreak: "keep-all",
          maxWidth: "16ch",
        }}
      >
        이런 분께 닿기를.
      </motion.h2>

      <motion.p
        className="font-kr"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.7, delay: 0.1, ease: [0, 0, 0.2, 1] }}
        style={{
          marginTop: "1rem",
          fontSize: "clamp(0.9375rem, 1.4vw, 1.0625rem)",
          fontWeight: 400,
          lineHeight: 1.7,
          letterSpacing: "-0.01em",
          color: "var(--gy-deep)",
          wordBreak: "keep-all",
        }}
      >
        세 분의 이야기 중 하나가 당신의 이야기라면, 결이 맞을지도 모릅니다.
      </motion.p>

      <ul
        className="gy-mobile-card-track grid grid-cols-1 md:grid-cols-3"
        style={{
          marginTop: "clamp(2.5rem, 4vw, 3.5rem)",
          gap: "clamp(0.75rem, 1.6vw, 1.5rem)",
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
            <motion.article
              className="font-kr"
              whileHover={{
                y: -6,
                borderColor: hover.border,
                boxShadow: hover.shadow,
              }}
              transition={{ duration: 0.35, ease: [0.65, 0, 0.35, 1] }}
              style={{
                background: "color-mix(in srgb, var(--gy-canvas) 55%, transparent)",
                backdropFilter: "blur(20px) saturate(140%)",
                WebkitBackdropFilter: "blur(20px) saturate(140%)",
                border: "1px solid var(--gy-hairline)",
                borderRadius: "var(--gy-rounded-xl)",
                padding: "clamp(1.125rem, 2.5vw, 2.25rem)",
                color: "var(--gy-deep)",
                height: "100%",
                display: "flex",
                flexDirection: "column",
                alignItems: "stretch",
                textAlign: "left",
                willChange: "transform",
              }}
            >
              <ProfileImage src={card.image} />

              <blockquote
                style={{
                  margin: "1.25rem 0 0 0",
                  fontSize: "clamp(1.0625rem, 1.55vw, 1.1875rem)",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  letterSpacing: "-0.012em",
                  color: "var(--gy-ink)",
                  wordBreak: "keep-all",
                }}
              >
                {card.quote}
              </blockquote>

              <p
                style={{
                  marginTop: "auto",
                  paddingTop: "1.5rem",
                  fontSize: "0.875rem",
                  fontWeight: 500,
                  lineHeight: 1.5,
                  color: "var(--gy-deep)",
                  opacity: 0.75,
                  textAlign: "right",
                }}
              >
                - {card.role}
              </p>
            </motion.article>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
