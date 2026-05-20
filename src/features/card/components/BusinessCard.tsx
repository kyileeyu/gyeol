// 결 스튜디오 명함 — 플립 상태·진입 모션 부모 컴포넌트
"use client";

import { useState, useCallback, KeyboardEvent } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import styles from "../styles/card.module.css";
import CardFront from "./CardFront";
import CardBack from "./CardBack";

export default function BusinessCard() {
  const [flipped, setFlipped] = useState(false);
  const reduce = useReducedMotion();

  const onFlip = useCallback(() => {
    setFlipped((prev) => {
      const next = !prev;
      track("card_flip", { to: next ? "back" : "front" });
      return next;
    });
  }, []);

  const onKeyDown = useCallback(
    (e: KeyboardEvent<HTMLDivElement>) => {
      if (e.key === " " || e.key === "Enter") {
        e.preventDefault();
        onFlip();
      }
    },
    [onFlip],
  );

  // 진입 모션: 살짝 아래/축소 → 정면 안착.
  // ⚠️ opacity·3D 회전을 퍼스펙티브 컨테이너(.stage)에 걸면 iOS Safari가
  // 3D 컨텍스트를 평탄화해 backface 숨김이 깨진다(앞·뒷면 동시 노출).
  // 평면 변환(y/scale)만 사용해 3D 서브트리를 절대 평탄화하지 않는다.
  const initial = reduce ? { opacity: 0 } : { y: 28, scale: 0.96 };
  const animate = reduce ? { opacity: 1 } : { y: 0, scale: 1 };

  const transition = reduce
    ? { duration: 0.2, ease: "easeOut" }
    : { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <motion.div
      className={styles.stage}
      initial={initial}
      animate={animate}
      transition={transition}
    >
      <div
        role="button"
        tabIndex={0}
        aria-pressed={flipped}
        aria-label={flipped ? "명함 앞면 보기" : "명함 뒷면 보기"}
        onClick={onFlip}
        onKeyDown={onKeyDown}
        className={`${styles.card} ${flipped ? styles.cardFlipped : ""}`}
      >
        <CardFront hidden={flipped} />
        <CardBack hidden={!flipped} />
      </div>
    </motion.div>
  );
}
