import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { SKILLS, PROJECTS, type Skill } from "./data";

export interface ProjectItem {
  number: string;
  name: string;
  category: string;
  desc: string;
  images: string[];
}

export interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  desc: string;
}

export interface GalleryShot {
  src: string;
  label: string;
}

export interface PortfolioContent {
  hero: { title: string; tagline: string };
  about: { heading: string; text: string };
  contact: { heading: string; blurb: string; email: string; footer: string };
  gallery: GalleryShot[];
  experience: Experience[];
  education: Education[];
  skills: Skill[];
  projects: ProjectItem[];
}

export const DEFAULT_CONTENT: PortfolioContent = {
  hero: {
    title: "Hi, I'm Ashritha",
    tagline: "A frontend web developer and data analytics enthusiast building user-friendly, data-driven digital solutions",
  },
  about: {
    heading: "About me",
    text: "I'm Ashritha D, a BCA graduate with a strong interest in frontend web development and data analytics. I'm passionate about building user-friendly web applications and leveraging AI-powered tools to create innovative digital solutions — a quick learner with strong problem-solving skills and a commitment to continuously learning emerging technologies.",
  },
  contact: {
    heading: "Contact",
    blurb:
      "Open to frontend development and data analytics opportunities, freelance work and collaborations. The fastest way to reach me is email.",
    email: "ashritha.d2005@gmail.com",
    footer: "Ashritha D — 2026",
  },
  gallery: PROJECTS.flatMap((p) =>
    [p.col2Image, p.col1Image1, p.col1Image2]
      .filter((src): src is string => Boolean(src))
      .map((src) => ({ src, label: p.name })),
  ),
  experience: [
    {
      role: "Frontend Web Development Intern",
      company: "Codtech IT Solutions Private Limited (Remote)",
      period: "March 2026",
      desc: "Built a quiz application with instant feedback, a real-time chat application using React.js, and a responsive single-page portfolio with navigation — using HTML, CSS and JavaScript.",
    },
    {
      role: "Data Analytics Intern",
      company: "Oasis Infobyte (Remote)",
      period: "November — December 2025",
      desc: "Performed data cleaning, preprocessing and EDA on real-world datasets. Analyzed data to identify patterns and trends using Python, Pandas and NumPy, created visualizations with Matplotlib and Seaborn, and applied basic machine learning concepts through multiple project-based tasks.",
    },
    {
      role: "Power BI Intern",
      company: "Cognifyz Technologies (Remote)",
      period: "November — December 2025",
      desc: "Performed data exploration and statistical analysis in Power BI to uncover investment patterns, analyzing trends using gender-based, objective-based and behavioral data techniques. Developed interactive visualizations and a comprehensive Power BI dashboard with filters to deliver key business insights.",
    },
  ],
  education: [
    {
      degree: "Bachelor of Computer Application",
      institution: "St. Pauls College",
      period: "2023 — 2026",
      desc: "",
    },
    {
      degree: "Pre-University",
      institution: "Vivekananda PU College For Women",
      period: "2021 — 2023",
      desc: "",
    },
  ],
  skills: SKILLS,
  projects: PROJECTS.map(({ number, name, category, desc, col2Image, col1Image1, col1Image2 }) => ({
    number,
    name,
    category,
    desc,
    images: [col2Image, col1Image1, col1Image2].filter((src): src is string => Boolean(src)),
  })),
};

const STORAGE_KEY = "portfolio-content-v4";

interface Ctx {
  content: PortfolioContent;
  setContent: (c: PortfolioContent) => void;
  reset: () => void;
}

const ContentContext = createContext<Ctx>({
  content: DEFAULT_CONTENT,
  setContent: () => {},
  reset: () => {},
});

export function ContentProvider({ children }: { children: ReactNode }) {
  const [content, setContentState] = useState<PortfolioContent>(DEFAULT_CONTENT);

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) setContentState({ ...DEFAULT_CONTENT, ...JSON.parse(raw) });
    } catch {
      /* ignore */
    }
  }, []);

  const value = useMemo<Ctx>(
    () => ({
      content,
      setContent: (c) => {
        setContentState(c);
        try {
          window.localStorage.setItem(STORAGE_KEY, JSON.stringify(c));
        } catch {
          /* ignore */
        }
      },
      reset: () => {
        setContentState(DEFAULT_CONTENT);
        try {
          window.localStorage.removeItem(STORAGE_KEY);
        } catch {
          /* ignore */
        }
      },
    }),
    [content],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function usePortfolioContent() {
  return useContext(ContentContext);
}
