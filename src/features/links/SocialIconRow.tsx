"use client";

import { track } from "@/lib/analytics";
import { LINKS_SOCIAL } from "./data";
import type { SocialPlatform } from "./types";
import {
  GithubIcon,
  InstagramIcon,
  LinkedInIcon,
  MailIcon,
  ThreadsIcon,
  YoutubeIcon,
} from "./icons";

const PLATFORM_ICON: Partial<
  Record<SocialPlatform, React.ComponentType<{ size?: number }>>
> = {
  instagram: InstagramIcon,
  threads: ThreadsIcon,
  youtube: YoutubeIcon,
  linkedin: LinkedInIcon,
  github: GithubIcon,
  mail: MailIcon,
};

export function SocialIconRow() {
  return (
    <nav
      aria-label="결 스튜디오 소셜 채널"
      className="mt-6 flex justify-center gap-3"
    >
      {LINKS_SOCIAL.map((social) => {
        const Icon = PLATFORM_ICON[social.platform];
        if (!Icon) return null;
        const isMail = social.platform === "mail";
        return (
          <a
            key={social.platform}
            href={social.href}
            target={isMail ? undefined : "_blank"}
            rel={isMail ? undefined : "noreferrer noopener"}
            aria-label={social.label}
            onClick={() =>
              track("links_social_click", { platform: social.platform })
            }
            className={[
              "inline-flex h-11 w-11 items-center justify-center rounded-full",
              "border border-hairline/60 bg-white/55 backdrop-blur-md",
              "text-ink shadow-[var(--gy-shadow-sm)]",
              "transition-[transform,box-shadow,background-color,color]",
              "duration-[200ms]",
              "hover:bg-white/85 hover:text-deep hover:-translate-y-0.5 hover:shadow-[var(--gy-shadow-md)]",
              "active:scale-[0.96]",
              "focus:outline-none focus-visible:shadow-[var(--gy-shadow-focus)]",
            ].join(" ")}
          >
            <Icon size={18} />
          </a>
        );
      })}
    </nav>
  );
}
