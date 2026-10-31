import type { MetadataRoute } from "next";
import { getPortfolio } from "@/lib/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXTAUTH_URL || "http://localhost:3000";
  const data = await getPortfolio();
  const pages = ["", "/about", "/projects", "/experience", "/contact"].map((path) => ({
    url: `${base}${path || "/"}`,
    lastModified: new Date(),
  }));
  const projects = data.projects.map((project) => ({
    url: `${base}/projects/${project.slug}`,
    lastModified: new Date(project.createdAt),
  }));
  return [...pages, ...projects];
}
