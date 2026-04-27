"use client";

import { useScrollDepth } from "@/hooks/useScrollDepth";

export function ScrollDepthTracker() {
  useScrollDepth();
  return null;
}
