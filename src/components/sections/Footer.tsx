export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative w-full border-t border-ink/10 bg-bg px-6 py-16 sm:py-20">
      <div className="mx-auto flex max-w-6xl flex-col gap-12">
        <div className="flex flex-col justify-between gap-10 md:flex-row md:items-end">
          <div className="flex flex-col gap-3">
            <p className="font-kr-serif text-3xl font-medium tracking-[-0.02em] text-ink">
              결
            </p>
            <p className="max-w-sm text-sm leading-[1.8] text-muted">
              결이 맞는 페이지를 만드는 웹 스튜디오.
            </p>
          </div>

          <nav
            aria-label="Footer"
            className="grid grid-cols-2 gap-x-10 gap-y-3 sm:grid-cols-3"
          >
            <a
              href="mailto:hello@gyeol.page"
              className="group flex flex-col gap-1"
            >
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">
                Contact
              </span>
              <span className="font-en text-sm text-ink transition-colors duration-300 group-hover:text-deep">
                hello@gyeol.page
              </span>
            </a>
            <a
              href="https://github.com/kyileeyu/gyeol"
              target="_blank"
              rel="noreferrer noopener"
              className="group flex flex-col gap-1"
            >
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">
                GitHub
              </span>
              <span className="font-en text-sm text-ink transition-colors duration-300 group-hover:text-deep">
                kyileeyu/gyeol ↗
              </span>
            </a>
            <a
              href="https://gyeol.page"
              className="group flex flex-col gap-1"
            >
              <span className="font-en text-[10px] tracking-[0.25em] uppercase text-muted">
                Domain
              </span>
              <span className="font-en text-sm text-ink transition-colors duration-300 group-hover:text-deep">
                gyeol.page
              </span>
            </a>
          </nav>
        </div>

        <div className="flex flex-col gap-3 border-t border-ink/10 pt-8 text-xs leading-[1.8] text-muted/80 sm:flex-row sm:items-center sm:justify-between">
          <p className="font-en tracking-[0.15em]">
            © {year} Gyeol Studio. All rights reserved.
          </p>
          <p className="tracking-[0.05em]">
            사업자 정보는 문의 시 안내드립니다.
          </p>
        </div>
      </div>
    </footer>
  );
}
