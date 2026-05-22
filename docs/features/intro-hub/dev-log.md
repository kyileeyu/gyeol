## 2026-05-22 17:30 — /me 소개·권위 허브 신규 구현

### 변경
- `src/lib/analytics.ts` — `hub_*` 이벤트 union 7종 추가
- `src/features/intro-hub/lib/hub-contact-schema.ts` — hubContactSchema (3필드 + 허니팟) 신규
- `src/features/intro-hub/lib/hub-config.ts` — SNS 링크·서비스 카드 정적 데이터 (PROFILE import 공유)
- `src/features/intro-hub/components/SectionHeading.tsx` — 공유 섹션 헤딩 컴포넌트 신규
- `src/features/intro-hub/components/ServiceCard.tsx` — 서비스 카드 컴포넌트 신규 (/ai에서도 재사용)
- `src/features/intro-hub/components/SocialLinkRow.tsx` — SNS 링크 행 컴포넌트 신규
- `src/features/intro-hub/components/SuccessInline.tsx` — 폼 성공 인라인 메시지 (/ai에서도 import)
- `src/features/intro-hub/components/HubContactForm.tsx` — 허브 문의 폼 클라이언트 컴포넌트
- `src/features/intro-hub/sections/S1Hero.tsx` ~ `S6Contact.tsx` — 섹션 6종
- `src/features/intro-hub/index.ts` — feature barrel
- `src/app/me/page.tsx` — /me 라우트 + metadata (서버 컴포넌트)
- `src/app/api/hub-contact/route.ts` — Resend + Honeypot + Zod 신규 Route Handler
- `src/app/sitemap.ts` — /me 항목 추가 (priority 0.7, monthly)

### 결정
- `profile.ts` 직접 수정 금지 원칙 준수 → `hub-config.ts`를 별도 생성하고 `PROFILE` import만 공유
- 데스크탑 Hero 레이아웃 → design.md 기본값(세로 배치)으로 채택
- S5 신뢰 섹션 → `HUB_CONFIG.showTrustSection: true`로 표시, 조건부 렌더링으로 page.tsx에서 제어
- SNS URL placeholder `"#"` → `aria-disabled="true"` + `opacity-40` + `cursor-not-allowed` 처리
- OG 이미지 → `/card/og.png`를 임시 복사하여 `/og/me.png`로 사용 (실제 에셋 필요)

### 검증
- 빌드 (`npm run build`): PASS — /me 정적 라우트 생성 확인
- 패스 (a) 정합성+품질: PASS — 불가촉 파일 변경 없음, useReducedMotion 전 섹션 적용, 가격 비노출
- 패스 (b) 보안+데이터: PASS — env vars로만 키 관리, HTML escape 처리, 허니팟 서버 검증

### 후속 (출시 전 채워야 할 항목)
- `hub-config.ts`의 SNS URL 4종 실제 값 주입 (유튜브·인스타그램·스레드·숨고)
- `public/og/me.png` — 실제 OG 이미지 에셋 교체 (현재 /card/og.png 임시 복사본)
- S5 신뢰 섹션 후기 카드 교체 (v1.1) — 공개 동의받은 후기 확보 후
