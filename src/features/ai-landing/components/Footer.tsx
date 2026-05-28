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
          padding: "clamp(3.5rem, 7vw, 5rem) clamp(1.5rem, 5vw, 4rem)",
          display: "flex",
          flexDirection: "column",
          gap: "clamp(2rem, 3.5vw, 2.75rem)",
        }}
      >
        <div>
          <p
            className="font-en"
            style={{
              fontSize: "12px",
              fontWeight: 700,
              letterSpacing: "0.125em",
              lineHeight: 1.2,
              color: "var(--gy-on-inverse-muted)",
              textTransform: "uppercase",
            }}
          >
            Gyeol Studio
          </p>
          <p
            style={{
              marginTop: "0.875rem",
              fontSize: "clamp(1.125rem, 1.7vw, 1.25rem)",
              fontWeight: 600,
              lineHeight: 1.5,
              letterSpacing: "-0.015em",
              color: "var(--gy-on-inverse)",
              wordBreak: "keep-all",
            }}
          >
            결 스튜디오 · 결 컨설팅 (Gyeol Consulting)
          </p>
          <p
            style={{
              marginTop: "0.5rem",
              fontSize: "0.875rem",
              fontWeight: 500,
              lineHeight: 1.7,
              color: "var(--gy-on-inverse-muted)",
            }}
          >
            정식 오픈 전 사전 문의 단계
          </p>
        </div>

        <hr
          style={{
            border: 0,
            borderTop: "1px solid rgba(252, 255, 255, 0.10)",
            margin: 0,
          }}
        />

        <div
          className="grid lg:grid-cols-2"
          style={{
            gap: "clamp(1.75rem, 3vw, 2.5rem)",
            gridTemplateColumns: "1fr",
          }}
        >
          <div>
            <p
              className="font-en"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.125em",
                lineHeight: 1.2,
                color: "var(--gy-on-inverse-muted)",
                textTransform: "uppercase",
              }}
            >
              Contact
            </p>
            <p
              style={{
                marginTop: "0.875rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                lineHeight: 1.85,
                color: "var(--gy-on-inverse)",
              }}
            >
              <a
                href="mailto:hi@gyeol.page"
                className="link-flow"
                style={{ color: "var(--gy-on-inverse)" }}
              >
                hi@gyeol.page
              </a>
              <br />
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
          </div>

          <div>
            <p
              className="font-en"
              style={{
                fontSize: "12px",
                fontWeight: 700,
                letterSpacing: "0.125em",
                lineHeight: 1.2,
                color: "var(--gy-on-inverse-muted)",
                textTransform: "uppercase",
              }}
            >
              B2B
            </p>
            <p
              style={{
                marginTop: "0.875rem",
                fontSize: "0.9375rem",
                fontWeight: 500,
                lineHeight: 1.85,
                color: "var(--gy-on-inverse-muted)",
                wordBreak: "keep-all",
              }}
            >
              워크숍 문의는{" "}
              <a
                href="https://ai.gyeol.page/b2b"
                className="link-flow"
                style={{ color: "var(--gy-on-inverse)" }}
              >
                ai.gyeol.page/b2b
              </a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
