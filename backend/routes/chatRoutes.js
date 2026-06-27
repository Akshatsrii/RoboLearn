const express = require("express");
const { handleChatMessage } = require("../controllers/chatController");

const router = express.Router();

// POST /api/chat
router.post("/chat", handleChatMessage);

module.exports = router;