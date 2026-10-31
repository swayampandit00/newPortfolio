import mongoose, { Schema, models } from "mongoose";

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    overview: { type: String, default: "" },
    problem: { type: String, default: "" },
    solution: { type: String, default: "" },
    features: { type: [String], default: [] },
    challenges: { type: String, default: "" },
    result: { type: String, default: "" },
    thumbnail: { type: String, default: "" },
    gallery: { type: [String], default: [] },
    technologies: { type: [String], default: [] },
    githubUrl: { type: String, default: "" },
    liveUrl: { type: String, default: "" },
    featured: { type: Boolean, default: false },
    category: { type: String, default: "Experience" },
  },
  { timestamps: true },
);

export default models.Project || mongoose.model("Project", ProjectSchema);
