const STEPS = [
  {
    num: "01",
    name: "결을 잡다 (Aligning)",
    body: "첫 자리. 30분 1:1 콜에서 결정 구조를 정렬합니다.",
  },
  {
    num: "02",
    name: "결을 그리다 (Designing)",
    body: "2시간 체험 세션에서 본인 작업의 결을 함께 그립니다.",
  },
  {
    num: "03",
    name: "결을 새기다 (Building)",
    body: "본 작업. 산출물이 있는 경우 회차 단위로 새깁니다.",
  },
  {
    num: "04",
    name: "결을 잇다 (Caring)",
    body: "본 작업. 산출물이 시간 단위인 경우 정기적으로 잇습니다.",
  },
] as const;

export function StoryHowSection() {
  return (
    <section
      id="story-how"
      aria-labelledby="story-title"
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
            id="story-title"
            className="font-kr"
            style={{
              fontSize: "clamp(1.75rem, 3.6vw, 2.5rem)",
              fontWeight: 600,
              lineHeight: 1.15,
              letterSpacing: "-0.025em",
              color: "var(--gy-ink)",
              wordBreak: "keep-all",
              maxWidth: "22ch",
            }}
          >
            강의가 아니라, 하네스 엔지니어링.
          </h2>

          <div
            className="font-kr"
            style={{
              marginTop: "clamp(2rem, 3.5vw, 2.75rem)",
              maxWidth: "62ch",
              fontSize: "1.0625rem",
              fontWeight: 500,
              lineHeight: 1.85,
              color: "var(--gy-ink)",
              letterSpacing: "-0.005em",
              wordBreak: "keep-all",
            }}
          >
            <p>
              도구를 가르치지 않습니다. 판단은 본인 안에 그대로 두고, 실행을
              본인 손에 맞는 AI 에이전트 팀 구조로 옮깁니다.
            </p>
            <p style={{ marginTop: "1.25rem" }}>
              이 자리에서 우리가 같이 만드는 것은 당신만의 작업 하네스 — 다시
              만들 필요 없는 구조.
            </p>
          </div>

          <ol
            style={{
              marginTop: "clamp(2.75rem, 5vw, 4rem)",
              display: "grid",
              gap: "clamp(1.25rem, 2vw, 1.75rem)",
              listStyle: "none",
              padding: 0,
            }}
          >
            {STEPS.map((s) => (
              <li
                key={s.num}
                style={{
                  display: "grid",
                  gridTemplateColumns: "auto 1fr",
                  columnGap: "clamp(1rem, 2vw, 1.5rem)",
                  paddingBottom: "clamp(1.25rem, 2vw, 1.5rem)",
                  borderBottom: "1px solid var(--gy-hairline-soft)",
                }}
              >
                <span
                  className="font-en"
                  aria-hidden="true"
                  style={{
                    fontSize: "12px",
                    fontWeight: 700,
                    letterSpacing: "0.15em",
                    color: "var(--gy-steel)",
                    paddingTop: "0.45rem",
                  }}
                >
                  {s.num}
                </span>
                <div>
                  <h3
                    className="font-kr"
                    style={{
                      fontSize: "clamp(1.125rem, 1.7vw, 1.25rem)",
                      fontWeight: 700,
                      lineHeight: 1.35,
                      letterSpacing: "-0.015em",
                      color: "var(--gy-deep)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {s.name}
                  </h3>
                  <p
                    className="font-kr"
                    style={{
                      marginTop: "0.5rem",
                      fontSize: "1rem",
                      fontWeight: 500,
                      lineHeight: 1.75,
                      color: "var(--gy-ink-muted)",
                      wordBreak: "keep-all",
                    }}
                  >
                    {s.body}
                  </p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <aside
          aria-label="전문직 1:1 인용"
          className="font-kr lg:sticky lg:top-32"
          style={{
            alignSelf: "start",
            background: "var(--gy-surface-2)",
            borderRadius: "var(--gy-rounded-lg)",
            padding: "1.5rem 1.75rem",
            maxWidth: "260px",
            borderLeft: "2px solid var(--gy-sky)",
          }}
        >
          <p
            style={{
              fontSize: "0.9375rem",
              fontWeight: 500,
              lineHeight: 1.75,
              color: "var(--gy-deep)",
              fontStyle: "normal",
              wordBreak: "keep-all",
            }}
          >
            &ldquo;활용은 보이는데, 구조로 묶이지 않을 때 외부에 묻기조차 어려운
            자리가 있다.&rdquo;
          </p>
          <p
            style={{
              marginTop: "0.875rem",
              fontSize: "0.75rem",
              fontWeight: 600,
              letterSpacing: "0.02em",
              color: "var(--gy-ink-muted)",
            }}
          >
            — 전문직 1:1에서 가장 자주 나오는 문장
          </p>
        </aside>
      </div>
    </section>
  );
}
