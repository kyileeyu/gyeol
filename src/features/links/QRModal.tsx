"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import QRCode from "qrcode";
import { track } from "@/lib/analytics";
import { LINKS_PAGE_URL } from "./data";
import { CheckIcon, CloseIcon, CopyIcon } from "./icons";

interface Props {
  open: boolean;
  onClose: () => void;
}

export default function QRModal({ open, onClose }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);
  const [copied, setCopied] = useState(false);
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!open) return;
    let cancelled = false;
    QRCode.toDataURL(LINKS_PAGE_URL, {
      margin: 1,
      width: 480,
      color: { dark: "#0142A0", light: "#FCFDFF" },
    })
      .then((url) => {
        if (!cancelled) setDataUrl(url);
      })
      .catch(() => {
        if (!cancelled) setDataUrl(null);
      });
    return () => {
      cancelled = true;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    closeButtonRef.current?.focus();
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(LINKS_PAGE_URL);
      track("links_copy_url", {});
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      // 무시 — fallback 없이도 사용자가 URL을 직접 선택 가능
    }
  }, []);

  if (!open) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="페이지 공유 — QR 코드"
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
    >
      <button
        type="button"
        aria-label="닫기"
        onClick={onClose}
        className="absolute inset-0 bg-deep/40 backdrop-blur-sm"
      />
      <div className="relative w-full max-w-sm rounded-xl border border-hairline bg-canvas p-6 shadow-[var(--gy-shadow-lg)]">
        <button
          type="button"
          ref={closeButtonRef}
          onClick={onClose}
          aria-label="닫기"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-ink-muted transition hover:bg-surface-1 hover:text-ink focus:outline-none focus-visible:shadow-[var(--gy-shadow-focus)]"
        >
          <CloseIcon size={18} />
        </button>
        <h2 className="text-[18px] font-semibold tracking-[-0.2px] text-ink">
          이 페이지를 공유하세요
        </h2>
        <p className="mt-1 text-[13px] font-medium text-ink-muted">
          QR을 스캔하거나 URL을 복사하세요.
        </p>
        <div className="mt-4 flex items-center justify-center rounded-lg border border-hairline bg-surface-1 p-4">
          {dataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={dataUrl}
              alt={`${LINKS_PAGE_URL} QR 코드`}
              width={224}
              height={224}
              className="h-56 w-56"
            />
          ) : (
            <div className="h-56 w-56 animate-pulse rounded-md bg-surface-2" />
          )}
        </div>
        <p className="mt-4 break-all text-center font-en text-[13px] font-medium text-ink-muted">
          {LINKS_PAGE_URL}
        </p>
        <button
          type="button"
          onClick={handleCopy}
          className="btn-primary mt-4 w-full justify-center"
        >
          {copied ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
          {copied ? "복사됨" : "URL 복사"}
        </button>
      </div>
    </div>
  );
}
