# 소개·권위 허브 (`/me`) 디자인

---

## 공통 디자인 시스템

> 이 섹션은 `/me`(intro-hub)와 `/ai`(ai-class-landing) 두 페이지가 공유한다.
> `/ai` design.md는 이 섹션을 참조하며 중복 서술하지 않는다.

### 컬러 토큰 (globals.css `@theme inline` 그대로 상속)

| CSS 변수 | 이름 | Hex | 두 페이지 주 용도 |
|---|---|---|---|
| `--color-bg` | 설백 | `#FAFBFC` | 메인 배경 |
| `--color-surface` | 박무 | `#F0F4F8` | 카드 배경, 폼 필드 배경, 섹션 구분 |
| `--color-wave` | 빙청 | `#7AC0D4` | 포커스 테두리, 구분선 액센트, 폼 제출 버튼 |
| `--color-shimmer` | 은박 | `#C9D6DF` | 구분선, 아이콘 호버 보조 |
| `--color-deep` | 청람 | `#1B3B5F` | CTA 버튼, 링크 호버, 강조 텍스트 |
| `--color-ink` | 먹 | `#1A1A1A` | 헤드라인, 본문 |
| `--color-muted` | 안개 | `#8B95A1` | 서브텍스트, 캡션, placeholder |

### 타이포그래피

| 역할 | 클래스 / 폰트 | 크기 범위 | 용도 |
|---|---|---|---|
| 섹션 헤드라인 | `font-kr-serif` (GounBatang / Noto Serif KR) | `clamp(1.75rem, 3.8vw, 2.75rem)` | S1 헤드라인, 섹션 h2 |
| 서브 본문 | `font-kr` (Pretendard) 400/500 | `0.875rem~1rem` | 카드 설명, 본문 |
| 영문 레이블 | `font-en` (Inter) italic | `0.65rem~0.75rem`, tracking `0.25em` | 섹션 번호, 영문 태그 |
| 폼 입력 | `font-kr` 400 | `1rem` | 입력 필드, placeholder |

### 모션 원칙

- **이징**: `cubic-bezier(0.65, 0, 0.35, 1)` — `ease-water` 변수. Hero 셰이더 미사용.
- **진입 애니메이션**: `opacity: 0, y: 32` → `opacity: 1, y: 0`, duration `1.0~1.4s`.
- **stagger**: 섹션 내 카드·아이템 그룹은 `staggerChildren: 0.15~0.18`.
- **scroll reveal**: `whileInView` + `viewport={{ once: true, amount: 0.2 }}`. 한 번 발화 후 재트리거 없음.
- **퇴장 느리게**: 모달·폼 성공 상태 전환 시 `duration: 0.4s` fade-out.
- **bounce 금지**: overshoot 없음. 모든 모션은 단방향.
- **`prefers-reduced-motion`**: `useReducedMotion()` 훅으로 감지. true이면 initial variant를 즉시 "show"로 설정해 모션 생략.

### Hero 물결 셰이더 미사용 원칙

두 페이지 모두 `WaterShader` / `LiquidCanvas` 컴포넌트를 import하지 않는다. 본사(`gyeol.page`) 시그니처 희석 방지. 배경은 `--color-bg`(설백) 단색이며, 시각적 인터랙션은 카드 hover 상태·폼 포커스·CTA 버튼 효과로만 제한한다.

### 공유 컴포넌트 목록

아래 컴포넌트는 두 페이지가 공통으로 사용하거나, 한 페이지에서 만든 뒤 다른 페이지가 import한다.

