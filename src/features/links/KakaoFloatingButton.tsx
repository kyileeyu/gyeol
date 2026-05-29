"use client";

import { motion, useReducedMotion } from "framer-motion";
import { track } from "@/lib/analytics";
import { KAKAO_OPENCHAT_URL } from "./data";
import { ChatIcon } from "./icons";

const easingFlow = [0.65, 0, 0.35, 1] as const;

export function KakaoFloatingButton() {
  const prefersReduced = useReducedMotion();

  return (
    <motion.div
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4, ease: easingFlow }}
      className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40"
    >
      <motion.a
        href={KAKAO_OPENCHAT_URL}
        target="_blank"
        rel="noreferrer noopener"
        onClick={() =>
          track("links_click", {
            id: "kakao-openchat",
            href: KAKAO_OPENCHAT_URL,
          })
        }
        aria-label="결을 맞춰보는 카카오톡 오픈채팅 (새 창에서 열기)"
        animate={prefersReduced ? undefined : { y: [0, -6, 0] }}
        transition={
          prefersReduced
            ? undefined
            : {
                duration: 3.4,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 1.0,
              }
        }
        className={[
          "inline-flex items-center gap-2.5 whitespace-nowrap",
          "rounded-full",
          "bg-deep/80 backdrop-blur-xl",
          "border border-canvas/20",
          "px-7 py-3.5 text-canvas",
          "shadow-[0_14px_36px_rgba(1,66,160,0.36)]",
          "transition-[background-color,box-shadow] duration-[200ms]",
          "hover:bg-deep hover:shadow-[0_18px_44px_rgba(1,66,160,0.44)]",
          "active:scale-[0.98]",
          "focus:outline-none focus-visible:shadow-[0_0_0_3px_rgba(252,253,255,0.65),0_14px_36px_rgba(1,66,160,0.36)]",
        ].join(" ")}
      >
        <ChatIcon size={18} />
        <span className="font-kr text-[14.5px] font-bold tracking-[-0.1px] leading-none">
          바로 대화하기
        </span>
      </motion.a>
    </motion.div>
  );
}
