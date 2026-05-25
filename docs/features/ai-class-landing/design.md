# AI 컨설팅·과외 랜딩 (`/ai`) 디자인 — v2

> 공통 디자인 시스템(컬러 토큰 7종, 타이포그래피, 모션 원칙, 공유 컴포넌트, 교차 링크 규칙)은
> `docs/features/intro-hub/design.md` 상단 "공통 디자인 시스템" 섹션을 참조한다.
> 이 문서는 `/ai` 랜딩 고유 부분만 서술한다.

---

## v2 변경점 (v1 design.md 대비)

| 항목 | v1 | v2 |
|---|---|---|
| 페이지 제목 | "AI 강의 랜딩" | "AI 컨설팅·과외 랜딩" — 스펙트럼 확장 |
| S1 헤드라인 | "AI, 이제 나도 쓸 수 있다" | **"목표에 맞게, 매번 새로 설계합니다."** (확정) |
| S1 서브카피 | 비개발자·입문자 한정 뉘앙스 | "AI 컨설팅·과외 — 용어 입문부터 기업 AI 전환까지" |
| S2 대상 체크리스트 | 3항목 (입문자 중심) | 4항목 (입문·중급·자동화·기업 담당자 포함) |
| S4 섹션 | 커리큘럼·트랙 3개 카드 (닫힌 커리큘럼) | **AI 사다리 5단계** (가능성 스펙트럼. 수직 스택) |
| S4 헤더 | "무엇을 배우나요." | "어디까지 가고 싶으신가요." |
| S5 섹션 | 진행 방식 + 강사 소개 (차별점 분산) | **신설: 차별점 4종 명시 섹션** |
| S6 섹션 | 진행 방식 + 강사 소개 | (이전 S5 내용이 S6으로 밀림. 섹션 번호 재배치) |
| S7 섹션 | (없음) | 상담 신청 폼 (이전 S6이 S7으로 밀림) |
| 총 섹션 수 | 6개 | **7개** |
| 폼 select 옵션 | 4종 (영상 자동화 / 업무·데이터 자동화 / 디자인→코드 / 모르겠어요) | **5종** (업무 자동화 / AI 에이전트 설계 / 나만의 서비스(MVP) / 기업 AX / 모르겠어요) |
| AX 노출 | 없음 | AI 사다리 최상단에 포함. 가격 비노출 |
| 컴포넌트 | `ClassCurriculum` (3트랙) | `ClassCurriculum` 제거 → `ClassLadder` + `ClassDifferentiators` 신규 |
| 데이터 | `curriculum.ts` (트랙 enum 3종) | `ladder.ts` 신규. `classContactSchema` track enum 5종으로 확장 |
| 이벤트 | `class_cta_click` · `class_inquiry_submit` · `class_to_hub_click` | 위 3개 유지 + `class_ladder_step_view` · `class_inquiry_topic` 신규 추가 |

**컴포넌트 델타 요약**

| 변경 | 컴포넌트 |
|---|---|
| 제거 | `ClassS4Curriculum` (sections/S4Curriculum.tsx) |
| 신규 | `ClassS4Ladder` (sections/S4Ladder.tsx) — AI 사다리 수직 스택 |
| 신규 | `ClassS5Differentiators` (sections/S5Differentiators.tsx) — 차별점 4종 |
| 번호 변경 | `ClassS5HowItWorks` → `ClassS6HowItWorks` |
| 번호 변경 | `ClassS6Contact` → `ClassS7Contact` |
| 신규 | `LadderStep` (components/LadderStep.tsx) — 사다리 단계 단위 컴포넌트 |
| 신규 | `src/features/class-landing/lib/ladder.ts` — 사다리 정적 데이터 |
| 수정 | `class-contact-schema.ts` — track enum 5종으로 확장 |
| 수정 | `index.ts` barrel — 신규/변경 컴포넌트 반영 |

---

## 사용자 흐름

