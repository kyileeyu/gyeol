export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://gyeol.page";

export const SITE_NAME = "결 Gyeol";
export const SITE_BRAND = "결 스튜디오";

export const SITE_DESCRIPTION =
  "결이 맞는 페이지를 만드는 웹 스튜디오. 브랜드와 개인을 위한 3D 인터랙티브 웹 스튜디오 — 보이는 것만큼, 보이게도 만듭니다.";

export const SITE_SLOGAN = "보이는 것만큼, 보이게도 만듭니다";
export const SITE_EMAIL = "hi@gyeol.page";

// 운영자 정보 — Person JSON-LD 용
export const OPERATOR_NAME = "유승현";
export const OPERATOR_JOB_TITLE = "Design Engineer";
export const OPERATOR_SAME_AS: string[] = [
  "https://www.linkedin.com/in/seunghyun-yu/",
  "https://github.com/kyileeyu",
  "https://www.threads.com/@gyeolpage",
  "https://www.instagram.com/gyeolpage/",
];

// 검색엔진 인증 코드 — Search Console / Naver Search Advisor 등록 코드
export const VERIFICATION = {
  google: "" as string,
  naver: "12cd8d350e6e28e59a1175ec954feb3062304d89" as string,
};
