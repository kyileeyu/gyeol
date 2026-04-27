"use client";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="ko">
      <body
        style={{
          background: "#FAFBFC",
          color: "#1A1A1A",
          fontFamily:
            "-apple-system, BlinkMacSystemFont, 'Pretendard', sans-serif",
          margin: 0,
        }}
      >
        <main
          style={{
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            padding: "2rem",
            textAlign: "center",
          }}
        >
          <h1
            style={{
              fontSize: "1.5rem",
              fontWeight: 300,
              marginBottom: "1rem",
            }}
          >
            예기치 않은 오류가 발생했습니다
          </h1>
          <p
            style={{
              fontSize: "0.875rem",
              color: "#8B95A1",
              marginBottom: "2rem",
              maxWidth: "28rem",
            }}
          >
            페이지를 다시 불러와 주세요.
          </p>
          <button
            onClick={reset}
            style={{
              fontSize: "0.875rem",
              color: "#1B3B5F",
              textDecoration: "underline",
              textUnderlineOffset: "4px",
              background: "none",
              border: 0,
              cursor: "pointer",
              fontFamily: "inherit",
            }}
          >
            다시 시도
          </button>
        </main>
      </body>
    </html>
  );
}