```
[유입 채널]
  ├── ai.gyeol.page (서브도메인 리라이트 → /ai)
  ├── 숨고 AI 강의·컨설팅 프로필 직링크
  ├── /me S3 "AI 강의" 카드 클릭
  ├── /me S3 "AX" 카드 CTA 클릭 → /ai#class-contact (v2 변경)
  └── 스레드·인스타 강의 콘텐츠 링크
              │
              ▼
      S1 Hero ("목표에 맞게, 매번 새로 설계합니다.")
              │
     ┌────────┴──────────┐
     ↓                   ↓
  CTA 클릭            스크롤 계속
  (S7으로 smooth)        │
                     S2 대상 체크리스트 (4항목)
                         │
                     S3 페인포인트→해결 카드
                         │
                     S4 AI 사다리 (5단계 수직 스택)
                         │
                     S5 차별점 4종
                         │
                     S6 진행 방식 + 강사 소개
                         │
                     S7 상담 신청 폼
                         │
                    [성공] 인라인 성공 메시지
                    [실패] 인라인 에러 → 재시도
```

**분기 케이스**
- Hero CTA "상담 신청하기" → 페이지 내 S7 Contact으로 smooth scroll (`#class-contact`).
- `/me` S3 AX 카드에서 `/ai#class-contact`로 직접 도착한 경우 → 페이지 상단 렌더링 후 자동 스크롤 (hash anchor 기본 동작).
- S6 "강사 소개 →" 링크 → `/me` 이동 (같은 탭. `/me` 배포 전이면 링크 숨김 처리).
- S7 폼 제출 성공 → 페이지 전환 없음. 폼 영역 → `SuccessInline` 교체.
- S7 폼 제출 실패 → 폼 유지. 인라인 에러 메시지.

---

## 화면

### S1 — Hero

**레이아웃 (모바일 우선)**

```
┌─────────────────────────────┐
│  [결 헤더 — 공유]            │
├─────────────────────────────┤
│                             │
│  목표에 맞게,               │  ← h1. font-kr-serif
│  매번 새로                  │     clamp(2.25rem, 6vw, 4.25rem)
│  설계합니다.                 │     tracking-[-0.04em], color-ink
│                             │
│  AI 컨설팅·과외 —           │  ← font-kr, 0.9375rem~1rem
│  용어 입문부터 기업 AI       │     color-muted, leading-[1.8]
│  전환까지.                  │     max-w-[480px]
│  직무와 목표에 맞춰          │
│  매번 새로 설계합니다.        │
│                             │
│  [상담 신청하기]             │  ← btn-deep 패턴 (청람 배경)
│                             │     py-4 px-8, font-medium
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상)**

```
┌──────────────────────────────────────────────────┐
│  [결 헤더]                                        │
│                                                  │
│  목표에 맞게, 매번 새로 설계합니다.                  │  ← 좌측 정렬
│                                                  │
│  AI 컨설팅·과외 — 용어 입문부터 기업 AI 전환까지.   │
│  직무와 목표에 맞춰 매번 새로 설계합니다.            │
│                                                  │
│  [상담 신청하기]                                   │
└──────────────────────────────────────────────────┘
```

> 배경: 설백 단색. Hero 물결 셰이더 미사용.

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| h1 헤드라인 | fade-in (진입 1회, stagger 0.28s) | — |
| 서브텍스트 | fade-in stagger | — |
| CTA 버튼 "상담 신청하기" | idle / hover (bg 살짝 어둡게) / focus-visible | `class_cta_click` |
| `SectionView` 래퍼 | — | `section_view { section: "hero" }` |

**엣지 케이스**
- `prefers-reduced-motion` → 진입 애니메이션 전체 생략. 즉시 표시.
- CTA 클릭 시 JS 비활성 → anchor `#class-contact`로 이동 (smooth 없이).
- hash anchor(`/ai#class-contact`)로 직접 진입 → 브라우저가 섹션으로 자동 스크롤. Hero 애니메이션은 정상 실행.

---

