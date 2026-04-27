"use client";

export default function Error({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink px-6 py-20 text-center">
      <h1 className="text-2xl md:text-3xl font-light mb-4 break-keep">
        잠시 결이 흐트러졌습니다
      </h1>
      <p className="text-sm text-muted mb-10 max-w-md break-keep">
        예기치 못한 오류가 발생했어요. 잠시 후 다시 시도해 주세요.
      </p>
      <button
        onClick={reset}
        className="text-sm text-deep underline underline-offset-4 hover:text-ink transition-colors"
      >
        다시 시도
      </button>
    </main>
  );
}
