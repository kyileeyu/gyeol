"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Case = {
  name: string;
  tag: string;
  label: string;
  href?: string;
  accent: string;
  year: string;
};

const cases: Case[] = [
  {
    name: "dewstone.kr",
    tag: "Personal Branding",
    label: "Branding",
    href: "https://dewstone.kr",
    accent: "#A8D5E2",
    year: "2026",
  },
  {
    name: "yoonseul-log",
    tag: "Portfolio Site",
    label: "Portfolio",
    href: "https://yoonseul-log.vercel.app/",
    accent: "#C9D6DF",
    year: "2026",
  },
];

export default function Work() {
  const pinRef = useRef<HTMLDivElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const pin = pinRef.current;
    const track = trackRef.current;
    if (!pin || !track) return;

    const mql = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 768px)",
    );
    if (mql.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const distance = () => track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -distance(),
        ease: "none",
        scrollTrigger: {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, pin);

    return () => ctx.revert();
  }, []);

  return (
    <section id="work" className="relative w-full bg-bg">
      {/* Header — 일반 스크롤, pin 바깥 */}
      <div className="px-6 pb-20 pt-32 sm:pb-28 sm:pt-48">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <div className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-16 bg-wave" />
            <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
              Work
            </p>
          </div>
          <h2 className="font-kr-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
            지금까지 결을 맞춘 페이지
          </h2>
          <p className="max-w-xl text-sm sm:text-base leading-[1.85] text-muted">
            옆으로 스크롤해 케이스를 확인하세요.
          </p>
        </div>
      </div>

      {/* Desktop — pinned horizontal scroll */}
      <div
        ref={pinRef}
        className="relative hidden h-[100svh] overflow-hidden md:block"
      >
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-8 pl-6 pr-[50vw] sm:gap-12 sm:pl-16"
        >
          {cases.map((c, i) => (
            <CaseCard key={c.name} c={c} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile — 세로 스택 */}
      <div className="flex flex-col gap-10 px-6 pb-32 md:hidden">
        {cases.map((c, i) => (
          <CaseCard key={c.name + "-m"} c={c} index={i} variant="mobile" />
        ))}
      </div>
    </section>
  );
}

function CaseCard({
  c,
  index,
  variant,
}: {
  c: Case;
  index: number;
  variant?: "mobile";
}) {
  const isMobile = variant === "mobile";

  return (
    <article
      className={
        (isMobile
          ? "grid h-[72vw] w-full "
          : "grid h-[clamp(420px,68vh,620px)] w-[clamp(320px,58vw,580px)] shrink-0 ") +
        "grid-cols-[auto_1fr] overflow-hidden rounded-[4px] border border-ink/10 bg-surface/60 transition-colors duration-500 hover:border-wave"
      }
    >
      {/* 세로 라벨 — 위에서 아래로 읽힘 */}
      <div
        className="flex items-start justify-center border-r border-ink/10 bg-bg/80 py-8"
        style={{
          writingMode: "vertical-rl",
          textOrientation: "mixed",
        }}
      >
        <span className="font-en text-[11px] tracking-[0.35em] uppercase text-deep">
          {c.label}
        </span>
      </div>

      {/* 본문 */}
      <div className="relative flex flex-col justify-between p-8 sm:p-10">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-60"
          style={{
            background: `radial-gradient(70% 80% at 30% 30%, ${c.accent}2E 0%, transparent 70%)`,
          }}
        />

        <div className="relative z-10 flex items-center justify-between">
          <span className="font-en text-xs tracking-[0.25em] text-muted">
            0{index + 1}
          </span>
          <span className="font-en text-xs tracking-[0.25em] text-muted">
            {c.year}
          </span>
        </div>

        <div className="relative z-10 flex flex-col gap-4">
          <p className="font-en italic text-xs tracking-[0.2em] uppercase text-deep/80">
            {c.tag}
          </p>
          <h3 className="font-kr-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
            {c.name}
          </h3>
        </div>

        <div className="relative z-10 flex items-center justify-between">
          {c.href ? (
            <a
              href={c.href}
              target="_blank"
              rel="noreferrer noopener"
              className="inline-flex items-center gap-3 border-b border-ink/30 pb-1 font-en text-sm tracking-[0.15em] text-ink transition-colors duration-300 hover:border-wave hover:text-deep"
            >
              Visit
              <span aria-hidden>↗</span>
            </a>
          ) : (
            <span className="font-en text-xs tracking-[0.25em] text-muted/60">
              Case coming soon
            </span>
          )}
        </div>
      </div>
    </article>
  );
}