### S2 — 누구를 위한가

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  bg-surface 섹션             │
│                             │
│  [SectionHeading]           │
│  "이런 분들께 맞습니다."      │
│                             │
│  ✓ AI 도구를 쓰고 싶은데,    │  ← 체크 아이콘 (빙청 색, 16×16 SVG)
│    환경 세팅·용어에서         │     font-kr, 1rem, color-ink
│    막혔어요.                  │     leading-[1.7]
│                             │
│  ✓ 업무 자동화는 해봤는데,   │
│    더 깊은 에이전트·파이프라인 │
│    으로 가고 싶어요.          │
│                             │
│  ✓ 아이디어가 있는데 작동하는  │
│    서비스로 만드는 방법을     │
│    모르겠어요.                │
│                             │
│  ✓ 팀이나 회사 차원에서 AI   │
│    도입 방향을 잡고 싶어요.   │
│                             │
│  ─────────────────          │
│  이 중 하나라도 해당한다면,   │  ← font-kr-serif italic, color-muted
│  함께 설계해볼 수 있습니다.   │     border-l-2 border-wave, pl-4
│                             │
└─────────────────────────────┘
```

**데스크탑 — max-w-2xl 좌측 정렬 유지**

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 체크리스트 항목 × 4 | scroll reveal stagger 0.15s | — |
| 결론 문구 | scroll reveal (체크리스트 이후) | — |
| `SectionView` 래퍼 | — | `section_view { section: "audience" }` |

---

### S3 — 왜 막히나, 어떻게 푸나

**레이아웃 (모바일 — 1열)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "막히는 이유가 있습니다."    │
│                             │
│  ┌─────────────────────┐   │  ← 카드. bg-surface p-8
│  │ [First Wall]         │   │     border-t border-ink/15
│  │ 환경 세팅이           │   │     hover: border-wave (500ms)
│  │ 첫 번째 벽            │   │
│  │ ──────────────────   │   │
│  │ Mac·Windows 맞춤     │   │
│  │ 세팅 가이드로 1회 완파 │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ [Language Barrier]   │   │
│  │ 용어를 모르면          │   │
│  │ 질문도 못 한다         │   │
│  │ ──────────────────   │   │
│  │ 용어집 핸드아웃 +     │   │
│  │ 첫 회차에서 정리      │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ [Prompt Loop]        │   │
│  │ 프롬프트를 어떻게     │   │
│  │ 써야 할지 모른다       │   │
│  │ ──────────────────   │   │
│  │ 대화 루프 패턴을       │   │
│  │ 몸에 익힐 때까지 함께  │   │
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상) — 3열 그리드**

```
[환경 세팅 카드] [용어 카드] [프롬프트 카드]
```

**카드 내부 레이아웃**
```
[페인포인트 레이블 — font-en italic text-xs tracking-[0.25em] color-muted uppercase]
[페인포인트 제목 — font-kr-serif text-xl color-ink]
[구분선 — h-px bg-wave/40 my-6]
[해결책 — font-kr text-sm color-muted leading-[1.7]]
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 페인포인트 카드 × 3 | idle / hover (border-wave 500ms) | — |
| `SectionView` 래퍼 | — | `section_view { section: "painpoints" }` |

---

### S4 — AI 사다리 (v1 커리큘럼 섹션 전면 교체)

**섹션 헤더**: "어디까지 가고 싶으신가요."
**서브**: "지금 계신 곳에서 시작합니다. 무엇을 만들고 싶은지 이야기해주시면, 그것부터 함께 설계합니다."

> `ClassLadder` 컴포넌트 신규 작성. `ClassCurriculum` 컴포넌트 제거.

**시각 표현: 수직 스택 (모바일 우선. 아래로 갈수록 깊어짐)**

