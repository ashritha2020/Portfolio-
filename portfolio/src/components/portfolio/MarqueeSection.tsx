import { useEffect, useRef, useState } from "react";
import { MARQUEE_ROW_1, MARQUEE_ROW_2 } from "./data";

const ROW_1 = [...MARQUEE_ROW_1, ...MARQUEE_ROW_1, ...MARQUEE_ROW_1];
const ROW_2 = [...MARQUEE_ROW_2, ...MARQUEE_ROW_2, ...MARQUEE_ROW_2];

export default function MarqueeSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const el = sectionRef.current;
      if (!el) return;
      const sectionTop = el.getBoundingClientRect().top + window.scrollY;
      setOffset((window.scrollY - sectionTop + window.innerHeight) * 0.3);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (ROW_1.length === 0 && ROW_2.length === 0) return null;

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#0C0C0C] pb-10 pt-24 sm:pt-32 md:pt-40"
      style={{ overflowX: "clip" }}
    >
      <div className="flex flex-col gap-3">
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${offset - 200}px)`, willChange: "transform" }}
        >
          {ROW_1.map((src, i) => (
            <img
              key={`row1-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-[140px] w-[220px] flex-shrink-0 rounded-2xl object-cover sm:h-[190px] sm:w-[300px] md:h-[270px] md:w-[420px]"
            />
          ))}
        </div>
        <div
          className="flex gap-3"
          style={{ transform: `translateX(${-(offset - 200)}px)`, willChange: "transform" }}
        >
          {ROW_2.map((src, i) => (
            <img
              key={`row2-${i}`}
              src={src}
              alt=""
              loading="lazy"
              className="h-[140px] w-[220px] flex-shrink-0 rounded-2xl object-cover sm:h-[190px] sm:w-[300px] md:h-[270px] md:w-[420px]"
            />
          ))}
        </div>
      </div>
    </section>
  );
}