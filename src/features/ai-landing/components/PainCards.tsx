const PAINS = [
  {
    quote: "활용처는 보이는데, 도구를 4개로 나누면 멈춥니다.",
    note: "가장 흔한 자리. 도구가 4개로 갈리는 순간 판단이 분산됨.",
  },
  {
    quote: "활용은 되는데, 구조로 묶으려 하면 막힙니다.",
    note: "산출물이 보이지만, 다시 만들 때 처음부터 시작해야 하는 자리.",
  },
  {
    quote: "고객 정보·직업윤리 위라 외부에 묻기조차 어렵습니다.",
    note: "가장 외로운 자리. 비공개 1:1에서만 풀 수 있음.",
  },
] as const;

export function PainCards() {
  return (
    <section
      id="pain"
      aria-labelledby="pain-title"
      style={{
        background: "var(--gy-surface-1)",
        borderTop: "1px solid var(--gy-hairline-soft)",
        borderBottom: "1px solid var(--gy-hairline-soft)",
      }}
    >
      <div
        className="mx-auto grid lg:grid-cols-[minmax(0,1fr)_240px]"
        style={{
          maxWidth: "1200px",
          padding: "clamp(4rem, 8vw, 6rem) clamp(1.5rem, 5vw, 4rem)",
          gap: "clamp(2rem, 4vw, 3rem)",
        }}
      >
        <div>
          <h2
            id="pain-title"
            className="font-kr"
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--gy-ink)",
              wordBreak: "keep-all",
            }}
          >
            막히는 자리는 보통 셋.
          </h2>

          <ol
            style={{
              marginTop: "clamp(2.5rem, 4vw, 3.5rem)",
              display: "grid",
              gap: "clamp(1rem, 2vw, 1.25rem)",
              gridTemplateColumns: "1fr",
              listStyle: "none",
              padding: 0,
              counterReset: "pain",
            }}
          >
            {PAINS.map((p, idx) => (
              <li
                key={idx}
                style={{
                  background: "var(--gy-canvas)",
                  border: "1px solid var(--gy-hairline)",
                  borderRadius: "var(--gy-rounded-lg)",
                  padding: "clamp(1.5rem, 2.5vw, 1.75rem)",
                }}
              >
                <p
                  className="font-en"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    lineHeight: 1.2,
                    color: "var(--gy-ink-subtle)",
                    textTransform: "uppercase",
                  }}
                >
                  0{idx + 1}
                </p>
                <h3
                  className="font-kr"
                  style={{
                    marginTop: "0.625rem",
                    fontSize: "clamp(1.0625rem, 1.6vw, 1.1875rem)",
                    fontWeight: 700,
                    lineHeight: 1.45,
                    letterSpacing: "-0.015em",
                    color: "var(--gy-ink)",
                    wordBreak: "keep-all",
                  }}
                >
                  &ldquo;{p.quote}&rdquo;
                </h3>
                <p
                  className="font-kr"
                  style={{
                    marginTop: "0.875rem",
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    lineHeight: 1.7,
                    color: "var(--gy-ink-muted)",
                    wordBreak: "keep-all",
                  }}
                >
                  {p.note}
                </p>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-label="비밀유지 안내"
          className="font-kr lg:sticky lg:top-32"
          style={{
            alignSelf: "start",
            background: "var(--gy-canvas)",
            border: "1px solid var(--gy-hairline)",
            borderRadius: "var(--gy-rounded-lg)",
            padding: "1.25rem 1.5rem",
            maxWidth: "260px",
          }}
        >
          <p
            className="font-en"
            style={{
              fontSize: "11px",
              fontWeight: 700,
              letterSpacing: "0.18em",
              lineHeight: 1.2,
              color: "var(--gy-deep)",
              textTransform: "uppercase",
            }}
          >
            NDA First
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--gy-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            모든 작업은 NDA 위에서 시작합니다. 케이스 외부 공개는 동의 시에만,
            직업 카테고리만 익명 가공합니다.
          </p>
        </aside>
      </div>
    </section>
  );
}
