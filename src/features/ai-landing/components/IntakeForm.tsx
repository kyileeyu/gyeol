"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  intakeSchema,
  blockerOptions,
  type IntakeInput,
} from "../lib/intake-schema";

type Status = "idle" | "submitting" | "success" | "error";

export function IntakeForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<IntakeInput>({
    resolver: zodResolver(intakeSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      blocker: undefined as unknown as IntakeInput["blocker"],
      decision: "",
      _trap: "",
    },
  });

  const onSubmit: SubmitHandler<IntakeInput> = async (data) => {
    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/ai-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("서버 응답 실패");
      const json = (await res.json()) as { ok: boolean };
      if (!json.ok) throw new Error("제출이 거절되었습니다");
      setStatus("success");
      reset();
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  if (status === "success") {
    return (
      <div
        role="status"
        aria-live="polite"
        className="font-kr"
        style={{
          background: "var(--gy-surface-1)",
          border: "1px solid var(--gy-hairline)",
          borderRadius: "var(--gy-rounded-lg)",
          padding: "clamp(1.75rem, 3vw, 2.25rem)",
        }}
      >
        <p
          className="font-en"
          style={{
            fontSize: "12px",
            fontWeight: 700,
            letterSpacing: "0.125em",
            color: "var(--gy-deep)",
            textTransform: "uppercase",
          }}
        >
          Received
        </p>
        <p
          style={{
            marginTop: "0.75rem",
            fontSize: "1.125rem",
            fontWeight: 600,
            lineHeight: 1.6,
            color: "var(--gy-ink)",
            wordBreak: "keep-all",
          }}
        >
          신청이 도착했습니다. 48시간 안에 답신드리고, 30분 1:1 콜 일정을
          잡습니다.
        </p>
        <p
          style={{
            marginTop: "1rem",
            fontSize: "0.9375rem",
            fontWeight: 500,
            lineHeight: 1.75,
            color: "var(--gy-ink-muted)",
            wordBreak: "keep-all",
          }}
        >
          체험 세션은 2시간으로 진행하고, 끝나면 한 페이지로 정리한 진단
          리포트를 보내드립니다. 의뢰 여부와 무관합니다.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="font-kr"
      style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}
    >
      {/* 이름 */}
      <div>
        <label htmlFor="intake-name" className="sr-only">
          이름
        </label>
        <input
          id="intake-name"
          type="text"
          autoComplete="name"
          placeholder="이름"
          className="gy-input"
          aria-invalid={!!errors.name}
          aria-describedby={errors.name ? "intake-name-error" : undefined}
          {...register("name")}
        />
        {errors.name && (
          <p
            id="intake-name-error"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "var(--gy-error)",
            }}
          >
            {errors.name.message}
          </p>
        )}
      </div>

      {/* 이메일 */}
      <div>
        <label htmlFor="intake-email" className="sr-only">
          회신 가능한 이메일
        </label>
        <input
          id="intake-email"
          type="email"
          autoComplete="email"
          placeholder="회신 가능한 이메일 (도메인 이메일 권장)"
          className="gy-input"
          aria-invalid={!!errors.email}
          aria-describedby={errors.email ? "intake-email-error" : undefined}
          {...register("email")}
        />
        {errors.email && (
          <p
            id="intake-email-error"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "var(--gy-error)",
            }}
          >
            {errors.email.message}
          </p>
        )}
      </div>

      {/* 직무·업종 */}
      <div>
        <label htmlFor="intake-role" className="sr-only">
          직무·업종
        </label>
        <input
          id="intake-role"
          type="text"
          autoComplete="organization-title"
          placeholder="직무·업종 (자유 기입)"
          className="gy-input"
          aria-invalid={!!errors.role}
          aria-describedby={errors.role ? "intake-role-error" : undefined}
          {...register("role")}
        />
        {errors.role && (
          <p
            id="intake-role-error"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "var(--gy-error)",
            }}
          >
            {errors.role.message}
          </p>
        )}
      </div>

      {/* blocker enum */}
      <fieldset
        aria-invalid={!!errors.blocker}
        aria-describedby={errors.blocker ? "intake-blocker-error" : undefined}
        style={{ border: "none", padding: 0, margin: 0 }}
      >
        <legend
          style={{
            fontSize: "0.9375rem",
            fontWeight: 600,
            lineHeight: 1.5,
            color: "var(--gy-ink)",
            marginBottom: "0.75rem",
            wordBreak: "keep-all",
          }}
        >
          가장 막히는 결정 업무
        </legend>
        <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
          {blockerOptions.map((opt) => (
            <label
              key={opt.value}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "0.625rem",
                padding: "0.75rem 1rem",
                background: "var(--gy-surface-1)",
                border: "1px solid var(--gy-hairline)",
                borderRadius: "var(--gy-rounded-md)",
                cursor: "pointer",
                transition: "border-color 200ms var(--gy-easing-out)",
              }}
            >
              <input
                type="radio"
                value={opt.value}
                {...register("blocker")}
                style={{
                  marginTop: "0.25rem",
                  accentColor: "var(--gy-deep)",
                  width: "16px",
                  height: "16px",
                  flexShrink: 0,
                }}
              />
              <span
                style={{
                  fontSize: "0.9375rem",
                  fontWeight: 500,
                  lineHeight: 1.6,
                  color: "var(--gy-ink)",
                  wordBreak: "keep-all",
                }}
              >
                {opt.label}
              </span>
            </label>
          ))}
        </div>
        {errors.blocker && (
          <p
            id="intake-blocker-error"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "var(--gy-error)",
            }}
          >
            {errors.blocker.message}
          </p>
        )}
      </fieldset>

      {/* decision */}
      <div>
        <label htmlFor="intake-decision" className="sr-only">
          풀고 싶은 결정 또는 업무
        </label>
        <textarea
          id="intake-decision"
          rows={4}
          placeholder="풀고 싶은 결정 또는 업무를 한두 문장으로"
          className="gy-input"
          style={{ resize: "vertical" }}
          aria-invalid={!!errors.decision}
          aria-describedby={
            errors.decision ? "intake-decision-error" : undefined
          }
          {...register("decision")}
        />
        {errors.decision && (
          <p
            id="intake-decision-error"
            style={{
              marginTop: "0.5rem",
              fontSize: "0.8125rem",
              color: "var(--gy-error)",
            }}
          >
            {errors.decision.message}
          </p>
        )}
      </div>

      {/* honeypot */}
      <input
        type="text"
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        style={{
          position: "absolute",
          left: "-9999px",
          width: 0,
          height: 0,
          opacity: 0,
        }}
        {...register("_trap")}
      />

      <button
        type="submit"
        disabled={status === "submitting"}
        className="btn-primary"
        style={{
          justifyContent: "center",
          opacity: status === "submitting" ? 0.6 : 1,
          cursor: status === "submitting" ? "not-allowed" : "pointer",
        }}
      >
        <span>
          {status === "submitting" ? "보내는 중…" : "사전 신청 보내기"}
        </span>
      </button>

      <noscript>
        <p
          style={{
            fontSize: "0.875rem",
            color: "var(--gy-ink-muted)",
          }}
        >
          JavaScript가 비활성화되어 있습니다.{" "}
          <a
            href="mailto:hi@gyeol.page"
            className="link-flow"
            style={{ color: "var(--gy-deep)" }}
          >
            hi@gyeol.page
          </a>
          로 이메일 주시면 답변드리겠습니다.
        </p>
      </noscript>

      {submitError && (
        <p
          role="alert"
          style={{
            fontSize: "0.875rem",
            color: "var(--gy-error)",
          }}
        >
          전송 중 문제가 있었어요. 다시 시도해주세요.
        </p>
      )}
    </form>
  );
}
