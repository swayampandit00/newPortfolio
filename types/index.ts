export interface ProfileData {
  name: string;
  role: string;
  tagline: string;
  roles: string[];
  bio: string;
  email: string;
  github: string;
  linkedin: string;
  instagram: string;
  location: string;
  availability: string;
}

export interface ProjectData {
  _id: string;
  title: string;
  slug: string;
  description: string;
  overview: string;
  problem: string;
  solution: string;
  features: string[];
  challenges: string;
  result: string;
  thumbnail: string;
  gallery: string[];
  technologies: string[];
  githubUrl: string;
  liveUrl: string;
  featured: boolean;
  category: string;
  createdAt: string;
}

export interface SkillData {
  _id: string;
  name: string;
  category: string;
  level: string;
  projects: string[];
  accent: string;
}

export interface ExperienceData {
  _id: string;
  role: string;
  company: string;
  duration: string;
  year: string;
  description: string;
  technologies: string[];
}

export interface EducationData {
  _id: string;
  institution: string;
  program: string;
  duration: string;
  description: string;
}

export interface ServiceData {
  _id: string;
  title: string;
  description: string;
  details: string;
}

export interface AchievementData {
  _id: string;
  label: string;
  value: string;
  note: string;
}

export interface MessageData {
  _id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
}

export interface SettingsData {
  siteTitle: string;
  siteDescription: string;
  ogImage: string;
  featuredLimit: number;
}

export interface PortfolioPayload {
  profile: ProfileData;
  projects: ProjectData[];
  skills: SkillData[];
  experience: ExperienceData[];
  education: EducationData[];
  services: ServiceData[];
  achievements: AchievementData[];
  settings: SettingsData;
}
