import mongoose, { Schema, models } from "mongoose";

const ServiceSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    details: { type: String, default: "" },
  },
  { timestamps: true },
);

export default models.Service || mongoose.model("Service", ServiceSchema);
