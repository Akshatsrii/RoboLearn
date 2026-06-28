import express from "express";
import { resourceController } from "../controllers/resourceController.js";
import { createCrudRouter } from "../utils/crudFactory.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

// Public — increments download counter (no auth needed)
router.post("/:id/download", resourceController.trackDownload);

export default createCrudRouter(resourceController, {
  router,
  protectWrites: [protect, adminOnly],
});