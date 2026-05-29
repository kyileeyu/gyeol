import type { ContactInput } from "./contact-schema";

type ContactPayload = Omit<ContactInput, "company">;

type EmailPayload = {
  from: string;
  to: string;
  subject: string;
  html: string;
  text: string;
  replyTo?: string;
};

// 사이트 팔레트 (brand/DESIGN.md — 인디고·페리윙클 5단)
// canvas #FCFDFF bg / surface-1 #F4F6FE surface / hairline #DCE2F8 border
// deep #0142A0 / ink #12183B / ink-muted #595F75
const C = {
  bg: "#FCFDFF",
  surface: "#F4F6FE",
  border: "#DCE2F8",
  deep: "#0142A0",
  ink: "#12183B",
  muted: "#595F75",
  card: "#FFFFFF",
} as const;

const SENDER_NAME = "결 Gyeol";
const withName = (email: string) => `${SENDER_NAME} <${email}>`;

const escape = (value: string) =>
  value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const row = (label: string, value: string) => `
  <tr>
    <td style="padding:8px 12px;color:${C.muted};font-size:12px;letter-spacing:0.04em;text-transform:uppercase;vertical-align:top;width:140px;">${escape(label)}</td>
    <td style="padding:8px 12px;color:${C.ink};font-size:14px;line-height:1.6;white-space:pre-wrap;">${value}</td>
  </tr>
`;

export function buildAdminNotification(
  data: ContactPayload,
  { from, to }: { from: string; to: string },
): EmailPayload {
  const reference = data.referenceUrl?.trim()
    ? `<a href="${escape(data.referenceUrl)}" style="color:${C.deep};">${escape(data.referenceUrl)}</a>`
    : `<span style="color:${C.muted};">—</span>`;

  const html = `<!doctype html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.border};">
      <tr>
        <td style="padding:24px 28px;border-bottom:1px solid ${C.border};">
          <p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.12em;text-transform:uppercase;">결 — 새 문의</p>
          <h1 style="margin:6px 0 0;font-size:18px;color:${C.deep};font-weight:500;">${escape(data.name)} · ${escape(data.projectType)}</h1>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 16px 20px;">
          <table role="presentation" style="width:100%;border-collapse:collapse;">
            ${row("이름", escape(data.name))}
            ${row("이메일", `<a href="mailto:${escape(data.email)}" style="color:${C.deep};">${escape(data.email)}</a>`)}
            ${row("프로젝트", escape(data.projectType))}
            ${row("메시지", escape(data.message))}
            ${row("참고 URL", reference)}
          </table>
        </td>
      </tr>
    </table>
    <p style="max-width:560px;margin:12px auto 0;color:${C.muted};font-size:11px;text-align:center;">이 메일에 그대로 답장하면 ${escape(data.name)}님께 전달됩니다.</p>
  </body>
</html>`;

  const text = [
    `결 — 새 문의`,
    ``,
    `이름: ${data.name}`,
    `이메일: ${data.email}`,
    `프로젝트: ${data.projectType}`,
    `참고 URL: ${data.referenceUrl?.trim() || "—"}`,
    ``,
    `메시지:`,
    data.message,
  ].join("\n");

  return {
    from: withName(from),
    to,
    replyTo: data.email,
    subject: `[결] 새 문의 — ${data.name} / ${data.projectType}`,
    html,
    text,
  };
}

export function buildAutoReply(
  data: ContactPayload,
  { from }: { from: string },
): EmailPayload {
  const html = `<!doctype html>
<html lang="ko">
  <body style="margin:0;padding:24px;background:${C.bg};font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;">
    <table role="presentation" style="max-width:560px;margin:0 auto;background:${C.card};border-radius:16px;overflow:hidden;border:1px solid ${C.border};">
      <tr>
        <td style="padding:32px 32px 8px;">
          <p style="margin:0;color:${C.muted};font-size:11px;letter-spacing:0.16em;text-transform:uppercase;">결 · gyeol</p>
        </td>
      </tr>
      <tr>
        <td style="padding:8px 32px 24px;">
          <h1 style="margin:0 0 16px;font-size:20px;color:${C.deep};font-weight:500;line-height:1.5;">${escape(data.name)}님, 문의해주셔서 감사합니다.</h1>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">
            보내주신 이야기를 잘 받았습니다. 결의 흐름에 어울리도록 천천히 살펴본 뒤,<br/>
            보통 1–2영업일 안에 회신드리고 있습니다.
          </p>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">
            혹시 더 들려주고 싶은 이야기가 있다면 이 메일에 그대로 답장 주셔도 좋습니다.
          </p>
          <p style="margin:0 0 14px;color:${C.ink};font-size:15px;line-height:1.75;">
            감사합니다.
          </p>
          <div style="margin-top:24px;padding:16px 18px;background:${C.surface};border-radius:12px;">
            <p style="margin:0 0 8px;color:${C.muted};font-size:11px;letter-spacing:0.08em;text-transform:uppercase;">보내주신 내용</p>
            <p style="margin:0;color:${C.ink};font-size:14px;line-height:1.7;white-space:pre-wrap;">${escape(data.message)}</p>
          </div>
        </td>
      </tr>
      <tr>
        <td style="padding:0 32px 32px;">
          <p style="margin:0;color:${C.muted};font-size:12px;line-height:1.6;">결 드림</p>
        </td>
      </tr>
    </table>
  </body>
</html>`;

  const text = [
    `${data.name}님, 문의해주셔서 감사합니다.`,
    ``,
    `보내주신 이야기를 잘 받았습니다. 결의 흐름에 어울리도록 천천히 살펴본 뒤, 보통 1–2영업일 안에 회신드리고 있습니다.`,
    `혹시 더 들려주고 싶은 이야기가 있다면 이 메일에 그대로 답장 주셔도 좋습니다.`,
    `감사합니다.`,
    ``,
    `— 보내주신 내용 —`,
    data.message,
    ``,
    `결 드림`,
  ].join("\n");

  return {
    from: withName(from),
    to: data.email,
    subject: "결에 문의해주셔서 감사합니다",
    html,
    text,
  };
}
