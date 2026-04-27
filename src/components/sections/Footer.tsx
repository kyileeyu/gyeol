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

          <nav aria-label="Footer" className="flex flex-col gap-1">
            <a
              href="mailto:hi@gyeol.page"
              className="group flex flex-col gap-1"
              onClick={() => track("mailto_click", { where: "footer" })}
            >
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">
                Contact
              </span>
              <span className="font-en text-sm text-ink transition-colors duration-300 group-hover:text-deep">
                hi@gyeol.page
              </span>
            </a>
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
