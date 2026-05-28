"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { bindLenisToScrollTrigger } from "@/lib/gsap";

export function SmoothScrollProvider() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (reducedMotion) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      anchors: true,
    });

    bindLenisToScrollTrigger(lenis);

    return () => {
      lenis.destroy();
    };
  }, []);

  return null;
}
