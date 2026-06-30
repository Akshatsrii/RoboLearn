const express = require("express");
const { courseController } = require("../controllers/courseController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = createCrudRouter(courseController, { router, protectWrites: [protect, adminOnly] });