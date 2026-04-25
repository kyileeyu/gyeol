"use client";

import { motion } from "framer-motion";

export default function SuccessWave() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: [0.65, 0, 0.35, 1] }}
      className="flex flex-col items-center gap-8 py-12"
    >
      <svg
        width="120"
        height="48"
        viewBox="0 -8 120 48"
        fill="none"
        aria-hidden
      >
        <motion.path
          d="M0 12 Q 15 -2, 30 12 T 60 12 T 90 12 T 120 12"
          stroke="var(--color-bingcheong)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M0 20 Q 15 6, 30 20 T 60 20 T 90 20 T 120 20"
          stroke="var(--color-cheongram)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, delay: 0.2, ease: [0.65, 0, 0.35, 1] }}
        />
        <motion.path
          d="M0 28 Q 15 14, 30 28 T 60 28 T 90 28 T 120 28"
          stroke="var(--color-bingcheong)"
          strokeWidth="1"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 0.7 }}
          transition={{ duration: 1.4, delay: 0.4, ease: [0.65, 0, 0.35, 1] }}
        />
      </svg>
      <p className="text-xl tracking-[-0.02em] text-ink">발송 완료</p>
      <p className="text-sm text-muted">
        영업일 기준 2일 이내에 답장드리겠습니다.
      </p>
    </motion.div>
  );
}
