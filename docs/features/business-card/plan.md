# 결 Gyeol — 온라인 명함 페이지 `/card` 구현

## Context

오프라인 첫 미팅에서 QR 인쇄물로 보여줄 **온라인 명함**이 필요하다. 카메라로 스캔하는 디바이스는 거의 모바일이므로 **세로 모드·모바일 우선**, 폴드 위에 카드 한 장이 정확히 들어와야 한다.

사용자가 선택한 컨셉은 **실제 명함의 메타포** — 앞면(인상) ↔ 뒷면(정보) 카드 플립. 진입 시 비스듬한 자세에서 정면으로 안착하는 한 번의 3D 모션. 결의 톤("흐르는·깊은·체계적인")과 정합한다.

메인 사이트와 동일한 디자인 시스템(컬러 7종, 폰트 자체 호스팅, 분석 이벤트 패턴)을 그대로 상속받되, Hero의 물결 셰이더는 **명함 페이지엔 쓰지 않는다** — 카드 자체가 시그니처가 되어야 하므로 배경은 단색 설백.

목표: D-Day 출시 후 추가 사이트맵 entry, QR 인쇄 가능, 모바일 vCard 임포트 동작.

---

## 확정 사양

| 항목 | 값 |
|---|---|
| URL | `/card` |
| 앞면 | 상단 워드마크 `결 Gyeol Studio` + 중앙 프로필 사진(원형) + 하단 `유승현 Shannon` / `대표 · 결 스튜디오` + 모서리 `탭해서 뒤집기 ↻` |
| 뒷면 | 상단 `결이 맞는 페이지를 만듭니다` + 메일/전화/도메인 리스트 + 하단 `연락처 저장` CTA + 모서리 `탭해서 앞면 ↺` |
| 진입 모션 | `rotateX(-22deg) rotateY(18deg) translateZ(-60px) opacity(0)` → `rotateX(0) rotateY(0) translateZ(0) opacity(1)`, 900ms, `cubic-bezier(0.65, 0, 0.35, 1)` |
| 플립 | Y축 600ms 같은 이징. 본체 어디든 탭. 자식 링크는 stopPropagation |
| Save Contact | 정적 `public/card/gyeol.vcf` (vCard 3.0) 다운로드 |
| 배경 | 단색 설백 `#FAFBFC` + 미세 노이즈. Hero 셰이더 미사용 |
| Reduced Motion | 진입은 200ms fade-in, 플립은 cross-fade로 폴백 |

---

## 파일 변경 트리

### 신규 생성

```
src/app/card/
└── page.tsx                                # 라우트 + metadata export (서버)

src/features/card/
├── index.ts                                # barrel
├── components/
│   ├── BusinessCard.tsx                    # "use client" — 플립 상태·진입 모션
│   ├── CardFront.tsx                       # 앞면 (서버 OK)
│   ├── CardBack.tsx                        # 뒷면 (서버 OK)
│   ├── SaveContactButton.tsx               # "use client" — .vcf 다운로드 + analytics
│   └── CardViewTracker.tsx                 # "use client" — card_view 1회 발화
├── lib/
│   └── profile.ts                          # 이름·연락처·소개 상수
└── styles/
    └── card.module.css                     # 3D preserve-3d, backface, plate shadow

public/card/
├── profile.webp                            # 첨부 사진 → 정사각 800×800, <60KB
└── gyeol.vcf                               # 정적 vCard 3.0

public/og/
└── card.png                                # 1200×630 (1차 출시엔 기존 OG 폴백 가능)
```

### 수정

| 파일 | 변경 |
|---|---|
| `src/lib/analytics.ts` | `AnalyticsEvent` union에 `card_view` / `card_flip` / `card_save_contact` 추가. `mailto_click.where`·`social_click.where`에 `"card"` literal 추가 |
| `src/app/sitemap.ts` | `/card` 항목 추가 (priority 0.6, changeFrequency: "monthly") |

손대지 않음: `globals.css`(컬러 토큰 재활용), `layout.tsx`(폰트·기본 metadata 상속), `robots.ts`(이미 `/` 허용), `JsonLd.tsx`(1차 출시엔 보류).

---

## 컴포넌트 구현 디테일

### `src/app/card/page.tsx` (서버)

