"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

const TILT_DEG = 8;
const SHADOW_OFFSET = 24;
const SHADOW_Y_BIAS = 14;
const SHADOW_COLOR = "color-mix(in srgb, var(--color-deep) 22%, transparent)";

type Case = {
  name: string;
  tag: string;
  label: string;
  href: string;
  image: string;
};

const cases: Case[] = [
  {
    name: "dewstone.kr",
    tag: "Personal Branding",
    label: "Branding",
    href: "https://dewstone.kr",
    image: "/work/dewstone.webp",
  },
  {
    name: "yoonseul-log",
    tag: "Portfolio Site",
    label: "Portfolio",
    href: "https://yoonseul-log.vercel.app/",
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
          className="flex h-full w-max items-center gap-24 pr-[16vw] lg:gap-32"
        >
          <WorkIntro />
          {cases.map((c, i) => (
            <CaseCard key={c.name} c={c} index={i} isMobile={false} />
          ))}
        </div>
      </div>

      {/* Mobile — 세로 스택 + 헤더 */}
      <div className="flex flex-col gap-10 px-6 pb-32 pt-32 md:hidden">
        <MobileIntro />
        {cases.map((c, i) => (
          <CaseCard key={c.name + "-m"} c={c} index={i} isMobile />
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
  isMobile,
}: {
  c: Case;
  index: number;
  isMobile: boolean;
}) {
  const cardRef = useRef<HTMLDivElement | null>(null);
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    if (isMobile) return;
    const mql = window.matchMedia("(prefers-reduced-motion: reduce)");
    reducedMotionRef.current = mql.matches;
    const onChange = (e: MediaQueryListEvent) => {
      reducedMotionRef.current = e.matches;
    };
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, [isMobile]);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotionRef.current || !cardRef.current) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const nx = (e.clientX - rect.left) / rect.width - 0.5;
    const ny = (e.clientY - rect.top) / rect.height - 0.5;
    const rx = (-ny * TILT_DEG).toFixed(2);
    const ry = (nx * TILT_DEG).toFixed(2);
    const sx = (-nx * SHADOW_OFFSET).toFixed(0);
    const sy = (-ny * SHADOW_OFFSET + SHADOW_Y_BIAS).toFixed(0);
    cardRef.current.style.transform = `rotateX(${rx}deg) rotateY(${ry}deg)`;
    cardRef.current.style.boxShadow = `${sx}px ${sy}px 44px -8px ${SHADOW_COLOR}`;
  };

  const handleMouseLeave = () => {
    if (!cardRef.current) return;
    cardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
    cardRef.current.style.boxShadow = "0 0 0 0 transparent";
  };

  return (
    <a
      href={c.href}
      target="_blank"
      rel="noreferrer noopener"
      aria-label={`${c.name} — ${c.tag}`}
      className={
        (isMobile
          ? "h-[46vw] w-full "
          : "h-[clamp(280px,42vh,400px)] w-[clamp(400px,52vw,660px)] shrink-0 ") +
        "group relative flex items-stretch gap-5"
      }
    >
      <div className="flex shrink-0 items-end justify-center py-1">
        <span
          style={{
            writingMode: "vertical-rl",
            transform: "rotate(180deg)",
          }}
          className="font-en text-[11px] tracking-[0.35em] uppercase text-deep"
        >
          {c.label}
        </span>
      </div>

      <div className="relative flex-1 [perspective:1200px]">
        <div
          ref={cardRef}
          onMouseMove={isMobile ? undefined : handleMouseMove}
          onMouseLeave={isMobile ? undefined : handleMouseLeave}
          style={{
            transition:
              "transform 300ms cubic-bezier(0.4, 0, 0.2, 1), box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1)",
            willChange: isMobile ? undefined : "transform, box-shadow",
          }}
          className="relative h-full w-full overflow-hidden rounded-[6px] border border-ink/10 bg-surface/60"
        >
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
    </a>
  );
}
