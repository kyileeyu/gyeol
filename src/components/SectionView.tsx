"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { track } from "@/lib/analytics";

type Props = {
  name: string;
  children: ReactNode;
  threshold?: number;
  className?: string;
};

export function SectionView({
  name,
  children,
  threshold = 0.4,
  className,
}: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    let fired = false;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !fired) {
          fired = true;
          track("section_view", { section: name });
          io.disconnect();
        }
      },
      { threshold },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [name, threshold]);

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
