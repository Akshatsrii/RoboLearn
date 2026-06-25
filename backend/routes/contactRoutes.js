const express = require("express");

const router = express.Router();

// GET Contact
router.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Contact Route Working",
  });
});

// POST Contact Form
router.post("/", (req, res) => {
  const { name, email, subject, message } = req.body;

  res.status(201).json({
    success: true,
    message: "Contact form submitted successfully",
    data: {
      name,
      email,
      subject,
      message,
    },
  });
});

module.exports = router;