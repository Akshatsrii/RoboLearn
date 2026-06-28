const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String },
    imageUrl: { type: String, required: true },
    category: {
      type: String,
      enum: ["labs", "workshops", "events", "competitions", "student-activities"],
      required: true,
    },
    schoolName: { type: String },
    location: { type: String },
    date: { type: Date },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Gallery", gallerySchema);
