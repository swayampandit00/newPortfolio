import type { PortfolioPayload } from "@/types";

export const defaultPortfolio: PortfolioPayload = {
  profile: {
    name: "YOUR NAME",
    role: "YOUR ROLE",
    tagline: "FULL STACK DEVELOPER",
    roles: [
      "FULL STACK DEVELOPER",
      "AI/ML ENTHUSIAST",
      "CREATIVE DEVELOPER",
    ],
    bio: "YOUR BIO — replace this placeholder from the admin panel. I build immersive digital products that combine engineering, motion, and spatial interfaces.",
    email: "YOUR EMAIL",
    github: "YOUR GITHUB",
    linkedin: "YOUR LINKEDIN",
    instagram: "",
    location: "YOUR LOCATION",
    availability: "Open to collaborations",
  },
  projects: [
    {
      _id: "proj-01",
      title: "YOUR PROJECT",
      slug: "your-project",
      description:
        "A cinematic product experience exploring spatial interfaces, motion, and full-stack systems. Replace this placeholder from the admin panel.",
      overview:
        "Project overview placeholder. Describe the product, the audience, and the outcome you were aiming for.",
      problem:
        "Problem placeholder. What friction existed before this project existed?",
      solution:
        "Solution placeholder. How did architecture, 3D, or AI change the experience?",
      features: [
        "Interactive spatial interface",
        "Dynamic content from a database",
        "Motion-driven storytelling",
      ],
      challenges:
        "Challenges placeholder. Capture the hardest engineering or design constraint.",
      result:
        "Result placeholder. Share the measurable or qualitative outcome once you have it.",
      thumbnail: "",
      gallery: [],
      technologies: ["Next.js", "TypeScript", "Three.js", "MongoDB"],
      githubUrl: "",
      liveUrl: "",
      featured: true,
      category: "Experience",
      createdAt: new Date().toISOString(),
    },
  ],
  skills: [
    { _id: "sk-1", name: "React", category: "Frontend", level: "Production", projects: ["YOUR PROJECT"], accent: "#64f0d0" },
    { _id: "sk-2", name: "Next.js", category: "Frontend", level: "Production", projects: ["YOUR PROJECT"], accent: "#7c9cff" },
    { _id: "sk-3", name: "TypeScript", category: "Language", level: "Production", projects: ["YOUR PROJECT"], accent: "#60a5fa" },
    { _id: "sk-4", name: "JavaScript", category: "Language", level: "Production", projects: [], accent: "#fbbf24" },
    { _id: "sk-5", name: "Python", category: "Language", level: "Exploring", projects: [], accent: "#38bdf8" },
    { _id: "sk-6", name: "Node.js", category: "Backend", level: "Production", projects: ["YOUR PROJECT"], accent: "#4ade80" },
    { _id: "sk-7", name: "MongoDB", category: "Data", level: "Production", projects: ["YOUR PROJECT"], accent: "#34d399" },
    { _id: "sk-8", name: "Git", category: "Tooling", level: "Production", projects: [], accent: "#fb7185" },
    { _id: "sk-9", name: "AI/ML", category: "Research", level: "Exploring", projects: [], accent: "#c084fc" },
    { _id: "sk-10", name: "Three.js", category: "3D", level: "Production", projects: ["YOUR PROJECT"], accent: "#64f0d0" },
  ],
  experience: [
    {
      _id: "ex-1",
      role: "YOUR ROLE",
      company: "YOUR COMPANY",
      duration: "YYYY — Present",
      year: "2026",
      description:
        "Experience placeholder. Describe scope, systems, and impact without inventing employers or titles.",
      technologies: ["Next.js", "TypeScript", "Three.js"],
    },
  ],
  education: [
    {
      _id: "ed-1",
      institution: "YOUR INSTITUTION",
      program: "YOUR PROGRAM",
      duration: "YYYY — YYYY",
      description: "Education placeholder. Add the real program details from the admin panel.",
    },
  ],
  services: [
    {
      _id: "sv-1",
      title: "Web Development",
      description: "High-performance interfaces with cinematic motion and production architecture.",
      details: "Design systems, accessibility, and frontend engineering.",
    },
    {
      _id: "sv-2",
      title: "Full Stack Development",
      description: "End-to-end product systems spanning APIs, data, and immersive UI.",
      details: "Auth, databases, and deployment-ready Next.js applications.",
    },
    {
      _id: "sv-3",
      title: "AI/ML Development",
      description: "Applied machine learning experiences that stay grounded in product value.",
      details: "Model integration, evaluation, and human-in-the-loop interfaces.",
    },
    {
      _id: "sv-4",
      title: "3D Web Development",
      description: "WebGL scenes, spatial storytelling, and interactive 3D product moments.",
      details: "React Three Fiber, performance budgets, and fallbacks.",
    },
    {
      _id: "sv-5",
      title: "API Development",
      description: "Typed, authenticated APIs with validation and clean resource design.",
      details: "REST, rate limiting, and MongoDB-backed content.",
    },
    {
      _id: "sv-6",
      title: "UI/UX Implementation",
      description: "Translating premium visual direction into precise, interactive systems.",
      details: "Motion, hierarchy, and production-ready component architecture.",
    },
  ],
  achievements: [],
  settings: {
    siteTitle: "YOUR NAME — Creative Developer Portfolio",
    siteDescription:
      "A cinematic 3D portfolio experience for a full-stack developer exploring AI/ML and spatial interfaces.",
    ogImage: "/og.png",
    featuredLimit: 4,
  },
};