각 단계는 `LadderStep` 단위 컴포넌트. 번호·제목·한 줄 설명·예시 텍스트로 구성.
단계 5(AX)는 `variant="signal"` 처리 — 가격·패키지 없이 "상담으로 시작합니다" 텍스트만.

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "어디까지 가고 싶으신가요."  │
│  bg-surface                 │
│                             │
│  ┌─────────────────────┐   │  ← LadderStep. p-6 bg-bg
│  │ 01                   │   │     border-l-2 border-wave/40
│  │ 입문 과외             │   │     hover: border-wave (300ms)
│  │ 용어·환경 세팅·        │   │     왼쪽 연결선으로 "층" 시각화
│  │ 프롬프트법            │   │
│  │ 코드 한 줄 안 써도    │   │  ← text-xs color-muted
│  │ 됩니다.              │   │
│  └─────────────────────┘   │
│  │ (세로 연결선 8px)         │  ← 단계 사이 연결선. w-px h-8 bg-shimmer
│  │                          │     margin-left 맞춤 (border-l 위치와 정렬)
│  ┌─────────────────────┐   │
│  │ 02                   │   │
│  │ 업무 자동화           │   │
│  │ 문서·PPT·데이터·리서치 │   │
│  │ 반복 업무를 AI가       │   │
│  │ 대신합니다.           │   │
│  └─────────────────────┘   │
│  │                          │
│  ┌─────────────────────┐   │
│  │ 03                   │   │
│  │ AI 에이전트 설계       │   │
│  │ 내 일을 대신하는 팀.   │   │
│  │ 스킬과 서브에이전트로  │   │
│  │ 파이프라인 설계.       │   │
│  └─────────────────────┘   │
│  │                          │
│  ┌─────────────────────┐   │
│  │ 04                   │   │
│  │ 나만의 서비스 (MVP)   │   │
│  │ 아이디어를 작동하는   │   │
│  │ 웹·앱으로.            │   │
│  │ 코드 없이도 출시까지. │   │
│  └─────────────────────┘   │
│  │                          │
│  ┌─────────────────────┐   │  ← variant="signal"
│  │ 05                   │   │     border-l-2 border-shimmer
│  │ 기업 AI 전환 (AX)    │   │     bg-surface (구분)
│  │ 팀·조직 단위 AI 도입  │   │
│  │ 방향 설계.            │   │
│  │                      │   │
│  │ 상담으로 시작합니다.  │   │  ← text-xs color-muted. 가격·패키지 없음
│  └─────────────────────┘   │
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상)**

수직 스택 유지. 최대 너비 `max-w-xl` 좌측 또는 중앙 정렬.
단계 번호를 좌측에 고정하고 내용을 오른쪽에 배치하는 "타임라인 패턴"도 가능 (개발자 선택).

**`LadderStep` 컴포넌트 스펙**

```
props:
  step: number (1~5)
  title: string
  description: string
  examples: string[] (예시 1~2줄. roadmap.md 트랙 내용 흡수)
  variant?: "default" | "signal"

레이아웃:
  border-l-2 border-wave/40 (default) | border-shimmer (signal)
  pl-6 py-5
  단계 번호: font-en text-xs tracking-[0.25em] color-muted
  제목: font-kr-serif text-xl color-ink mt-1
  설명: font-kr text-sm color-muted leading-[1.7] mt-2
  examples: font-kr text-xs color-muted italic mt-2 (리스트 없이 자연어)
  signal 하단: "상담으로 시작합니다." font-kr text-xs color-muted mt-3
```

