const express = require("express");
const {
  getGallery,
  createGalleryItem,
  updateGalleryItem,
  deleteGalleryItem,
} = require("../controllers/galleryController");

const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/", getGallery);
router.post("/", protect, adminOnly, createGalleryItem);
router.put("/:id", protect, adminOnly, updateGalleryItem);
router.delete("/:id", protect, adminOnly, deleteGalleryItem);

module.exports = router;