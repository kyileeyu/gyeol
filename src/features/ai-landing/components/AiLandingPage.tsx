import { ChapterRail } from "./ChapterRail";
import { Hero } from "./Hero";
import { WhoCards } from "./WhoCards";
import { PainCards } from "./PainCards";
import { StoryHowSection } from "./StoryHowSection";
import { ProcessTimeline } from "./ProcessTimeline";
import { IntakeFormShell } from "./IntakeFormShell";
import { Footer } from "./Footer";

export function AiLandingPage() {
  return (
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

      <Hero />
      <WhoCards />
      <PainCards />
      <StoryHowSection />
      <ProcessTimeline />
      <IntakeFormShell />
      <Footer />
    </main>
  );
}
