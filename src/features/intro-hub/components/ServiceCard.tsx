// 소개 허브·강의 랜딩 공통 — 서비스 카드 컴포넌트
"use client";

import Link from "next/link";
import type { ServiceCardData } from "../lib/hub-config";

interface Props {
  card: ServiceCardData;
  onCtaClick?: () => void;
}

export function ServiceCard({ card, onCtaClick }: Props) {
  const { tag, title, description, cta, variant } = card;

  const handleCtaClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (cta.scroll) {
      e.preventDefault();
      const target = document.querySelector(cta.href);
      target?.scrollIntoView({ behavior: "smooth" });
    }
    onCtaClick?.();
  };

  return (
    <article
      aria-label={`${title} 소개`}
      className={[
        "group flex flex-col gap-4 p-8 sm:p-10",
        "bg-bg/60",
        "border-t border-ink/15",
        "transition-colors duration-500 ease-[cubic-bezier(0.65,0,0.35,1)]",
        "hover:border-wave",
        variant === "signal" ? "opacity-90" : "",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <p className="font-en italic text-[0.65rem] tracking-[0.25em] text-muted uppercase">
        {tag}
      </p>
      <h3 className="font-kr-serif text-xl font-medium text-ink leading-[1.35]">
        {title}
      </h3>
      <p className="text-sm text-muted leading-[1.75]">{description}</p>
      <div className="mt-auto pt-2">
        <Link
          href={cta.href}
          aria-label={`${title} — ${cta.label}`}
          onClick={handleCtaClick}
          className="inline-block text-sm font-medium text-deep transition-colors duration-300 hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave rounded"
        >
          {cta.label}
        </Link>
      </div>
    </article>
  );
}
