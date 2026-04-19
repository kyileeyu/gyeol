import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // honeypot — any content means a bot
  if (parsed.data.company && parsed.data.company.length > 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const safe = { ...parsed.data };
  delete safe.company;
  console.log("[contact stub]", safe);

  // TODO(D5): Resend 연동 — 받은편지함 도착 + 자동 응답 메일

  return NextResponse.json({ ok: true });
}