| 컴포넌트 | 위치 | 설명 | 공유 방식 |
|---|---|---|---|
| `Footer` | `src/components/sections/Footer.tsx` | 결 본사 푸터 | 변경 없이 재사용 |
| `SectionView` | `src/components/SectionView.tsx` | IntersectionObserver 래퍼, `section_view` 이벤트 | 변경 없이 재사용 |
| `ScrollDepthTracker` | `src/components/ScrollDepthTracker.tsx` | 25/50/75/100% 스크롤 추적 | 변경 없이 재사용 |
| `SectionHeading` | `src/features/intro-hub/components/SectionHeading.tsx` (신규) | 섹션 레이블(영문 소문자 이탤릭) + h2 조합. 두 페이지 공통 패턴 | intro-hub에서 먼저 작성, class-landing에서 import |
| `ServiceCard` | `src/features/intro-hub/components/ServiceCard.tsx` (신규) | 제목·한 줄 설명·CTA 링크를 담는 카드. 테두리 `border-ink/15`, hover 시 `border-wave` | intro-hub에서 작성, class-landing S4에서 재사용 가능 |
| `SocialLinkRow` | `src/features/intro-hub/components/SocialLinkRow.tsx` (신규) | 아이콘 + 플랫폼명 + 한 줄 맥락 텍스트 행. `/me` S4 전용이지만 패턴 재사용 가능 | intro-hub 전용 |
| `InlineContactForm` | 각 페이지 내 `components/` 하위 (신규 2종) | `HubContactForm` (3필드) / `ClassContactForm` (4필드). 기존 `ContactForm` 구조 참고, 독립 작성 | 각자 독립. 기존 `ContactForm` 수정 없음 |
| `SuccessInline` | `src/features/intro-hub/components/SuccessInline.tsx` (신규) | 폼 제출 성공 시 인라인 메시지. `SuccessWave` 대신 텍스트 위주 간결 버전 | intro-hub에서 작성, class-landing에서 import |

### 교차 링크 규칙

| 출발 | 도착 | 링크 텍스트 | 이벤트 |
|---|---|---|---|
| `/me` S3 AI 강의 카드 CTA | `/ai` | "강의 살펴보기 →" | `hub_to_ai_click` |
| `/me` S3 웹 제작 카드 CTA | `https://gyeol.page` | "결 스튜디오 보기 →" | `hub_to_work_click` |
| `/me` S3 AX 카드 CTA | `/ai#class-contact` | "이야기 나눠보기" | `hub_to_ai_click` (AX 문의도 `/ai` 폼으로 수렴. v2 변경) |
| `/ai` S6 강사 소개 한 줄 | `/me` | "강사 소개 →" | `class_to_hub_click` |
| ~~`/card` 뒷면~~ (미적용) | ~~`/me`~~ | — | — |

`/card` 뒷면 교차 링크는 **추가하지 않는다** (확정). `/card`는 그대로 둔다.

---

## 사용자 흐름

```
[유입 채널]
  ├── SNS bio (인스타·스레드·유튜브) ─────────────────┐
  ├── 숨고 프로필 직링크 ──────────────────────────────┤
  └── /card QR · 지인 소개 ──────────────────────────── /me (S1 Hero)
                                                          │
                                    ┌─────────────────────┤
                                    ↓                     ↓
                               S2 스토리           스크롤 계속
                                    │
                               S3 서비스 라우팅
                              ┌─────┼─────────────┐
                              ↓     ↓             ↓
                           /ai   gyeol.page    S6 문의 폼 ─→ 인라인 성공 메시지
                              
                         S4 SNS 링크 → 각 채널 (새 탭)
                         S5 신뢰 카피 (MVP: 익명 표현)
                         S6 가벼운 문의 → 인라인 성공
```

**분기 케이스**
- S3 AI 강의 카드 클릭 → `/ai` 이동 (새 탭 아님, 같은 도메인).
- S3 웹 제작 카드 클릭 → `gyeol.page` 이동 (same-origin, 새 탭 아님).
- S3 AX 카드 CTA "이야기 나눠보기" → `/ai#class-contact`로 라우팅 (v2 변경. 이전: S6 smooth scroll).
- S4 SNS 링크 → `target="_blank" rel="noreferrer noopener"` 새 탭.
- S6 폼 제출 성공 → 페이지 전환 없음. 폼 영역을 인라인 성공 메시지로 교체.
- S6 폼 제출 실패 (서버 오류) → 폼 유지. 에러 메시지 인라인 표시.

