// 소개 허브·강의 랜딩 공통 — 폼 제출 성공 인라인 메시지
interface Props {
  message?: string;
}

export function SuccessInline({
  message = "곧 이야기 나눠보겠습니다.",
}: Props) {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex flex-col items-start gap-4 py-8"
    >
      <span
        aria-hidden="true"
        className="block h-px w-16 bg-wave"
      />
      <p className="font-kr-serif text-xl font-medium text-ink leading-[1.5]">
        {message}
      </p>
    </div>
  );
}
