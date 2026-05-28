import { NextResponse } from "next/server";

export const runtime = "nodejs";

// ─────────────────────────────────────────────────────────────
// GET — Meta webhook subscription verification
// Meta 가 구독 등록 시 한 번 호출. 우리 토큰과 일치하면 hub.challenge
// 를 그대로 echo 해야 verification 성공.
//
// 참고: https://developers.facebook.com/docs/graph-api/webhooks/getting-started
// ─────────────────────────────────────────────────────────────
export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("hub.mode");
  const token = url.searchParams.get("hub.verify_token");
  const challenge = url.searchParams.get("hub.challenge");

  const expected = process.env.INSTAGRAM_WEBHOOK_VERIFY_TOKEN;
  if (!expected) {
    console.error("[webhooks/instagram] INSTAGRAM_WEBHOOK_VERIFY_TOKEN not set");
    return NextResponse.json({ ok: false, error: "Server misconfigured" }, { status: 500 });
  }

  if (mode === "subscribe" && token === expected && challenge) {
    return new Response(challenge, {
      status: 200,
      headers: { "Content-Type": "text/plain" },
    });
  }
  return new Response("Forbidden", { status: 403 });
}

// ─────────────────────────────────────────────────────────────
// POST — 실제 이벤트 수신 (DM·멘션·댓글 등)
// 현재는 200 OK 만 반환. 카드뉴스 발행 자동화는 IG → 우리(이 webhook)
// 방향이 아니라 우리 → IG 방향이라 webhook 이벤트 처리가 발행에 필수는 아님.
// 향후 DM 자동 응답·멘션 트래킹 등으로 확장 가능한 자리.
// ─────────────────────────────────────────────────────────────
export async function POST(req: Request) {
  try {
    const body = await req.json();
    console.log("[webhooks/instagram] event", JSON.stringify(body).slice(0, 500));
  } catch {
    // empty body or invalid json — Meta 는 200 이면 충분
  }
  return new Response("OK", { status: 200 });
}