---

## 화면

### S1 — Hero / 정체성

**레이아웃 (모바일 우선)**

```
┌─────────────────────────────┐
│  [결 헤더 — 공유]            │
├─────────────────────────────┤
│                             │
│  [프로필 사진]               │  ← 원형, 96×96px (모바일) / 128×128px (데스크탑)
│                             │     /card/profile.webp 재사용 (또는 교체 — 열린 질문)
│  유승현입니다                 │  ← font-kr-serif, clamp(2.25rem, 6vw, 4.5rem)
│                             │     tracking-[-0.04em], 먹
│  FE 개발자 출신으로           │  ← font-kr, text-muted, 0.9375rem
│  AI 강의, 인터랙티브 웹 제작, │     max-w-[480px], leading-[1.8]
│  기업 AI 전환까지 함께 봅니다 │
│                             │
│  ▼ (스크롤 유도 — pulse 선)  │
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상)**

```
┌──────────────────────────────────────────────────┐
│  [결 헤더]                                        │
├──────────────────────────────────────────────────┤
│                                                  │
│  [사진 128×128] 유승현입니다                        │  ← 사진과 헤드라인 가로 정렬
│                                                  │     또는 사진 위/헤드라인 아래 세로
│  FE 개발자 출신으로 AI 강의, 인터랙티브 웹 제작,    │     (모바일 세로 유지, 데스크탑 선택)
│  기업 AI 전환까지 함께 봅니다.                      │
│                                                  │
└──────────────────────────────────────────────────┘
```

> 데스크탑에서 사진-헤드라인 가로 배치 vs 세로 배치는 열린 질문으로 남긴다. 기본 추천은 **세로 배치** (모바일 우선 일관성, 헤드라인 임팩트 보존).

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 프로필 사진 (`<Image>`, Next.js) | 로딩 → blur placeholder → 완전 표시 | — |
| h1 "유승현입니다" | 정적. fade-in (진입 시 1회) | — |
| 서브 텍스트 | 정적. fade-in stagger | — |
| 스크롤 유도 선 | `wave-pulse` 애니메이션 (기존 keyframe) | — |
| `SectionView` 래퍼 | — | `section_view { section: "hero" }` |

**엣지 케이스**
- 프로필 이미지 로드 실패 → `profile-placeholder.svg` fallback. alt="유승현 프로필 사진".
- `prefers-reduced-motion: reduce` → 모든 fade-in 생략. 요소 즉시 표시.

---

### S2 — 스토리·관점

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "왜 이 일을 하는가."         │
│                             │
│  ── (빙청 수평선 16px w)    │
│                             │
│  [본문 3~4 문장]             │  ← Pretendard 400, 1rem, line-height 1.8
│  FE 개발 출신 → AI 실무     │     max-w-[640px], color-muted (강조어만 color-ink)
│  → 강의 → 웹 제작 →         │
│  AX 비전                    │
│                             │
│  ─────────────────────────  │
│  "기술은 결국 사람이 쓰는 것. │  ← font-kr-serif, 1.125rem, color-ink
│  막히지 않게 설계하는 것이    │     border-l-2 border-wave, pl-4 (인용 처리)
│  내 일입니다."               │
│                             │
└─────────────────────────────┘
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `SectionHeading` | 정적 | — |
| 본문 단락들 | scroll reveal. stagger 0.15s | — |
| 핵심 관점 인용구 (blockquote 역할) | border-l 빙청, scroll reveal | — |
| `SectionView` 래퍼 | — | `section_view { section: "story" }` |

**엣지 케이스**
- 텍스트 길이 증가 시 레이아웃 흐름 유지. max-w 제한으로 가독성 확보.

---

### S3 — 서비스 라우팅

**레이아웃 (모바일 — 1열)**

```
┌─────────────────────────────┐
│  "지금 어디쯤 계신가요."      │  ← SectionHeading
│                             │
│  ┌─────────────────────┐   │
│  │ AI 강의              │   │  ← ServiceCard
│  │ AI, 나도 쓸 수 있을까요│   │
│  │ [강의 살펴보기 →]     │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ 웹 제작              │   │
│  │ 브랜드에 맞는 페이지가  │   │
│  │ 필요하다면           │   │
│  │ [결 스튜디오 보기 →]  │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ AX (기업 AI 전환)    │   │  ← ServiceCard — 시그널 전용
│  │ 팀의 AI 전환까지     │   │
│  │ 함께 본다면         │   │
│  │ [이야기 나눠보기]    │   │  ← /ai#class-contact 라우팅 (v2)
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상) — 3열 그리드**

