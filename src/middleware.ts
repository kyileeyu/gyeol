import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// ai.gyeol.page 서브도메인의 루트를 /ai로 내부 rewrite.
// next.config.mjs `rewrites()`의 host 조건은 OpenNext Cloudflare에서 발화가 불안정하므로
// 미들웨어(엣지)에서 host 헤더를 직접 검사해 처리한다.
// URL은 유지되고 /api·_next·정적 자산 등은 matcher에서 제외돼 정상 통과한다.
export function middleware(request: NextRequest) {
  const host = (request.headers.get("host") ?? "").toLowerCase();
  if (host === "ai.gyeol.page") {
    const url = request.nextUrl.clone();
    url.pathname = "/ai";
    return NextResponse.rewrite(url);
  }
  return NextResponse.next();
}

export const config = {
  // 루트만 처리. /api·/_next·정적 파일은 미들웨어 자체를 거치지 않도록 제외.
  matcher: ["/"],
};
