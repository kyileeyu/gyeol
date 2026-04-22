import Hero from "@/components/sections/Hero";
import PromiseSection from "@/components/sections/PromiseSection";
import Work from "@/components/sections/Work";
import Capability from "@/components/sections/Capability";
import Process from "@/components/sections/Process";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <PromiseSection />
      <Work />
      <Capability />
      <Process />
      <Contact />
      <Footer />
    </main>
  );
}
