"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";
import type { LinkIconName, LinkItem } from "./types";
import {
  ArrowUpRightIcon,
  CardIcon,
  ChatIcon,
  ChevronRightIcon,
  FolderIcon,
  GlobeIcon,
  LeafIcon,
  MessageIcon,
  PlayIcon,
  SparkIcon,
  UserIcon,
} from "./icons";

interface Props {
  item: LinkItem;
}

const ICON_MAP: Record<LinkIconName, React.ComponentType<{ size?: number }>> = {
  globe: GlobeIcon,
  spark: SparkIcon,
  user: UserIcon,
  folder: FolderIcon,
  message: MessageIcon,
  play: PlayIcon,
  card: CardIcon,
  leaf: LeafIcon,
  chat: ChatIcon,
};

export function LinkCard({ item }: Props) {
  const Icon = ICON_MAP[item.icon] ?? GlobeIcon;
  const isExternal = item.kind === "external";
  const isMail = item.kind === "mail";

  const baseClasses = [
    "group relative flex w-full items-center gap-3 rounded-xl",
    "border px-4 py-3.5",
    "backdrop-blur-md",
    "transition-[transform,box-shadow,background-color,border-color]",
    "duration-[350ms]",
    "shadow-[var(--gy-shadow-sm)]",
    "focus:outline-none focus-visible:shadow-[var(--gy-shadow-focus)]",
    "active:scale-[0.985]",
    item.highlight
      ? "bg-canvas/85 border-sky/40 hover:bg-canvas hover:-translate-y-0.5 hover:shadow-[var(--gy-shadow-md)] hover:border-sky/60"
      : "bg-white/55 border-hairline/60 hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[var(--gy-shadow-md)] hover:border-hairline",
  ].join(" ");

  const handleClick = () => {
    track("links_click", { id: item.id, href: item.href });
  };

  const inner = (
    <>
      <span
        aria-hidden
        className={[
          "inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg",
          item.highlight ? "bg-soft text-deep" : "bg-soft/60 text-deep",
        ].join(" ")}
      >
        <Icon size={20} />
      </span>
      <span className="flex min-w-0 flex-1 flex-col gap-0.5 text-left">
        <span className="text-[15px] font-semibold leading-[1.3] tracking-[-0.2px] text-ink truncate">
          {item.label}
        </span>
        {item.sublabel && (
          <span className="text-[12px] font-medium leading-[1.4] text-ink-muted truncate">
            {item.sublabel}
          </span>
        )}
      </span>
      <span
        aria-hidden
        className="inline-flex shrink-0 items-center justify-center text-ink-muted group-hover:text-deep transition-colors"
      >
        {isExternal ? <ArrowUpRightIcon size={18} /> : <ChevronRightIcon size={18} />}
      </span>
    </>
  );

  if (isExternal) {
    return (
      <a
        href={item.href}
        target="_blank"
        rel="noreferrer noopener"
        onClick={handleClick}
        className={baseClasses}
        aria-label={`${item.label} (새 창에서 열기)`}
      >
        {inner}
      </a>
    );
  }

  if (isMail) {
    return (
      <a
        href={item.href}
        onClick={handleClick}
        className={baseClasses}
        aria-label={`${item.label} — 이메일 보내기`}
      >
        {inner}
      </a>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={handleClick}
      className={baseClasses}
      aria-label={item.label}
    >
      {inner}
    </Link>
  );
}
