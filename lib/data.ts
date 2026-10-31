import { connectDB, hasMongoUri } from "@/lib/mongodb";
import { defaultPortfolio } from "@/lib/seed";
import { serialize } from "@/lib/utils";
import Profile from "@/models/Profile";
import Project from "@/models/Project";
import Skill from "@/models/Skill";
import Experience from "@/models/Experience";
import Education from "@/models/Education";
import Service from "@/models/Service";
import Achievement from "@/models/Achievement";
import Settings from "@/models/Settings";
import type { PortfolioPayload, ProjectData } from "@/types";

function withoutId<T extends { _id: string }>(item: T) {
  const rest = { ...item };
  delete (rest as Partial<T>)._id;
  return rest;
}

async function ensureSeed() {
  const existing = await Profile.findOne();
  if (existing) return;

  await Profile.create(defaultPortfolio.profile);
  await Project.insertMany(defaultPortfolio.projects.map(withoutId));
  await Skill.insertMany(defaultPortfolio.skills.map(withoutId));
  await Experience.insertMany(defaultPortfolio.experience.map(withoutId));
  await Education.insertMany(defaultPortfolio.education.map(withoutId));
  await Service.insertMany(defaultPortfolio.services.map(withoutId));
  await Settings.create(defaultPortfolio.settings);
}

export async function getPortfolio(): Promise<PortfolioPayload> {
  if (!hasMongoUri()) return defaultPortfolio;

  try {
    await connectDB();
    await ensureSeed();

    const [profile, projects, skills, experience, education, services, achievements, settings] =
      await Promise.all([
        Profile.findOne().lean(),
        Project.find().sort({ featured: -1, createdAt: -1 }).lean(),
        Skill.find().lean(),
        Experience.find().sort({ year: -1 }).lean(),
        Education.find().lean(),
        Service.find().lean(),
        Achievement.find().lean(),
        Settings.findOne().lean(),
      ]);

    return serialize({
      profile: (profile as unknown as PortfolioPayload["profile"]) || defaultPortfolio.profile,
      projects: (projects as unknown as ProjectData[]) || [],
      skills: (skills as unknown as PortfolioPayload["skills"]) || [],
      experience: (experience as unknown as PortfolioPayload["experience"]) || [],
      education: (education as unknown as PortfolioPayload["education"]) || [],
      services: (services as unknown as PortfolioPayload["services"]) || [],
      achievements: (achievements as unknown as PortfolioPayload["achievements"]) || [],
      settings: (settings as unknown as PortfolioPayload["settings"]) || defaultPortfolio.settings,
    });
  } catch {
    return defaultPortfolio;
  }
}

export async function getProjectBySlug(slug: string) {
  const data = await getPortfolio();
  return data.projects.find((project) => project.slug === slug) || null;
}
