# Shannon 개인 소개/권위 허브 체크리스트

## 디자인 단계
- [ ] 라우트명 최종 확정 (`/me` 추천)
- [ ] S1 Hero 헤드라인 안 확정
- [ ] 얼굴 사진 소재 결정 (`/card/profile.webp` 재사용 또는 교체)
- [ ] S3 서비스 카드 3종 레이아웃 (가로 3열 vs 세로 리스트 vs 기타)
- [ ] S4 SNS 링크 섹션 레이아웃 (아이콘 그리드 vs 리스트)
- [ ] S5 신뢰/실적 섹션 포함 여부 결정 (후기 유무에 따라)
- [ ] 모바일 우선 레이아웃 검토 (허브는 SNS bio 유입이 주 경로이므로 모바일 비율 높음)
- [ ] `/card` 뒷면 "더 알아보기 →" 교차 링크 추가 여부 결정
- [ ] 데이터 모델 결정 — `profile.ts` 공유 범위, 허브 전용 상수

## 개발 단계

### 사전 준비
- [ ] SNS URL 4종 실제 값 수집 (유튜브·인스타·스레드·숨고)
- [ ] S1 헤드라인 카피 확정
- [ ] S5 카피 수준 결정 ("비개발 직장인 3명 교차 검증" 문구 사용 OK 여부)

### 라우트 및 페이지
- [ ] `src/app/me/page.tsx` 생성 (서버 컴포넌트 + metadata export)
- [ ] metadata 작성 — `title`, `description`, `openGraph`, `twitter`, `canonical`, `robots`
- [ ] `src/app/sitemap.ts` — `/me` 항목 추가 (priority 0.7)

### FSD 피처 구조
- [ ] `src/features/intro-hub/` 폴더 생성
- [ ] `src/features/intro-hub/index.ts` barrel 생성
- [ ] `src/features/intro-hub/components/HeroSection.tsx`
- [ ] `src/features/intro-hub/components/StorySection.tsx`
- [ ] `src/features/intro-hub/components/ServiceRoutingSection.tsx`
- [ ] `src/features/intro-hub/components/SocialHubSection.tsx`
- [ ] `src/features/intro-hub/components/TrustSection.tsx` (후기/실적, 조건부)
- [ ] `src/features/intro-hub/components/HubContactSection.tsx` (CTA + 폼 래퍼)
- [ ] `src/features/intro-hub/components/HubContactForm.tsx` (클라이언트 컴포넌트)
- [ ] `src/features/intro-hub/components/HubViewTracker.tsx` (클라이언트 — `hub_view` 발화)
- [ ] `src/features/intro-hub/lib/constants.ts` (섹션·링크·카피 상수)

### API
- [ ] `src/app/api/hub-contact/route.ts` 생성
- [ ] Zod 스키마 작성 (이름·이메일·textarea 3필드)
- [ ] Honeypot 필드 처리 로직
- [ ] Resend 연동 — 수신 `hi@gyeol.page`, 자동 응답 발송
- [ ] 자동 응답 메일 카피 작성 (허브 문의 맥락)

### 분석 이벤트
- [ ] `src/lib/analytics.ts` — `hub_view`, `hub_to_ai_click`, `hub_to_work_click`, `hub_inquiry_submit`, `hub_social_click`, `hub_outbound_click` union 추가
- [ ] `section_view { section: "hero" | "story" | "routing" | "social" | "trust" | "contact" }` 확장
- [ ] 각 서비스 카드 클릭 핸들러에 이벤트 연결
- [ ] SNS 링크 클릭 핸들러에 `hub_social_click { platform }` 연결
- [ ] 폼 제출 성공 시 `hub_inquiry_submit` 발화 확인

### 자산
- [ ] OG 이미지 `public/og/me.png` 생성 (1200×630, 얼굴 + 이름 + 한 줄 정의)
- [ ] 프로필 사진 — `/card/profile.webp` 재사용 또는 신규 `public/me/profile.webp` 추가

### 교차 링크 (결정 후)
- [ ] `/card` 뒷면 → `/me` 교차 링크 추가 여부 확정 후 `CardBack.tsx` 수정

### 빌드 및 검증
- [ ] `npm run build` 에러 없음
- [ ] ESLint 경고 없음
- [ ] 모바일(375px·390px) 레이아웃 깨짐 없음
- [ ] 데스크탑(1280px·1440px) 레이아웃 이상 없음
- [ ] 폼 제출 → `hi@gyeol.page` 수신 확인
- [ ] 자동 응답 메일 발송·스팸함 미분류 확인
- [ ] `hub_view` GA4 DebugView 발화 확인
- [ ] `hub_to_ai_click` 발화 후 `/ai` 정상 이동 확인
- [ ] `section_view` 섹션별 발화 확인
- [ ] sitemap에 `/me` 항목 존재 확인 (`curl ... | grep "/me"`)
- [ ] [opengraph.xyz](https://www.opengraph.xyz/) OG 카드 정상 렌더
- [ ] Lighthouse 모바일 Performance ≥ 85, Accessibility ≥ 95, SEO 100

### dev-log
- [ ] `docs/features/intro-hub/dev-log.md` 작성 (구현 결정·트레이드오프·후속 이슈 기록)
