import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[100svh] items-center justify-center bg-bg px-6">
      <div className="flex flex-col items-center gap-6 text-center">
        <span aria-hidden className="block h-px w-12 bg-wave" />
        <h1 className="font-kr-serif text-3xl font-medium tracking-[-0.02em] text-ink">
          이 결은 아직 풀어두지 않았어요
        </h1>
        <p className="max-w-md text-sm leading-[1.85] text-muted">
          찾으시는 케이스를 발견하지 못했습니다. 다른 작업 노트로 이동해 주세요.
        </p>
        <Link
          href="/#work"
          className="font-en text-xs tracking-[0.25em] uppercase text-deep transition-colors hover:text-ink"
        >
          ← Back to Work
        </Link>
      </div>
    </main>
  );
}
