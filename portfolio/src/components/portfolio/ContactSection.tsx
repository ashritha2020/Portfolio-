import FadeIn from "./FadeIn";
import ContactButton from "./ContactButton";
import { Linkedin, Github } from "lucide-react";

const EMAIL = "ashritha.d2005@gmail.com";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="relative flex flex-col items-center gap-10 bg-[#0C0C0C] px-5 py-28 sm:px-8 md:px-10 md:py-36"
    >
      <FadeIn>
        <h2
          className="hero-heading text-center font-black uppercase leading-none tracking-tight"
          style={{ fontSize: "clamp(3rem, 12vw, 160px)" }}
        >
          Contact
        </h2>
      </FadeIn>

      <FadeIn delay={0.1}>
        <p className="max-w-md text-center text-base leading-relaxed text-[#D7E2EA]/70 sm:text-lg">
          Open to frontend development and data analytics opportunities, freelance work and
          collaborations. The fastest way to reach me is email.
        </p>
      </FadeIn>

      <FadeIn delay={0.2}>
        <a
          href={`mailto:${EMAIL}`}
          className="hero-heading break-all text-center font-black uppercase tracking-tight"
          style={{ fontSize: "clamp(1.1rem, 4vw, 3.2rem)" }}
        >
          {EMAIL}
        </a>
      </FadeIn>

      <FadeIn delay={0.3}>
        <ContactButton label="Email Me" href={`mailto:${EMAIL}`} />
      </FadeIn>

      <FadeIn delay={0.35}>
        <div className="flex items-center gap-10 pt-6 text-xs uppercase tracking-widest text-[#D7E2EA]/60">
          <a
            href="https://www.linkedin.com/in/Ashritha.D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          >
            <Linkedin size={22} strokeWidth={1.5} />
            LinkedIn
          </a>
          <a
            href="https://github.com/Ashritha.D"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-opacity hover:opacity-70"
          >
            <Github size={22} strokeWidth={1.5} />
            GitHub
          </a>
        </div>
      </FadeIn>

      <FadeIn delay={0.4}>
        <p className="pt-14 text-xs uppercase tracking-[0.3em] text-[#D7E2EA]/40">
          Ashritha D — 2026
        </p>
      </FadeIn>
    </section>
  );
}