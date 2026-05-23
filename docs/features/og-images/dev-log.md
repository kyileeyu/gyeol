## 2026-05-22 23:10 — /me·/ai OG 이미지 브랜드 전용 PNG 생성

### 변경
- `scripts/gen-og.mjs` — 신규 생성. next/dist/compiled/@vercel/og/index.node.js(satori+resvg-wasm)를 Node.js에서 직접 호출해 정적 PNG 2장 출력
- `public/fonts/Pretendard-Bold.otf` — 신규 추가 (satori가 Variable 폰트 파싱 불가, 고정 굵기 OTF 필요)
- `public/fonts/Pretendard-Regular.otf` — 신규 추가
- `public/og/me.png` — 기존 임시본(card OG 복사) → 브랜드 전용 1200×630 교체
- `public/og/class.png` — 기존 임시본(card OG 복사) → 브랜드 전용 1200×630 교체
- `package.json` — `"gen:og": "node scripts/gen-og.mjs"` 스크립트 추가 (build에는 미연결)

### 결정
- **정적 PNG 방식 유지**: Cloudflare Workers(OpenNext) 배포 환경에서 next/og ImageResponse 런타임은 불안정할 수 있어 /card와 동일한 정적 PNG 방식 채택.
- **추가 devDependency 없음**: satori와 resvg-wasm이 next 패키지 내부(`next/dist/compiled/@vercel/og/index.node.js`)에 이미 번들링되어 있어 별도 설치 불필요.
- **OTF 폰트 선택**: PretendardVariable.ttf/woff2는 satori의 fvar 파싱 오류 발생. `/Users/seunghyun/Library/Fonts/`의 고정 굵기 OTF 파일을 `public/fonts/`에 복사해 레포 내 경로로 참조.
- **빌드 스크립트 미포함**: gen-og는 일회성 수동 실행(`npm run gen:og`)용. 에셋이 레포에 커밋되므로 매 빌드마다 재실행 불필요.

### 검증
- 빌드 (`npm run build`): PASS
- me.png: 1200×630 PNG, 24,749 bytes
- class.png: 1200×630 PNG, 25,744 bytes
- 패스 (a) 정합성+품질: PASS
- 패스 (b) 보안+데이터: PASS

### 후속
- OG 이미지는 레포에 커밋. 폰트 파일(OTF 2개)도 함께 커밋 필요.
- 브랜드 카피 변경 시 `scripts/gen-og.mjs` 수정 후 `npm run gen:og` 재실행 → PNG 재커밋.
