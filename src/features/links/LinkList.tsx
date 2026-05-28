"use client";

import { Fragment } from "react";
import { motion } from "framer-motion";
import { LINKS_BLOCKS } from "./data";
import { LinkCard } from "./LinkCard";
import { MediaCard } from "./MediaCard";

const easingOut = [0, 0, 0.2, 1] as const;

const listVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.05,
      delayChildren: 0.15,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.35, ease: easingOut } },
};

export function LinkList() {
  return (
    <motion.ul
      initial="hidden"
      animate="show"
      variants={listVariants}
      className="mt-6 flex flex-col gap-3"
    >
      {LINKS_BLOCKS.map((block) => {
        if (block.kind === "media") {
          return (
            <motion.li key={block.item.id} variants={itemVariants}>
              <MediaCard item={block.item} />
            </motion.li>
          );
        }
        const { item } = block;
        return (
          <Fragment key={item.id}>
            {item.eyebrow && (
              <motion.li
                variants={itemVariants}
                className="mt-2 -mb-1 text-center text-[12px] font-semibold leading-[1.4] tracking-[-0.1px] text-deep/85 [word-break:keep-all]"
              >
                {item.eyebrow}
              </motion.li>
            )}
            <motion.li variants={itemVariants}>
              <LinkCard item={item} />
            </motion.li>
          </Fragment>
        );
      })}
    </motion.ul>
  );
}
