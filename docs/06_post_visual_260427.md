# 06 후방 작업 — 결 (Gyeol) (2026-04-27)

표준 플레이북: `playbooks/06_post_visual.md` (8 항목 풀세트 적용 + 결 특수 사항 반영)

## 채워넣은 값

| 키 | 값 |
|---|---|
| `SITE_URL` | `https://gyeol.page` |
| `NEXT_PUBLIC_GA_ID` | `G-6125RMCMSV` (2026-04-27 발급, 로컬 `.env.local` 등록 완료. Vercel 프로덕션 환경변수 등록 필요) |
| 사이트 목적 | 전환형(문의 인입) + 문의형 혼합 |
| 1순위 KPI | Contact 폼 제출 / 폼 CTR / mailto CTR |
| 2순위 KPI (결 특수) | hero_interact 참여율 / work_scroll_complete 비율 / scroll_depth 75%+ |
| 운영자 실명 | `유승현` |
| 운영자 직함 | `Design Engineer` |
| 소셜 sameAs | LinkedIn `https://www.linkedin.com/in/seunghyun-yu/` + GitHub `https://github.com/kyileeyu` (인스타 등 추가 시 `OPERATOR_SAME_AS` 배열에 push) |
| 문의 메일 | `hi@gyeol.page` |
| Search Console 인증 코드 | (미발급 — 출시 후 등록) |
| Naver Search Advisor 인증 | `12cd8d350e6e28e59a1175ec954feb3062304d89` (2026-04-27 발급, `src/lib/site.ts` `VERIFICATION.naver` 등록 완료) |

## 적용된 표준 8 항목

| # | 항목 | 적용 위치 |
|---|---|---|
| 1 | 메인 랜딩 1페이지 (반응형) | `src/app/page.tsx` (1~5단계 결과물) |
| 2 | 문의 폼 + 개인정보 수집 동의 | 자체 Resend 폼 + `/privacy` (PIPA 9 섹션 — 책임자 추가, KISA 표준 강화) |
| 3 | 메일 알림 | Resend → 받은편지함 + 자동 응답 (기존 구현) |
| 4 | GA4 (방문자 분석) | `<GoogleAnalytics />` + 표준 6종 + 결 특수 2종 이벤트 |
| 5 | 모바일 최적화 | `next/font/local` Pretendard + `images.formats: avif/webp` + 반응형 |
| 6 | 도메인 + SSL | Vercel Let's Encrypt 자동 + HSTS 헤더 |
| 7 | 기본 SEO | metadata 풀세트 + sitemap + robots + JSON-LD 5종 + manifest |
| 8 | 개인정보처리방침 | `app/privacy/page.tsx` (KISA 표준 9 섹션 — 책임자·안전성 확보 조치 포함 강화 버전) |

## 추가/수정된 파일 (이번 세션)

**신규 (13개)**
- `src/lib/site.ts` — 사이트·운영자 상수 단일 출처
- `src/lib/analytics.ts` — `track()` 디스패처 + 8 이벤트 타입
- `src/components/GoogleAnalytics.tsx`
- `src/components/JsonLd.tsx` — WebSite/Organization/Person/ProfessionalService/FAQPage
- `src/components/SectionView.tsx`
- `src/components/ScrollDepthTracker.tsx`
- `src/hooks/useScrollDepth.ts`
- `src/app/robots.ts`
- `src/app/manifest.ts`
- `src/app/not-found.tsx`
- `src/app/error.tsx`
- `src/app/global-error.tsx`
- `src/app/privacy/page.tsx`
- `.env.example`

**수정**
- `src/app/layout.tsx` — Vercel Analytics + Speed Insights + GoogleAnalytics + JsonLd + ScrollDepthTracker 마운트, 인라인 상수 → `@/lib/site`, `verification` placeholder
- `src/app/sitemap.ts` — 인라인 상수 → import, `/privacy` 추가
- `src/app/page.tsx` — 6 섹션을 `<SectionView>` 로 래핑
- `next.config.mjs` — 보안 헤더 5종 + 이미지 포맷 + reactStrictMode
- `src/components/sections/Hero.tsx` — 마우스 머문 시간 추적 (≥500ms → `hero_interact`)
- `src/components/sections/Footer.tsx` — `mailto_click` 발화 + Privacy 링크 추가
- `src/components/contact/ContactForm.tsx` — `cta_form_click` 발화
- `src/features/work/components/WorkSectionClient.tsx` — 마지막 케이스 IO → `work_scroll_complete`
- `src/features/work/components/LiveSiteCTA.tsx` — `cta_external_click` 발화

