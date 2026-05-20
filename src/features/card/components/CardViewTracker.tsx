// 결 스튜디오 명함 페이지 — 카드 조회 이벤트 1회 발화 트래커
"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export default function CardViewTracker() {
  useEffect(() => {
    track("card_view", {});
  }, []);
  return null;
}
