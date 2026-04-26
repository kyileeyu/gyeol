type Props = {
  href: string;
};

export default function LiveSiteCTA({ href }: Props) {
  const display = href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  return (
    <div className="not-prose my-16 flex justify-center">
      <a
        href={href}
        target="_blank"
        rel="noreferrer noopener"
        className="btn-deep btn-wave inline-flex items-center gap-3 rounded-full bg-deep px-7 py-3 font-en text-sm tracking-[0.2em] uppercase text-bg transition-colors"
      >
        <span>Visit {display}</span>
        <span aria-hidden>↗</span>
      </a>
    </div>
  );
}
