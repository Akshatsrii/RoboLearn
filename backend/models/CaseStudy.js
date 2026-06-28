import mongoose from "mongoose";

const caseStudySchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, trim: true },
    location: { type: String, default: "" },
    coverImage: { type: String, required: true },
    problem: { type: String, required: true },
    solution: { type: String, required: true },
    implementation: { type: String, required: true },
    result: { type: String, required: true },
    metric: { type: String, default: "" }, // e.g. "3x STEM enrollment"
    isPublished: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("CaseStudy", caseStudySchema);