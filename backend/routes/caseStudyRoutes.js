const express = require("express");
const { caseStudyController } = require("../controllers/caseStudyController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = createCrudRouter(caseStudyController, { router, protectWrites: [protect, adminOnly] });