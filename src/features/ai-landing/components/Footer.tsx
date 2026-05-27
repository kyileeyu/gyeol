export function Footer() {
  return (
    <footer
      className="font-kr"
      style={{
        background: "var(--gy-inverse-canvas)",
        color: "var(--gy-on-inverse)",
      }}
    >
      <div
        className="mx-auto"
        style={{
          maxWidth: "1200px",
          padding: "clamp(2.5rem, 5vw, 3.5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <p
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            lineHeight: 1.6,
            letterSpacing: "-0.005em",
            color: "var(--gy-on-inverse)",
            wordBreak: "keep-all",
          }}
        >
          결 스튜디오 · 결 컨설팅 (Gyeol Consulting) · 정식 오픈 전 사전 문의
          단계
        </p>

        <p
          style={{
            fontSize: "0.875rem",
            fontWeight: 500,
            lineHeight: 1.7,
            color: "var(--gy-on-inverse-muted)",
          }}
        >
          <a
            href="mailto:hi@gyeol.page"
            className="link-flow"
            style={{ color: "var(--gy-on-inverse)" }}
          >
            hi@gyeol.page
          </a>
          <span aria-hidden="true"> · </span>
          <a
            href="https://gyeol.page"
            className="link-flow"
            style={{ color: "var(--gy-on-inverse)" }}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="gyeol.page 새 탭에서 열기"
          >
            gyeol.page
          </a>
        </p>

        <p
          style={{
            fontSize: "0.8125rem",
            fontWeight: 500,
            lineHeight: 1.6,
            color: "var(--gy-on-inverse-muted)",
            wordBreak: "keep-all",
          }}
        >
          B2B 워크숍 문의는 ai.gyeol.page/b2b
        </p>
      </div>
    </footer>
  );
}
