import express from "express";

import authRoutes from "./authRoutes.js";
import productRoutes from "./productRoutes.js";
import blogRoutes from "./blogRoutes.js";
import galleryRoutes from "./galleryRoutes.js";
import curriculumRoutes from "./curriculumRoutes.js";
import courseRoutes from "./courseRoutes.js";
import testimonialRoutes from "./testimonialRoutes.js";
import partnerRoutes from "./partnerRoutes.js";
import contactRoutes from "./contactRoutes.js";
import caseStudyRoutes from "./caseStudyRoutes.js";
import resourceRoutes from "./resourceRoutes.js";
import uploadRoutes from "./uploadRoutes.js";
import chatRoutes from "./chatRoutes.js";

const router = express.Router();

router.use("/auth", authRoutes);
router.use("/products", productRoutes);
router.use("/blogs", blogRoutes);
router.use("/gallery", galleryRoutes);
router.use("/curriculum", curriculumRoutes);
router.use("/courses", courseRoutes);
router.use("/testimonials", testimonialRoutes);
router.use("/partners", partnerRoutes);
router.use("/contact", contactRoutes);
router.use("/case-studies", caseStudyRoutes);
router.use("/resources", resourceRoutes);
router.use("/upload", uploadRoutes);
router.use("/", chatRoutes); // exposes /api/chat

export default router;