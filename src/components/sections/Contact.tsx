import ContactForm from "@/components/contact/ContactForm";

export default function Contact() {
  return (
    <section
      id="contact"
      className="relative min-h-[100svh] w-full bg-bg px-6 py-24 sm:py-32"
    >
      <div className="mx-auto flex max-w-xl flex-col gap-12">
        <header className="flex flex-col gap-4 text-center">
          <p className="font-en italic text-sm tracking-[0.2em] text-muted">
            Contact
          </p>
          <h2 className="text-[clamp(2rem,4.5vw,3rem)] font-medium tracking-[-0.03em] leading-[1.15] text-ink">
            결을 맞춰보기
          </h2>
        </header>

        <ContactForm />
      </div>
    </section>
  );
}
