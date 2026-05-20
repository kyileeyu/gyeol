# dev-log — business-card

## 2026-05-19 23:00 — 온라인 명함 페이지 /card 초기 구현

### 변경

| 파일 | 변경 요지 |
|---|---|
| `src/app/card/page.tsx` | 신규. `/card` 라우트. metadata export + 배경 노이즈 SVG + BusinessCard + CardViewTracker |
| `src/features/card/index.ts` | 신규. 배럴 export |
| `src/features/card/lib/profile.ts` | 신규. 이름·연락처·경로 상수 (PROFILE as const) |
| `src/features/card/styles/card.module.css` | 신규. stage / card / cardFlipped / face / faceBack + iOS Safari `-webkit-backface-visibility` + reduced-motion 미디어 쿼리 |
| `src/features/card/components/BusinessCard.tsx` | 신규. 플립 상태(useState) + Framer Motion 진입 모션(900ms / reduce 시 200ms fade) + div role="button" + Space/Enter 키보드 핸들러 |
| `src/features/card/components/CardFront.tsx` | 신규. 워드마크 + 프로필 이미지 + 이름·직함 |
| `src/features/card/components/CardBack.tsx` | 신규. 슬로건 + 연락처 3종 + SaveContactButton + 각 링크 stopPropagation |
| `src/features/card/components/SaveContactButton.tsx` | 신규. vCard 다운로드 + card_save_contact / cta_external_click 이중 발화 |
| `src/features/card/components/CardViewTracker.tsx` | 신규. useEffect → card_view 1회 발화, null 렌더 |
| `src/lib/analytics.ts` | 수정. AnalyticsEvent union에 card_view / card_flip / card_save_contact 3종 추가 |
| `src/app/sitemap.ts` | 수정. /card 항목 추가 (priority 0.6, changeFrequency: "monthly") |
| `public/card/gyeol.vcf` | 신규. vCard 3.0, UTF-8 BOM 없음, CRLF 줄바꿈 |
| `public/card/profile-placeholder.svg` | 신규. 프로필 사진 임시 placeholder (박무 배경 + 은박 이니셜 'S') |
| `docs/features/business-card/plan.md` | 신규. plan 복사본 (컨텍스트 통합) |

### 결정

- **`<div role="button">` 채택**: `<button>` 안에 `<a>` 중첩은 invalid HTML. div + role="button" + Space/Enter keyDown 핸들러로 대체. plan 지침 그대로.
- **profile.webp 없음 → placeholder.svg 사용**: 프로필 사진이 `public/card/`에 없어 placeholder SVG로 진행. 사용자가 실제 portrait 사진을 `public/card/profile.webp`로 저장한 뒤 CardFront.tsx의 `src={PROFILE.profile_placeholder}`를 `src={PROFILE.profile_image}`로 교체해야 함.
- **OG 이미지 1차 폴백**: `/og/card.png`가 없어 기존 `/og-image.png`를 폴백으로 사용. 전용 OG 이미지는 v1.1로 이연.
- **font-kr-serif 클래스**: Tailwind v4 `@theme inline`에서 `--font-kr-serif` CSS 변수가 자동으로 `font-kr-serif` 유틸리티 클래스로 노출됨. 기존 Hero 컴포넌트와 동일한 패턴 재사용. `style` 인라인 중복 제거.
- **card_save_contact + cta_external_click 이중 발화**: plan 지침. 카드 전용 집계(card_save_contact)와 공통 외부 CTA 집계(cta_external_click) 모두 필요하기 때문.

### 검증

- 빌드 (`pnpm build`): PASS — `/card` 2.12 kB, 타입 에러 0건
- 패스 (a) 정합성+품질: PASS
  - 모든 자식 링크/버튼 onClick 첫 줄 `e.stopPropagation()` 확인
  - aria-hidden 앞·뒷면 토글 확인 (hidden prop → aria-hidden)
  - vCard CRLF 줄바꿈 hexdump 확인 (0d 0a)
  - `useReducedMotion()` Framer Motion 훅 — reduce 시 opacity 200ms 폴백 분기 확인
- 패스 (b) 보안+데이터: PASS
  - 시크릿 커밋 없음 (profile.ts에 공개 연락처만)
  - XSS 위험 없음 (href 값 모두 PROFILE 상수에서)
  - 전화번호·이메일·도메인은 공개 운영 정보로 노출 의도적

### 후속

- **[ 필수 ] 프로필 사진 교체**: 실제 portrait 사진을 `public/card/profile.webp` (800×800 정사각, <60 KB)로 저장 후 `CardFront.tsx` src를 `PROFILE.profile_image`로 변경
- **[ 권장 ] 수동 검증 필요**: `pnpm dev` 후 localhost:3000/card에서 다음 항목 직접 확인
  - 카드 진입 3D 모션 (900ms)
  - 본체 탭 → 플립, 자식 링크 탭 → 플립 안 됨
  - Tab 키보드 순회 + Space/Enter 플립
  - `open public/card/gyeol.vcf` macOS 연락처 임포트 시트 확인
- **[ 선택 ] vCard 한글 호환성**: Android Chrome / Samsung Internet 실기 테스트 — 한글 깨짐 없이 임포트되는지 확인
- **[ v1.1 ] OG 이미지 전용 제작**: `/og/card.png` 1200×630 별도 디자인 후 card/page.tsx OG images 경로 교체
- **[ v1.1 ] 이모지 아이콘 교체**: ✉ ☎ ⊕ → lucide SVG 24px stroke 1.5 (결 절제 톤에 더 적합)
- **[ v1.1 ] 사이트 내 진입 링크**: Footer 또는 About에 `/card` 링크 추가 고려
