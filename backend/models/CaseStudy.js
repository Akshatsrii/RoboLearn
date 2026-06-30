const mongoose = require("mongoose");

const caseStudySchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    coverImage: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    implementation: { type: String, required: true },
    result: { type: String, required: true },
    metric: { type: String, default: "" },
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("CaseStudy", caseStudySchema);