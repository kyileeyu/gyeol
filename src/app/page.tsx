import FixedLiquidBackground from "@/components/hero/FixedLiquidBackground";
import Hero from "@/components/sections/Hero";
import PromiseSection from "@/components/sections/PromiseSection";
import WorkSection from "@/features/work";
import Capability from "@/components/sections/Capability";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <FixedLiquidBackground />
      <Hero />
      <PromiseSection />
      <WorkSection />
      <Capability />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
