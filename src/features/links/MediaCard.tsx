"use client";

import Image from "next/image";
import { track } from "@/lib/analytics";
import type { MediaItem } from "./types";

interface Props {
  item: MediaItem;
}

export function MediaCard({ item }: Props) {
  if (item.kind === "caption") {
    return <CaptionCard item={item} />;
  }
  if (item.kind === "image") {
    return <ImageCard item={item} />;
  }
  return <VideoCard item={item} />;
}

function CaptionCard({ item }: { item: Extract<MediaItem, { kind: "caption" }> }) {
  const baseClasses = [
    "relative block w-full rounded-xl",
    "border border-hairline/60 bg-white/55 backdrop-blur-md",
    "pl-5 pr-4 py-4",
    "shadow-[var(--gy-shadow-sm)]",
    "transition-[transform,box-shadow,background-color]",
    "duration-[350ms]",
    "before:absolute before:left-0 before:top-3 before:bottom-3 before:w-1 before:rounded-r-full before:bg-sky",
  ].join(" ");

  const content = (
    <>
      {item.title && (
        <span className="font-en block text-[12px] font-semibold tracking-[1.5px] uppercase text-deep/80 mb-1.5">
          {item.title}
        </span>
      )}
      <p className="text-[14px] font-medium leading-[1.7] text-ink">
        {item.body}
      </p>
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        className={`${baseClasses} hover:bg-white/80 hover:-translate-y-0.5 hover:shadow-[var(--gy-shadow-md)]`}
        onClick={() => track("links_click", { id: item.id, href: item.href ?? "" })}
      >
        {content}
      </a>
    );
  }

  return <div className={baseClasses}>{content}</div>;
}

function ImageCard({ item }: { item: Extract<MediaItem, { kind: "image" }> }) {
  const wrapper = "relative block w-full overflow-hidden rounded-xl border border-hairline/60 bg-white/55 backdrop-blur-md shadow-[var(--gy-shadow-sm)] transition-[transform,box-shadow] duration-[350ms]";
  const inner = (
    <>
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        <Image
          src={item.src}
          alt={item.alt}
          fill
          sizes="(max-width: 480px) 100vw, 448px"
          className="object-cover"
        />
      </div>
      {item.caption && (
        <p className="px-4 py-3 text-[13px] font-medium leading-[1.5] text-ink-muted">
          {item.caption}
        </p>
      )}
    </>
  );

  if (item.href) {
    return (
      <a
        href={item.href}
        target={item.href.startsWith("http") ? "_blank" : undefined}
        rel="noreferrer noopener"
        className={`${wrapper} hover:-translate-y-0.5 hover:shadow-[var(--gy-shadow-md)]`}
        onClick={() => track("links_click", { id: item.id, href: item.href ?? "" })}
      >
        {inner}
      </a>
    );
  }

  return <div className={wrapper}>{inner}</div>;
}

function VideoCard({ item }: { item: Extract<MediaItem, { kind: "video" }> }) {
  return (
    <div className="relative overflow-hidden rounded-xl border border-hairline/60 bg-white/55 backdrop-blur-md shadow-[var(--gy-shadow-sm)]">
      <div className="relative aspect-video w-full">
        <iframe
          src={`https://www.youtube.com/embed/${item.youtubeId}`}
          title={item.title}
          loading="lazy"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full"
        />
      </div>
      <p className="px-4 py-3 text-[13px] font-medium leading-[1.5] text-ink-muted">
        {item.title}
      </p>
    </div>
  );
}