**의존성 추가**
- `@vercel/analytics`
- `@vercel/speed-insights`

## 이벤트 매핑 (8종)

| 이벤트 | 발화 위치 |
|---|---|
| `cta_form_click` | ContactForm onSubmit (validation 통과 후) |
| `cta_external_click` | LiveSiteCTA — Work 케이스 외부 링크 |
| `mailto_click` | Footer — `hi@gyeol.page` 클릭 |
| `social_click` | (예약, 향후 인스타·LinkedIn 등 소셜 링크 추가 시) |
| `scroll_depth` | 전역 — 25/50/75/100% (`<ScrollDepthTracker />`) |
| `section_view` | 6 섹션 + footer (`<SectionView>` 래퍼) |
| `hero_interact` *(결 특수)* | Hero 영역에 마우스가 ≥500ms 머문 후 떠날 때 1회 |
| `work_scroll_complete` *(결 특수)* | 가로스크롤 마지막 케이스 카드 진입 시 1회 |

## 결 특수 사항

- **자체 Resend 폼**: 플레이북의 외부 구글폼 가정과 다름 → Privacy 페이지 1·6·7장에 직접 수집·안전성 확보 조치·책임자 추가
- **"1인 스튜디오" 노출 정책 갱신**: *드러내지 않지만 감추지도 않는다* (`gyeol/CLAUDE.md` 갱신 완료) — 사이트 카피엔 자기규정 단어 X, JSON-LD Person·사업자 정보엔 자연 노출 OK

## 검증 체크리스트

### 로컬 (✅ 완료)
- [x] `npm run build` 통과 (Next.js 14.2.35, 14 라우트 생성)
- [x] `/sitemap.xml`, `/robots.txt`, `/manifest.webmanifest` 라우트 생성됨

### 배포 후 진행 (TODO)
- [ ] `curl https://gyeol.page/robots.txt` → 출력 확인
- [ ] `curl https://gyeol.page/sitemap.xml` → `/`, `/work/dewstone`, `/work/yoonseul-log`, `/privacy` 포함 확인
- [ ] [Google Rich Results Test](https://search.google.com/test/rich-results) — `WebSite` / `Organization` / `Person` / `ProfessionalService` / `FAQPage` 5종 통과
- [ ] [opengraph.xyz](https://www.opengraph.xyz/) — OG 미리보기 정상 (`/og-image.png` 확인 필요)
- [ ] DevTools Network — `gtag/js`, `_vercel/insights`, `vitals.vercel-insights.com` 호출
- [ ] GA4 DebugView — 8종 이벤트 발화 확인 (GA4 ID 발급 후)
- [ ] `/non-existent` → 결 톤 404 (`결이 흐르지 않는 페이지입니다`) 노출
- [ ] [securityheaders.com](https://securityheaders.com/) — A 이상
- [ ] Mobile Lighthouse — Performance ≥ 85, Accessibility ≥ 95, SEO 100

## 출시 후 클라이언트(본인) 측 작업

1. **GA4 발급** → Vercel 환경변수 `NEXT_PUBLIC_GA_ID` 에 등록 → 재배포
2. **Search Console 등록** → 인증 코드 발급 → `src/lib/site.ts` `VERIFICATION.google` 에 입력 → 재배포
3. **Naver Search Advisor 등록** → 인증 코드 발급 → `VERIFICATION.naver` 입력 → 재배포
4. 두 콘솔에 `https://gyeol.page/sitemap.xml` 제출
5. **운영자 정보 확정** → `src/lib/site.ts` `OPERATOR_NAME`, `OPERATOR_JOB_TITLE`, `OPERATOR_SAME_AS` 점검 (현재는 git config 기준 placeholder)
6. (선택) HSTS preload 등록 — https://hstspreload.org/

## 메모

- CSP 보안 헤더는 보류 (Three.js 셰이더 + Resend + GA + Vercel 외부 호출 → 출시 후 securityheaders.com 점수 확인 후 결정)
- 폰트 체계: Pretendard 자체 호스팅 ✅ + Google Fonts(Inter, Noto Serif KR)는 Next.js 자동 self-host ✅. `globals.css` 의 jsdelivr GounBatang 외부 CDN 은 추후 자체 호스팅 전환 검토 (낮은 우선순위 — 본문 한글 세리프 fallback)
- OG 이미지 (`/og-image.png`) — `public/` 디렉토리에 1200×630 이미지 준비 필요 (출시 체크리스트 항목)
