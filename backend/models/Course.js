const mongoose = require("mongoose");

const courseSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, enum: ["student", "teacher"], required: true },
    level: { type: String, enum: ["beginner", "intermediate", "advanced"], required: true },
    duration: { type: String },
    topics: [{ type: String }],
    prerequisites: [{ type: String }],
    targetGrade: { type: String },
    coverImage: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Course", courseSchema);