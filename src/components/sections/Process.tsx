"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

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

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.14, delayChildren: 0.05 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 28 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.1, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function Process() {
  const reduce = useReducedMotion();

  return (
    <section
      id="process"
      className="relative w-full bg-bg px-6 py-32 sm:py-48"
    >
      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.15 }}
        className="mx-auto flex max-w-5xl flex-col gap-20"
      >
        <motion.header variants={item} className="flex max-w-2xl flex-col gap-6">
          <span aria-hidden className="block h-px w-16 bg-wave" />
          <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
            Process
          </p>
          <h2 className="font-kr-serif text-[clamp(1.75rem,3.8vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.025em] text-ink">
            네 번에 걸쳐 결을 맞춥니다.
          </h2>
        </motion.header>

        <ol className="flex flex-col">
          {steps.map((s, i) => (
            <motion.li
              key={s.num}
              variants={item}
              className="group relative grid grid-cols-[auto,1fr] gap-6 sm:gap-12 border-t border-ink/15 py-10 sm:py-14 last:border-b transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-wave"
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

              <span
                aria-hidden
                className="absolute bottom-0 left-0 h-px w-0 bg-wave transition-[width] duration-[900ms] ease-[cubic-bezier(0.65,0,0.35,1)] group-hover:w-full"
                style={{
                  // last 항목의 밑줄은 테두리가 이미 있어 겹치므로 숨김
                  display: i === steps.length - 1 ? "none" : undefined,
                }}
              />
            </motion.li>
          ))}
        </ol>
      </motion.div>
    </section>
  );
}
