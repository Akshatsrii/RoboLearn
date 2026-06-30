const express = require("express");
const { testimonialController } = require("../controllers/testimonialController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.get("/public", testimonialController.getPublic);

module.exports = createCrudRouter(testimonialController, { router, protectWrites: [protect, adminOnly] });