import brewHome from "@/assets/brew-home.png";
import brewMenu from "@/assets/brew-menu.png";
import brewContact from "@/assets/brew-contact.png";
import valereHome from "@/assets/valere-home.png";
import valereShop from "@/assets/valere-shop.png";
import valereSignin from "@/assets/valere-signin.png";
import ledgerlyDashboard from "@/assets/ledgerly-dashboard.png";
import ledgerlyStats from "@/assets/ledgerly-stats.png";
import ledgerlyHabits from "@/assets/ledgerly-habits.png";

export interface Project {
  number: string;
  name: string;
  category: string;
  desc: string;
  col1Image1: string | null;
  col1Image2: string | null;
  col2Image: string | null;
  /** Optional live URL. When present, a "View Project" link is shown on the card. */
  url?: string;
}

export const PROJECTS: Project[] = [
  {
    number: "01",
    name: "Brew and Chapters",
    category: "Full-stack café web app",
    desc: "Menu browsing, cart management, table reservations and event listings with Firebase auth, real-time DB and an admin dashboard.",
    col1Image1: brewMenu,
    col1Image2: brewContact,
    col2Image: brewHome,
  },
  {
    number: "02",
    name: "Valere",
    category: "Luxury fashion e-commerce",
    desc: "A dark/light-mode storefront concept for a fashion house — collection browsing, wishlist, cart and account sign-in.",
    col1Image1: valereShop,
    col1Image2: valereSignin,
    col2Image: valereHome,
  },
  {
    number: "03",
    name: "Ledgerly",
    category: "Personal finance planner",
    desc: "A daily finance planner dashboard concept with budget and category breakdowns, investment charts, bill reminders and an integrated habit tracker.",
    col1Image1: ledgerlyStats,
    col1Image2: ledgerlyHabits,
    col2Image: ledgerlyDashboard,
  },
];

export const MARQUEE_ROW_1: string[] = [];
export const MARQUEE_ROW_2: string[] = [];

export interface Skill {
  number: string;
  title: string;
  desc: string;
  stack: string;
}

export const SKILLS: Skill[] = [
  {
    number: "01",
    title: "Frontend Development",
    desc: "Building responsive, user-friendly interfaces and interactive features with clean, component-based structure.",
    stack: "HTML · CSS · JavaScript · React.js",
  },
  {
    number: "02",
    title: "Data Analytics",
    desc: "Data cleaning, preprocessing and exploratory data analysis on real-world datasets, with visualizations that surface patterns and trends.",
    stack: "Python · Pandas · NumPy · Matplotlib · Seaborn",
  },
  {
    number: "03",
    title: "Business Intelligence",
    desc: "Interactive Power BI dashboards with filters that evaluate trends and deliver key business insights.",
    stack: "Power BI",
  },
  {
    number: "04",
    title: "Database & Tools",
    desc: "Querying and managing structured data, with version control in a collaborative workflow.",
    stack: "SQL · Git · GitHub",
  },
];
