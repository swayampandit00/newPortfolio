import mongoose, { Schema, models } from "mongoose";

const ExperienceSchema = new Schema(
  {
    role: { type: String, required: true },
    company: { type: String, required: true },
    duration: { type: String, required: true },
    year: { type: String, required: true },
    description: { type: String, required: true },
    technologies: { type: [String], default: [] },
  },
  { timestamps: true },
);

export default models.Experience || mongoose.model("Experience", ExperienceSchema);