**단계 사이 연결선**
```
w-px h-8 bg-shimmer
margin-left: border-l 위치와 정렬 (px-6 기준 좌측 -1px)
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `LadderStep` × 5 | idle / hover (border-wave 진해짐, 300ms) | `class_ladder_step_view { step: 1~5 }` — IntersectionObserver, once |
| 연결선 × 4 | 정적 | — |
| `SectionView` 래퍼 | — | `section_view { section: "ladder" }` |

**엣지 케이스**
- AX 단계(5)는 가격·패키지 절대 표시 안 함. "상담으로 시작합니다." 텍스트만.
- "이 5단계를 모두 해야 한다"는 뉘앙스 방지 — 헤더 서브카피에서 "지금 계신 곳에서 시작합니다"로 명시.
- 단계 클릭 시 특별한 인터랙션 없음 (드릴다운 없음. 상담 CTA로만 연결).

---

### S5 — 차별점 (신규 섹션)

**섹션 헤더**: "다른 강의와 무엇이 다른가요."

> v1에 없던 신규 섹션. `ClassS5Differentiators` 컴포넌트 신규 작성.
> 섹션이 7개로 늘었으므로 **간결하게** 처리. 그리드 카드 대신 **체크리스트형 목록**을 기본으로 한다.

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "다른 강의와 무엇이         │
│  다른가요."                  │
│                             │
│  ◆ 1:1 맞춤 설계            │  ← 항목. 아이콘 없이 색 점(◆ 빙청) + 텍스트
│    직무·목표에 맞춰 매번      │     제목: font-kr-serif text-base color-ink
│    새로 설계합니다.           │     설명: font-kr text-sm color-muted mt-1
│    저장된 데이터가 한계가     │
│    아닙니다.                 │
│                             │
│  ◆ 실제로 돌아가는 산출물    │
│    강의용 예제가 아닙니다.    │
│    수업 끝에 실제로 쓸 수    │
│    있는 결과물이 나옵니다.   │
│                             │
│  ◆ 용어부터 차근차근         │
│    코드를 몰라도 됩니다.      │
│    클로드와 대화하는 법부터   │
│    함께합니다.               │
│                             │
│  ◆ 전용 복습자료 PDF         │
│    그날 막힌 지점을 정리한    │
│    자료를 수업 후 보내드립니다 │
│                             │
│  ─────────────────          │
│  1:1 또는 그룹 · 온라인(화상) │  ← font-kr text-sm color-muted
│  또는 오프라인(대면) 선택      │     수평선 위 한 줄 보조 정보
│                             │
└─────────────────────────────┘
```

**데스크탑 (md 이상)**

2열 그리드(항목 4개 → 2×2) 또는 단열 유지. **단열 권장** (설명 텍스트가 길어 2열 시 밀도 과함).

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 차별점 항목 × 4 | scroll reveal stagger 0.15s | — |
| 형식 보조 텍스트 (1:1/그룹·온/오프) | scroll reveal (마지막) | — |
| `SectionView` 래퍼 | — | `section_view { section: "differentiators" }` |

---

### S6 — 진행 방식 + 강사 소개

> v1의 S5가 S6으로 번호 이동. 내용 골격 동일. 강사 소개 카피 수정.

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  [SectionHeading]           │
│  "어떻게 진행되나요."         │
│                             │
│  [진행 방식 항목]            │
│  ◦ 1:1 또는 소그룹           │  ← 아이콘(18×18 SVG, color-wave) + font-kr text-sm
│  ◦ 온라인(화상) 또는          │
│    오프라인(서울 카페·코워킹) │
│                             │
│  [체험 흐름 스텝 인디케이터]  │
│  [체험 1시간] → [방향 결정] → [시작] │  ← 모바일 세로. 데스크탑 가로
│                             │     번호 원(border-wave) + 라벨
│                             │     연결선 bg-shimmer
│  가격은 상담 시 안내드립니다.  │  ← font-kr text-sm color-muted
│                             │
│  ─────────────────          │
│  [강사 소개 한 줄]           │
│  매일 직접 돌리면서 가르칩니다 │  ← font-kr text-sm color-muted
│                             │
│  [강사 소개 →]              │  ← /me 링크. color-deep. class_to_hub_click
│                             │     /me 미배포 시: 링크 숨김 (조건부 렌더링)
│                             │
└─────────────────────────────┘
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| 진행 방식 항목들 | scroll reveal stagger 0.15s | — |
| 체험 흐름 스텝 인디케이터 | 정적 (scroll reveal) | — |
| "강사 소개 →" 링크 | idle / hover. `/me` 미배포 시 `hidden` | `class_to_hub_click` |
| `SectionView` 래퍼 | — | `section_view { section: "how" }` |

**엣지 케이스**
- `/me` 미배포 시: 강사 소개 링크 조건부 숨김. `NEXT_PUBLIC_ME_DEPLOYED` 환경변수 또는 상수 플래그로 제어.
- 가격 노출 금지: 금액, 회당 단가, 코스 단가 어디에도 표시하지 않음.

---

