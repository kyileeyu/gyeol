"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useReducedMotion } from "framer-motion";

const LiquidCanvas = dynamic(() => import("@/components/hero/LiquidCanvas"), {
  ssr: false,
});

export default function FixedLiquidBackground() {
  const reduce = useReducedMotion();

  return (
    <div
      aria-hidden
      className="fixed inset-0 -z-10 pointer-events-none"
    >
      {reduce ? (
        <Image
          src="/hero/bg.webp"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      ) : (
        <LiquidCanvas imageUrl="/hero/bg.webp" />
      )}
    </div>
  );
}
