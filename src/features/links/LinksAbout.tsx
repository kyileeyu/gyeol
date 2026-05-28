"use client";

import { motion } from "framer-motion";

const easingFlow = [0.65, 0, 0.35, 1] as const;

export function LinksAbout() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.2, ease: easingFlow }}
      aria-label="결 스튜디오 소개"
      className="mt-6 text-center [word-break:keep-all]"
    >
      <ul className="flex flex-col items-center gap-1.5 text-[13.5px] font-medium leading-[1.35] text-ink-muted">
        <li className="flex items-center gap-2">
          <span aria-hidden>💻</span>
          <span>프론트엔드 개발 4년</span>
        </li>
        <li className="flex items-center gap-2">
          <span aria-hidden>🤖</span>
          <span>AI 활용 및 자동화 설계</span>
        </li>
      </ul>
      <p className="mt-1.5 text-[13.5px] font-medium leading-[1.55] text-ink-muted">
        기술 위에 감각을, 아이디어 위에 생산성을 더합니다.
      </p>
    </motion.section>
  );
}
