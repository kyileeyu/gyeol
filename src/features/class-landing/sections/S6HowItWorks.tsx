// /ai 강의 랜딩 S6 — 강의 진행 방식 + 강사 소개 (v2: S5에서 번호 이동)
"use client";

import Link from "next/link";
import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";
import { track } from "@/lib/analytics";

const containerVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.15 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

const HOW_ITEMS = [
  { icon: <PersonIcon />, text: "1:1 맞춤 진행" },
  { icon: <LocationIcon />, text: "오프라인 — 서울 카페·코워킹" },
  { icon: <ClockIcon />, text: "체험 세션(1시간)으로 먼저 만나봅니다" },
];

const STEPS = [
  { num: "01", label: "체험 세션", sub: "1시간" },
  { num: "02", label: "트랙 결정", sub: "" },
  { num: "03", label: "코스 시작", sub: "" },
];

export function ClassS6HowItWorks() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="how" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <SectionHeading heading="어떻게 진행되나요." className="mb-12" />

        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-10 max-w-2xl"
        >
          {/* 진행 방식 아이콘 행 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-4">
            {HOW_ITEMS.map((item, i) => (
              <div key={i} className="flex items-center gap-4">
                <span className="flex-shrink-0 text-wave" aria-hidden="true">
                  {item.icon}
                </span>
                <span className="text-sm text-ink">{item.text}</span>
              </div>
            ))}
          </motion.div>

          {/* 체험 흐름 스텝 인디케이터 */}
          <motion.div variants={itemVariants}>
            {/* 모바일: 세로 */}
            <div className="flex flex-col gap-0 sm:hidden">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-start gap-4">
                  <div className="flex flex-col items-center">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-wave text-xs font-en text-deep font-medium">
                      {step.num}
                    </span>
                    {i < STEPS.length - 1 && (
                      <span aria-hidden="true" className="w-px h-8 bg-shimmer" />
                    )}
                  </div>
                  <div className="pt-1 pb-6">
                    <p className="text-sm font-medium text-ink">{step.label}</p>
                    {step.sub && (
                      <p className="text-xs text-muted mt-0.5">{step.sub}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* 데스크탑: 가로 */}
            <div className="hidden sm:flex items-center gap-0">
              {STEPS.map((step, i) => (
                <div key={i} className="flex items-center">
                  <div className="flex flex-col items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border border-wave text-xs font-en text-deep font-medium">
                      {step.num}
                    </span>
                    <div className="text-center">
                      <p className="text-sm font-medium text-ink whitespace-nowrap">
                        {step.label}
                      </p>
                      {step.sub && (
                        <p className="text-xs text-muted">{step.sub}</p>
                      )}
                    </div>
                  </div>
                  {i < STEPS.length - 1 && (
                    <span
                      aria-hidden="true"
                      className="h-px w-16 sm:w-24 bg-shimmer mx-2"
                    />
                  )}
                </div>
              ))}
            </div>
          </motion.div>

          {/* 가격 비노출 안내 */}
          <motion.p
            variants={itemVariants}
            className="text-sm text-muted leading-[1.7]"
          >
            가격은 상담 시 안내드립니다.
          </motion.p>

          {/* 구분선 */}
          <motion.span
            variants={itemVariants}
            aria-hidden="true"
            className="block h-px bg-ink/10"
          />

          {/* 강사 소개 */}
          <motion.div variants={itemVariants} className="flex flex-col gap-2">
            <p className="text-sm text-muted leading-[1.7]">
              FE 개발 출신 AI 강사가 막히는 지점부터 함께합니다.
            </p>
            {/* 두 페이지 동시 출시이므로 /me 링크 항상 활성 */}
            <Link
              href="/me"
              aria-label="강사 소개 페이지로 이동"
              onClick={() => track("class_to_hub_click", {})}
              className="inline-block text-sm font-medium text-deep transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave rounded"
            >
              강사 소개 →
            </Link>
          </motion.div>
        </motion.div>
      </section>
    </SectionView>
  );
}

function PersonIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="8" r="4" />
      <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
    </svg>
  );
}

function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2C8.1 2 5 5.1 5 9c0 5.3 7 13 7 13s7-7.7 7-13c0-3.9-3.1-7-7-7z" />
      <circle cx="12" cy="9" r="2.5" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 3" />
    </svg>
  );
}
