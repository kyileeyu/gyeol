// /ai 강의 랜딩 — 상담 신청 폼 (4필드: 이름·이메일·관심주제·문의) v2
"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  classContactSchema,
  classTrackOptions,
  type ClassContactInput,
} from "../lib/class-contact-schema";
import { track } from "@/lib/analytics";
import { SuccessInline } from "@/features/intro-hub/components/SuccessInline";

type Status = "idle" | "submitting" | "success" | "error";

export function ClassContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<ClassContactInput>({
    resolver: zodResolver(classContactSchema),
    defaultValues: {
      name: "",
      email: "",
      track: "" as ClassContactInput["track"],
      message: "",
      _trap: "",
    },
  });

  const trackValue = watch("track");

  const onSubmit: SubmitHandler<ClassContactInput> = async (data) => {
    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/class-contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (!res.ok) throw new Error("서버 응답 실패");
      const json = (await res.json()) as { ok: boolean };
      if (!json.ok) throw new Error("제출이 거절되었습니다");
      setStatus("success");
      // 제출 성공 시 선택한 관심 주제를 class_inquiry_topic으로 발화 (추천 채택: 성공 시점 통합)
      track("class_inquiry_topic", { topic: data.track });
      track("class_inquiry_submit", {});
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
  const errorCx = "px-5 pb-3 text-xs text-[#B23A48]";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <SuccessInline message="곧 연락드리겠습니다." />
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
              <label htmlFor="class-name" className="sr-only">이름</label>
              <input
                id="class-name"
                type="text"
                autoComplete="name"
                placeholder="이름"
                className={inputCx}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "class-name-error" : undefined}
                {...register("name")}
              />
              {errors.name && (
                <p id="class-name-error" className={errorCx}>
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* 이메일 */}
            <div className={rowCx}>
              <label htmlFor="class-email" className="sr-only">이메일</label>
              <input
                id="class-email"
                type="email"
                autoComplete="email"
                placeholder="이메일"
                className={inputCx}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "class-email-error" : undefined}
                {...register("email")}
              />
              {errors.email && (
                <p id="class-email-error" className={errorCx}>
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* 관심 주제 */}
            <div className={rowCx}>
              <label htmlFor="class-track" className="sr-only">관심 주제</label>
              <select
                id="class-track"
                defaultValue=""
                className={
                  inputCx +
                  " appearance-none cursor-pointer" +
                  (trackValue ? "" : " text-muted")
                }
                aria-invalid={!!errors.track}
                aria-describedby={errors.track ? "class-track-error" : undefined}
                {...register("track")}
              >
                <option value="" disabled hidden>
                  관심 주제를 선택해주세요
                </option>
                {classTrackOptions.map((t) => (
                  <option key={t} value={t} className="text-ink">
                    {t}
                  </option>
                ))}
              </select>
              {errors.track && (
                <p id="class-track-error" className={errorCx}>
                  {errors.track.message}
                </p>
              )}
            </div>

            {/* 문의 내용 */}
            <div className={rowCx}>
              <label htmlFor="class-message" className="sr-only">만들고 싶은 것 또는 막히는 지점</label>
              <textarea
                id="class-message"
                rows={4}
                placeholder="만들고 싶은 것 또는 막히는 지점"
                className={inputCx + " resize-none"}
                aria-invalid={!!errors.message}
                aria-describedby={errors.message ? "class-message-error" : undefined}
                {...register("message")}
              />
              {errors.message && (
                <p id="class-message-error" className={errorCx}>
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
                {status === "submitting" ? "보내는 중…" : "상담 신청하기"}
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
            <p className="mt-4 text-sm text-[#B23A48]">
              전송 중 문제가 있었어요. 다시 시도해주세요.
            </p>
          )}
        </motion.form>
      )}
    </AnimatePresence>
  );
}
