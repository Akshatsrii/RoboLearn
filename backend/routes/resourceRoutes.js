const express = require("express");
const { resourceController } = require("../controllers/resourceController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/:id/download", resourceController.trackDownload);

module.exports = createCrudRouter(resourceController, { router, protectWrites: [protect, adminOnly] });