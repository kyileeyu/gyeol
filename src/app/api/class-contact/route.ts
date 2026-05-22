// /ai 강의 랜딩 — 상담 신청 API Route Handler (기존 /api/contact 불가촉)
import { NextResponse } from "next/server";
import { Resend } from "resend";
import { classContactSchema } from "@/features/class-landing/lib/class-contact-schema";

export const runtime = "nodejs";

const C = {
  bg: "#fafbfc",
  surface: "#f0f4f8",
  border: "#c9d6df",
  deep: "#1b3b5f",
  ink: "#1a1a1a",
  muted: "#8b95a1",
  card: "#ffffff",
} as const;

const escape = (v: string) =>
  v
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export async function POST(req: Request) {
  let payload: unknown;
  try {
    payload = await req.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = classContactSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  // 허니팟
  if (parsed.data._trap && parsed.data._trap.length > 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, email, track, message } = parsed.data;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) {
    console.error("[class-contact] missing env vars", {
      hasKey: !!apiKey,
      hasTo: !!to,
      hasFrom: !!from,
    });
    return NextResponse.json(
      { ok: false, error: "Server misconfigured" },
      { status: 500 },
    );
  }

  const SENDER = `결 Gyeol <${from}>`;

  const adminHtml = `<!doctype html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.border};">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid ${C.border};">
          <p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">[강의 상담 신청] /ai</p>
          <h1 style="margin:6px 0 0;font-size:18px;color:${C.deep};font-weight:500;">${escape(name)} · ${escape(track)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 16px 20px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;width:100px;">이름</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;">${escape(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;">이메일</td>
              <td style="padding:8px 12px;font-size:14px;"><a href="mailto:${escape(email)}" style="color:${C.deep};">${escape(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;">관심 주제</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;">${escape(track)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">문의</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;line-height:1.7;white-space:pre-wrap;">${escape(message)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const autoReplyHtml = `<!doctype html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.border};">
      <tr><td style="padding:32px 32px 8px;"><p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">결 · AI 강의</p></td></tr>
      <tr>
        <td style="padding:8px 32px 32px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:${C.deep};font-weight:500;line-height:1.5;">${escape(name)}님, 상담 신청해 주셔서 감사합니다.</h1>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">신청 내용을 확인했습니다. 보통 1–2영업일 안에 체험 세션 일정을 안내드리겠습니다.</p>
          <p style="margin:0;color:${C.muted};font-size:12px;line-height:1.6;">결 드림</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const resend = new Resend(apiKey);
  const { error } = await resend.batch.send([
    {
      from: SENDER,
      to,
      replyTo: email,
      subject: `[강의 상담] ${name} · ${track}`,
      html: adminHtml,
      text: `[강의 상담 신청]\n이름: ${name}\n이메일: ${email}\n관심 주제: ${track}\n\n${message}`,
    },
    {
      from: SENDER,
      to: email,
      subject: "[결 AI 강의] 상담 신청해 주셔서 감사합니다",
      html: autoReplyHtml,
      text: `${name}님, 상담 신청해 주셔서 감사합니다.\n신청 내용을 확인했습니다. 보통 1–2영업일 안에 체험 세션 일정을 안내드리겠습니다.\n\n결 드림`,
    },
  ]);

  if (error) {
    console.error("[class-contact] resend error", error);
    return NextResponse.json(
      { ok: false, error: "Send failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
