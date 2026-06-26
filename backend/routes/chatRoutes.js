import express from "express";
import { handleChatMessage } from "../controllers/chatController.js";

const router = express.Router();

// POST /api/chat — body: { history: [{ role: "user" | "bot", text: string }] }
router.post("/chat", handleChatMessage);

export default router;