"use client";

import { useEffect } from "react";
import { track } from "@/lib/analytics";

export function LinksViewTracker() {
  useEffect(() => {
    track("links_view", {});
  }, []);
  return null;
}
