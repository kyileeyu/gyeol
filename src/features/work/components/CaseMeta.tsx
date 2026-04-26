import type { CaseMeta as CaseMetaType } from "../lib/types";

type Props = {
  meta: CaseMetaType;
};

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-6">
      <dt className="shrink-0 font-en text-[11px] tracking-[0.3em] uppercase text-muted sm:w-20">
        {label}
      </dt>
      <dd className="text-sm leading-[1.7] text-ink">{children}</dd>
    </div>
  );
}

export default function CaseMeta({ meta }: Props) {
  return (
    <dl className="not-prose my-12 flex flex-col gap-4 border-y border-ink/10 py-6">
      <Row label="Role">{meta.role}</Row>
      <Row label="Period">{meta.period}</Row>
      <Row label="Stack">{meta.stack.join(" · ")}</Row>
      {meta.liveUrl && (
        <Row label="Live">
          <a
            href={meta.liveUrl}
            target="_blank"
            rel="noreferrer noopener"
            className="text-deep underline decoration-wave underline-offset-4 transition-colors hover:text-ink"
          >
            {meta.liveUrl.replace(/^https?:\/\//, "").replace(/\/$/, "")} ↗
          </a>
        </Row>
      )}
    </dl>
  );
}
