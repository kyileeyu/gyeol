const TIMELINE = [
  { time: "05분", body: "인사·자리 정렬" },
  { time: "15분", body: "욕구 진단 — 본인 작업의 실행 부분이 어디서 빠져나가는지" },
  { time: "05분", body: "운영방식 결정 — 회차 단위(Build) 또는 정기(Care)" },
  { time: "05분", body: "체험 입금·NDA 안내" },
] as const;

export function ProcessTimeline() {
  return (
    <section
      id="process"
      aria-labelledby="process-title"
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
            id="process-title"
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
            진행은 이렇게.
          </h2>
          <p
            className="font-kr"
            style={{
              marginTop: "1rem",
              fontSize: "0.9375rem",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--gy-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            30분 1:1 콜 — 본 작업 전 자리를 함께 정렬합니다.
          </p>

          <ol
            className="grid lg:grid-cols-4"
            style={{
              marginTop: "clamp(2.5rem, 4vw, 3.5rem)",
              gap: "clamp(1rem, 2vw, 1.25rem)",
              gridTemplateColumns: "1fr",
              listStyle: "none",
              padding: 0,
            }}
          >
            {TIMELINE.map((t, idx) => (
              <li
                key={idx}
                style={{
                  background: "var(--gy-canvas)",
                  border: "1px solid var(--gy-hairline)",
                  borderRadius: "var(--gy-rounded-lg)",
                  padding: "clamp(1.25rem, 2vw, 1.5rem)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.75rem",
                }}
              >
                <h3
                  className="font-en"
                  style={{
                    fontSize: "1.5rem",
                    fontWeight: 700,
                    letterSpacing: "-0.02em",
                    lineHeight: 1.1,
                    color: "var(--gy-deep)",
                  }}
                >
                  {t.time}
                </h3>
                <p
                  className="font-kr"
                  style={{
                    fontSize: "0.9375rem",
                    fontWeight: 500,
                    lineHeight: 1.6,
                    color: "var(--gy-ink)",
                    wordBreak: "keep-all",
                  }}
                >
                  {t.body}
                </p>
              </li>
            ))}
          </ol>

          <div style={{ marginTop: "clamp(2.5rem, 4vw, 3.5rem)" }}>
            <a href="#intake" className="btn-primary">
              <span>문의하기</span>
              <span aria-hidden="true">→</span>
            </a>
          </div>
        </div>

        <aside
          aria-label="운영방식 안내"
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
              color: "var(--gy-deep)",
              textTransform: "uppercase",
            }}
          >
            Build · Care
          </p>
          <p
            style={{
              marginTop: "0.75rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.75,
              color: "var(--gy-ink-muted)",
              wordBreak: "keep-all",
            }}
          >
            산출물 있는 작업은 회차 단위로(Build), 본인 시간 중심 작업은 주 1회
            1시간 정기로(Care). 1:1 콜에서 함께 결정합니다.
          </p>
        </aside>
      </div>
    </section>
  );
}
