// /me 소개 허브 — 가벼운 문의 폼 (3필드: 이름·이메일·문의)
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import { hubContactSchema, type HubContactInput } from "../lib/hub-contact-schema";
import { track } from "@/lib/analytics";
import { SuccessInline } from "./SuccessInline";

type Status = "idle" | "submitting" | "success" | "error";

export function HubContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<HubContactInput>({
    resolver: zodResolver(hubContactSchema),
    defaultValues: { name: "", email: "", message: "", _trap: "" },
  });

  const onSubmit: SubmitHandler<HubContactInput> = async (data) => {
    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/hub-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("서버 응답 실패");
      const json = (await res.json()) as { ok: boolean };
      if (!json.ok) throw new Error("제출이 거절되었습니다");
      setStatus("success");
      track("hub_inquiry_submit", {});
      reset();
    } catch (err) {
      setStatus("error");
      setSubmitError(err instanceof Error ? err.message : "알 수 없는 오류");
    }
  };

  const inputCx =
    "w-full bg-transparent px-5 py-5 text-ink placeholder:text-muted outline-none border-0 text-base font-kr";
  const rowCx =
    "border-b border-ink/15 transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] focus-within:border-wave last:border-b-0";
  const errorCx = "px-5 pb-3 text-xs text-[#B3262B]";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SuccessInline message="곧 이야기 나눠보겠습니다." />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col"
        >
          <div className="rounded-3xl border border-ink/15 overflow-hidden">
            {/* 이름 */}
            <div className={rowCx}>
              <label htmlFor="hub-name" className="sr-only">이름</label>
              <input
                id="hub-name"
                type="text"
                autoComplete="name"
                placeholder="이름"
                className={inputCx}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "hub-name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="hub-name-error" className={errorCx}>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 이메일 */}
            <div className={rowCx}>
              <label htmlFor="hub-email" className="sr-only">이메일</label>
              <input
                id="hub-email"
                type="email"
                autoComplete="email"
                placeholder="이메일"
                className={inputCx}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "hub-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="hub-email-error" className={errorCx}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 문의 내용 */}
            <div className={rowCx}>
              <label htmlFor="hub-message" className="sr-only">어떤 부분이 궁금한가요</label>
              <textarea
                id="hub-message"
                rows={4}
                placeholder="어떤 부분이 궁금한가요?"
                className={inputCx + " resize-none"}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "hub-message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="hub-message-error" className={errorCx}>
                  {errors.message.message}
                </p>
              )}
            </div>

            {/* 제출 버튼 */}
            <button
              type="submit"
              disabled={status === "submitting"}
              className="btn-wave block w-full bg-wave px-5 py-5 text-deep text-sm sm:text-base font-medium tracking-[0.04em] transition-colors duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] hover:bg-wave/90 disabled:opacity-60 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave"
            >
              <span>
                {status === "submitting" ? "보내는 중…" : "이야기 나눠보기"}
              </span>
            </button>
          </div>

          {/* 허니팟 */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            {...register("_trap")}
          />

          {/* noscript 폴백 */}
          <noscript>
            <p className="mt-3 text-sm text-muted">
              JavaScript가 비활성화되어 있습니다.{" "}
              <a href="mailto:hi@gyeol.page" className="text-deep underline">
                hi@gyeol.page
              </a>
              로 이메일 주시면 답변드리겠습니다.
            </p>
          </noscript>

          {submitError && (
            <p className="mt-4 text-sm text-[#B3262B]">
              전송 중 문제가 있었어요. 다시 시도해주세요.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
