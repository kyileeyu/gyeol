// 결 스튜디오 명함 페이지 — vCard 다운로드 버튼
// Apple 글래스모피즘 필 + 회전하는 conic-gradient 글로우 보더
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { PROFILE } from "../lib/profile";

export default function SaveContactButton() {
  const reduce = useReducedMotion();

  return (
    <a
      href={PROFILE.vcard_path}
      download="gyeol.vcf"
      onClick={(e) => {
        e.stopPropagation();
        track("card_save_contact", {});
        track("cta_external_click", { target: "save_contact" });
      }}
      className="group relative block w-full overflow-hidden rounded-full p-[1.5px] shadow-[0_10px_28px_-12px_rgba(27,59,95,0.45)]"
    >
      {/* 회전하는 conic-gradient 글로우 보더 (흰색에 가까운 라이트 스윕) */}
      {!reduce && (
        <motion.span
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 aspect-square w-[150%] -translate-x-1/2 -translate-y-1/2"
          style={{
            background:
              "conic-gradient(transparent 180deg, rgba(255,255,255,0.1), #ffffff)",
          }}
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
        />
      )}

      {/* 글래스 본체 — 보더 안쪽 */}
      <span className="relative z-10 flex w-full items-center justify-center gap-2 overflow-hidden rounded-full border border-white/60 bg-white/25 px-6 py-4 text-ink backdrop-blur-md backdrop-saturate-150 transition-all group-hover:bg-white/40 group-active:scale-[0.98] shadow-[inset_0_1px_1px_rgba(255,255,255,0.9),inset_0_-2px_6px_rgba(255,255,255,0.25)]">
        {/* 상단 스페큘러 하이라이트 */}
        <span
          aria-hidden
          className="pointer-events-none absolute inset-x-3 top-0 h-1/2 rounded-full bg-gradient-to-b from-white/70 to-transparent opacity-70 blur-[2px]"
        />
        {/* 다운로드 아이콘 */}
        <svg
          aria-hidden
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          className="relative z-10"
        >
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
          <path d="M7 10l5 5 5-5" />
          <path d="M12 15V3" />
        </svg>
        <span className="relative z-10 text-sm font-medium tracking-[0.04em]">
          연락처 저장
        </span>
      </span>
    </a>
  );
}
