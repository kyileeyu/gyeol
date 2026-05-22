# AI 컨설팅·과외 랜딩 체크리스트 (v2)

> v2 재정의 반영. design.md는 v2 plan 기준으로 재작성 필요. 기존 v1 design.md 내용 중 S4(커리큘럼·트랙)는 폐기하고 AI 사다리로 교체.

---

## 디자인 단계

### 콘텐츠·카피 확정 (Shannon 확인 필요)
- [ ] **S1 Hero 헤드라인 최종 확정** — "목표에 맞게, 매번 새로 설계합니다" vs "원하는 걸 함께 만들어봅니다" 중 Shannon 선택 (plan.md 열린 질문 1번)
- [ ] S1 서브 카피 다듬기 (방향 확정: 입문~AX 스펙트럼 언급)
- [ ] S2 "누구를 위한가" 체크리스트 4항목 카피 확정 (v2에서 4개로 확장)
- [ ] S3 페인포인트→해결 카드 3개 카피 확정 (v1에서 이월 가능, 미세 조정)
- [ ] **S4 AI 사다리 5단계 카피 확정** — 각 단계 제목·한 줄 설명·예시 (신규)
- [ ] **S5 차별점 4종 카피 확정** — 숨고 소개글 기반, 결 톤으로 다듬기 (신규)
- [ ] S6 진행방식 카피 확정 (v1 S5에서 이월, 온/오프라인 옵션 명시 추가)
- [ ] S6 강사 소개 카피 확정 ("매일 직접 돌리면서 가르칩니다" 방향)
- [ ] S7 Contact 섹션 소제목·placeholder 카피 확정 (select 옵션 5개 라벨 확정 포함)
- [ ] 자동 응답 메일 카피 확정 (강의 문맥 버전)
- [ ] 카피 전체 "1인·혼자·솔로·프리랜서" 단어 검색 → 제거
- [ ] 가격·패키지 숫자 미노출 확인

### 컴포넌트·화면 명세 (v2 신규 포함)
- [ ] **7개 섹션** 모바일·데스크탑 레이아웃 스케치 (v1 6개에서 1개 추가)
- [ ] **AI 사다리 컴포넌트 설계** — 5단계 수직 스택 vs 가로 카드 방식 결정 (plan.md 열린 질문 4번)
- [ ] **차별점 섹션 밀도 결정** — 카드 grid vs 목록 vs 가로 카드 (plan.md 열린 질문 5번)
- [ ] S3 페인포인트 카드 컴포넌트 명세 (v1에서 이월)
- [ ] S7 폼 필드 5개 스타일 명세 (select 옵션 5개, v2 확장)
- [ ] OG 이미지 시안 (`1200×630`, v2 헤드라인 반영)

### design.md 재작성 범위 (v1 대비 변경점)
- [ ] S1 Hero 카피·레이아웃 교체
- [ ] S2 체크리스트 항목 4개로 확장
- [ ] S4 커리큘럼·트랙 → AI 사다리 전면 교체 (컴포넌트·레이아웃·이벤트 전부 재설계)
- [ ] S5 차별점 섹션 신규 추가
- [ ] S6 → S7로 번호 이동, select 옵션 변경 반영
- [ ] 데이터 모델: `classContactSchema` track enum 5개로 확장 명세 업데이트
- [ ] 분석 이벤트: `class_ladder_step_view` 신규 추가

### 결정 사항 확인 (디자인 착수 전 필수)
- [ ] **Hero 헤드라인 확정** (Shannon 결정 필요 — plan.md 열린 질문 1번)
- [ ] **AX 카드 목적지 확정** (`/me` 폼 유지 vs `/ai`로 라우팅 — plan.md 열린 질문 2번, Shannon 결정 필요)
- [ ] **기업 AX 폼 동선 확정** (같은 폼 + 옵션 vs 별도 동선 — plan.md 열린 질문 3번)
- [ ] AI 사다리 시각 표현 방식 결정 (plan.md 열린 질문 4번, designer 결정)
- [ ] 차별점 섹션 밀도 결정 (plan.md 열린 질문 5번, designer 결정)

---

## 개발 단계

### 인프라·라우트 설정
- [ ] `src/app/ai/page.tsx` 생성 (서버 컴포넌트, metadata export 포함)
- [ ] `src/features/class-landing/` 디렉터리 초기화 (FSD 패턴: `components/`, `lib/`, `index.ts`)
- [ ] `next.config.mjs`에 `ai.gyeol.page` → `/ai` rewrite 규칙 추가
- [ ] DNS: `ai.gyeol.page` CNAME 추가 (Vercel 배포 도메인 가리키도록)
- [ ] `src/app/sitemap.ts`에 `/ai` 항목 추가 (priority 0.7, changeFrequency: "monthly")

