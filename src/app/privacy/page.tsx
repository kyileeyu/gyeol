import type { Metadata } from "next";
import Link from "next/link";
import { SITE_BRAND, SITE_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "개인정보처리방침",
  robots: { index: false, follow: false },
};

const EFFECTIVE_DATE = "2026년 4월 25일";

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-bg text-ink px-6 py-24 md:px-12 md:py-32">
      <article className="mx-auto max-w-2xl">
        <Link
          href="/"
          className="inline-block mb-12 text-xs tracking-[0.3em] text-muted uppercase hover:text-deep transition-colors"
        >
          ← 결로 돌아가기
        </Link>
        <h1 className="text-3xl md:text-4xl font-light mb-3 break-keep">
          개인정보처리방침
        </h1>
        <p className="text-sm text-muted mb-12">
          시행일자: {EFFECTIVE_DATE}
        </p>

        <div className="text-sm md:text-base font-light leading-7 text-ink/80 space-y-10 break-keep">
          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              1. 수집하는 개인정보 항목과 수집 방법
            </h2>
            <p>
              {SITE_BRAND}는 별도의 회원가입 없이 운영되며, 의뢰 상담을 위한
              <strong className="text-deep"> Contact 폼</strong>을 통해 다음
              항목을 직접 수집합니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>이름 또는 브랜드명</li>
              <li>이메일 주소</li>
              <li>프로젝트 종류 (Brand Site / Portfolio / 기타)</li>
              <li>의뢰 내용 (자유 텍스트)</li>
              <li>참고 자료 링크 (선택)</li>
            </ul>
            <p className="mt-3">
              수집 목적: 의뢰 응대, 견적 안내, 상담 진행. 위 목적 외의 용도로는
              사용하지 않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              2. 자동 수집 정보 (분석 도구·쿠키)
            </h2>
            <p>
              방문자 행동 분석을 위해 Google Analytics 4 를 사용하며, 이
              과정에서 다음 정보가 자동 수집됩니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>익명화된 IP 주소, 접속 국가·지역</li>
              <li>디바이스·브라우저·OS 정보</li>
              <li>페이지 조회·체류 시간, 스크롤 깊이</li>
              <li>외부 링크·CTA·폼 클릭 등 인터랙션 이벤트</li>
              <li>Core Web Vitals(LCP, INP, CLS) 등 성능 지표</li>
              <li>
                Google Analytics 4 가 사용하는 분석용 쿠키 (
                <code className="text-xs bg-surface px-1 py-0.5 rounded">
                  _ga
                </code>
                ,{" "}
                <code className="text-xs bg-surface px-1 py-0.5 rounded">
                  _ga_*
                </code>
                )
              </li>
            </ul>
            <p className="mt-3">
              쿠키 사용을 원하지 않으실 경우, 브라우저 설정에서 쿠키를 차단하거나{" "}
              <a
                href="https://tools.google.com/dlpage/gaoptout"
                target="_blank"
                rel="noopener noreferrer"
                className="text-deep underline underline-offset-2"
              >
                Google Analytics 차단 부가기능
              </a>
              을 설치해 거부할 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              3. 보유 및 이용 기간
            </h2>
            <p>
              Contact 폼으로 수집된 정보는 의뢰 응대 완료 후{" "}
              <strong className="text-deep">6개월</strong> 동안 보관 후 파기하며,
              정보주체의 요청이 있을 경우 즉시 파기합니다. 분석 데이터는 Google
              Analytics 정책에 따라 최대 14개월 보관 후 자동 삭제됩니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              4. 제3자 제공 및 처리위탁
            </h2>
            <p>
              {SITE_BRAND}는 수집된 정보를 제3자에게 판매·제공하지 않습니다. 다만
              서비스 운영을 위해 다음 사업자에게 처리를 위탁합니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-2">
              <li>
                <strong className="text-deep">Resend Inc.</strong> (미국) — Contact
                폼 메일 발송 위탁 ·{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  개인정보처리방침
                </a>
              </li>
              <li>
                <strong className="text-deep">Cloudflare, Inc.</strong> (미국) —
                호스팅 ·{" "}
                <a
                  href="https://www.cloudflare.com/privacypolicy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  Privacy Policy
                </a>
              </li>
              <li>
                <strong className="text-deep">Google LLC</strong> (미국) — Google
                Analytics 4 분석 ·{" "}
                <a
                  href="https://policies.google.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  개인정보처리방침
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              5. 정보주체의 권리와 행사 방법
            </h2>
            <p>
              정보주체는 언제든지 본인의 개인정보에 대해 열람·정정·삭제·처리정지를
              요청할 수 있습니다. 권리 행사는 아래 7장의 책임자 연락처로 이메일을
              보내주시면 지체 없이 처리해 드립니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              6. 안전성 확보 조치
            </h2>
            <p>
              {SITE_BRAND}는 개인정보 보호를 위해 다음과 같은 조치를 취하고
              있습니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>
                전 구간 HTTPS 암호화 통신 (TLS 1.3 / Let&apos;s Encrypt)
              </li>
              <li>
                의뢰 폼 데이터는 Resend 위탁 채널로만 전달되며 자체 데이터베이스에
                저장하지 않음
              </li>
              <li>봇 자동 차단을 위한 Honeypot 필드 적용</li>
              <li>접근 권한이 있는 운영자만 의뢰 메일 열람</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              7. 개인정보 보호 책임자
            </h2>
            <p>
              개인정보 처리에 관한 업무를 총괄해서 책임지고, 정보주체의 불만 처리
              및 피해 구제 등을 위해 책임자를 지정하고 있습니다.
            </p>
            <ul className="mt-3 list-disc pl-5 space-y-1">
              <li>책임자: {SITE_BRAND} 운영자</li>
              <li>
                연락처:{" "}
                <a
                  href={`mailto:${SITE_EMAIL}`}
                  className="text-deep underline underline-offset-2"
                >
                  {SITE_EMAIL}
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">
              8. 권익 침해 구제 방법
            </h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>
                개인정보분쟁조정위원회 — 1833-6972 /{" "}
                <a
                  href="https://privacy.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  privacy.go.kr
                </a>
              </li>
              <li>
                개인정보침해신고센터(KISA) — 118 /{" "}
                <a
                  href="https://privacy.kisa.or.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  privacy.kisa.or.kr
                </a>
              </li>
              <li>
                대검찰청 사이버수사과 — 1301 /{" "}
                <a
                  href="https://spo.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  spo.go.kr
                </a>
              </li>
              <li>
                경찰청 사이버수사국 — 182 /{" "}
                <a
                  href="https://ecrm.cyber.go.kr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-deep underline underline-offset-2"
                >
                  ecrm.cyber.go.kr
                </a>
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-medium text-ink mb-3">9. 개정 이력</h2>
            <ul className="list-disc pl-5 space-y-1">
              <li>{EFFECTIVE_DATE} — 최초 공개</li>
            </ul>
          </section>
        </div>
      </article>
    </main>
  );
}
