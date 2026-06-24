const mongoose = require("mongoose");

const contactSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    schoolName: { type: String },
    city: { type: String },
    message: { type: String, required: true },
    type: {
      type: String,
      enum: ["general", "consultation", "demo", "partnership"],
      default: "general",
    },
    status: {
      type: String,
      enum: ["new", "contacted", "in-progress", "resolved"],
      default: "new",
    },
    notes: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contact", contactSchema);