```
┌──────────────────────────────────────────────────┐
│  "지금 어디쯤 계신가요."                           │
│                                                  │
│  [AI 강의 카드]   [웹 제작 카드]   [AX 카드]       │
└──────────────────────────────────────────────────┘
```

**`ServiceCard` 컴포넌트 스펙**

```
배경: bg-bg/60 (설백 투명)
테두리: border-t border-ink/15
패딩: p-8 sm:p-10
hover: border-wave 전환 (duration 500ms, ease-water)
```

| 필드 | 타입 | 설명 |
|---|---|---|
| `tag` | string | 영문 레이블 (예: "AI Class") |
| `title` | string | 한국어 카드 제목 |
| `description` | string | 한 줄 설명 |
| `cta` | `{ label: string; href: string; scroll?: boolean }` | CTA 버튼. scroll=true이면 같은 페이지 내 smooth scroll. AX 카드는 scroll 없이 href="/ai#class-contact" |
| `variant` | `"primary" \| "signal"` | signal 카드는 AX처럼 패키지·가격 없는 시그널 전용 |

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `ServiceCard` (AI 강의) | idle / hover | `hub_to_ai_click` (카드 클릭 또는 CTA 클릭) |
| `ServiceCard` (웹 제작) | idle / hover | `hub_to_work_click` |
| `ServiceCard` (AX) | idle / hover | `hub_to_ai_click` (CTA 클릭) — `/ai#class-contact` 라우팅 (v2) |
| `SectionView` 래퍼 | — | `section_view { section: "services" }` |

**엣지 케이스**
- AX CTA 라우팅 (v2): `href="/ai#class-contact"`. 같은 탭 이동. JS 비활성 시에도 anchor hash로 정상 동작.
- AI 강의 카드·AX 카드 CTA는 동일하게 `hub_to_ai_click` 이벤트 발화. 분석에서 두 진입 경로를 같은 이벤트로 집계.
- JS 비활성 환경: 모든 링크 anchor 이동으로 fallback.

---

### S4 — SNS 링크 허브

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  "채널에서 만나요."           │  ← SectionHeading
│  bg-surface 섹션 배경        │
│                             │
│  ┌──────────────────────┐  │
│  │ [유튜브 아이콘]        │  │  ← SocialLinkRow
│  │ YouTube               │  │
│  │ AI 도구·개발 흐름 실습  │  │
│  └──────────────────────┘  │
│  ──────────────── (구분선)  │
│  [인스타그램 아이콘]         │
│  Instagram                  │
│  일상·작업 단편              │
│  ──────────────────         │
│  [스레드 아이콘]             │
│  Threads                    │
│  기술·제작 단상              │
│  ──────────────────         │
│  [숨고 아이콘 or 텍스트 뱃지] │
│  숨고                       │
│  AI 강의 프로필 직링크        │
│                             │
└─────────────────────────────┘
```

**데스크탑 — 2열 그리드 또는 단일 열 최대 너비 제한**

```
[YouTube 행]   [Instagram 행]
[Threads 행]   [숨고 행]
```

**`SocialLinkRow` 컴포넌트 스펙**

```
layout: flex items-center gap-4
icon: 20×20 SVG, color-muted
text:
  - platform명: font-en text-sm font-medium color-ink
  - 한 줄 맥락: font-kr text-sm color-muted
