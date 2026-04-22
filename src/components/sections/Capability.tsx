"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";

type Card = {
  en: string;
  ko: string;
  title: string;
  body: string;
};

const cards: Card[] = [
  {
    en: "Interaction",
    ko: "표면",
    title: "결이 흐르는 인터랙션",
    body: "3D, 셰이더, 스크롤 모션. 한 사람이 디자인부터 개발까지 손에서 놓지 않으니, 브랜드의 결이 손끝의 감각으로 끝까지 옮겨집니다.",
  },
  {
    en: "Visibility",
    ko: "구조",
    title: "검색에 잡히는 구조",
    body: "프론트엔드 개발 출신이 설계하는 SEO·AEO 최적화. 시맨틱 마크업, 구조화 데이터, Core Web Vitals. 이미지부터 코드까지 빌더의 한계 없이 다듬어 검색에 정확히 노출됩니다.",
  },
  {
    en: "Care",
    ko: "시간",
    title: "출시 이후의 결",
    body: "페이지는 만든 순간이 아니라 쓰이는 동안 살아있습니다. 출시 후 일정 기간 함께 모니터링하며 검색 노출과 사용자 흐름을 다듬습니다. 이후의 운영도 함께 이어갈 수 있습니다.",
  },
];

const container: Variants = {
  hidden: { opacity: 1 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.18, delayChildren: 0.1 },
  },
};

const item: Variants = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.2, ease: [0.65, 0, 0.35, 1] },
  },
};

export default function Capability() {
  const reduce = useReducedMotion();

  return (
    <section
      id="capability"
      className="relative w-full bg-surface px-6 py-32 sm:py-48"
    >
      <motion.div
        variants={container}
        initial={reduce ? "show" : "hidden"}
        whileInView="show"
        viewport={{ once: true, amount: 0.2 }}
        className="mx-auto flex max-w-6xl flex-col gap-20"
      >
        <motion.header
          variants={item}
          className="flex max-w-3xl flex-col gap-6"
        >
          <span aria-hidden className="block h-px w-16 bg-wave" />
          <p className="font-en italic text-xs tracking-[0.3em] text-muted uppercase">
            Capability
          </p>
          <h2 className="font-kr-serif text-[clamp(1.75rem,3.8vw,2.75rem)] font-medium leading-[1.25] tracking-[-0.025em] text-ink">
            디자인을 코드로 옮기는 사람이
            <br className="hidden sm:inline" /> 직접 설계합니다.
          </h2>
        </motion.header>

        <motion.div
          variants={container}
          className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-6"
        >
          {cards.map((c, i) => (
            <motion.article
              key={c.en}
              variants={item}
              className="group relative flex flex-col gap-8 border-t border-ink/15 bg-bg/60 p-8 sm:p-10 transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)] hover:border-wave"
            >
              <div className="flex items-baseline gap-4">
                <span className="font-en text-xs tracking-[0.25em] text-muted">
                  0{i + 1}
                </span>
                <span className="font-en italic text-sm tracking-[0.2em] text-deep">
                  {c.en}
                </span>
                <span className="ml-auto font-kr-serif text-xs tracking-[0.3em] text-muted">
                  {c.ko}
                </span>
              </div>
              <h3 className="font-kr-serif text-xl sm:text-2xl font-medium leading-[1.4] tracking-[-0.02em] text-ink">
                {c.title}
              </h3>
              <p className="text-sm sm:text-base leading-[1.85] text-muted">
                {c.body}
              </p>
            </motion.article>
          ))}
        </motion.div>
      </motion.div>
    </section>
  );
}
