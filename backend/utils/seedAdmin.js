/**
 * One-time script to create the first admin account.
 * Run once after setting up MongoDB:
 *
 *   node utils/seedAdmin.js
 *
 * Reads ADMIN_NAME / ADMIN_EMAIL / ADMIN_PASSWORD from .env, or falls back
 * to the defaults below — change these before running in production.
 */
import dotenv from "dotenv";
import mongoose from "mongoose";
import User from "../models/User.js";

dotenv.config();

async function seedAdmin() {
  await mongoose.connect(process.env.MONGO_URI);

  const email = process.env.ADMIN_EMAIL || "admin@robolearn.in";
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!";
  const name = process.env.ADMIN_NAME || "RoboLearn Admin";

  const existing = await User.findOne({ email });
  if (existing) {
    console.log(`Admin already exists: ${email}`);
    process.exit(0);
  }

  await User.create({ name, email, password, role: "admin" });
  console.log(`✅ Admin created: ${email} / ${password}`);
  console.log("Log in once, then change this password from a real account.");
  process.exit(0);
}

seedAdmin().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});