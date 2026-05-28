import type { ReactNode } from "react";

export default function LinksLayout({ children }: { children: ReactNode }) {
  return (
    <div className="links-bg min-h-svh">
      <main className="relative mx-auto w-full max-w-md px-4 pt-14 pb-32 sm:px-5">
        {children}
      </main>
    </div>
  );
}
