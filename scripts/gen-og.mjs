// 빌드 타임 일회성 OG 이미지 생성 스크립트 — /me · /ai 전용 정적 PNG 출력
// next/dist/compiled/@vercel/og (satori + resvg-wasm) 를 Node.js 에서 직접 호출해
// 추가 런타임 의존성 없이 1200×630 PNG 두 장을 생성한다.
// 폰트: public/fonts/Pretendard-{Regular,Bold}.otf (레포 내 로컬)

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const CWD = path.resolve(__dirname, "..");

// next/og Node.js 번들 (devDependency next에 포함)
const ogModule = await import(
  path.join(CWD, "node_modules/next/dist/compiled/@vercel/og/index.node.js")
);
const { ImageResponse } = ogModule;

// 폰트 로드 (OTF — Variable 폰트는 satori가 파싱 불가)
const fontRegular = fs.readFileSync(
  path.join(CWD, "public/fonts/Pretendard-Regular.otf")
);
const fontBold = fs.readFileSync(
  path.join(CWD, "public/fonts/Pretendard-Bold.otf")
);

const W = 1200;
const H = 630;

// 결 컬러 토큰
const C = {
  bg: "#FAFBFC",
  surface: "#F0F4F8",
  wave: "#A8D5E2",
  deep: "#1B3B5F",
  primary: "#1A1A1A",
  muted: "#8B95A1",
  border: "#E2E8EF",
};

const fonts = [
  { name: "Pretendard", data: fontRegular, weight: 400 },
  { name: "Pretendard", data: fontBold, weight: 700 },
];

// ─── 헬퍼: React-like element 생성 ────────────────────────────────────────
function el(type, props, ...children) {
  const flatChildren = children.flat(Infinity);
  const resolvedChildren =
    flatChildren.length === 0
      ? undefined
      : flatChildren.length === 1
        ? flatChildren[0]
        : flatChildren;
  return {
    type,
    key: null,
    ref: null,
    props: {
      ...props,
      ...(resolvedChildren !== undefined ? { children: resolvedChildren } : {}),
    },
    _owner: null,
    _store: {},
  };
}

// ─── 공통 레이아웃 요소 ────────────────────────────────────────────────────

// 좌측 청람 수직 악센트 바
const accentBar = el("div", {
  style: {
    position: "absolute",
    left: 0,
    top: 0,
    width: 6,
    height: "100%",
    background: C.deep,
    borderRadius: "0 3px 3px 0",
  },
});

// 우하단 워드마크 "결 Gyeol"
const wordmark = el(
  "div",
  {
    style: {
      position: "absolute",
      bottom: 48,
      right: 64,
      display: "flex",
      flexDirection: "column",
      alignItems: "flex-end",
    },
  },
  el("span", {
    style: {
      fontSize: 18,
      fontWeight: 700,
      color: C.deep,
      fontFamily: "Pretendard",
      letterSpacing: "0.05em",
    },
    children: "결 Gyeol",
  }),
  el("span", {
    style: {
      fontSize: 13,
      fontWeight: 400,
      color: C.muted,
      fontFamily: "Pretendard",
      marginTop: 2,
      letterSpacing: "0.03em",
    },
    children: "gyeol.page",
  })
);

// 상단 미세 박무 면 (배경 그라데이션 대신 직사각형 분할)
const surfaceStrip = el("div", {
  style: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: 8,
    background: C.wave,
    opacity: 0.35,
  },
});

// ─── /me OG ───────────────────────────────────────────────────────────────
function buildMeElement() {
  return el(
    "div",
    {
      style: {
        width: W,
        height: H,
        background: C.bg,
        display: "flex",
        fontFamily: "Pretendard",
        position: "relative",
        overflow: "hidden",
      },
    },
    // 배경 우측 원형 장식 (결 비주얼 — 물의 흔적)
    el("div", {
      style: {
        position: "absolute",
        right: -120,
        bottom: -120,
        width: 480,
        height: 480,
        borderRadius: "50%",
        background: C.surface,
        opacity: 0.7,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        right: -60,
        bottom: -60,
        width: 300,
        height: 300,
        borderRadius: "50%",
        border: `2px solid ${C.wave}`,
        opacity: 0.4,
      },
    }),
    // 상단 선 포인트
    surfaceStrip,
    accentBar,
    // 메인 콘텐츠 영역
    el(
      "div",
      {
        style: {
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          gap: 0,
        },
      },
      // 카테고리 라벨
      el(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          },
        },
        el("div", {
          style: {
            width: 32,
            height: 2,
            background: C.wave,
            marginRight: 12,
          },
        }),
        el("span", {
          style: {
            fontSize: 16,
            fontWeight: 400,
            color: C.muted,
            letterSpacing: "0.08em",
          },
          children: "웹 스튜디오 결",
        })
      ),
      // 헤드라인
      el("span", {
        style: {
          fontSize: 80,
          fontWeight: 700,
          color: C.primary,
          lineHeight: 1.1,
          letterSpacing: "-0.02em",
        },
        children: "유승현",
      }),
      // 구분선
      el("div", {
        style: {
          width: 60,
          height: 3,
          background: C.wave,
          marginTop: 28,
          marginBottom: 24,
          borderRadius: 2,
        },
      }),
      // 서비스 목록 (배지 스타일)
      el(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            gap: 10,
            flexWrap: "wrap",
            maxWidth: 700,
          },
        },
        ...[
          "AI 컨설팅·과외",
          "인터랙티브 웹",
          "기업 AI 전환",
        ].map((label) =>
          el(
            "div",
            {
              style: {
                display: "flex",
                alignItems: "center",
                paddingTop: 8,
                paddingBottom: 8,
                paddingLeft: 18,
                paddingRight: 18,
                background: C.surface,
                borderRadius: 6,
                border: `1px solid ${C.border}`,
              },
            },
            el("span", {
              style: {
                fontSize: 18,
                fontWeight: 400,
                color: C.primary,
                letterSpacing: "0.01em",
              },
              children: label,
            })
          )
        )
      )
    ),
    wordmark
  );
}

