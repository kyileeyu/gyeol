"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Case = {
  name: string;
  tag: string;
  label: string;
  href: string;
  year: string;
  description: string;
  image: string;
};

const cases: Case[] = [
  {
    name: "dewstone.kr",
    tag: "Personal Branding",
    label: "Branding",
    href: "https://dewstone.kr",
    year: "2026",
    description:
      "듀스톤의 퍼스널 브랜딩 사이트. 톤과 리듬을 한 결로 정리한 첫 화면부터 끝까지.",
    image: "/work/dewstone.webp",
  },
  {
    name: "yoonseul-log",
    tag: "Portfolio Site",
    label: "Portfolio",
    href: "https://yoonseul-log.vercel.app/",
    year: "2026",
    description:
      "사진작가의 기록을 모은 포트폴리오. 이미지의 호흡에 맞춰 읽히도록 설계된 레이아웃.",
    image: "/work/yoonseul-log.webp",
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
            카드에 마우스를 올려 설명을 확인하고, 카드를 눌러 실제 사이트로 이동하세요.
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
          className="flex h-full w-max items-center gap-10 pl-16 pr-[50vw] lg:gap-14"
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
    <a
      href={c.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${c.name} — ${c.tag}`}
      className={
        (isMobile
          ? "h-[62vw] w-full "
          : "h-[clamp(440px,62vh,620px)] w-[clamp(620px,82vw,1040px)] shrink-0 ") +
        "group relative grid grid-cols-[56px_1fr] overflow-hidden rounded-[6px] border border-ink/10 bg-surface/60 transition-all duration-[600ms] ease-[cubic-bezier(0.65,0,0.35,1)] hover:-translate-y-2 hover:border-wave hover:shadow-[0_30px_80px_-30px_rgba(27,59,95,0.35)]"
      }
    >
      {/* 세로 라벨 */}
      <div
        className="relative z-20 flex items-start justify-center border-r border-ink/10 bg-bg/90 py-8 backdrop-blur-sm"
        style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
      >
        <span className="font-en text-[11px] tracking-[0.35em] uppercase text-deep">
          {c.label}
        </span>
      </div>

      {/* 미리보기 + 호버 오버레이 */}
      <div className="relative overflow-hidden bg-bg">
        <Image
          src={c.image}
          alt={`${c.name} 미리보기`}
          fill
          sizes="(max-width: 768px) 100vw, 82vw"
          className="object-cover object-top transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:scale-[1.03]"
          priority={index === 0}
        />

        {/* 흰색 그라데이션 호버 오버레이 */}
        <div
          aria-hidden
          className="absolute inset-0 z-10 bg-gradient-to-b from-white/80 via-white/55 to-white/30 opacity-0 backdrop-blur-[2px] transition-opacity duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:opacity-100"
        />

        {/* Info — 호버 시 떠오름 */}
        <div className="pointer-events-none absolute inset-0 z-20 flex flex-col justify-between p-8 opacity-0 translate-y-3 transition-[opacity,transform] duration-[700ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:opacity-100 group-hover:translate-y-0 sm:p-10">
          <div className="flex items-center justify-between">
            <span className="font-en text-xs tracking-[0.25em] text-deep/80">
              0{index + 1}
            </span>
            <span className="font-en text-xs tracking-[0.25em] text-deep/80">
              {c.year}
            </span>
          </div>

          <div className="flex flex-col gap-4">
            <p className="font-en italic text-xs tracking-[0.2em] uppercase text-deep">
              {c.tag}
            </p>
            <h3 className="font-kr-serif text-[clamp(1.75rem,3.2vw,2.75rem)] font-medium leading-[1.1] tracking-[-0.03em] text-ink">
              {c.name}
            </h3>
            <p className="max-w-md text-sm leading-[1.85] text-ink/80">
              {c.description}
            </p>
          </div>

          <div className="flex items-center justify-between font-en text-xs tracking-[0.25em] uppercase text-deep">
            <span>Click to visit</span>
            <span aria-hidden>↗</span>
          </div>
        </div>
      </div>
    </a>
  );
}

