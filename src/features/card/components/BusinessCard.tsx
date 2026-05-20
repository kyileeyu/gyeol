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

  // 진입 모션: 비스듬한 3D 자세 → 정면 안착
  const initial = reduce
    ? { opacity: 0 }
    : { opacity: 0, rotateX: -22, rotateY: 18, translateZ: -60 };

  const animate = reduce
    ? { opacity: 1 }
    : { opacity: 1, rotateX: 0, rotateY: 0, translateZ: 0 };

  const transition = reduce
    ? { duration: 0.2, ease: "easeOut" }
    : { duration: 0.9, ease: [0.65, 0, 0.35, 1] as const };

  return (
    <motion.div
      className={styles.stage}
      initial={initial}
      animate={animate}
      transition={transition}
      style={{ transformStyle: "preserve-3d" }}
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
