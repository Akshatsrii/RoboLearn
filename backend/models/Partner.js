const mongoose = require("mongoose");

const partnerSchema = new mongoose.Schema(
  {
    schoolName: { type: String, required: true, trim: true },
    logoUrl: { type: String, default: "" },
    city: { type: String, default: "" },
    studentsImpacted: { type: Number, default: 0 },
    partnerSince: { type: Date, default: Date.now },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Partner", partnerSchema);