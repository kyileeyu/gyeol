"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ScrollTextFadeProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  baseOpacity?: number;
  offset?: [string, string];
}

export function ScrollTextFade({
  children,
  className,
  style,
  baseOpacity = 0.16,
  offset = ["start 0.95", "start 0.5"],
}: ScrollTextFadeProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    offset: offset as any,
  });
  const opacity = useTransform(scrollYProgress, [0, 1], [baseOpacity, 1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ ...style, opacity }}
    >
      {children}
    </motion.div>
  );
}
