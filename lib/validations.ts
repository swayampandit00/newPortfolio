import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().trim().min(2).max(80),
  email: z.string().trim().email().max(120),
  subject: z.string().trim().min(3).max(140),
  message: z.string().trim().min(10).max(4000),
  website: z.string().optional(),
});

export const projectSchema = z.object({
  title: z.string().min(2).max(120),
  slug: z.string().min(2).max(140).optional(),
  description: z.string().min(10).max(600),
  overview: z.string().optional().default(""),
  problem: z.string().optional().default(""),
  solution: z.string().optional().default(""),
  features: z.array(z.string()).optional().default([]),
  challenges: z.string().optional().default(""),
  result: z.string().optional().default(""),
  thumbnail: z.string().optional().default(""),
  gallery: z.array(z.string()).optional().default([]),
  technologies: z.array(z.string()).optional().default([]),
  githubUrl: z.string().optional().default(""),
  liveUrl: z.string().optional().default(""),
  featured: z.boolean().optional().default(false),
  category: z.string().optional().default("Experience"),
});

export const skillSchema = z.object({
  name: z.string().min(1).max(60),
  category: z.string().min(1).max(60),
  level: z.string().min(1).max(60),
  projects: z.array(z.string()).optional().default([]),
  accent: z.string().optional().default("#64f0d0"),
});

export const experienceSchema = z.object({
  role: z.string().min(2).max(120),
  company: z.string().min(2).max(120),
  duration: z.string().min(2).max(80),
  year: z.string().min(2).max(20),
  description: z.string().min(8).max(800),
  technologies: z.array(z.string()).optional().default([]),
});

export const educationSchema = z.object({
  institution: z.string().min(2).max(160),
  program: z.string().min(2).max(160),
  duration: z.string().min(2).max(80),
  description: z.string().optional().default(""),
});

export const serviceSchema = z.object({
  title: z.string().min(2).max(80),
  description: z.string().min(8).max(400),
  details: z.string().optional().default(""),
});

export const achievementSchema = z.object({
  label: z.string().min(2).max(80),
  value: z.string().min(1).max(40),
  note: z.string().optional().default(""),
});

export const profileSchema = z.object({
  name: z.string().min(2).max(80),
  role: z.string().min(2).max(120),
  tagline: z.string().optional().default(""),
  roles: z.array(z.string()).optional().default([]),
  bio: z.string().min(8).max(2000),
  email: z.string().min(3).max(120),
  github: z.string().optional().default(""),
  linkedin: z.string().optional().default(""),
  instagram: z.string().optional().default(""),
  location: z.string().optional().default(""),
  availability: z.string().optional().default(""),
});

export const settingsSchema = z.object({
  siteTitle: z.string().min(2).max(120),
  siteDescription: z.string().min(8).max(300),
  ogImage: z.string().optional().default(""),
  featuredLimit: z.number().int().min(1).max(12),
});
