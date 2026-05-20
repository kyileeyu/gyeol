// 결 스튜디오 명함 — 앞면 (좌측 텍스트 컬럼 + 우측 프로필 풀 높이)
import Image from "next/image";
import { PROFILE } from "../lib/profile";
import styles from "../styles/card.module.css";

interface CardFrontProps {
  hidden: boolean;
}

export default function CardFront({ hidden }: CardFrontProps) {
  return (
    <div
      className={styles.face}
      aria-hidden={hidden}
      role="region"
      aria-label="명함 앞면"
    >
      {/* 프로필 사진 — 카드 전체 배경. 사진의 흰 배경이 좌측 텍스트 영역까지 채움. */}
      <div className="absolute inset-0 overflow-hidden rounded-[inherit]">
        <Image
          src={PROFILE.profile_image}
          alt="유승현 — 결 스튜디오 대표"
          fill
          priority
          sizes="(max-width: 640px) 86vw, 360px"
          className="object-cover object-center"
        />
      </div>

      {/* 좌측 상단: 이름 + 소속 */}
      <div className="relative z-10 flex flex-col">
        {/* 이름 */}
        <p className="font-kr text-[clamp(1.75rem,8vw,2.25rem)] text-ink font-bold leading-[1.05] tracking-wide whitespace-nowrap">
          {PROFILE.name_kr}
        </p>
        <p className="font-en text-[13px] text-muted mt-1 tracking-wide whitespace-nowrap">
          {PROFILE.name_en}
        </p>

        {/* 소속 */}
        <div className="mt-4">
          <p className="text-[12px] text-ink leading-tight whitespace-nowrap">
            스튜디오 결
          </p>
          <p className="font-en text-[10px] text-muted leading-tight mt-0.5 tracking-wide whitespace-nowrap">
            Studio Gyeol
          </p>
        </div>
      </div>

      {/* 우측 상단 QR — 패딩(52px) 모서리에 맞춤, 사진 위 오버레이 (투명 배경) */}
      <img
        src="/card/qr.svg"
        alt="결 스튜디오 QR 코드"
        width={56}
        height={56}
        onClick={(e) => e.stopPropagation()}
        className="absolute top-[48px] right-[48px] z-20 w-14 h-14 select-none"
      />
    </div>
  );
}
