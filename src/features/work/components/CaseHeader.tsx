import Image from "next/image";
import Link from "next/link";
import type { CaseMeta } from "../lib/types";

type Props = {
  meta: CaseMeta;
};

const FORMATTER = new Intl.DateTimeFormat("ko-KR", {
  year: "numeric",
  month: "long",
  day: "numeric",
});

export default function CaseHeader({ meta }: Props) {
  const date = FORMATTER.format(new Date(meta.publishedAt));

  return (
    <header className="mb-10">
      <Link
        href="/#work"
        className="font-en text-xs tracking-[0.25em] uppercase text-muted transition-colors hover:text-deep"
      >
        ← Back to Work
      </Link>

      <div className="mt-12 flex items-center gap-3 font-en text-xs tracking-[0.3em] uppercase text-muted">
        <span aria-hidden className="block h-px w-10 bg-wave" />
        <span>{meta.tag}</span>
        <span aria-hidden>·</span>
        <span>{date}</span>
        <span aria-hidden>·</span>
        <span>{meta.readingMinutes} min</span>
      </div>

      <h1 className="mt-5 font-kr-serif text-[clamp(2rem,4.5vw,3.25rem)] font-medium leading-[1.2] tracking-[-0.03em] text-ink">
        {meta.title}
      </h1>

      <p className="mt-5 max-w-[42rem] text-base leading-[1.85] text-muted">
        {meta.summary}
      </p>

      <div className="not-prose mt-12 -mx-6 sm:mx-auto sm:max-w-[920px]">
        <Image
          src={meta.coverSrc}
          alt={`${meta.title} 커버`}
          sizes="(max-width: 768px) 100vw, 920px"
          className="w-full rounded-[4px] object-cover"
          priority
        />
      </div>
    </header>
  );
}