hover: color-deep 전환 (duration 300ms)
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `SocialLinkRow` × 4 | idle / hover / active | `hub_social_click { platform: "youtube" | "instagram" | "threads" | "soomgo" }` |
| `SectionView` 래퍼 | — | `section_view { section: "social" }` |

**엣지 케이스**
- URL이 placeholder `"#"` 상태 → 시각적으로 동일하게 표시하되 클릭 시 이동 없음. 개발 전까지 placeholder 구조 유지.
- 신규 채널 추가 시: `profile.ts` 또는 별도 `hub-config.ts`의 배열에 항목 추가만으로 렌더링 확장.

---

### S5 — 신뢰/실적

**레이아웃 (MVP — 익명 카피 버전)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "검증된 커리큘럼."           │  ← 또는 섹션 헤더 생략하고 카피 바로 노출
│                             │
│  bg-surface                 │
│                             │
│  [텍스트 블록]               │
│  업종이 제각각인 비개발       │
│  직장인들이 똑같이 막힌 지점을  │
│  검증한 커리큘럼.            │
│                             │
│  ─────────────────          │
│  [링크]                     │
│  포트폴리오 보기 →           │  ← gyeol.page/#work 링크. hub_outbound_click { target: "work" }
│                             │
└─────────────────────────────┘
```

> 후기 카드가 확보되면 이 영역을 텍스트 후기 카드 1~3개로 교체한다 (v1.1). MVP에서는 익명 카피 + 링크만.

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 익명 실적 카피 텍스트 | scroll reveal | — |
| "포트폴리오 보기 →" 링크 | idle / hover (color-deep) | `hub_outbound_click { target: "work" }` |
| `SectionView` 래퍼 | — | `section_view { section: "trust" }` |

**엣지 케이스**
- S5 섹션 생략 시 (후기 없고 카피도 미확정): 섹션 렌더링 자체를 조건부로 처리. S4 → S6 바로 연결.

---

### S6 — CTA / 가벼운 문의

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  "어디서 시작할지 모르겠다면, │  ← SectionHeading
│  먼저 이야기 나눠보세요."     │
│                             │
│  ┌─────────────────────┐   │
│  │ 이름 (text)          │   │  ← rounded-3xl border border-ink/15
│  ├─────────────────────┤   │     overflow-hidden
│  │ 이메일 (email)       │   │     각 행: border-b border-ink/15
│  ├─────────────────────┤   │     focus-within: border-wave
│  │ 어떤 부분이 궁금한가요│   │
│  │ (textarea, 4행)      │   │
│  ├─────────────────────┤   │
│  │ [이야기 나눠보기]    │   │  ← bg-wave, color-deep, hover bg-wave/90
│  └─────────────────────┘   │
│                             │
│  [허니팟 — aria-hidden]     │
└─────────────────────────────┘
```

성공 상태:

