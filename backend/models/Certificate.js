const mongoose = require("mongoose");

const certificateSchema = new mongoose.Schema({
  certId: { type: String, required: true, unique: true },
  studentName: { type: String, required: true },
  grade: String,
  program: String,
  schoolName: String,
  dateIssued: String,
  status: { type: String, default: "Verified" },
}, { timestamps: true });

module.exports = mongoose.model("Certificate", certificateSchema);
