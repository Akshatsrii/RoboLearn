const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    audience: { type: String, enum: ["student", "teacher"], required: true },
    level: { type: String, default: "" },
    description: { type: String, required: true },
    duration: { type: String, default: "" },
    syllabus: [{ type: String }],
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);