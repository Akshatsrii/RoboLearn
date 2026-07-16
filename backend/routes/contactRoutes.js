const express = require("express");
const {
  submitContact,
  getContacts,
  updateContactStatus,
  deleteContact,
} = require("../controllers/contactController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", submitContact);
router.get("/", protect, adminOnly, getContacts);
router.patch("/:id/status", protect, adminOnly, updateContactStatus);
router.delete("/:id", protect, adminOnly, deleteContact);

module.exports = router;