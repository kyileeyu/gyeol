// 결 스튜디오 명함 페이지 — vCard 다운로드 + 이벤트 버튼
"use client";

import { track } from "@/lib/analytics";
import { PROFILE } from "../lib/profile";

export default function SaveContactButton() {
  return (
    <a
      href={PROFILE.vcard_path}
      download="gyeol.vcf"
      onClick={(e) => {
        e.stopPropagation();
        track("card_save_contact", {});
        track("cta_external_click", { target: "save_contact" });
      }}
      className="block w-full rounded-2xl bg-deep px-5 py-4 text-center text-bg text-sm font-medium tracking-[0.04em] hover:opacity-90 transition-opacity"
    >
      연락처 저장
    </a>
  );
}
