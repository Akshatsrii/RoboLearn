const mongoose = require("mongoose");

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true },
    excerpt: { type: String, required: true },
    content: { type: String, required: true },
    category: {
      type: String,
      enum: ["robotics", "ai", "stem", "coding", "education", "news"],
      required: true,
    },
    coverImage: { type: String },
    author: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    tags: [{ type: String }],
    isPublished: { type: Boolean, default: false },
    publishedAt: { type: Date },
    readTime: { type: Number, default: 5 },
    views: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