- `min-h-[100svh] flex items-center justify-center px-6 py-12` — 모바일 세로 우선
- 배경: 단색 설백 + 옵션으로 SVG inline noise filter (`<filter id="grain"><feTurbulence baseFrequency="0.9"/></filter>` opacity 0.025)
- 자식: `<BusinessCard />` + `<CardViewTracker />`
- `metadata` export — §메타데이터 참조

### `BusinessCard.tsx` (클라이언트 부모)

```ts
const [flipped, setFlipped] = useState(false);
const reduce = useReducedMotion();
```

- 외곽에 `style={{ perspective: "1000px" }}` 인라인
- 진입 모션: Framer Motion `motion.div`로 wrapper — `initial / animate / transition` 위 사양 그대로. `reduce` 시 opacity만 200ms
- 카드 본체: `<div role="button" tabIndex={0} aria-pressed={flipped} aria-label={flipped ? "명함 앞면 보기" : "명함 뒷면 보기"} onClick={onFlip} onKeyDown={Space/Enter → onFlip}>`
  - `<button>` 안에 `<a>` 중첩이 invalid HTML이므로 **div + role="button"** 채택
- 두 면을 절대 위치로 겹쳐 배치, 부모 div에 `transform: rotateY(${flipped ? 180 : 0}deg)` (CSS Module의 `.card` + `.cardFlipped` 조합)
- 플립 시 `track("card_flip", { to: flipped ? "front" : "back" })`
- 앞면일 때 뒷면 `aria-hidden`, 반대도 (스크린리더 양면 동시 읽기 방지)

### `CardFront.tsx`

```tsx
<>
  <div className={styles.face}>
    <header className="flex items-baseline gap-2">
      <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">Gyeol Studio</span>
      <span className="font-kr-serif text-sm text-muted">결</span>
    </header>
    <div className="flex-1 flex items-center justify-center">
      <Image src="/card/profile.webp" alt="유승현 — 결 스튜디오 대표"
             width={224} height={224} priority
             sizes="(max-width: 640px) 224px, 256px"
             className="rounded-full object-cover ring-1 ring-bakmu" />
    </div>
    <footer className="text-center">
      <p className="font-kr-serif text-3xl text-ink">유승현</p>
      <p className="font-en italic text-sm text-muted mt-1">Shannon Yu</p>
      <p className="text-xs text-muted mt-3">대표 · 결 스튜디오</p>
    </footer>
    <span aria-hidden className="absolute bottom-4 right-5 text-[13px] tracking-[0.2em] text-muted/70">
      탭해서 뒤집기 ↻
    </span>
  </div>
</>
```

### `CardBack.tsx`

```tsx
<div className={`${styles.face} ${styles.faceBack}`}>
  <p className="font-kr-serif text-[clamp(1.1rem,3.5vw,1.35rem)] text-ink leading-snug">
    결이 맞는 페이지를 만듭니다
  </p>
  <ul className="mt-8 space-y-4 flex-1">
    <li><a href="mailto:hi@gyeol.page" onClick={onMailClick}>
      <MailIcon /> hi@gyeol.page</a></li>
    <li><a href="tel:+821057725514" onClick={onTelClick}>
      <PhoneIcon /> 010-5772-5514</a></li>
    <li><a href="https://gyeol.page" target="_blank" rel="noreferrer noopener" onClick={onSiteClick}>
      <GlobeIcon /> gyeol.page</a></li>
  </ul>
  <SaveContactButton />
  <span aria-hidden className="absolute bottom-4 right-5 text-[13px] tracking-[0.2em] text-muted/70">
    탭해서 앞면 ↺
  </span>
</div>
```

자식 링크/버튼 onClick 모두 첫 줄에 `e.stopPropagation()` — 카드 플립 차단.

이벤트:
- mailto → `track("mailto_click", { where: "card" })`
- tel → `track("cta_external_click", { target: "tel:+821057725514" })`
- site → `track("cta_external_click", { target: "gyeol.page" })`

### `SaveContactButton.tsx`

```tsx
"use client";
export default function SaveContactButton() {
  return (
    <a href="/card/gyeol.vcf" download="gyeol.vcf"
       onClick={(e) => {
         e.stopPropagation();
         track("card_save_contact", {});
         track("cta_external_click", { target: "save_contact" });
       }}
       className="block w-full rounded-2xl bg-deep px-5 py-4 text-center text-bg text-sm font-medium tracking-[0.04em]">
      연락처 저장
    </a>
  );
}
```

### `CardViewTracker.tsx`

