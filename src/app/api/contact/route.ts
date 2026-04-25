import { NextResponse } from "next/server";
import { Resend } from "resend";
import { contactSchema } from "@/lib/contact-schema";
import { buildAdminNotification, buildAutoReply } from "@/lib/contact-emails";

export const runtime = "nodejs";

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

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[contact] missing env vars", {
      hasKey: !!apiKey,
      hasTo: !!to,
      hasFrom: !!from,
    });
    return NextResponse.json(
      { ok: false, error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const resend = new Resend(apiKey);
  const { error } = await resend.batch.send([
    buildAdminNotification(safe, { from, to }),
    buildAutoReply(safe, { from }),
  ]);

  if (error) {
    console.error("[contact] resend error", error);
    return NextResponse.json(
      { ok: false, error: "Send failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
