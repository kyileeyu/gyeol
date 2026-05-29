## 2026-05-22 21:10 — /ai v2 재작업 (섹션 7개 + /me AX 링크 정합)

### 변경
- `src/features/class-landing/lib/class-contact-schema.ts` — track enum 4종→5종 교체 (영상 자동화·디자인→코드 제거, AI 에이전트·나만의 서비스MVP·기업AX 추가). errorMap 메시지도 "관심 트랙" → "관심 주제"로 정합.
- `src/features/class-landing/lib/curriculum.ts` — 삭제. PAIN_POINTS는 `pain-points.ts`로 분리 이전.
- `src/features/class-landing/lib/pain-points.ts` — 신규 분리 (PAIN_POINTS만 포함)
- `src/features/class-landing/lib/ladder.ts` — 신규. AI 사다리 5단계 정적 데이터 (LADDER_STEPS + LadderStepData 인터페이스)
- `src/features/class-landing/sections/S4Curriculum.tsx` — 삭제
- `src/features/class-landing/sections/S4Ladder.tsx` — 신규. AI 사다리 수직 스택 + stagger delay 연결선 모션
- `src/features/class-landing/sections/S5Differentiators.tsx` — 신규. 차별점 4종 + 형식 보조 항목 (체크리스트형 목록)
- `src/features/class-landing/sections/S5HowItWorks.tsx` — 삭제 → `S6HowItWorks.tsx`로 이동 + export명 ClassS6HowItWorks 변경
- `src/features/class-landing/sections/S6Contact.tsx` — 삭제 → `S7Contact.tsx`로 이동 + export명 ClassS7Contact 변경
- `src/features/class-landing/components/LadderStep.tsx` — 신규. LadderStep 단위 컴포넌트 (IntersectionObserver class_ladder_step_view 발화)
- `src/features/class-landing/components/ClassContactForm.tsx` — select placeholder "관심 주제" 갱신, textarea placeholder 갱신, 제출 성공 시 class_inquiry_topic 이벤트 발화 추가
- `src/features/class-landing/sections/S1Hero.tsx` — 헤드라인 "목표에 맞게, 매번 새로 설계합니다." + 서브카피 "AI 컨설팅·과외" 교체
- `src/features/class-landing/index.ts` — barrel 전체 갱신 (7섹션)
- `src/lib/analytics.ts` — class_ladder_step_view / class_inquiry_topic union 추가
- `src/app/api/class-contact/route.ts` — 이메일 내 "트랙" → "관심 주제" 텍스트 정합 (enum 자체는 스키마 파싱으로 자동 반영)
- `src/app/ai/page.tsx` — 7섹션 import 갱신, metadata title·description·alt v2 반영
- `src/features/intro-hub/lib/hub-config.ts` — AX 카드 href `#contact` scroll → `/ai#class-contact` 라우팅 변경 (scroll 플래그 제거)
- `src/features/intro-hub/sections/S3Services.tsx` — AX 카드에도 hub_to_ai_click 이벤트 핸들러 추가 (design.md 교차 링크 규칙)

### 결정
- curriculum.ts 전체 삭제 후 pain-points.ts 분리 채택 (추천 채택). 파일명이 v2 의도와 불일치 제거.
- stagger delay 수동 계산 방식 채택 (추천 채택). 연결선 scaleY 모션을 itemVariants와 동일 containerVariants 안에서 처리해 상태 관리 복잡도 없이 구현.
- class_inquiry_topic 이벤트 → 제출 성공 시 발화 (추천 채택). onChange 발화는 분석 노이즈 가능성. 폼 submit handler 내 setStatus("success") 직후 발화.
- AX 카드 CTA scroll 플래그 제거 — ServiceCard의 cta.scroll 분기가 `/ai#class-contact` 절대 경로와 충돌하지 않도록. Next.js Link가 hash anchor 처리.

