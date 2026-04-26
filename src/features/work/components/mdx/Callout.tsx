import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  tone?: "note" | "warn";
};

export default function Callout({ children, tone = "note" }: Props) {
  const accent =
    tone === "warn"
      ? "border-l-deep bg-surface/40"
      : "border-l-wave bg-surface/40";
  return (
    <aside
      className={`my-8 border-l-2 px-5 py-4 text-[0.95em] leading-[1.85] text-ink ${accent}`}
    >
      {children}
    </aside>
  );
}
