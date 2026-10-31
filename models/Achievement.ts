import mongoose, { Schema, models } from "mongoose";

const AchievementSchema = new Schema(
  {
    label: { type: String, required: true },
    value: { type: String, required: true },
    note: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.Achievement || mongoose.model("Achievement", AchievementSchema);
