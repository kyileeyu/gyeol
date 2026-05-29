"use client";

import { ReactLenis } from "lenis/react";
import type { ReactNode } from "react";
import { ChapterRail } from "./ChapterRail";
import { Hero } from "./Hero";
import { WhoCards } from "./WhoCards";
import { PainCards } from "./PainCards";
import { StoryHowSection } from "./StoryHowSection";
import { ProcessTimeline } from "./ProcessTimeline";
import { IntakeFormShell } from "./IntakeFormShell";
import { Footer } from "./Footer";

type StackSlot = {
  node: ReactNode;
  background: string;
  rounded: boolean;
};

const STACK: StackSlot[] = [
  { node: <Hero />,            background: "var(--gy-canvas)",    rounded: false },
  { node: <WhoCards />,        background: "var(--gy-surface-1)", rounded: true  },
  { node: <PainCards />,       background: "var(--gy-canvas)",    rounded: true  },
  { node: <StoryHowSection />, background: "var(--gy-surface-1)", rounded: true  },
];

export function AiLandingPage() {
  return (
    <ReactLenis root options={{ lerp: 0.08 }}>
      <main
        className="font-kr"
        style={{
          background: "var(--gy-canvas)",
          color: "var(--gy-ink)",
          minHeight: "100svh",
        }}
      >
        <a
          href="#intake"
          className="sr-only focus:not-sr-only"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 50,
            background: "var(--gy-deep)",
            color: "var(--gy-on-primary)",
            padding: "0.5rem 1rem",
            fontSize: "0.875rem",
          }}
        >
          문의 폼으로 바로 이동
        </a>

        <ChapterRail />

        <div style={{ position: "relative" }}>
          {STACK.map((slot, idx) => (
            <div
              key={idx}
              style={{
                position: "sticky",
                top: 0,
                zIndex: idx + 1,
                background: slot.background,
                borderTopLeftRadius: slot.rounded ? "var(--gy-rounded-xxl)" : 0,
                borderTopRightRadius: slot.rounded ? "var(--gy-rounded-xxl)" : 0,
                overflow: "hidden",
                boxShadow: slot.rounded
                  ? "0 -12px 32px -16px color-mix(in srgb, var(--gy-ink) 12%, transparent)"
                  : "none",
              }}
            >
              {slot.node}
            </div>
          ))}
        </div>

        <div style={{ background: "var(--gy-surface-2)" }}>
          <ProcessTimeline />
        </div>
        <div style={{ background: "var(--gy-inverse-canvas)" }}>
          <IntakeFormShell />
        </div>

        <Footer />
      </main>
    </ReactLenis>
  );
}
