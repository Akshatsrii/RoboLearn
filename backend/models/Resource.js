
import mongoose from "mongoose";

const resourceSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    category: {
      type: String,
      enum: ["Brochures", "Curriculum Guides", "Case Studies", "Setup Guides"],
      required: true,
    },
    fileUrl: { type: String, required: true },
    fileSize: { type: String, default: "" }, // e.g. "2.4 MB"
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

export default mongoose.model("Resource", resourceSchema);