### S7 — Contact / 상담 신청

> v1의 S6이 S7으로 번호 이동. `id="class-contact"` 유지. select 옵션 5종으로 확장.

**레이아웃 (모바일)**

```
┌─────────────────────────────┐
│  id="class-contact"         │
│  [SectionHeading]           │
│  "체험 세션으로 먼저         │
│  만나봅니다."                │
│                             │
│  ┌─────────────────────┐   │
│  │ 이름 (text)          │   │  ← rounded-3xl border border-ink/15
│  ├─────────────────────┤   │     overflow-hidden (기존 ContactForm 패턴)
│  │ 이메일 (email)       │   │     각 행: border-b border-ink/15
│  ├─────────────────────┤   │     focus-within: border-wave
│  │ 관심 주제 (select)   │   │  ← v2 변경: 옵션 5종
│  │   ▾ 선택해주세요     │   │     업무 자동화 (문서·데이터·반복 업무)
│  │                     │   │     AI 에이전트 설계
│  │                     │   │     나만의 서비스 만들기 (MVP)
│  │                     │   │     기업 AI 전환 (AX)
│  │                     │   │     아직 모르겠어요
│  ├─────────────────────┤   │
│  │ 만들고 싶은 것 또는   │   │
│  │ 막히는 지점 (textarea │   │
│  │  4행)                │   │
│  ├─────────────────────┤   │
│  │ [상담 신청하기]      │   │  ← bg-deep, hover bg-deep/90
│  └─────────────────────┘   │
│                             │
│  [허니팟 — aria-hidden]     │
└─────────────────────────────┘
```

성공 상태:

```
┌─────────────────────────────┐
│                             │
│  곧 연락드리겠습니다.         │  ← SuccessInline (intro-hub에서 import)
│                             │     role="status" aria-live="polite"
└─────────────────────────────┘
```

| 컴포넌트 | 상태 | 이벤트 |
|---|---|---|
| `ClassContactForm` | idle / focused / submitting / success / error | — |
| 이름 필드 | idle / focused (빙청 테두리) / invalid | — |
| 이메일 필드 | idle / focused / invalid | — |
| 관심 주제 select | idle / focused / invalid. 미선택 시 color-muted | `class_inquiry_topic { topic: string }` — 선택 시 발화 |
| textarea | idle / focused / invalid | — |
| 제출 버튼 "상담 신청하기" | idle / hover / disabled (submitting) | `class_inquiry_submit` (성공 시) |
| `SuccessInline` | AnimatePresence로 교체 | — |
| `SectionView` 래퍼 | — | `section_view { section: "contact" }` |

**엣지 케이스**
- submitting: 버튼 "보내는 중…", disabled, opacity-60.
- 서버 오류: 폼 유지. "전송 중 문제가 있었어요. 다시 시도해주세요." 인라인.
- select 미선택 제출: "관심 주제를 선택해주세요" Zod 에러.
- 이중 제출 방지: submitting 상태에서 버튼 disabled.
- JS 비활성: `<noscript>` 내 `hi@gyeol.page` 이메일 링크 폴백.

---

## 데이터 모델

### 폼 스키마 — `classContactSchema` (v2 수정)

`src/features/class-landing/lib/class-contact-schema.ts` 수정. track enum 5종으로 확장.

| 필드 | 타입 | 유효성 | 비고 |
|---|---|---|---|
| `name` | `string` | min(1), max(50) | 필수. "이름을 입력해주세요" |
| `email` | `string` | email(), min(1) | 필수 |
| `track` | enum (5종) | 아래 참조 | 필수. "관심 주제를 선택해주세요" |
| `message` | `string` | min(5), max(800) | 필수. "만들고 싶은 것 또는 막히는 지점" |
| `_trap` | `string` | max(0), optional | 허니팟 |

**`track` enum 5종 (v1 4종에서 변경)**

