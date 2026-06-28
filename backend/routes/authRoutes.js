import express from "express";
import { login, register, getMe, createStaffUser } from "../controllers/authController.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // public — always creates a "user" role account
router.get("/me", protect, getMe);
router.post("/staff", protect, adminOnly, createStaffUser); // admin-only — creates editor/admin accounts

export default router;