export type ProjectStatus = "live" | "case-study" | "competition";

export type Project = {
  slug: string;
  title: string;
  summary: string;
  role: string;
  stack: string[];
  features: string[];
  liveUrl: string | null;
  repoUrl: string | null;
  status: ProjectStatus;
  media: string[];
};

export const projects: Project[] = [
  {
    slug: "zantan-company",
    title: "Zantan Company Website",
    summary: "Company website presenting Zantan and its business information.",
    role: "Project developer",
    stack: [],
    features: [],
    liveUrl: "https://zantan.co.tz",
    repoUrl: null,
    status: "live",
    media: [],
  },
  {
    slug: "zantan-mining",
    title: "Zantan Mining Platform",
    summary: "Mining platform with visitor sign-up and login.",
    role: "Project developer",
    stack: [],
    features: ["Visitor sign-up", "Visitor login"],
    liveUrl: "https://zantanmining.co.tz",
    repoUrl: null,
    status: "live",
    media: [],
  },
  {
    slug: "ayaven-kids",
    title: "Ayaven Kids Events Hub",
    summary: "Events hub for Ayaven Kids.",
    role: "Project developer",
    stack: [],
    features: [],
    liveUrl: "https://ayavenkids.co.tz",
    repoUrl: null,
    status: "live",
    media: [],
  },
  {
    slug: "hardware-stores",
    title: "Hardware Stores",
    summary:
      "Industrial hardware e-commerce and catalog platform for Tanzania's infrastructure sector, with mobile-first design and fast loading on mobile networks.",
    role: "Project developer",
    stack: ["React", "Tailwind CSS", "Vercel"],
    // TODO: UNVERIFIED legacy claims; verify before display: ISO-certified, M-Pesa, Airtel Money, Selcom Pay, and Mix By Yas.
    features: [
      "Industrial catalog preview",
      "Speed-optimized loading",
      "Responsive branding",
      "Trust-building elements",
      "Dark theme UI",
    ],
    liveUrl: "https://mariwahardwaredodoma.vercel.app/",
    repoUrl: "https://github.com/YusuphSalimu/hardware-stores",
    status: "live",
    media: [],
  },
  {
    slug: "stock-prediction",
    title: "Stock Price Prediction — Tanzania Stock Market",
    summary:
      "Machine learning system that analyses Tanzania stock market data and forecasts price trends.",
    role: "Project developer",
    stack: [
      "Python",
      "Pandas",
      "NumPy",
      "scikit-learn",
      "TensorFlow",
      "LSTM",
      "time series analysis",
    ],
    features: [],
    liveUrl: "https://tanzania-stock-ai.vercel.app",
    repoUrl: "https://github.com/YusuphSalimu/tanzania-stock-ai",
    status: "live",
    media: [],
  },
  {
    slug: "leadpulse-ai",
    title: "LeadPulse AI — B2B Lead Generation SaaS",
    summary: "B2B lead-generation SaaS case study.",
    role: "Project developer",
    stack: ["Django", "Celery", "Redis", "Supabase"],
    features: [],
    liveUrl: null,
    repoUrl: null,
    status: "case-study",
    media: [],
  },
  {
    slug: "farm-management",
    title: "Farm Management System",
    summary: "Farm management application case study.",
    role: "Project developer",
    stack: ["Spring Boot", "MySQL", "Thymeleaf", "HTML/CSS"],
    features: [],
    liveUrl: null,
    repoUrl: null,
    status: "case-study",
    media: [],
  },
  {
    slug: "zindi-challenge",
    title: "AI4AEC x IBM Liquidity Stress Challenge (Zindi Africa)",
    summary: "Competition entry for the AI4AEC x IBM Liquidity Stress Challenge.",
    role: "Competitor",
    stack: ["Python", "Pandas", "scikit-learn", "Jupyter"],
    features: [],
    liveUrl: null,
    repoUrl: null,
    status: "competition",
    media: [],
  },
];
