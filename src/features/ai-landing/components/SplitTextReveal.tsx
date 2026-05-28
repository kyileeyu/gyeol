"use client";

import { useEffect, useRef } from "react";
import type { CSSProperties, ReactNode } from "react";
import { ensureGsapPlugins, gsap, SplitText } from "@/lib/gsap";

type SplitTextRevealProps = {
  children: ReactNode;
  as?: "h1" | "h2";
  trigger?: "load" | "scroll";
  delay?: number;
  stagger?: number;
  duration?: number;
  className?: string;
  style?: CSSProperties;
  id?: string;
};

export function SplitTextReveal({
  children,
  as = "h2",
  trigger = "scroll",
  delay = 0.15,
  stagger = 0.02,
  duration = 0.55,
  className,
  style,
  id,
}: SplitTextRevealProps) {
  const ref = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || typeof window === "undefined") return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (reducedMotion) {
      el.style.opacity = "0";
      const id = requestAnimationFrame(() => {
        el.style.transition = "opacity 0.4s ease";
        el.style.opacity = "1";
      });
      return () => cancelAnimationFrame(id);
    }

    ensureGsapPlugins();

    let split: InstanceType<typeof SplitText> | null = null;
    let tween: gsap.core.Tween | null = null;

    const start = () => {
      split = new SplitText(el, {
        type: "chars",
        charsClass: "gy-st-char",
      });

      tween = gsap.from(split.chars, {
        opacity: 0,
        y: 14,
        filter: "blur(6px)",
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
  }, [trigger, delay, stagger, duration]);

  return as === "h1" ? (
    <h1 ref={ref} id={id} className={className} style={style}>
      {children}
    </h1>
  ) : (
    <h2 ref={ref} id={id} className={className} style={style}>
      {children}
    </h2>
  );
}
