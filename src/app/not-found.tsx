import Link from "next/link";

export default function NotFound() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center bg-bg text-ink px-6 py-20 text-center">
      <p className="text-xs tracking-[0.4em] text-muted mb-6 uppercase">
        404
      </p>
      <h1 className="text-2xl md:text-3xl font-light mb-4 break-keep">
        결이 흐르지 않는 페이지입니다
      </h1>
      <p className="text-sm text-muted mb-10 max-w-md break-keep">
        주소가 바뀌었거나, 잠시 떠내려간 페이지일 수 있습니다.
      </p>
      <Link
        href="/"
        className="text-sm text-deep underline underline-offset-4 hover:text-ink transition-colors"
      >
        메인으로 돌아가기
      </Link>
    </main>
  );
}