### 섹션 컴포넌트 개발
- [ ] `ClassHero.tsx` — 헤드라인·서브·CTA 버튼 (v2 카피 반영)
- [ ] `ClassTarget.tsx` — "누구를 위한가" 체크리스트 4항목 (v2 확장)
- [ ] `ClassPainPoints.tsx` — 페인포인트→해결 카드 3개 (v1 이월)
- [ ] **`ClassLadder.tsx`** — AI 사다리 5단계 컴포넌트 (신규, v1 ClassCurriculum 대체)
- [ ] **`ClassDifferentiators.tsx`** — 차별점 4종 섹션 (신규)
- [ ] `ClassHowItWorks.tsx` — 진행 방식·강사 소개 (v1 S5에서 이월, 온/오프라인 추가)
- [ ] `ClassContactForm.tsx` — 폼 컴포넌트 (select 옵션 5개로 확장)

### 정적 데이터
- [ ] `src/features/class-landing/lib/ladder.ts` — AI 사다리 5단계 데이터 정의 (신규)
- [ ] `src/features/class-landing/lib/pain-points.ts` — 페인포인트 데이터 (v1 curriculum.ts PainPoint 이관)
- [ ] `src/features/class-landing/lib/class-contact-schema.ts` — **`track` enum 5개로 확장** (업무 자동화 / AI 에이전트 설계 / MVP / 기업 AX / 아직 모르겠어요)

### API·메일
- [ ] `src/app/api/class-contact/route.ts` 작성 (강의 문의 전용 Route Handler)
- [ ] Zod 스키마: 5개 옵션 `track` enum 검증
- [ ] Honeypot 필드 추가 및 서버 측 봇 차단 로직
- [ ] Resend 자동 응답 메일 템플릿 작성 (강의 문맥)
- [ ] 테스트 폼 제출 → 강사 받은편지함 도착 확인
- [ ] 자동 응답 메일 스팸함 미분류 확인 (SPF/DKIM 기존 인증 유효성 재확인)

### 분석 이벤트
- [ ] `src/lib/analytics.ts` AnalyticsEvent union에 추가:
  - `class_cta_click`
  - `class_inquiry_submit` (성공 제출)
  - `class_inquiry_topic` (select 선택값 포함 — 단계별 수요 파악용)
  - **`class_ladder_step_view { step: number }`** (사다리 각 단계 뷰포트 진입 시 — 신규)
- [ ] `section_view` 이벤트 — 강의 페이지 섹션 ID 추가 (`ladder`, `differentiators` 포함)

### 메타데이터·SEO
- [ ] `src/app/ai/page.tsx` metadata export 작성:
  - title: "AI 컨설팅·과외 — 결 스튜디오"
  - description: 입문~AX 스펙트럼, 1:1 맞춤 설계 강조 1~2 문장
  - `alternates.canonical`: `https://gyeol.page/ai`
  - openGraph: v2 헤드라인 반영 OG 이미지
- [ ] OG 이미지 파일 추가 (`public/og/class.png`, 1200×630, v2 카피 반영)

### `/me` 연동 (분업 재조정)
- [ ] `/me` plan.md S3 AX 카드 목적지 수정 반영 여부 Shannon 확인 후 처리 (plan.md 열린 질문 2번)
- [ ] S6 강사 소개 → `/me` 링크 조건부 렌더링 (`NEXT_PUBLIC_ME_DEPLOYED` 환경변수 또는 상수)

### 빌드·QA
- [ ] `pnpm build` (또는 `next build`) — 에러 없이 통과
- [ ] lint 통과 (`pnpm lint`)
- [ ] 모바일 반응형 점검 (iPhone 13 / Galaxy S22 최소 확인)
- [ ] Lighthouse 모바일: Performance ≥ 85 / Accessibility ≥ 95 / SEO 100
- [ ] `ai.gyeol.page` 접속 → `/ai`로 정상 리다이렉트 확인
- [ ] `/ai` 경로 직접 접속 정상 렌더 확인
- [ ] AI 사다리 5단계 전부 모바일·데스크탑에서 렌더 확인
- [ ] 폼 select 옵션 5개 정상 노출 확인
- [ ] 폼 제출 전환 이벤트 GA4 DebugView 발화 확인
- [ ] 카피 "1인·혼자·솔로·프리랜서" 단어 최종 점검
- [ ] 가격 숫자 비노출 최종 점검
- [ ] AX 관련 패키지·단가 미노출 최종 점검

### dev-log 작성
- [ ] `docs/features/ai-class-landing/dev-log.md` 작성 (개발자가 구현 완료 후 작성)
