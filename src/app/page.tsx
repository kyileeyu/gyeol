import FixedLiquidBackground from "@/components/hero/FixedLiquidBackground";
import Hero from "@/components/sections/Hero";
import PromiseSection from "@/components/sections/PromiseSection";
import WorkSection from "@/features/work";
import Capability from "@/components/sections/Capability";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";
import { SectionView } from "@/components/SectionView";

export default function Home() {
  return (
    <main>
      <FixedLiquidBackground />
      <SectionView name="hero">
        <Hero />
      </SectionView>
      <SectionView name="promise">
        <PromiseSection />
      </SectionView>
      <SectionView name="work">
        <WorkSection />
      </SectionView>
      <SectionView name="capability">
        <Capability />
      </SectionView>
      <SectionView name="process">
        <Process />
      </SectionView>
      <SectionView name="contact">
        <Contact />
      </SectionView>
      <SectionView name="footer">
        <Footer />
      </SectionView>
    </main>
  );
}
