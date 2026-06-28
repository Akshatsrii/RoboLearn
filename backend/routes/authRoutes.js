const express = require("express");

const {
  login,
  register,
  getMe,
  createStaffUser,
} = require("../controllers/authController");

const {
  protect,
  adminOnly,
} = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/login", login);
router.post("/register", register); // public — always creates a "user" role account
router.get("/me", protect, getMe);
router.post("/staff", protect, adminOnly, createStaffUser); // admin-only — creates editor/admin accounts

module.exports = router;