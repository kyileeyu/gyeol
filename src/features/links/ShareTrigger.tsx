"use client";

import dynamic from "next/dynamic";
import { useCallback, useState } from "react";
import { track } from "@/lib/analytics";
import { LINKS_PAGE_URL, LINKS_PROFILE } from "./data";
import { ShareIcon } from "./icons";

const QRModal = dynamic(() => import("./QRModal"), { ssr: false });

export function ShareTrigger() {
  const [qrOpen, setQrOpen] = useState(false);

  const handleClick = useCallback(async () => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({
          url: LINKS_PAGE_URL,
          title: `${LINKS_PROFILE.name} — Links`,
          text: LINKS_PROFILE.tagline,
        });
        track("links_share_open", { method: "native" });
        return;
      } catch {
        // 사용자가 cancel — 조용히 fallback
      }
    }
    setQrOpen(true);
    track("links_share_open", { method: "qr" });
  }, []);

  return (
    <>
      <button
        type="button"
        onClick={handleClick}
        aria-label="이 페이지 공유"
        className={[
          "fixed right-3 top-3 z-40",
          "inline-flex h-11 w-11 items-center justify-center rounded-full",
          "border border-hairline/60 bg-white/65 backdrop-blur-md",
          "text-ink shadow-[var(--gy-shadow-sm)]",
          "transition-[transform,box-shadow,background-color,color]",
          "duration-[200ms]",
          "hover:bg-white/90 hover:text-deep hover:shadow-[var(--gy-shadow-md)]",
          "active:scale-[0.96]",
          "focus:outline-none focus-visible:shadow-[var(--gy-shadow-focus)]",
          "sm:right-4 sm:top-4",
        ].join(" ")}
      >
        <ShareIcon size={18} />
      </button>
      <QRModal open={qrOpen} onClose={() => setQrOpen(false)} />
    </>
  );
}
