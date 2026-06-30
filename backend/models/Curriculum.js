const mongoose = require("mongoose");

const curriculumSchema = new mongoose.Schema(
  {
    gradeLabel: { type: String, required: true },
    title: { type: String, required: true },
    topics: [{ type: String, required: true }],
    description: { type: String, default: "" },
    brochureUrl: { type: String, default: "" },
    order: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Curriculum", curriculumSchema);