### 검증
- 빌드 (`npm run build`): PASS — /ai, /me 라우트 모두 정적 생성. 타입에러 0건, lint 경고 CardFront.tsx img 1건(기존 비변경분).
- 패스 (a) 정합성+품질: PASS — 9개 항목 전부 반영 확인. 구 curriculum import 잔존 없음. 불가촉 파일(/api/contact, /card, profile.ts) 변경 없음.
- 패스 (b) 보안+데이터: PASS — 시크릿 하드코딩 없음, escape() 유지, Zod 서버검증 새 enum과 일치, 허니팟 유지.

### 후속 (출시 전 잔여 항목)
- `public/og/class.png` — v2 헤드라인에 맞는 OG 이미지 에셋 교체 필요 (현재 임시 복사본)
- `ai.gyeol.page` DNS Cloudflare Workers 커스텀 도메인 연결 (wrangler.jsonc routes)
- 후기/소셜 증거 섹션 (v1.1) — 체험 후기 공개 동의 건수 충분 시 S5 아래 삽입
- AX 카드 CTA가 /me 단독 접근 시 /ai#class-contact 외부 이동임을 사용자에게 시각 피드백 고려 (현재 카드 태그·설명으로 충분한 맥락 제공 중)

---

## 2026-05-22 17:30 — /ai 강의 랜딩 신규 구현

### 변경
- `src/lib/analytics.ts` — `class_*` 이벤트 union 3종 추가 (hub_* 와 동일 커밋)
- `src/features/class-landing/lib/class-contact-schema.ts` — classContactSchema (4필드 + 허니팟) 신규
- `src/features/class-landing/lib/curriculum.ts` — 커리큘럼·트랙·페인포인트 정적 데이터
- `src/features/class-landing/components/ClassContactForm.tsx` — 상담 신청 폼 (4필드)
- `src/features/class-landing/sections/S1Hero.tsx` ~ `S6Contact.tsx` — 섹션 6종
- `src/features/class-landing/index.ts` — feature barrel
- `src/app/ai/page.tsx` — /ai 라우트 + metadata (서버 컴포넌트)
- `src/app/api/class-contact/route.ts` — Resend + Honeypot + Zod 신규 Route Handler
- `next.config.mjs` — `ai.gyeol.page` 서브도메인 → /ai rewrite 추가
- `src/app/sitemap.ts` — /ai 항목 추가 (priority 0.8, monthly)

### 결정
- S5 강사 소개 `/me` 링크 → 두 페이지 동시 출시이므로 조건부 플래그(env 변수) 없이 항상 활성 링크로 채택 (design.md 조건부 렌더링 불필요)
- 가격 비노출 → "가격은 상담 시 안내드립니다." 텍스트만 노출
- ClassContactForm은 SuccessInline을 intro-hub에서 cross-import (공유 컴포넌트 원칙 준수)
- OG 이미지 → `/card/og.png`를 임시 복사하여 `/og/class.png`로 사용 (실제 에셋 필요)

### 검증
- 빌드 (`npm run build`): PASS — /ai 정적 라우트 생성 확인
- 패스 (a) 정합성+품질: PASS — 불가촉 파일 변경 없음, Hero 셰이더 미사용, 가격 비노출 확인
- 패스 (b) 보안+데이터: PASS — env vars 기반 키 관리, escape 처리, 허니팟 서버 검증

### 후속 (출시 전 채워야 할 항목)
- `public/og/class.png` — 실제 OG 이미지 에셋 교체 (현재 /card/og.png 임시 복사본)
- `ai.gyeol.page` DNS Cloudflare Workers 커스텀 도메인 연결 (wrangler.jsonc routes)
- S3 페인포인트 카드 내용은 3/3 학생 검증 데이터 기반 — 향후 업종/빈도 데이터 쌓이면 업데이트
- 후기/소셜 증거 섹션 (v1.1) — 체험 후기 공개 동의 건수 충분 시 S5 아래 삽입
