import mongoose, { Schema, models } from "mongoose";

const SettingsSchema = new Schema(
  {
    siteTitle: { type: String, required: true },
    siteDescription: { type: String, required: true },
    ogImage: { type: String, default: "" },
    featuredLimit: { type: Number, default: 4 },
  },
  { timestamps: true },
);

export default models.Settings || mongoose.model("Settings", SettingsSchema);
