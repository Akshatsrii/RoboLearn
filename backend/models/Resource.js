const mongoose = require("mongoose");

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
    fileSize: { type: String, default: "" },
    downloadCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Resource", resourceSchema);