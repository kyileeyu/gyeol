import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  author?: string;
};

export default function Quote({ children, author }: Props) {
  return (
    <figure className="my-12">
      <blockquote className="font-kr-serif text-xl leading-[1.7] tracking-[-0.01em] text-deep">
        {children}
      </blockquote>
      {author && (
        <figcaption className="mt-3 font-en text-xs tracking-[0.25em] uppercase text-muted">
          — {author}
        </figcaption>
      )}
    </figure>
  );
}
