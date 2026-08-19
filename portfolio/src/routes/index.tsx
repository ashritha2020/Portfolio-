import { createFileRoute } from "@tanstack/react-router";
import HeroSection from "@/components/portfolio/HeroSection";
import MarqueeSection from "@/components/portfolio/MarqueeSection";
import AboutSection from "@/components/portfolio/AboutSection";
import ResumeSection from "@/components/portfolio/ResumeSection";
import SkillsSection from "@/components/portfolio/SkillsSection";
import EditPanel from "@/components/portfolio/EditPanel";
import { ContentProvider } from "@/components/portfolio/content";
import ProjectsSection from "@/components/portfolio/ProjectsSection";
import ProjectGallery from "@/components/portfolio/ProjectGallery";
import ContactSection from "@/components/portfolio/ContactSection";

const TITLE = "Ashritha Portfolio";
const DESC =
  "Portfolio of Ashritha D, a frontend developer and data analytics enthusiast building user-friendly interfaces and data-driven digital solutions.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <ContentProvider>
      <div className="bg-[#0C0C0C]" style={{ overflowX: "clip" }}>
        <HeroSection />
        <MarqueeSection />
        <AboutSection />
        <ProjectGallery />
        <ResumeSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <EditPanel />
      </div>
    </ContentProvider>
  );
}