```tsx
"use client";
import { useEffect } from "react";
import { track } from "@/lib/analytics";
export default function CardViewTracker() {
  useEffect(() => { track("card_view", {}); }, []);
  return null;
}
```

### `lib/profile.ts`

```ts
export const PROFILE = {
  name_kr: "유승현",
  name_en: "Shannon Yu",
  role_kr: "대표 · 결 스튜디오",
  role_en: "Founder",
  org_kr: "결 Gyeol Studio",
  org_short: "결",
  bio_one_line: "결이 맞는 페이지를 만듭니다",
  email: "hi@gyeol.page",
  phone_display: "010-5772-5514",
  phone_intl: "+82-10-5772-5514",
  site: "https://gyeol.page",
  profile_image: "/card/profile.webp",
  vcard_path: "/card/gyeol.vcf",
} as const;
```

---

## CSS Module — `card.module.css`

```css
.stage {
  perspective: 1000px;
  perspective-origin: 50% 35%;
  width: min(86vw, 360px);
  aspect-ratio: 5 / 8;
}
.card {
  position: relative;
  width: 100%;
  height: 100%;
  transform-style: preserve-3d;
  transition: transform 600ms cubic-bezier(0.65, 0, 0.35, 1);
  border-radius: 24px;
  box-shadow: 0 24px 48px -12px rgba(27, 59, 95, 0.18),
              0 8px 16px -8px rgba(27, 59, 95, 0.12);
  background: linear-gradient(155deg, var(--color-seolbaek) 0%, var(--color-bakmu) 100%);
}
.cardFlipped { transform: rotateY(180deg); }
.face {
  position: absolute; inset: 0;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: inherit;
  padding: 28px 24px;
  display: flex; flex-direction: column;
}
.faceBack { transform: rotateY(180deg); }

@media (prefers-reduced-motion: reduce) {
  .card { transition: none; }
  .cardFlipped { transform: none; }
  .face { transition: opacity 300ms linear; }
}
```

Reduced motion 분기 시 JS에서 `data-reduced` 속성과 함께 opacity inline style을 토글 (Framer Motion `useReducedMotion()` 반환값 활용).

---

## vCard 파일 — `public/card/gyeol.vcf`

UTF-8 (BOM 없음), CRLF 줄바꿈.

```vcard
BEGIN:VCARD
VERSION:3.0
PRODID:-//Gyeol Studio//gyeol.page//KO
FN:유승현
N:유;승현;;;
NICKNAME:Shannon
ORG:결 Gyeol Studio
TITLE:Founder
TEL;TYPE=CELL,VOICE:+82-10-5772-5514
EMAIL;TYPE=INTERNET,PREF:hi@gyeol.page
URL:https://gyeol.page
NOTE:결이 맞는 페이지를 만듭니다.
REV:2026-05-19T00:00:00Z
END:VCARD
```

검증: 로컬에서 `open public/card/gyeol.vcf` → macOS 연락처 임포트 시트 정상 호출 확인.

---

## 분석 이벤트 (`src/lib/analytics.ts`)

`AnalyticsEvent` union에 추가:

```ts
| { name: "card_view"; params: Record<string, never> }
| { name: "card_flip"; params: { to: "front" | "back" } }
| { name: "card_save_contact"; params: Record<string, never> }
```

기존 이벤트 type 확장:
- `mailto_click.where`: 기존 literal에 `"card"` 추가
- `cta_external_click`: 그대로 (target 문자열만 새 값)

---

## 메타데이터 / Sitemap

`src/app/card/page.tsx`:

```ts
export const metadata: Metadata = {
  title: "명함 — 유승현 · 결 스튜디오",
  description: "결이 맞는 페이지를 만듭니다. 유승현, 결 Gyeol Studio 대표.",
  alternates: { canonical: `${SITE_URL}/card` },
  openGraph: {
    type: "profile",
    url: `${SITE_URL}/card`,
    title: "유승현 — 결 Gyeol Studio",
    description: "결이 맞는 페이지를 만듭니다.",
    images: [{ url: `${SITE_URL}/og/card.png`, width: 1200, height: 630, alt: "결 명함 — 유승현" }],
  },
  twitter: { card: "summary_large_image", title: "유승현 — 결 Gyeol Studio",
             description: "결이 맞는 페이지를 만듭니다.", images: [`${SITE_URL}/og/card.png`] },
  robots: { index: true, follow: true },
};
```

