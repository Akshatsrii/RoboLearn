import express from "express";
import { caseStudyController } from "../controllers/caseStudyController.js";
import { createCrudRouter } from "../utils/crudFactory.js";
import { protect, adminOnly } from "../middleware/authMiddleware.js";

const router = express.Router();

export default createCrudRouter(caseStudyController, {
  router,
  protectWrites: [protect, adminOnly],
});
