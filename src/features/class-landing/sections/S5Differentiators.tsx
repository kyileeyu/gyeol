// /ai 강의 랜딩 S5 — 차별점 4종 (v2 신규 섹션)
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";

interface Differentiator {
  title: string;
  description: string;
}

const DIFFERENTIATORS: Differentiator[] = [
  {
    title: "1:1 맞춤 설계",
    description:
      "직무·목표에 맞춰 매번 새로 설계합니다. 저장된 데이터가 한계가 아닙니다.",
  },
  {
    title: "실제로 돌아가는 산출물",
    description:
      "강의용 예제가 아닙니다. 수업 끝에 실제로 쓸 수 있는 결과물이 나옵니다.",
  },
  {
    title: "용어부터 차근차근",
    description:
      "코드를 몰라도 됩니다. 클로드와 대화하는 법부터 함께합니다.",
  },
  {
    title: "전용 복습자료 PDF",
    description:
      "그날 막힌 지점을 정리한 자료를 수업 후 보내드립니다.",
  },
];

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

export function ClassS5Differentiators() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="differentiators" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <SectionHeading
          heading="다른 강의와 무엇이 다른가요."
          className="mb-12"
        />

        <motion.ul
          variants={reduce ? undefined : containerVariants}
          initial={reduce ? undefined : "hidden"}
          whileInView={reduce ? undefined : "show"}
          viewport={{ once: true, amount: 0.1 }}
          className="flex flex-col gap-8 max-w-xl list-none p-0"
        >
          {DIFFERENTIATORS.map((item) => (
            <motion.li
              key={item.title}
              variants={reduce ? undefined : itemVariants}
              className="flex items-start gap-4"
            >
              <span
                aria-hidden="true"
                className="mt-[0.35rem] flex-shrink-0 w-2 h-2 rounded-full bg-wave"
              />
              <div>
                <strong className="block font-kr-serif text-base text-ink leading-[1.35]">
                  {item.title}
                </strong>
                <p className="text-sm text-muted leading-[1.7] mt-1">
                  {item.description}
                </p>
              </div>
            </motion.li>
          ))}

          {/* 형식 보조 정보 */}
          <motion.li
            variants={reduce ? undefined : itemVariants}
            className="flex items-start gap-4"
          >
            <span aria-hidden="true" className="mt-[0.35rem] flex-shrink-0 w-2 h-2 rounded-full bg-shimmer" />
            <p className="text-sm text-muted leading-[1.7]">
              1:1 또는 그룹 · 온라인(화상) 또는 오프라인(대면) 선택 가능합니다.
            </p>
          </motion.li>
        </motion.ul>
      </section>
    </SectionView>
  );
}
