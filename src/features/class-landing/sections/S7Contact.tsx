// /ai 강의 랜딩 S7 — Contact / 상담 신청 (v2: S6에서 번호 이동)
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "@/features/intro-hub/components/SectionHeading";
import { ClassContactForm } from "../components/ClassContactForm";

export function ClassS7Contact() {
  return (
    <SectionView name="contact" threshold={0.1}>
      <section
        id="class-contact"
        className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-surface"
      >
        <div className="max-w-lg">
          <SectionHeading
            heading="체험 세션으로 먼저 만나봅니다."
            className="mb-10"
          />
          <ClassContactForm />
        </div>
      </section>
    </SectionView>
  );
}