`src/app/sitemap.ts`에 추가:
```ts
{ url: `${SITE_URL}/card`, lastModified: new Date(),
  changeFrequency: "monthly", priority: 0.6 },
```

OG 이미지는 1차 출시 시간 부족하면 기존 `/og-image.png`로 임시 폴백.

---

## 접근성

- 카드 본체: `<div role="button" tabIndex={0}>` + Space/Enter keyDown 핸들러
- `aria-pressed={flipped}` + 동적 `aria-label`
- 비활성 면에 `aria-hidden={true}` 토글
- `focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-wave` (빙청 ring)
- 모서리 마이크로카피는 최소 **13px** (안개 컬러 대비 보완)
- 사진 alt: "유승현 — 결 스튜디오 대표"

---

## 재사용 자산 (기존 코드)

- **컬러 토큰** — `src/app/globals.css`의 `@theme inline` 블록 7개 그대로
- **폰트** — `src/app/layout.tsx`의 `next/font/local` Pretendard 상속
- **`track()` 함수** — `src/lib/analytics.ts`
- **`useReducedMotion()`** — Framer Motion 훅, Hero/Section에서 이미 사용 중인 패턴 그대로
- **`SITE_URL` 상수** — `src/lib/site.ts` (기존 존재 가정. 없으면 layout.tsx의 metadataBase에서 import)

---

## 검증 절차

### 1. vCard 임포트 (Critical)
- **iOS Safari** 17+ : QR 스캔 시뮬레이션 (PC에서 URL 직접 입력) → 카드 → 뒷면 → 연락처 저장 → "연락처에 추가" 시트 자동 호출 → 이름·회사·전화·이메일·URL 모두 채워졌는지 확인
- **Android Chrome**: 다운로드 알림 → 탭 → 연락처 앱 → 한글 깨짐 없이 import
- **iOS Chrome / Samsung Internet**: 같은 흐름 검증

### 2. 모션·인터랙션
- 카드 진입 모션 900ms 완료, Chrome DevTools Performance 탭에서 60fps 유지
- 본체 탭 → 플립. 메일/전화/사이트/CTA 탭 → 플립 안 됨 (stopPropagation)
- macOS 시스템 환경설정 "모션 줄이기" ON → fade-only 폴백
- Tab → 카드 포커스 → Space/Enter → 플립. 뒷면 진입 후 Tab으로 4개 액션 순회

### 3. 분석 이벤트
- GA4 DebugView로:
  - 페이지 진입: `card_view` 1회
  - 플립: `card_flip { to: "back" }` / `card_flip { to: "front" }`
  - 연락처 저장: `card_save_contact` + `cta_external_click { target: "save_contact" }` 양쪽 발화

### 4. 성능
- Lighthouse 모바일: LCP < 2.5s (프로필 사진 LCP, `priority` 검증), CLS = 0, TBT < 200ms
- WebPageTest 모바일 Slow 3G: First Paint < 1.5s

### 5. 시각
- iPhone 13 Pro / Galaxy S22 / iPad mini / Macbook 1280: 카드가 fold 안에 100% 들어옴
- 카드 가로: 모바일 86vw / 데스크탑 최대 360px

### 6. 검색·OG
- `curl https://gyeol.page/sitemap.xml | grep "/card"` — 항목 존재 확인
- [opengraph.xyz](https://www.opengraph.xyz/)에 URL 넣어 OG 카드 정상 렌더 확인 (폴백 OG 사용 시에도 OK)

---

## 위험 / 트레이드오프

- **vCard 한글 호환성**: BOM·CRLF·UTF-8 한 글자 어긋나면 일부 안드로이드에서 한글 깨짐 — 4종 디바이스 실기 테스트 필수
- **iOS Safari 첫 플립 깜빡임**: `-webkit-backface-visibility: hidden` 누락 시 발생 — 위 CSS에 명시했지만 회귀 가능
- **`<button>` vs `<div role="button">`**: 사양 준수 위해 div + role 채택, 키보드 핸들러 수동 구현 필요
- **이모지 vs SVG 아이콘**: 1차는 이모지 그대로 OK, 시간 되면 lucide SVG 24px stroke 1.5로 교체 권장 (결 절제 톤)
- **OG 이미지**: 1200×630 별도 디자인 비용 — 1차는 기존 `/og-image.png` 폴백 가능
