import mongoose, { Schema, models } from "mongoose";

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, required: true },
    level: { type: String, required: true },
    projects: { type: [String], default: [] },
    accent: { type: String, default: "#64f0d0" },
  },
  { timestamps: true },
);

export default models.Skill || mongoose.model("Skill", SkillSchema);
