import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

// `next dev`(로컬 개발)에서만 Cloudflare 바인딩용 miniflare 초기화.
// `next build`(Vercel·Cloudflare 빌드) 환경에서 실행되면 miniflare가
// EPIPE로 죽어 빌드가 실패하므로 개발 모드로 한정한다.
if (process.env.NODE_ENV === "development") {
  initOpenNextCloudflareForDev();
}

/** @type {import('next').NextConfig} */

const securityHeaders = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
  },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  {
    key: "Permissions-Policy",
    value: "camera=(), microphone=(), geolocation=()",
  },
];

const nextConfig = {
  reactStrictMode: true,
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  async rewrites() {
    // ai.gyeol.page 서브도메인의 루트만 /ai로 rewrite.
    // /api·/_next·정적 자산·기타 경로는 통과시켜 폼 POST·이미지 등이 정상 동작하게 한다.
    return [
      {
        source: "/",
        has: [{ type: "host", value: "ai.gyeol.page" }],
        destination: "/ai",
      },
    ];
  },
};

export default nextConfig;
