// /me 소개 허브 S6 — CTA / 가벼운 문의
import { SectionView } from "@/components/SectionView";
import { SectionHeading } from "../components/SectionHeading";
import { HubContactForm } from "../components/HubContactForm";

export function S6Contact() {
  return (
    <SectionView name="contact" threshold={0.1}>
      <section
        id="contact"
        className="w-full px-6 sm:px-10 md:px-16 lg:px-[120px] py-20 lg:py-28 bg-surface"
      >
        <div className="max-w-lg">
          <SectionHeading
            heading="어디서 시작할지 모르겠다면, 먼저 이야기 나눠보세요."
            className="mb-10"
          />
          <HubContactForm />
        </div>
      </section>
    </SectionView>
  );
}
