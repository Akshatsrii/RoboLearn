const express = require("express");
const { upload } = require("../middleware/uploadMiddleware");
const { uploadFile } = require("../controllers/uploadController");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", protect, adminOnly, upload.single("file"), uploadFile);

module.exports = router;