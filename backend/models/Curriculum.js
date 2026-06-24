const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    gradeGroup: { type: String, enum: ["3-5", "6-8", "9-12"], required: true },
    subject: { type: String, required: true },
    topics: [{ title: String, description: String, duration: String }],
    objectives: [{ type: String }],
    tools: [{ type: String }],
    coverImage: { type: String },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Curriculum", curriculumSchema);