| v1 옵션 | v2 옵션 |
|---|---|
| "영상 자동화" | ~~삭제~~ |
| "업무·데이터 자동화" | "업무 자동화 (문서·데이터·반복 업무)" |
| "디자인→코드" | ~~삭제~~ |
| "아직 모르겠어요" | "아직 모르겠어요" (유지) |
| (신규) | "AI 에이전트 설계" |
| (신규) | "나만의 서비스 만들기 (MVP)" |
| (신규) | "기업 AI 전환 (AX)" |

### AI 사다리 정적 데이터 — `ladder.ts` (신규)

`src/features/class-landing/lib/ladder.ts` 신규 작성. `curriculum.ts`는 `PAIN_POINTS` 데이터를 유지하되 `CURRICULUM_TRACKS`·`COMMON_BASE`는 삭제 또는 deprecated 처리.

| 엔티티 | 필드 | 타입 | 비고 |
|---|---|---|---|
| `LadderStep` | `step` | `number` (1~5) | 단계 번호 |
| | `title` | `string` | 단계 제목 (예: "입문 과외") |
| | `description` | `string` | 한 줄 설명 |
| | `examples` | `string[]` | 예시 1~2줄. roadmap.md 트랙 내용 흡수 |
| | `variant` | `"default" \| "signal"` | signal = AX(5단계). 가격 비노출 |

### 차별점 정적 데이터 — `differentiators.ts` (신규 또는 inline)

`src/features/class-landing/lib/differentiators.ts` 신규 작성 또는 `ClassS5Differentiators` 컴포넌트 안에 inline 상수로 정의.

| 엔티티 | 필드 | 타입 | 비고 |
|---|---|---|---|
| `Differentiator` | `title` | `string` | 차별점 제목 |
| | `description` | `string` | 1~2줄 설명 |

### 분석 이벤트 — `analytics.ts` 업데이트

`src/lib/analytics.ts`의 `AnalyticsEvent` union에 추가. v1 이벤트 유지.

| 이벤트명 | params 타입 | 비고 |
|---|---|---|
| `class_cta_click` | `Record<string, never>` | v1에서 이월 |
| `class_inquiry_submit` | `Record<string, never>` | v1에서 이월 |
| `class_to_hub_click` | `Record<string, never>` | v1에서 이월 |
| `class_ladder_step_view` | `{ step: number }` | 신규. 사다리 각 단계 IntersectionObserver |
| `class_inquiry_topic` | `{ topic: string }` | 신규. select 선택 시 발화 (select onChange) |

---

## 모션·인터랙션 명세

공통 디자인 시스템(intro-hub design.md) 모션 원칙을 따른다.

| 요소 | 모션 | 트리거 | 비고 |
|---|---|---|---|
| S1 헤드라인 | `opacity: 0, y: 36` → `opacity: 1, y: 0`, 1.4s, stagger 0.28s | 페이지 마운트 | 기존 Hero 패턴 동일 |
| S2 체크리스트 항목 × 4 | `opacity: 0, y: 20` → 1.0s, stagger 0.15s | whileInView, amount 0.2 | once: true |
| S3 페인포인트 카드 × 3 | S2와 동일 | whileInView | once: true |
| S4 LadderStep × 5 | `opacity: 0, y: 20` → 1.0s, stagger 0.12s | whileInView | once: true. 위→아래 순서로 reveal |
| S4 연결선 × 4 | `scaleY: 0` → `scaleY: 1`, 0.4s, 이전 LadderStep reveal 후 | 각 LadderStep reveal 연계 | transform-origin: top |
| S5 차별점 항목 × 4 | S2와 동일 | whileInView | once: true |
| S6 진행 방식 행 | S2와 동일 | whileInView | once: true |
| CTA 버튼 hover | bg-color 전환 300ms ease-water | hover | bounce 없음 |
| 폼 필드 focus | border-color → `--color-wave` 300ms | focus-within | 기존 ContactForm 패턴 동일 |
| 성공 메시지 전환 | 폼 `opacity: 0` (0.4s) → SuccessInline `opacity: 1` (0.4s) | 제출 성공 | AnimatePresence |
| `prefers-reduced-motion` | 모든 모션 즉시 표시 | 시스템 설정 | `useReducedMotion()` |