// ─── /ai OG ───────────────────────────────────────────────────────────────
function buildAiElement() {
  const stages = ["입문", "자동화", "에이전트", "MVP", "기업 AX"];

  return el(
    "div",
    {
      style: {
        width: W,
        height: H,
        background: C.bg,
        display: "flex",
        fontFamily: "Pretendard",
        position: "relative",
        overflow: "hidden",
      },
    },
    // 배경 우측 장식 — 사각형 격자 느낌 (체계적 톤)
    el("div", {
      style: {
        position: "absolute",
        right: 80,
        top: 80,
        width: 220,
        height: 220,
        border: `1px solid ${C.border}`,
        opacity: 0.6,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        right: 110,
        top: 110,
        width: 160,
        height: 160,
        border: `1px solid ${C.wave}`,
        opacity: 0.3,
      },
    }),
    el("div", {
      style: {
        position: "absolute",
        right: 140,
        top: 140,
        width: 100,
        height: 100,
        background: C.surface,
        opacity: 0.8,
      },
    }),
    surfaceStrip,
    accentBar,
    // 메인 콘텐츠
    el(
      "div",
      {
        style: {
          position: "absolute",
          left: 80,
          top: 0,
          bottom: 0,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        },
      },
      // 카테고리 라벨
      el(
        "div",
        {
          style: {
            display: "flex",
            alignItems: "center",
            marginBottom: 20,
          },
        },
        el("div", {
          style: {
            width: 32,
            height: 2,
            background: C.wave,
            marginRight: 12,
          },
        }),
        el("span", {
          style: {
            fontSize: 16,
            fontWeight: 400,
            color: C.muted,
            letterSpacing: "0.08em",
          },
          children: "결 스튜디오",
        })
      ),
      // 헤드라인
      el("span", {
        style: {
          fontSize: 68,
          fontWeight: 700,
          color: C.primary,
          lineHeight: 1.15,
          letterSpacing: "-0.02em",
          maxWidth: 700,
        },
        children: "AI 컨설팅·과외",
      }),
      // 구분선
      el("div", {
        style: {
          width: 60,
          height: 3,
          background: C.wave,
          marginTop: 24,
          marginBottom: 20,
          borderRadius: 2,
        },
      }),
      // 서브 카피
      el("span", {
        style: {
          fontSize: 26,
          fontWeight: 400,
          color: C.muted,
          letterSpacing: "-0.01em",
          maxWidth: 620,
          lineHeight: 1.4,
        },
        children: "목표에 맞게, 매번 새로 설계합니다",
      }),
      // 단계 레이블
      el(
        "div",
        {
          style: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            gap: 0,
            marginTop: 40,
          },
        },
        ...stages.flatMap((stage, i) => {
          const items = [
            el("span", {
              style: {
                fontSize: 15,
                fontWeight: i === 0 ? 700 : 400,
                color: i === 0 ? C.deep : C.muted,
                letterSpacing: "0.02em",
              },
              children: stage,
            }),
          ];
          if (i < stages.length - 1) {
            items.push(
              el("span", {
                style: {
                  fontSize: 14,
                  color: C.border,
                  marginLeft: 10,
                  marginRight: 10,
                },
                children: "·",
              })
            );
          }
          return items;
        })
      )
    ),
    wordmark
  );
}

// ─── PNG 저장 ─────────────────────────────────────────────────────────────
async function save(element, outPath) {
  const resp = new ImageResponse(element, { width: W, height: H, fonts });
  const buf = await resp.arrayBuffer();
  fs.writeFileSync(outPath, Buffer.from(buf));
  const stat = fs.statSync(outPath);
  console.log(
    `✓ ${path.relative(CWD, outPath)}  (${stat.size.toLocaleString()} bytes)`
  );
}

const OUT_DIR = path.join(CWD, "public/og");

await save(buildMeElement(), path.join(OUT_DIR, "me.png"));
await save(buildAiElement(), path.join(OUT_DIR, "class.png"));

console.log("✓ OG 이미지 생성 완료");
