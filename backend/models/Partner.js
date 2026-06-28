const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, default: "Rajasthan" },
    logo: { type: String },
    studentsCount: { type: Number, default: 0 },
    joinedAt: { type: Date, default: Date.now },
    website: { type: String },
    isActive: { type: Boolean, default: true },
    isFeatured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);
