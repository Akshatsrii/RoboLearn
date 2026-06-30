const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    role: { type: String, required: true, trim: true },
    text: { type: String, required: true },
    rating: { type: Number, min: 1, max: 5, default: 5 },
    photoUrl: { type: String, default: "" },
    isApproved: { type: Boolean, default: false },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);