"use client";

import { useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "framer-motion";

type Step = {
  num: string;
  ko: string;
  en: string;
  body: string;
  share: string;
};

const steps: Step[] = [
  {
    num: "01",
    ko: "결을 잡다",
    en: "Aligning",
    body:
      "만나서 이야기를 듣고, 무드보드 또는 빠른 프로토타입으로 브랜드의 결을 함께 정합니다.",
    share: "무드보드 한 장, 또는 작동하는 첫 화면",
  },
  {
    num: "02",
    ko: "결을 그리다",
    en: "Designing",
    body:
      "Figma 또는 코드 — 클라이언트의 출발점에 맞는 도구에서 시안과 인터랙션 컨셉을 다듬습니다.",
    share: "주요 화면 시안 또는 인터랙션 데모",
  },
  {
    num: "03",
    ko: "결을 새기다",
    en: "Building",
    body:
      "Next.js로 개발합니다. 매 단계 작동하는 링크로 함께 확인합니다.",
    share: "매주 업데이트되는 스테이징 링크",
  },
  {
    num: "04",
    ko: "결을 잇다",
    en: "Caring",
    body:
      "배포 후 검색 노출과 사용자 흐름을 함께 확인하고 개선합니다.",
    share: "정기 리포트와 개선 제안",
  },
];

const EASE = [0.65, 0, 0.35, 1] as const;

export default function Process() {
  const reduce = useReducedMotion();

  if (reduce) {
    return (
      <section id="process" className="relative w-full bg-bg px-6 py-32 sm:py-48">
        <div className="mx-auto flex max-w-5xl flex-col gap-20">
          <Header />
          <StackList />
        </div>
      </section>
    );
  }

  return (
    <section id="process" className="relative w-full bg-bg">
      <PinnedShowcase />

      <div className="px-6 py-32 md:hidden">
        <div className="mx-auto flex max-w-5xl flex-col gap-14">
          <Header />
          <StackList />
        </div>
      </div>
    </section>
  );
}

function Header() {
  return (
    <header className="flex max-w-2xl flex-col gap-6">
      <span aria-hidden className="block h-px w-16 bg-wave" />
      <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
        Process
      </p>
      <h2 className="font-kr-serif text-[clamp(1.75rem,3.8vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.025em] text-ink">
        네 번에 걸쳐 결을 맞춥니다.
      </h2>
    </header>
  );
}

function PinnedShowcase() {
  const pinWrap = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: pinWrap,
    offset: ["start start", "end end"],
  });

  const [activeIndex, setActiveIndex] = useState(0);
  const [segment, setSegment] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    const clamped = Math.min(0.9999, Math.max(0, v));
    const scaled = clamped * steps.length;
    const idx = Math.min(steps.length - 1, Math.floor(scaled));
    setActiveIndex(idx);
    setSegment(scaled - idx);
  });

  return (
    <div
      ref={pinWrap}
      className="relative hidden md:block"
      style={{ height: `${steps.length * 100}vh` }}
      aria-hidden
    >
      <div className="sticky top-0 flex h-screen flex-col overflow-hidden">
        <div className="mx-auto w-full max-w-6xl px-6 pt-24 pb-8 lg:pt-28 lg:pb-10">
          <Header />
        </div>
        <div className="flex min-h-0 flex-1 items-stretch px-6 pb-16">
          <div
            role="group"
            aria-label="프로세스 단계"
            className="mx-auto flex h-full w-full max-w-6xl min-h-0 gap-4"
          >
            {steps.map((s, i) => (
              <ShowcaseCard
                key={s.num}
                step={s}
                index={i}
                isActive={i === activeIndex}
                segment={i === activeIndex ? segment : i < activeIndex ? 1 : 0}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function ShowcaseCard({
  step,
  index,
  isActive,
  segment,
}: {
  step: Step;
  index: number;
  isActive: boolean;
  segment: number;
}) {
  const isLast = index === steps.length - 1;
  const barHeight = `${Math.max(0, Math.min(1, segment)) * 100}%`;

  return (
    <motion.article
      aria-current={isActive ? "step" : undefined}
      animate={{ flexGrow: isActive ? 2.6 : 1 }}
      transition={{ duration: 0.6, ease: EASE }}
      style={{ flexBasis: 0, flexShrink: 1, minWidth: 0 }}
      className="relative flex h-full flex-col overflow-hidden border-t border-ink/15 pl-6 pr-4 pt-8 pb-10"
    >
      <span
        aria-hidden
        className="absolute left-0 top-0 h-full w-[2px]"
        style={{ backgroundColor: "color-mix(in srgb, var(--gy-deep) 8%, transparent)" }}
      />
      <motion.span
        aria-hidden
        className="absolute left-0 top-0 w-[2px] bg-wave"
        animate={{ height: isLast && !isActive ? "0%" : barHeight }}
        transition={{ duration: 0 }}
      />

      <div className="flex flex-col gap-2">
        <motion.span
          className="font-en text-xs tracking-[0.25em] text-muted"
          animate={{ opacity: isActive ? 1 : 0.5 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {step.num}
        </motion.span>
        <motion.span
          className="font-en italic text-xs tracking-[0.2em] text-deep"
          animate={{ opacity: isActive ? 1 : 0.45 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {step.en}
        </motion.span>
        <motion.h3
          className="mt-3 font-kr-serif font-medium tracking-[-0.02em] text-ink"
          animate={{
            opacity: isActive ? 1 : 0.7,
            fontSize: isActive ? "clamp(1.75rem, 3vw, 2.4rem)" : "1.375rem",
          }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          {step.ko}
        </motion.h3>
      </div>

      <AnimatePresence initial={false}>
        {isActive && (
          <motion.div
            key="body"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mt-8 flex flex-col gap-6"
          >
            <p className="max-w-xl text-sm leading-[1.9] text-muted lg:text-base">
              {step.body}
            </p>
            <div className="flex items-start gap-4 border-l border-wave/60 pl-4">
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-deep/80">
                Share
              </span>
              <span className="max-w-md text-sm leading-[1.7] text-ink/80">
                {step.share}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.article>
  );
}

function StackList() {
  return (
    <ol className="flex flex-col">
      {steps.map((s) => (
        <li
          key={s.num}
          className="group relative grid grid-cols-[auto,1fr] gap-6 sm:gap-12 border-t border-ink/15 py-10 sm:py-14 last:border-b"
        >
          <div className="flex flex-col gap-1 sm:gap-2">
            <span className="font-en text-xs tracking-[0.25em] text-muted">
              {s.num}
            </span>
            <span className="font-en italic text-xs tracking-[0.2em] text-deep">
              {s.en}
            </span>
          </div>

          <div className="flex flex-col gap-6 sm:gap-8">
            <h3 className="font-kr-serif text-2xl sm:text-3xl font-medium tracking-[-0.02em] text-ink">
              {s.ko}
            </h3>
            <p className="max-w-xl text-sm sm:text-base leading-[1.9] text-muted">
              {s.body}
            </p>
            <div className="flex items-start gap-4 border-l border-wave/60 pl-4">
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-deep/80">
                Share
              </span>
              <span className="text-sm leading-[1.7] text-ink/80">
                {s.share}
              </span>
            </div>
          </div>
        </li>
      ))}
    </ol>
  );
}