```
┌─────────────────────────────┐
│                             │
│  곧 이야기 나눠보겠습니다.    │  ← SuccessInline 컴포넌트
│                             │     fade-in, font-kr-serif, color-ink
│                             │     빙청 수평선 액센트 1개
└─────────────────────────────┘
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `HubContactForm` | idle / focused / submitting / success / error | — |
| 이름 필드 | idle / focused (빙청 테두리) / invalid | — |
| 이메일 필드 | idle / focused / invalid | — |
| textarea | idle / focused / invalid | — |
| 제출 버튼 | idle / hover / disabled (submitting 중) | `hub_inquiry_submit` (성공 시) |
| `SuccessInline` | 폼 성공 후 AnimatePresence로 교체 | — |
| `SectionView` 래퍼 | — | `section_view { section: "contact" }` |

**엣지 케이스**
- 제출 중 (submitting): 버튼 텍스트 "보내는 중…", opacity-60, pointer-events-none.
- 서버 오류: 폼 유지. "전송 중 문제가 있었어요. 다시 시도해주세요." 인라인 에러.
- 유효성 오류: 각 필드 하단 `text-xs text-[#B23A48]` 에러 메시지 (기존 ContactForm 패턴 동일).
- 빈 상태: 제출 버튼 클릭 시 Zod 에러 즉시 노출.
- 네트워크 오류: 동일하게 에러 메시지.

---

## 데이터 모델

### `profile.ts` 공유 확장

기존 `src/features/card/lib/profile.ts`의 `PROFILE` 상수에 SNS 링크 배열을 추가하거나, 허브 전용 `src/features/intro-hub/lib/hub-config.ts`를 분리해 import한다. **기존 `profile.ts` 직접 수정 여부는 열린 질문** (아래 참조). 아래는 추천 확장 구조.

| 엔티티 | 필드 | 타입 | 비고 |
|---|---|---|---|
| `PROFILE` (기존) | `name_kr`, `name_en`, `role_kr`, `role_en`, `bio_one_line`, `email`, `site`, `profile_image` 등 | 기존 그대로 | `/me`에서 import해 재사용 |
| `HUB_CONFIG` (신규) | `socialLinks` | `SocialLink[]` | SNS 링크 배열 |
| `SocialLink` | `platform` | `"youtube" \| "instagram" \| "threads" \| "soomgo"` | 이벤트 키와 일치 |
| | `label` | `string` | 표시 이름 (예: "YouTube") |
| | `href` | `string` | 실제 URL (placeholder `"#"` → 개발 전 수집) |
| | `description` | `string` | 한 줄 맥락 |
| | `icon` | `ReactNode` | SVG 아이콘 컴포넌트 |
| `ServiceCardData` (신규) | `tag` | `string` | 영문 레이블 |
| | `title` | `string` | 카드 제목 |
| | `description` | `string` | 한 줄 설명 |
| | `cta` | `{ label: string; href: string; scroll?: boolean }` | CTA 설정 |
| | `variant` | `"primary" \| "signal"` | signal = AX 카드 |

### 폼 스키마 — `hubContactSchema` (신규)

`src/features/intro-hub/lib/hub-contact-schema.ts`에 정의.

| 필드 | 타입 | 유효성 | 비고 |
|---|---|---|---|
| `name` | `string` | min(1), max(50) | 필수. "이름을 입력해주세요" |
| `email` | `string` | email(), min(1) | 필수 |
| `message` | `string` | min(5), max(800) | 필수. "어떤 부분이 궁금한가요" |
| `_trap` | `string` | max(0), optional | 허니팟. 채워지면 서버에서 거부 |

> 결 본사 `contactSchema`와 분리. 기존 스키마 수정 없음.

---

## 엣지 케이스 (페이지 전체)

- **빈 상태**: SNS URL이 placeholder `"#"`인 채로 배포될 경우 → 링크 클릭 시 이동 없음. `aria-disabled="true"` + 시각적 opacity 처리 권장.
- **프로필 사진 없음**: `profile-placeholder.svg` fallback. 이미지 로드 전 blur placeholder.
- **S5 생략**: 후기·신뢰 카피가 미확정인 경우 섹션 조건부 렌더링. `HUB_CONFIG.showTrustSection: boolean`으로 제어.
- **에러 상태 (폼)**: 인라인 에러. 페이지 이동 없음.
- **로딩 상태 (폼)**: 버튼 disabled + "보내는 중…" 텍스트.
- **JS 미지원**: 폼 제출 불가. `<noscript>` 영역에 `hi@gyeol.page` 이메일 링크 폴백.
- **이중 제출 방지**: submitting 상태에서 버튼 disabled.

---

## 반응형

| 브레이크포인트 | 레이아웃 변화 |
|---|---|
| 모바일 (기본, `< 640px`) | 전체 1열. 패딩 `px-6`. 사진 96×96. S3 카드 세로 스택. S4 링크 단열. |
| `sm (≥ 640px)` | 패딩 확장. 폰트 크기 clamp 반영. |
| `md (≥ 768px)` | S3 카드 3열 그리드 (`grid-cols-3 gap-6`). S4 링크 2열 가능. |
| `lg (≥ 1024px)` | max-w-6xl 컨테이너. 좌우 패딩 `px-[120px]`. |

---

## 접근성

- **키보드 흐름**: 헤더 → S1 → S2 → S3 카드(Tab/Enter) → S4 링크(Tab) → S5 링크 → S6 폼 필드(Tab) → 제출 버튼(Enter) → 성공 메시지. 논리적 DOM 순서와 일치.
- **색 대비 (WCAG AA)**: 먹(`#1A1A1A`) on 설백(`#FAFBFC`) = 19.5:1 (AAA 충족). 청람(`#1B3B5F`) on 설백 = 10.2:1. 안개(`#8B95A1`) on 설백 = 3.2:1 — 본문 텍스트로 사용 금지. 캡션·placeholder 전용. 에러 텍스트(`#B23A48`) on 설백 = 5.1:1 (AA 충족).
- **스크린리더 라벨**:
  - S1 사진: `alt="유승현 프로필 사진"`.
  - S3 카드 CTA: `aria-label="AI 강의 살펴보기"` 등 맥락 포함.
  - S4 SNS 링크: `aria-label="유튜브 채널 (새 창에서 열기)"` 패턴.
  - 폼 필드: 각각 `<label>` 연결 (`htmlFor` + `id`). placeholder는 label 대체 불가.
  - 허니팟: `aria-hidden="true"`, `tabIndex={-1}`.
  - 성공 메시지: `role="status"` + `aria-live="polite"` — 스크린리더에 자동 고지.
- **폼 에러**: `aria-invalid`, `aria-describedby`로 에러 메시지 연결.
- **`prefers-reduced-motion`**: `useReducedMotion()` 훅. true이면 모든 Framer Motion 진입 애니메이션을 즉시 표시.
- **포커스 링**: 기본 outline 제거 후 `focus-visible:ring-2 ring-wave` 패턴. 마우스 클릭 시 ring 없음, 키보드 탐색 시 표시.

---

## 분석 이벤트 (신규 추가 필요)

`src/lib/analytics.ts`의 `AnalyticsEvent` union에 추가.

| 이벤트명 | params 타입 |
|---|---|
| `hub_view` | `Record<string, never>` |
| `hub_to_ai_click` | `Record<string, never>` |
| `hub_to_work_click` | `Record<string, never>` |
| `hub_inquiry_submit` | `Record<string, never>` |
| `hub_social_click` | `{ platform: "youtube" \| "instagram" \| "threads" \| "soomgo" }` |
| `hub_outbound_click` | `{ target: "work" \| "card" \| string }` |

---

## 열린 질문

1. ~~**프로필 사진 재사용 vs 신규**~~ → **확정: `/card/profile.webp` 재사용.** 촬영 의존성 0, 즉시 진행. 향후 더 친근한 컷이 생기면 교체.

2. ~~**`/card` 뒷면 교차 링크 추가 여부**~~ → **확정: 추가 안 함.** `/card`는 온라인 명함 역할에 집중, 그대로 둔다. `CardBack.tsx` 수정 없음. (아래 교차 링크 표의 `/card → /me` 행은 미적용.)

3. **S1 Hero 레이아웃 데스크탑**: 프로필 사진-헤드라인 세로 배치 vs 가로 배치. 추천: **세로 배치** (모바일 일관성 + 헤드라인 임팩트 보존). — 디자인 기본값으로 채택, 개발 진행.

4. ~~**`profile.ts` 공유 방식**~~ → **확정: 별도 `hub-config.ts`.** card 모듈과 의존성 격리, `PROFILE` import만 공유.

5. **S5 섹션 노출 여부 (MVP 런칭 시점)**: 익명 카피만으로 신뢰를 전달하기에 충분한지, 아니면 MVP에서 완전 생략이 나은지. 추천: **익명 카피로 노출** (확정 — plan.md 결정과 정합).

6. **S2 헤더 문구**: "왜 이 일을 하는가."는 plan.md의 안. 최종 카피는 실제 스토리 내용 확정 후 결정.
