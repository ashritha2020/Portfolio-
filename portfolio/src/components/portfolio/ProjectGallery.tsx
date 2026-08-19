import { useState } from "react";
import FadeIn from "./FadeIn";
import brewHome from "@/assets/brew-home.png";
import brewMenu from "@/assets/brew-menu.png";
import brewContact from "@/assets/brew-contact.png";
import valereHome from "@/assets/valere-home.png";
import valereShop from "@/assets/valere-shop.png";
import valereSignin from "@/assets/valere-signin.png";
import ledgerlyDashboard from "@/assets/ledgerly-dashboard.png";
import ledgerlyStats from "@/assets/ledgerly-stats.png";
import ledgerlyHabits from "@/assets/ledgerly-habits.png";

interface Shot {
  src: string;
  label: string;
}

const ROW_1: Shot[] = [
  { src: brewHome, label: "Brew and Chapters — home" },
  { src: brewMenu, label: "Brew and Chapters — menu" },
  { src: brewContact, label: "Brew and Chapters — contact" },
  { src: valereHome, label: "Valere — home" },
  { src: valereShop, label: "Valere — shop" },
  { src: valereSignin, label: "Valere — sign in" },
  { src: ledgerlyDashboard, label: "Ledgerly — dashboard" },
  { src: ledgerlyStats, label: "Ledgerly — statistics" },
  { src: ledgerlyHabits, label: "Ledgerly — habit tracker" },
];

function GalleryImage({ src, label }: Shot) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className="flex h-full w-full select-none items-center justify-center px-4 text-center text-xs uppercase tracking-wide text-[#D7E2EA]/30"
        style={{ aspectRatio: "16 / 9" }}
      >
        {label}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={label}
      loading="lazy"
      draggable={false}
      className="h-full w-full select-none object-cover"
      style={{ aspectRatio: "16 / 9" }}
      onError={() => setFailed(true)}
    />
  );
}

/**
 * Pure-CSS infinite marquee: the shot list is duplicated back-to-back and
 * the track is translated by exactly -50% of its own width, which is
 * always the width of a single loop — this stays seamless at any gap size
 * or breakpoint and needs no JS timing/measurement to run.
 */
function Row({ shots, reverse, duration = 36 }: { shots: Shot[]; reverse?: boolean; duration?: number }) {
  const loop = [...shots, ...shots];

  return (
    <div className="relative flex w-full overflow-hidden">
      <div
        className="flex w-max shrink-0 gap-3 sm:gap-6"
        style={{
          animation: `gallery-scroll ${duration}s linear infinite`,
          animationDirection: reverse ? "reverse" : "normal",
          willChange: "transform",
        }}
      >
        {loop.map((shot, i) => (
          <figure
            key={`${shot.label}-${i}`}
            className="w-[78vw] shrink-0 overflow-hidden rounded-2xl border border-[#D7E2EA]/10 bg-[#111] xs:w-[62vw] sm:w-[42vw] lg:w-[30vw]"
          >
            <GalleryImage src={shot.src} label={shot.label} />
          </figure>
        ))}
      </div>
    </div>
  );
}

export default function ProjectGallery() {
  return (
    <section className="relative z-10 bg-[#0C0C0C] py-16 sm:py-20 md:py-24">
      <FadeIn>
        <h2
          className="hero-heading mb-10 px-5 text-center font-black uppercase leading-none tracking-tight sm:mb-14 sm:px-8"
          style={{ fontSize: "clamp(2rem, 7vw, 90px)" }}
        >
          Screens
        </h2>
      </FadeIn>

      <div className="flex flex-col gap-4 sm:gap-6">
        <Row shots={ROW_1} duration={40} />
      </div>
    </section>
  );
}
