import mongoose, { Schema, models } from "mongoose";

const ProfileSchema = new Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    tagline: { type: String, default: "" },
    roles: { type: [String], default: [] },
    bio: { type: String, required: true },
    email: { type: String, required: true },
    github: { type: String, default: "" },
    linkedin: { type: String, default: "" },
    instagram: { type: String, default: "" },
    location: { type: String, default: "" },
    availability: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.Profile || mongoose.model("Profile", ProfileSchema);