---

## 반응형

| 브레이크포인트 | 레이아웃 변화 |
|---|---|
| 모바일 (기본, `< 640px`) | 전체 1열. 패딩 `px-6`. S3 카드 세로 스택. S4 사다리 수직 스택 (기본). S6 스텝 인디케이터 세로. |
| `sm (≥ 640px)` | 패딩·폰트 clamp 반영. |
| `md (≥ 768px)` | S3 카드 3열. S4 사다리 수직 스택 유지 (max-w-xl 제한). S5 차별점 단열 유지. S6 스텝 인디케이터 가로. |
| `lg (≥ 1024px)` | max-w-6xl 컨테이너. 좌우 패딩 `px-[120px]`. |

---

## 접근성

- **키보드 흐름**: 헤더 → S1 CTA(Tab/Enter → S7 scroll) → S2~S6 정적 콘텐츠 → S7 폼(Tab 이동) → 제출 버튼(Enter) → 성공 메시지.
- **색 대비 (WCAG AA)**: 공통 디자인 시스템 참조. 안개 색은 캡션·placeholder 전용. 에러 `#B23A48` on 설백 = 5.1:1 (AA 충족).
- **스크린리더 라벨**:
  - S1 CTA: `aria-label="상담 신청 폼으로 이동"` (smooth scroll 맥락 명시).
  - S2 체크 아이콘: `aria-hidden="true"` (텍스트가 의미를 담음).
  - S4 LadderStep: `<article>` 또는 `<li>` + `aria-label="N단계: 단계명"` 구조.
  - S4 AX 단계: "상담으로 시작합니다" 텍스트는 스크린리더에 그대로 노출. 추가 aria 불필요.
  - S5 차별점 항목: `<ul>` + `<li>` 구조. 제목은 `<strong>` 또는 시각 강조.
  - S6 강사 링크: `aria-label="강사 소개 페이지로 이동"`.
  - S7 select: `<label htmlFor>` 연결. placeholder option은 `value="" disabled hidden`.
  - S7 폼 에러: `aria-invalid`, `aria-describedby`.
  - S7 성공 메시지: `role="status"` + `aria-live="polite"`.
  - 허니팟: `aria-hidden="true"`, `tabIndex={-1}`.
- **`prefers-reduced-motion`**: `useReducedMotion()` 훅. true이면 initial variant 즉시 "show". S4 연결선 scaleY 모션도 생략.
- **포커스 링**: `focus-visible:ring-2 ring-wave`. 마우스 사용 시 ring 없음.
- **사다리 색 대비**: 빙청(`#7AC0D4`) border on 설백 배경 = 장식선이므로 콘텐츠 의존도 없음. 텍스트 대비는 먹/안개 기준 준수.

---

## 열린 질문

1. **`curriculum.ts` 처리 방식**: `PAIN_POINTS` 데이터는 S3에서 계속 쓰므로 파일을 유지하고 `CURRICULUM_TRACKS`·`COMMON_BASE`만 삭제할지, `pain-points.ts`로 분리 후 `curriculum.ts` 전체 삭제할지. **추천: `pain-points.ts`로 분리 + `curriculum.ts` 삭제** (파일명이 v2 의도와 불일치). developer 결정.

2. **`LadderStep` 연결선 모션 정밀도**: S4 연결선 `scaleY` 모션은 이전 LadderStep이 완전히 reveal된 후 시작해야 자연스럽다. Framer Motion의 `onAnimationComplete` 콜백 또는 stagger delay 수동 계산 중 어느 쪽이 구현 난도가 낮은지. **추천: stagger delay 수동 계산** (콜백은 state 관리 복잡도 증가).

3. **`class_inquiry_topic` 이벤트 시점**: select onChange 시점(미제출 포함)에서 발화할지, 폼 제출 성공 시 track 값을 `class_inquiry_submit` params에 포함할지. **추천: 제출 성공 시 `class_inquiry_submit { topic: string }` 파라미터로 통합** (onChange 발화는 노이즈가 될 수 있음). analytics.ts 설계 시 반영.
