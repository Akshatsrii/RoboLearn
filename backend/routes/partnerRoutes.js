const express = require("express");
const { partnerController } = require("../controllers/partnerController");
const { createCrudRouter } = require("../utils/crudFactory");
const { protect, adminOnly } = require("../middleware/authMiddleware");

const router = express.Router();

module.exports = createCrudRouter(partnerController, { router, protectWrites: [protect, adminOnly] });