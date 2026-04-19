"use client";

import { useState } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion, AnimatePresence } from "framer-motion";
import {
  contactSchema,
  projectTypes,
  type ContactInput,
} from "@/lib/contact-schema";
import SuccessWave from "./SuccessWave";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      projectType: "Brand Site",
      message: "",
      referenceUrl: "",
      company: "",
    },
  });

  const onSubmit: SubmitHandler<ContactInput> = async (data) => {
    setStatus("submitting");
    setSubmitError(null);
    try {
      const res = await fetch("/api/contact", {
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

  const inputCx =
    "w-full rounded-md bg-surface px-4 py-3 text-ink placeholder:text-muted outline-none transition-shadow duration-300 ease-[cubic-bezier(0.65,0,0.35,1)] focus:ring-2 focus:ring-wave focus:shadow-[0_0_20px_rgba(168,213,226,0.45)]";
  const labelCx = "block text-sm text-ink tracking-[-0.01em] mb-2";
  const errorCx = "mt-1.5 text-xs text-[#B23A48]";

  return (
    <AnimatePresence mode="wait">
      {status === "success" ? (
        <motion.div
          key="success"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
        >
          <SuccessWave />
        </motion.div>
      ) : (
        <motion.form
          key="form"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          className="flex flex-col gap-6"
        >
          <div>
            <label htmlFor="name" className={labelCx}>
              이름 / 브랜드명
            </label>
            <input
              id="name"
              type="text"
              autoComplete="name"
              placeholder="어떻게 불러드리면 될까요?"
              className={inputCx}
              aria-invalid={!!errors.name}
              {...register("name")}
            />
            {errors.name && <p className={errorCx}>{errors.name.message}</p>}
          </div>

          <div>
            <label htmlFor="email" className={labelCx}>
              이메일
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder="답장을 드릴 주소"
              className={inputCx}
              aria-invalid={!!errors.email}
              {...register("email")}
            />
            {errors.email && <p className={errorCx}>{errors.email.message}</p>}
          </div>

          <div>
            <label htmlFor="projectType" className={labelCx}>
              프로젝트 종류
            </label>
            <select
              id="projectType"
              className={inputCx}
              aria-invalid={!!errors.projectType}
              {...register("projectType")}
            >
              {projectTypes.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
            {errors.projectType && (
              <p className={errorCx}>{errors.projectType.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="message" className={labelCx}>
              결을 맞춰보고 싶은 이야기
            </label>
            <textarea
              id="message"
              rows={5}
              placeholder="어떤 결을 만들고 싶으신지 들려주세요"
              className={inputCx + " resize-none"}
              aria-invalid={!!errors.message}
              {...register("message")}
            />
            {errors.message && (
              <p className={errorCx}>{errors.message.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="referenceUrl" className={labelCx}>
              참고 자료 링크{" "}
              <span className="text-muted">(선택)</span>
            </label>
            <input
              id="referenceUrl"
              type="url"
              inputMode="url"
              placeholder="인스타그램, 기존 사이트 등"
              className={inputCx}
              aria-invalid={!!errors.referenceUrl}
              {...register("referenceUrl")}
            />
            {errors.referenceUrl && (
              <p className={errorCx}>{errors.referenceUrl.message}</p>
            )}
          </div>

          {/* honeypot */}
          <input
            type="text"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="absolute -left-[9999px] h-0 w-0 opacity-0"
            {...register("company")}
          />

          {submitError && (
            <p className="text-sm text-[#B23A48]">
              전송 중 문제가 있었어요: {submitError}
            </p>
          )}

          <button
            type="submit"
            disabled={status === "submitting"}
            className="btn-deep mt-2 inline-flex items-center justify-center rounded-full bg-deep px-8 py-4 text-bg text-sm sm:text-base tracking-[0.04em] transition-transform duration-500 ease-out hover:-translate-y-0.5 disabled:opacity-60 disabled:hover:translate-y-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-wave focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            {status === "submitting" ? "보내는 중…" : "결을 맞춰보기"}
          </button>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
