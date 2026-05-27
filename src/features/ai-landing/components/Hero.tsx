export function Hero() {
  return (
    <section
      id="hero"
      aria-labelledby="hero-title"
      className="relative isolate overflow-hidden"
    >
      <div
        aria-hidden="true"
        className="bg-mesh-hero absolute inset-0 -z-10"
        style={{ opacity: 0.85 }}
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 -z-10"
        style={{
          background:
            "linear-gradient(180deg, rgba(252,255,255,0) 0%, rgba(252,255,255,0.55) 78%, var(--gy-canvas) 100%)",
        }}
      />

      <div
        className="mx-auto"
        style={{
          maxWidth: "1200px",
          padding: "clamp(8rem, 14vw, 12rem) clamp(1.5rem, 5vw, 4rem) clamp(6rem, 10vw, 9rem)",
        }}
      >
        <p
          className="font-en"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.15em",
            lineHeight: 1.2,
            textTransform: "uppercase",
            color: "var(--gy-deep)",
          }}
        >
          결 컨설팅 (Gyeol Consulting) · 전문직 1:1
        </p>

        <h1
          id="hero-title"
          className="font-kr"
          style={{
            marginTop: "clamp(1.25rem, 2vw, 2rem)",
            fontSize: "clamp(2.75rem, 6.5vw, 4.5rem)",
            fontWeight: 600,
            lineHeight: 1.06,
            letterSpacing: "-0.035em",
            color: "var(--gy-ink)",
            wordBreak: "keep-all",
            maxWidth: "16ch",
          }}
        >
          <span className="block">지금 그 업무,</span>
          <span className="block">사람이 해야 하는 일이 맞습니까.</span>
        </h1>

        <p
          className="font-kr"
          style={{
            marginTop: "clamp(1.75rem, 3vw, 2.5rem)",
            maxWidth: "32ch",
            fontSize: "clamp(1.0625rem, 1.6vw, 1.375rem)",
            fontWeight: 500,
            lineHeight: 1.6,
            letterSpacing: "-0.005em",
            color: "var(--gy-ink)",
            wordBreak: "keep-all",
          }}
        >
          <span className="block">GPT → Claude 강의가 아닙니다.</span>
          <span className="block">당신의 판단만 가져오세요.</span>
        </p>

        <p
          className="font-kr"
          style={{
            marginTop: "clamp(2.5rem, 4vw, 3.5rem)",
            maxWidth: "38ch",
            fontSize: "0.9375rem",
            fontWeight: 500,
            lineHeight: 1.7,
            color: "var(--gy-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          본 페이지는 정식 오픈 전 사전 문의 단계입니다.
          <br />
          이번 분기에 받는 자리는 동시에 두 분까지.
        </p>

        <div style={{ marginTop: "clamp(2rem, 3vw, 2.75rem)" }}>
          <a href="#intake" className="btn-primary">
            <span>문의하기</span>
            <span aria-hidden="true">→</span>
          </a>
        </div>
      </div>
    </section>
  );
}
