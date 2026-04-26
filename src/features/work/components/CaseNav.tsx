import Link from "next/link";
import type { CaseMeta } from "../lib/types";

type Props = {
  prev: CaseMeta | null;
  next: CaseMeta | null;
};

function NavCard({
  direction,
  c,
}: {
  direction: "prev" | "next";
  c: CaseMeta;
}) {
  const isPrev = direction === "prev";
  return (
    <Link
      href={`/work/${c.slug}`}
      className="group flex flex-1 flex-col gap-2 rounded-[4px] border border-ink/10 bg-surface/40 p-5 transition-colors hover:border-wave"
    >
      <span className="font-en text-[11px] tracking-[0.3em] uppercase text-muted">
        {isPrev ? "← Previous" : "Next →"}
      </span>
      <span className="font-kr-serif text-lg leading-[1.4] tracking-[-0.02em] text-ink">
        {c.title}
      </span>
      <span className="font-en text-xs tracking-[0.2em] uppercase text-muted">
        {c.tag}
      </span>
    </Link>
  );
}

export default function CaseNav({ prev, next }: Props) {
  if (!prev && !next) {
    return (
      <div className="not-prose my-12 flex justify-center">
        <Link
          href="/#work"
          className="font-en text-xs tracking-[0.25em] uppercase text-muted transition-colors hover:text-deep"
        >
          ← Back to Work
        </Link>
      </div>
    );
  }
  return (
    <nav className="not-prose my-16 grid grid-cols-1 gap-3 sm:grid-cols-2">
      {prev ? <NavCard direction="prev" c={prev} /> : <div />}
      {next ? <NavCard direction="next" c={next} /> : <div />}
    </nav>
  );
}
