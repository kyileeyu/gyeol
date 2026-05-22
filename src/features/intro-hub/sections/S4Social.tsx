// /me 소개 허브 S4 — SNS 링크 허브 (리틀리 흡수)
"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "../components/SectionHeading";
import { SocialLinkRow } from "../components/SocialLinkRow";
import { SOCIAL_LINKS } from "../lib/hub-config";

const containerVariants: Variants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 1.0, ease: [0.65, 0, 0.35, 1] },
  },
};

export function S4Social() {
  const reduce = useReducedMotion();

  return (
    <SectionView name="social" threshold={0.2}>
      <section className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-surface">
        <SectionHeading heading="채널에서 만나요." className="mb-10" />

        <motion.div
          variants={containerVariants}
          initial={reduce ? "show" : "hidden"}
          whileInView="show"
          viewport={{ once: true, amount: 0.1 }}
          className="max-w-lg grid grid-cols-1 md:grid-cols-2 gap-x-12"
        >
          {SOCIAL_LINKS.map((link) => (
            <motion.div
              key={link.platform}
              variants={itemVariants}
              className="border-b border-ink/10 last:border-b-0 md:[&:nth-last-child(2)]:border-b-0"
            >
              <SocialLinkRow link={link} />
            </motion.div>
          ))}
        </motion.div>
      </section>
    </SectionView>
  );
}
