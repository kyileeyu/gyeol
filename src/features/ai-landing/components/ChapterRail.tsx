"use client";

import { useEffect, useState } from "react";

const CHAPTERS = [
  { id: "hero",      num: "01", label: "Hero" },
  { id: "who",       num: "02", label: "이런 분께" },
  { id: "pain",      num: "03", label: "막히는 지점" },
  { id: "story-how", num: "04", label: "어떻게 하나" },
  { id: "process",   num: "05", label: "진행 방식" },
  { id: "intake",    num: "06", label: "문의" },
] as const;

export function ChapterRail() {
  const [activeId, setActiveId] = useState<string>("hero");

  useEffect(() => {
    const sections = CHAPTERS.map((c) => document.getElementById(c.id)).filter(
      (el): el is HTMLElement => el !== null,
    );
    if (sections.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio);
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        rootMargin: "-40% 0px -50% 0px",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      },
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <nav
      aria-label="페이지 챕터 인덱스"
      className="hidden lg:flex"
      style={{
        position: "fixed",
        top: "50%",
        left: "clamp(1.5rem, 3vw, 2.5rem)",
        transform: "translateY(-50%)",
        flexDirection: "column",
        gap: "0.75rem",
        zIndex: 30,
        pointerEvents: "auto",
      }}
    >
      {CHAPTERS.map((c) => {
        const isActive = c.id === activeId;
        return (
          <a
            key={c.id}
            href={`#${c.id}`}
            className="font-en"
            aria-current={isActive ? "true" : undefined}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.5rem",
              padding: "0.25rem 0",
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.125em",
              lineHeight: 1.2,
              textTransform: "uppercase",
              color: isActive ? "var(--gy-deep)" : "var(--gy-ink-subtle)",
              transition:
                "color 200ms var(--gy-easing-out), opacity 200ms var(--gy-easing-out)",
              opacity: isActive ? 1 : 0.7,
            }}
          >
            <span aria-hidden="true">{c.num}</span>
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: isActive ? "28px" : "12px",
                height: "1px",
                background: isActive
                  ? "var(--gy-deep)"
                  : "var(--gy-ink-subtle)",
                transition:
                  "width 200ms var(--gy-easing-out), background 200ms var(--gy-easing-out)",
              }}
            />
            <span className="sr-only">{c.label}</span>
          </a>
        );
      })}
    </nav>
  );
}
