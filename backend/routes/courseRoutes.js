const express = require("express");
const { courseController, proposeCourse } = require("../controllers/courseController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

// Define proposal route first
router.post("/propose", proposeCourse);

module.exports = createCrudRouter(courseController, { router, protectWrites: [protect, adminOnly] });