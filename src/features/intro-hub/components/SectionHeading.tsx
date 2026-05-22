// 소개 허브·강의 랜딩 공통 — 섹션 레이블(영문 이탤릭) + h2 조합
interface Props {
  label?: string;
  heading: string;
  className?: string;
}

export function SectionHeading({ label, heading, className }: Props) {
  return (
    <div className={className}>
      {label && (
        <p className="font-en italic text-[0.65rem] tracking-[0.25em] text-muted uppercase mb-3">
          {label}
        </p>
      )}
      <h2 className="font-kr-serif text-[clamp(1.75rem,3.8vw,2.75rem)] font-medium tracking-[-0.03em] leading-[1.25] text-ink">
        {heading}
      </h2>
    </div>
  );
}
