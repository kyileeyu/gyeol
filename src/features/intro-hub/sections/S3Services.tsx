// /me 소개 허브 S3 — 서비스 라우팅 (3카드)
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "../components/SectionHeading";
import { ServiceCard } from "../components/ServiceCard";
import { track } from "@/lib/analytics";
import { SERVICE_CARDS } from "../lib/hub-config";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

export function S3Services() {
  const reduce = useReducedMotion();

  // AX 카드도 /ai 폼으로 라우팅되므로 hub_to_ai_click 동일 이벤트 (design.md 교차 링크 규칙)
  const getHandler = (tag: string) => {
    if (tag === "AI Class") return () => track("hub_to_ai_click", {});
    if (tag === "Web Studio") return () => track("hub_to_work_click", {});
    if (tag === "AX") return () => track("hub_to_ai_click", {});
    return undefined;
  };

  return (
    <SectionView name="services" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-bg">
        <SectionHeading heading="지금 어디쯤 계신가요." className="mb-12" />

        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-ink/15 rounded-sm overflow-hidden"
        >
          {SERVICE_CARDS.map((card) => (
            <motion.div key={card.tag} variants={cardVariants}>
              <ServiceCard card={card} onCtaClick={getHandler(card.tag)} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </SectionView>
  );
}
