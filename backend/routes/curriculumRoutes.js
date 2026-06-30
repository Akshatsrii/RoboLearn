const express = require("express");
const { curriculumController } = require("../controllers/curriculumController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = createCrudRouter(curriculumController, { router, protectWrites: [protect, adminOnly] });