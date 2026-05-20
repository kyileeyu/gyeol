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

      {/* 좌측: 텍스트 컬럼 (relative로 사진 위) */}
      <div className="relative z-10 w-[42%] h-full flex flex-col justify-between pr-2">
        {/* 상단: 이름 */}
        <div>
          <p className="font-kr text-[clamp(1.75rem,8vw,2.25rem)] text-ink font-bold leading-[1.05] tracking-tight">
            {PROFILE.name_kr}
          </p>
          <p className="font-en text-[13px] text-muted mt-1 tracking-wide">
            {PROFILE.name_en}
          </p>
        </div>

        {/* 중하단: 소속 + 직함 */}
        <div className="space-y-3 pb-1">
          <div>
            <p className="text-[12px] text-ink leading-tight">결 스튜디오</p>
            <p className="font-en text-[10px] text-muted leading-tight mt-0.5 tracking-wide">
              Gyeol Studio
            </p>
          </div>
          <div>
            <p className="text-[12px] text-ink leading-tight">대표</p>
            <p className="font-en text-[10px] text-muted leading-tight mt-0.5 tracking-wide">
              {PROFILE.role_en}
            </p>
          </div>
        </div>
      </div>

      {/* 우측 상단 워드마크 — 사진 위 오버레이 */}
      <span className="absolute top-5 right-5 z-20 font-en text-[10px] tracking-[0.25em] uppercase text-ink/70 select-none">
        Gyeol
      </span>
    </div>
  );
}
