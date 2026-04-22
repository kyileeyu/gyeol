"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Case = {
  name: string;
  tag: string;
  href?: string;
  accent: string; // hex for background gradient accent
  year: string;
};

const cases: Case[] = [
  {
    name: "dewstone.kr",
    tag: "Personal Branding",
    href: "https://dewstone.kr",
    accent: "#A8D5E2",
    year: "2026",
  },
  {
    name: "yoonseul-log",
    tag: "Portfolio Site",
    href: "https://yoonseul-log.vercel.app/",
    accent: "#C9D6DF",
    year: "2026",
  },
];

export default function Work() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const trackRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;

    const mql = window.matchMedia(
      "(prefers-reduced-motion: reduce), (max-width: 768px)",
    );
    if (mql.matches) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      const total = track.scrollWidth - window.innerWidth;

      gsap.to(track, {
        x: () => -total,
        ease: "none",
        scrollTrigger: {
          trigger: section,
          start: "top top",
          end: () => `+=${total}`,
          pin: true,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1,
        },
      });
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative w-full overflow-hidden bg-bg"
      aria-label="Work"
    >
      <div
        ref={trackRef}
        className="flex h-[100svh] w-max items-center gap-0 md:h-screen"
      >
        {/* Intro panel */}
        <article className="flex h-full w-screen flex-col justify-between px-6 py-24 sm:px-16 md:px-24">
          <div className="flex items-center gap-4">
            <span aria-hidden className="block h-px w-16 bg-wave" />
            <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
              Work
            </p>
          </div>
          <div className="flex max-w-2xl flex-col gap-8">
            <h2 className="font-kr-serif text-[clamp(2.25rem,5vw,4rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
              만든 것보다
              <br />
              만들 것이 더 많습니다.
            </h2>
            <p className="text-base sm:text-lg leading-[1.9] text-muted">
              지금까지 결을 맞춘 페이지. 옆으로 넘기며 확인하세요.
            </p>
          </div>
          <p className="font-en text-xs tracking-[0.25em] text-muted/70">
            01 / {String(cases.length + 1).padStart(2, "0")}
          </p>
        </article>

        {cases.map((c, i) => (
          <article
            key={c.name}
            className="relative flex h-full w-screen flex-col justify-between px-6 py-24 sm:px-16 md:px-24"
          >
            {/* Background accent wash */}
            <div
              aria-hidden
              className="pointer-events-none absolute inset-0 -z-0 opacity-70"
              style={{
                background: `radial-gradient(60% 70% at 30% 40%, ${c.accent}33 0%, transparent 65%)`,
              }}
            />
            <div className="relative z-10 flex items-center gap-4">
              <span className="font-en text-xs tracking-[0.25em] text-muted">
                0{i + 2} / {String(cases.length + 1).padStart(2, "0")}
              </span>
            </div>

            <div className="relative z-10 grid grid-cols-1 gap-10 md:grid-cols-[1fr_minmax(300px,0.6fr)] md:items-end md:gap-16">
              <div className="flex flex-col gap-6">
                <p className="font-en italic text-xs tracking-[0.25em] uppercase text-deep">
                  {c.tag}
                </p>
                <h3 className="font-kr-serif text-[clamp(2.5rem,6vw,5rem)] font-medium leading-[1.05] tracking-[-0.035em] text-ink">
                  {c.name}
                </h3>
              </div>

              <div className="flex flex-col items-start gap-4 md:items-end">
                <span className="font-en text-xs tracking-[0.25em] text-muted">
                  {c.year}
                </span>
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

            <p className="relative z-10 font-en text-xs tracking-[0.25em] text-muted/70">
              Gyeol · Studio
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}
