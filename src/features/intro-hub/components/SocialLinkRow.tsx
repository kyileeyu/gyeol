// 소개 허브 — SNS 링크 행 컴포넌트 (아이콘 + 플랫폼명 + 한 줄 맥락)
"use client";

import { track } from "@/lib/analytics";
import type { SocialLink } from "../lib/hub-config";

interface Props {
  link: SocialLink;
}

export function SocialLinkRow({ link }: Props) {
  const isPlaceholder = link.href === "#";

  const handleClick = () => {
    if (isPlaceholder) return;
    track("hub_social_click", { platform: link.platform });
  };

  return (
    <a
      href={isPlaceholder ? undefined : link.href}
      target={isPlaceholder ? undefined : "_blank"}
      rel="noreferrer noopener"
      aria-label={
        isPlaceholder
          ? `${link.label} (준비 중)`
          : `${link.label} — ${link.description} (새 창에서 열기)`
      }
      aria-disabled={isPlaceholder ? "true" : undefined}
      onClick={isPlaceholder ? (e) => e.preventDefault() : handleClick}
      className={[
        "flex items-center gap-4 py-4",
        "transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)]",
        isPlaceholder
          ? "opacity-40 cursor-not-allowed"
          : "hover:text-deep cursor-pointer",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave rounded",
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <span className="text-muted" aria-hidden="true">
        <PlatformIcon platform={link.platform} />
      </span>
      <span className="flex flex-col gap-0.5">
        <span className="font-en text-sm font-medium text-ink">
          {link.label}
        </span>
        <span className="font-kr text-sm text-muted">{link.description}</span>
      </span>
    </a>
  );
}

function PlatformIcon({ platform }: { platform: SocialLink["platform"] }) {
  if (platform === "youtube") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
      </svg>
    );
  }
  if (platform === "instagram") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    );
  }
  if (platform === "threads") {
    return (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.02c.028-3.577.878-6.43 2.523-8.482C5.845 1.205 8.598.024 12.179 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291.965-.054 1.872-.014 2.701.116-.118-.703-.355-1.252-.706-1.633-.485-.527-1.235-.795-2.232-.795h-.026c-.802 0-1.89.221-2.582 1.262l-1.737-1.165c.916-1.402 2.402-2.144 4.319-2.144h.041c3.207.02 5.117 1.965 5.317 5.426.114.052.227.106.337.165 1.554.728 2.694 1.84 3.293 3.214.834 1.916.911 5.044-1.628 7.572-1.92 1.91-4.252 2.811-7.4 2.832Zm-.013-11.685c-.18 0-.36.005-.547.016-1.838.103-2.96.946-2.91 1.97.054 1.144 1.351 1.823 2.628 1.823.135 0 .27-.007.405-.022 1.602-.166 3.106-1.124 3.225-3.456-.86-.21-1.751-.331-2.701-.331Z" />
      </svg>
    );
  }
  // soomgo
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M8 12h4m0 0V8m0 4v4" />
    </svg>
  );
}
