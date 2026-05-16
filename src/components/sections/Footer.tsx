"use client";

import Link from "next/link";
import { track } from "@/lib/analytics";

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-ink/10 bg-bg px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <p className="font-kr-serif text-3xl font-medium tracking-[-0.02em] text-ink">
              결
            </p>
            <p className="max-w-sm text-sm leading-[1.8] text-muted">
              결이 맞는 페이지를 만드는 웹 스튜디오.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="flex flex-col items-start gap-6 md:items-end"
          >
            <a
              href="mailto:hi@gyeol.page"
              className="group flex flex-col gap-1 md:items-end"
              onClick={() => track("mailto_click", { where: "footer" })}
            >
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">
                Contact
              </span>
              <span className="font-en text-sm text-ink transition-colors duration-300 group-hover:text-deep">
                hi@gyeol.page
              </span>
            </a>

            <ul className="flex items-center gap-4">
              <li>
                <a
                  href="https://www.threads.com/@gyeolpage"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="결 — Threads (새 창에서 열기)"
                  onClick={() =>
                    track("social_click", {
                      channel: "threads",
                      where: "footer",
                    })
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-deep"
                >
                  <ThreadsIcon />
                </a>
              </li>
              <li>
                <a
                  href="https://www.instagram.com/gyeolpage/"
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label="결 — Instagram (새 창에서 열기)"
                  onClick={() =>
                    track("social_click", {
                      channel: "instagram",
                      where: "footer",
                    })
                  }
                  className="inline-flex h-9 w-9 items-center justify-center rounded-full text-muted transition-colors hover:text-deep"
                >
                  <InstagramIcon />
                </a>
              </li>
            </ul>
          </nav>
        </div>

        <div className="flex flex-col gap-2 pt-4 text-xs leading-[1.8] text-muted/80">
          <p className="font-en tracking-[0.15em]">
            © {year} Gyeol Studio. All rights reserved.
          </p>
          <Link
            href="/privacy"
            className="inline-block w-fit transition-colors hover:text-deep"
          >
            개인정보처리방침
          </Link>
        </div>
      </div>
    </footer>
  );
}

function ThreadsIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.02c.028-3.577.878-6.43 2.523-8.482C5.845 1.205 8.598.024 12.179 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.781 3.631 2.695 6.54 2.717 2.623-.02 4.358-.631 5.8-2.045 1.647-1.613 1.618-3.593 1.09-4.798-.31-.71-.873-1.3-1.634-1.75-.192 1.352-.622 2.446-1.284 3.272-.886 1.102-2.14 1.704-3.73 1.79-1.202.065-2.361-.218-3.259-.801-1.063-.689-1.685-1.74-1.752-2.964-.065-1.19.408-2.285 1.33-3.082.88-.76 2.119-1.207 3.583-1.291.965-.054 1.872-.014 2.701.116-.118-.703-.355-1.252-.706-1.633-.485-.527-1.235-.795-2.232-.795h-.026c-.802 0-1.89.221-2.582 1.262l-1.737-1.165c.916-1.402 2.402-2.144 4.319-2.144h.041c3.207.02 5.117 1.965 5.317 5.426.114.052.227.106.337.165 1.554.728 2.694 1.84 3.293 3.214.834 1.916.911 5.044-1.628 7.572-1.92 1.91-4.252 2.811-7.4 2.832Zm-.013-11.685c-.18 0-.36.005-.547.016-1.838.103-2.96.946-2.91 1.97.054 1.144 1.351 1.823 2.628 1.823.135 0 .27-.007.405-.022 1.602-.166 3.106-1.124 3.225-3.456-.86-.21-1.751-.331-2.701-.331Z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      width="18"
      height="18"
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
