// 결 스튜디오 명함 — 뒷면 (연락처·CTA)
"use client";

import { track } from "@/lib/analytics";
import { PROFILE } from "../lib/profile";
import SaveContactButton from "./SaveContactButton";
import styles from "../styles/card.module.css";

interface CardBackProps {
  hidden: boolean;
}

const iconProps = {
  width: 17,
  height: 17,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
};

function MailIcon() {
  return (
    <svg {...iconProps}>
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg {...iconProps}>
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function GlobeIcon() {
  return (
    <svg {...iconProps}>
      <circle cx="12" cy="12" r="10" />
      <path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20" />
      <path d="M2 12h20" />
    </svg>
  );
}

export default function CardBack({ hidden }: CardBackProps) {
  return (
    <div
      className={`${styles.face} ${styles.faceBack} justify-between`}
      aria-hidden={hidden}
      role="region"
      aria-label="명함 뒷면"
    >
      {/* 한 줄 슬로건 */}
      <p
        className="text-ink leading-snug"
        style={{
          fontFamily: "var(--font-kr-serif)",
          fontSize: "clamp(1.05rem, 3.5vw, 1.3rem)",
        }}
      >
        {PROFILE.bio_one_line}
      </p>

      {/* 연락처 목록 */}
      <ul className="space-y-5">
        <li>
          <a
            href={`mailto:${PROFILE.email}`}
            onClick={(e) => {
              e.stopPropagation();
              track("mailto_click", { where: "card" });
            }}
            className="flex items-center gap-3 text-sm text-ink hover:text-deep transition-colors"
          >
            <span aria-hidden className="text-muted">
              <MailIcon />
            </span>
            {PROFILE.email}
          </a>
        </li>
        <li>
          <a
            href={PROFILE.phone_href}
            onClick={(e) => {
              e.stopPropagation();
              track("cta_external_click", {
                target: `tel:${PROFILE.phone_intl}`,
              });
            }}
            className="flex items-center gap-3 text-sm text-ink hover:text-deep transition-colors"
          >
            <span aria-hidden className="text-muted">
              <PhoneIcon />
            </span>
            {PROFILE.phone_display}
          </a>
        </li>
        <li>
          <a
            href={PROFILE.site}
            target="_blank"
            rel="noreferrer noopener"
            onClick={(e) => {
              e.stopPropagation();
              track("cta_external_click", { target: "gyeol.page" });
            }}
            className="flex items-center gap-3 text-sm text-ink hover:text-deep transition-colors"
          >
            <span aria-hidden className="text-muted">
              <GlobeIcon />
            </span>
            gyeol.page
          </a>
        </li>
      </ul>

      {/* 연락처 저장 CTA */}
      <div>
        <SaveContactButton />
      </div>
    </div>
  );
}
