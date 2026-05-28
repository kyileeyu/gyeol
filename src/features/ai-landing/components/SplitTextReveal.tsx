"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ensureGsapPlugins, gsap, SplitText } from "@/lib/gsap";

type SplitType = "chars" | "words" | "lines";

type SplitTextRevealProps = {
  children: ReactNode;
  as?: "h1" | "h2" | "p" | "div";
  splitType?: SplitType;
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  y?: number;
  blur?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function SplitTextReveal({
  children,
  as = "h2",
  splitType = "chars",
  trigger = "scroll",
  delay = 0.15,
  stagger = 0.02,
  duration = 0.55,
  y = 14,
  blur = 6,
  className,
  style,
  id,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      el.style.opacity = "0";
      const rafId = requestAnimationFrame(() => {
        el.style.transition = "opacity 0.4s ease";
        el.style.opacity = "1";
      });
      return () => cancelAnimationFrame(rafId);
    }

    ensureGsapPlugins();

    let split: InstanceType<typeof SplitText> | null = null;
    let tween: gsap.core.Tween | null = null;

    const start = () => {
      split = new SplitText(el, {
        type: splitType,
        charsClass: "gy-st-char",
        wordsClass: "gy-st-word",
        linesClass: "gy-st-line",
      });

      const targets =
        splitType === "chars"
          ? split.chars
          : splitType === "words"
            ? split.words
            : split.lines;

      tween = gsap.from(targets, {
        opacity: 0,
        y,
        filter: `blur(${blur}px)`,
        duration,
        stagger,
        delay: trigger === "load" ? delay : 0,
        ease: "power3.out",
        scrollTrigger:
          trigger === "scroll"
            ? {
                trigger: el,
                start: "top 85%",
                once: true,
              }
            : undefined,
      });
    };

    if (document.fonts && typeof document.fonts.ready?.then === "function") {
      document.fonts.ready.then(start);
    } else {
      start();
    }

    return () => {
      tween?.kill();
      split?.revert();
    };
  }, [trigger, delay, stagger, duration, splitType, y, blur]);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const refAny = ref as React.RefObject<any>;

  if (as === "h1")
    return (
      <h1 ref={refAny} id={id} className={className} style={style}>
        {children}
      </h1>
    );
  if (as === "h2")
    return (
      <h2 ref={refAny} id={id} className={className} style={style}>
        {children}
      </h2>
    );
  if (as === "p")
    return (
      <p ref={refAny} id={id} className={className} style={style}>
        {children}
      </p>
    );
  return (
    <div ref={refAny} id={id} className={className} style={style}>
      {children}
    </div>
  );
}
