import { useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import type { Project } from "./data";

interface ProjectCardProps {
  project: Project;
  index: number;
  totalCards: number;
}

function Frame({
  src,
  alt,
  className,
  style,
}: {
  src: string | null;
  alt: string;
  className: string;
  style?: React.CSSProperties;
}) {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    return (
      <div
        className={`${className} flex items-center justify-center border border-dashed border-[#D7E2EA]/15 bg-[#D7E2EA]/[0.03] text-center text-xs uppercase tracking-wide text-[#D7E2EA]/30`}
        style={style}
      >
        {alt}
      </div>
    );
  }
  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      className={className}
      style={style}
      onError={() => setFailed(true)}
    />
  );
}

export default function ProjectCard({ project, index, totalCards }: ProjectCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"],
  });

  const targetScale = 1 - (totalCards - 1 - index) * 0.03;
  const scale = useTransform(scrollYProgress, [0, 1], [1, targetScale]);

  return (
    <div ref={cardRef} className="sticky sm:h-[85vh]" style={{ top: `${index * 28 + 96}px` }}>
      <motion.div
        style={{ scale }}
        className="flex h-full w-full flex-col gap-4 rounded-3xl border-2 border-[#D7E2EA] bg-[#0C0C0C] p-4 sm:gap-6 sm:rounded-[50px] sm:p-6 md:rounded-[60px] md:p-8"
      >
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4 sm:gap-6">
            <span
              className="hero-heading font-black leading-none"
              style={{ fontSize: "clamp(2.5rem, 9vw, 120px)" }}
            >
              {project.number}
            </span>
            <div className="flex flex-col">
              <span className="text-xs uppercase tracking-widest text-[#D7E2EA]/60 sm:text-sm">
                {project.category}
              </span>
              <span className="text-lg font-medium uppercase text-[#D7E2EA] sm:text-2xl md:text-3xl">
                {project.name}
              </span>
              <p className="mt-2 hidden max-w-md text-sm leading-relaxed text-[#D7E2EA]/50 md:block">
                {project.desc}
              </p>
            </div>
          </div>

          {project.url && (
            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 rounded-full border border-[#D7E2EA]/30 px-4 py-2 text-xs font-medium uppercase tracking-wider text-[#D7E2EA] transition-colors duration-200 hover:border-[#D7E2EA] hover:bg-[#D7E2EA] hover:text-[#0C0C0C] sm:text-sm"
            >
              View Project
              <ArrowUpRight
                size={16}
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
          )}
        </div>

        <div className="flex min-h-0 flex-1 flex-col gap-3 sm:flex-row sm:gap-4">
          <div className="flex w-full flex-col gap-3 sm:w-[40%] sm:gap-4">
            <Frame
              src={project.col1Image1}
              alt={`${project.name} interface detail`}
              className="aspect-[16/10] w-full rounded-2xl object-cover sm:aspect-auto sm:h-[clamp(130px,16vw,230px)] sm:rounded-[40px] md:rounded-[60px]"
            />
            <Frame
              src={project.col1Image2}
              alt={`${project.name} secondary screen`}
              className="aspect-[16/10] w-full rounded-2xl object-cover sm:aspect-auto sm:h-[clamp(160px,22vw,340px)] sm:rounded-[40px] md:rounded-[60px]"
            />
          </div>
          <div className="w-full sm:w-[60%]">
            <Frame
              src={project.col2Image}
              alt={`${project.name} main screen`}
              className="aspect-[4/3] w-full rounded-2xl object-cover sm:aspect-auto sm:h-full sm:rounded-[40px] md:rounded-[60px]"
            />
          </div>
        </div>
      </motion.div>
    </div>
  );
}