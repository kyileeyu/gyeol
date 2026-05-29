import { NextResponse } from "next/server";
import { Resend } from "resend";
import {
  intakeSchema,
  blockerLabel,
} from "@/features/ai-landing/lib/intake-schema";

export const runtime = "nodejs";

const C = {
  bg: "#FCFDFF",
  surface: "#F4F6FE",
  border: "#DCE2F8",
  deep: "#0142A0",
  ink: "#12183B",
  muted: "#595F75",
  card: "#FFFFFF",
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
    return NextResponse.json(
      { ok: false, error: "Invalid JSON" },
      { status: 400 },
    );
  }

  const parsed = intakeSchema.safeParse(payload);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.flatten() },
      { status: 400 },
    );
  }

  if (parsed.data._trap && parsed.data._trap.length > 0) {
    return NextResponse.json({ ok: false }, { status: 400 });
  }

  const { name, email, role, blocker, decision } = parsed.data;
  const blockerKo = blockerLabel[blocker] ?? blocker;

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;

  if (!apiKey || !to || !from) {
    console.error("[ai-intake] missing env vars", {
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
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid ${C.border};">
          <p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">[결 컨설팅] 문의</p>
          <h1 style="margin:6px 0 0;font-size:18px;color:${C.deep};font-weight:600;">${escape(name)} · ${escape(role)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 16px 20px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;width:140px;vertical-align:top;">이름</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;">${escape(name)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">이메일</td>
              <td style="padding:8px 12px;font-size:14px;"><a href="mailto:${escape(email)}" style="color:${C.deep};">${escape(email)}</a></td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">직무·업종</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;">${escape(role)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">막히는 자리</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;">${escape(blockerKo)}</td>
            </tr>
            <tr>
              <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;">풀고 싶은 결정/업무</td>
              <td style="padding:8px 12px;color:${C.ink};font-size:14px;line-height:1.75;white-space:pre-wrap;">${escape(decision)}</td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
    <p style="max-width:560px;margin:12px auto 0;color:${C.muted};font-size:11px;text-align:center;">이 메일에 그대로 답장하면 ${escape(name)}님께 전달됩니다.</p>
  </body>
</html>`;

  const autoReplyHtml = `<!doctype html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:12px;overflow:hidden;border:1px solid ${C.border};">
      <tr>
        <td style="padding:32px 32px 8px;">
          <p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.18em;text-transform:uppercase;">결 · 결 컨설팅</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 32px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:${C.deep};font-weight:600;line-height:1.5;">받았습니다.</h1>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">
            48시간 안에 답신드리고, 30분 1:1 콜 일정을 잡습니다.
          </p>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">
            체험 세션은 2시간으로 진행하고, 끝나면 한 페이지로 정리한 진단 리포트를 보내드립니다. 의뢰 여부와 무관합니다.
          </p>
          <p style="margin:24px 0 0;color:${C.muted};font-size:12px;line-height:1.6;">결 드림</p>
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
      subject: `[결 컨설팅] 문의 — ${name} / ${role} / ${blockerKo}`,
      html: adminHtml,
      text: `[결 컨설팅] 문의\n이름: ${name}\n이메일: ${email}\n직무·업종: ${role}\n막히는 자리: ${blockerKo}\n\n풀고 싶은 결정/업무:\n${decision}`,
    },
    {
      from: SENDER,
      to: email,
      subject: "[결 컨설팅] 문의 접수되었습니다",
      html: autoReplyHtml,
      text: `받았습니다.\n\n48시간 안에 답신드리고, 30분 1:1 콜 일정을 잡습니다.\n\n체험 세션은 2시간으로 진행하고, 끝나면 한 페이지로 정리한 진단 리포트를 보내드립니다. 의뢰 여부와 무관합니다.\n\n결 드림`,
    },
  ]);

  if (error) {
    console.error("[ai-intake] resend error", error);
    return NextResponse.json(
      { ok: false, error: "Send failed" },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}
