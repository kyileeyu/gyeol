"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function useScrollDepth() {
  useEffect(() => {
    const fired = new Set<25 | 50 | 75 | 100>();
    const milestones: Array<25 | 50 | 75 | 100> = [25, 50, 75, 100];

    const onScroll = () => {
      const h = document.documentElement;
      const scrolled = h.scrollTop + h.clientHeight;
      const total = h.scrollHeight;
      if (total <= 0) return;
      const pct = Math.round((scrolled / total) * 100);
      for (const m of milestones) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          track("scroll_depth", { percent: m });
        }
      }
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
}
