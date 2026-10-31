import mongoose, { Schema, models } from "mongoose";

const EducationSchema = new Schema(
  {
    institution: { type: String, required: true },
    program: { type: String, required: true },
    duration: { type: String, required: true },
    description: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.Education || mongoose.model("Education", EducationSchema);
