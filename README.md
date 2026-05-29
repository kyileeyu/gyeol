# 결 (Gyeol)

결 스튜디오 사이트 — [Next.js](https://nextjs.org) (App Router) + TypeScript. 도메인: `gyeol.page` · `ai.gyeol.page`.

## 개발

```bash
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 확인. 폰트는 Pretendard(국문) + Inter(영문)를 `next/font/local`로 자체 호스팅한다. 디자인 토큰은 `src/app/globals.css`의 `--gy-*` (SSOT는 `../brand/DESIGN.md`).

## 배포 — Cloudflare Workers

[`@opennextjs/cloudflare`](https://opennext.js.org/cloudflare) + `wrangler`로 Cloudflare Workers에 배포한다 (`wrangler.jsonc` — worker명 `gyeol`).

```bash
npm run preview   # 로컬에서 Workers 런타임으로 미리보기
npm run deploy    # 프로덕션 배포 (cf:build → opennextjs-cloudflare deploy)
```

## 스택

- **Framework**: Next.js 15 (App Router) + TypeScript
- **3D / 모션**: Three.js + GLSL, GSAP + ScrollTrigger, Framer Motion
- **스타일**: Tailwind CSS + CSS Variables
- **폼·메일**: React Hook Form + Zod, Resend
- **분석**: Google Analytics 4
- **호스팅**: Cloudflare Workers (OpenNext)
