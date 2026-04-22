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
      {/* Desktop — pinned horizontal scroll (헤더 포함) */}
      <div
        ref={pinRef}
        className="relative hidden h-[100svh] overflow-hidden md:block"
      >
        <div
          ref={trackRef}
          className="flex h-full w-max items-center gap-10 pr-[50vw] lg:gap-14"
        >
          <WorkIntro />
          {cases.map((c, i) => (
            <CaseCard key={c.name} c={c} index={i} />
          ))}
        </div>
      </div>

      {/* Mobile — 세로 스택 + 헤더 */}
      <div className="flex flex-col gap-10 px-6 pb-32 pt-32 md:hidden">
        <MobileIntro />
        {cases.map((c, i) => (
          <CaseCard key={c.name + "-m"} c={c} index={i} variant="mobile" />
        ))}
      </div>
    </section>
  );
}

function WorkIntro() {
  return (
    <div className="flex h-full w-[clamp(520px,60vw,760px)] shrink-0 flex-col justify-center gap-8 px-16 lg:px-24">
      <div className="flex items-center gap-4">
        <span aria-hidden className="block h-px w-16 bg-wave" />
        <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
          Work
        </p>
      </div>
      <h2 className="font-kr-serif text-[clamp(2.25rem,5vw,3.75rem)] font-medium leading-[1.15] tracking-[-0.03em] text-ink">
        지금까지
        <br />
        결을 맞춘 페이지
      </h2>
      <p className="max-w-md text-sm sm:text-base leading-[1.85] text-muted">
        카드에 마우스를 올려 설명을 확인하고,
        <br />
        카드를 눌러 실제 사이트로 이동하세요.
      </p>
      <div className="mt-4 flex items-center gap-3 font-en text-xs tracking-[0.25em] uppercase text-deep/70">
        <span aria-hidden>→</span>
        <span>Scroll</span>
      </div>
    </div>
  );
}

function MobileIntro() {
  return (
    <div className="flex flex-col gap-6 pb-4">
      <div className="flex items-center gap-4">
        <span aria-hidden className="block h-px w-12 bg-wave" />
        <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
          Work
        </p>
      </div>
      <h2 className="font-kr-serif text-[clamp(2rem,7vw,2.75rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
        지금까지 결을 맞춘 페이지
      </h2>
      <p className="max-w-xl text-sm leading-[1.85] text-muted">
        카드를 눌러 실제 사이트로 이동하세요.
      </p>
    </div>
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
        "group relative block [perspective:1600px]"
      }
    >
      <div
        className={
          "relative h-full w-full transition-transform duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] [transform-style:preserve-3d]" +
          (isMobile ? "" : " group-hover:[transform:rotateY(180deg)]")
        }
      >
        {/* Front — 미리보기 + 세로 라벨 */}
        <div className="absolute inset-0 grid grid-cols-[56px_1fr] overflow-hidden rounded-[6px] border border-ink/10 bg-surface/60 [backface-visibility:hidden] [-webkit-backface-visibility:hidden]">
          <div
            className="relative z-20 flex items-start justify-center border-r border-ink/10 bg-bg/90 py-8 backdrop-blur-sm"
            style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
          >
            <span className="font-en text-[11px] tracking-[0.35em] uppercase text-deep">
              {c.label}
            </span>
          </div>
          <div className="relative overflow-hidden bg-bg">
            <Image
              src={c.image}
              alt={`${c.name} 미리보기`}
              fill
              sizes="(max-width: 768px) 100vw, 82vw"
              className="object-cover object-top"
              priority={index === 0}
            />
          </div>
        </div>

        {/* Back — 정보 패널 */}
        <div className="absolute inset-0 overflow-hidden rounded-[6px] border border-wave bg-bg [backface-visibility:hidden] [-webkit-backface-visibility:hidden] [transform:rotateY(180deg)]">
          <div className="flex h-full flex-col justify-between p-10 sm:p-12">
            <div className="flex items-center justify-between">
              <span className="font-en text-xs tracking-[0.25em] text-deep/80">
                0{index + 1}
              </span>
              <span className="font-en text-xs tracking-[0.25em] text-deep/80">
                {c.year}
              </span>
            </div>

            <div className="flex flex-col gap-5">
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
      </div>
    </a>
  );
}
